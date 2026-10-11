/* The same deterministic WebGL scene powers the interactive page and README GIF. */
(() => {
  'use strict';
  const capture = new URLSearchParams(location.search).has('capture');
  if (capture) document.body.dataset.capture = 'true';
  const canvas = document.querySelector('#research-scene');
  const gl = canvas.getContext('webgl', {alpha:true, antialias:true, preserveDrawingBuffer:capture});
  const toggle = document.querySelector('#motion-toggle');
  const phaseButtons = [...document.querySelectorAll('[data-phase]')];
  const captions = ['从一个值得追问的问题开始。','追问设计选择，展开因果机制。','核对支持与反例，明确成立边界。','保留核心关系，带着条件进入新场景。'];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 10;
  let paused = reducedMotion.matches;
  let elapsed = paused ? 3.75 : 0;
  let lastTime = performance.now();
  let width = 0;
  let height = 0;
  let targetX = 0;
  let targetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let lastPhase = -1;
  let frameRequest = 0;
  let inView = true;

  function updatePhase(time) {
    const cycle = ((time % duration) + duration) % duration;
    const phase = Math.floor(cycle / 2.5);
    phaseButtons.forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === phase));
      button.style.setProperty('--phase-progress', index === phase ? (cycle % 2.5) / 2.5 : 0);
    });
    if (phase !== lastPhase) {
      document.querySelector('.phase-navigation').style.setProperty('--selected-phase',phase);
      document.querySelector('#phase-number').textContent = `0${phase + 1} /`;
      document.querySelector('#phase-caption').textContent = captions[phase];
      lastPhase = phase;
    }
    return cycle / duration;
  }

  function updateToggle() {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? '播放动画' : '暂停动画');
    toggle.querySelector('.pause-icon').textContent = paused ? '▷' : 'Ⅱ';
    toggle.querySelector('.motion-label').textContent = paused ? '播放' : '暂停';
  }

  if (!gl) {
    canvas.hidden = true;
    const poster=document.querySelector('#scene-poster');
    poster.hidden=false;
    poster.addEventListener('error',()=>{poster.hidden=true;document.querySelector('#scene-fallback').hidden=false;});
    toggle.hidden = true;
    phaseButtons.forEach((button, index) => button.addEventListener('click', () => updatePhase(index * 2.5 + 1)));
    updatePhase(elapsed);
    window.researchLens = {ready:true, renderer:'fallback', renderAt:updatePhase};
    return;
  }

  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec4 aColor;
    attribute float aSize;
    uniform vec2 uResolution;
    uniform vec2 uOrigin;
    uniform float uScale;
    uniform float uPixelRatio;
    varying vec4 vColor;
    void main() {
      float perspective = 820.0 / (820.0 + aPosition.z);
      vec2 screen = uOrigin + aPosition.xy * uScale * perspective;
      vec2 clip = screen / uResolution * 2.0 - 1.0;
      gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
      gl_PointSize = aSize * uPixelRatio * uScale * perspective;
      vColor = aColor;
    }`;
  const lineFragment = `precision mediump float; varying vec4 vColor; void main(){gl_FragColor=vColor;}`;
  const pointFragment = `
    precision mediump float;
    varying vec4 vColor;
    void main(){
      float radius=length(gl_PointCoord-vec2(0.5))*2.0;
      if(radius>1.0) discard;
      float falloff=pow(1.0-radius,1.7);
      gl_FragColor=vec4(vColor.rgb,vColor.a*falloff);
    }`;

  function createProgram(fragmentSource) {
    const shaders = [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]].map(([type, source]) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    });
    const program = gl.createProgram();
    shaders.forEach(shader => gl.attachShader(program, shader));
    gl.linkProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    return {
      program,
      position:gl.getAttribLocation(program,'aPosition'),
      color:gl.getAttribLocation(program,'aColor'),
      size:gl.getAttribLocation(program,'aSize'),
      resolution:gl.getUniformLocation(program,'uResolution'),
      origin:gl.getUniformLocation(program,'uOrigin'),
      scale:gl.getUniformLocation(program,'uScale'),
      ratio:gl.getUniformLocation(program,'uPixelRatio')
    };
  }

  const linesProgram = createProgram(lineFragment);
  const pointsProgram = createProgram(pointFragment);
  const buffer = gl.createBuffer();
  const paper = [0.88,0.92,0.81];
  const sage = [0.71,0.86,0.59];
  const copper = [0.90,0.61,0.39];
  const tau = Math.PI * 2;
  const nodes = [
    [-65,-32,22],[-18,-69,-25],[35,-49,32],[66,-8,-15],
    [41,48,19],[-9,65,-29],[-57,39,30],[-23,5,-6],
    [21,9,38],[3,-27,-48],[-80,8,-11],[14,81,24]
  ];
  const edges = [[0,1],[0,7],[0,10],[1,2],[1,9],[2,3],[2,8],[3,4],[3,8],[4,5],[4,8],[5,6],[5,11],[6,7],[6,10],[7,8],[7,9],[8,9]];
  const targetNodes = [[206,-52,18],[263,-34,-20],[225,6,33],[276,30,6],[229,71,-23],[187,39,16]];
  const targetEdges = [[0,1],[0,2],[1,3],[2,3],[2,4],[2,5],[3,4],[4,5]];
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.disable(gl.DEPTH_TEST);

  function seed(index) {return ((Math.sin(index * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;}
  function mix(a,b,t) {return a+(b-a)*t;}
  function color(rgb, alpha) {return [...rgb,alpha];}
  function rotate(point, x, y, z = 0) {
    const [px,py,pz] = point;
    const ax = px*Math.cos(y)+pz*Math.sin(y);
    const az = -px*Math.sin(y)+pz*Math.cos(y);
    const ay = py*Math.cos(x)-az*Math.sin(x);
    const bz = py*Math.sin(x)+az*Math.cos(x);
    return [ax*Math.cos(z)-ay*Math.sin(z), ax*Math.sin(z)+ay*Math.cos(z), bz];
  }

  function resize() {
    const bounds=canvas.getBoundingClientRect();
    width=bounds.width; height=bounds.height;
    const ratio=Math.min(devicePixelRatio || 1,2);
    canvas.width=Math.round(width*ratio);
    canvas.height=Math.round(height*ratio);
    gl.viewport(0,0,canvas.width,canvas.height);
  }

  function drawBatch(program, vertices, mode, origin, scale) {
    if(!vertices.length) return;
    gl.useProgram(program.program);
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.DYNAMIC_DRAW);
    const stride=8*4;
    [[program.position,3,0],[program.color,4,3*4],[program.size,1,7*4]].forEach(([location,count,offset])=>{
      if(location<0) return;
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location,count,gl.FLOAT,false,stride,offset);
    });
    gl.uniform2f(program.resolution,width,height);
    gl.uniform2f(program.origin,...origin);
    gl.uniform1f(program.scale,scale);
    gl.uniform1f(program.ratio,Math.min(devicePixelRatio || 1,2));
    gl.drawArrays(mode,0,vertices.length/8);
  }

  function render(time, interactive = false) {
    const cycle=updatePhase(time);
    const angle=cycle*tau;
    const mobile=width<700 && !capture;
    const scale=mobile ? width/690 : width/1280;
    const origin=mobile ? [width*.515,height*.575] : [width*.743,height*.426];
    const tiltY=.45+Math.sin(angle)*.30+pointerX*.18;
    const tiltX=-.15+Math.cos(angle)*.10+pointerY*.12;
    const lines=[];
    const points=[];
    const fills=[];
    const world=point=>rotate(point,pointerY*.06,pointerX*.08);
    const add=(collection,point,rgb,alpha,size=1)=>collection.push(...world(point),...color(rgb,alpha),size);
    const line=(a,b,rgb,alpha)=>{add(lines,a,rgb,alpha);add(lines,b,rgb,alpha);};
    const dot=(point,rgb,alpha,size)=>add(points,point,rgb,alpha,size);
    const focus=offset=>Math.pow((1+Math.cos(angle-offset))/2,2);
    const sourceIntensity=.25+.75*focus(Math.PI*.25);
    const mechanismIntensity=.20+.80*focus(Math.PI*.75);
    const evidenceIntensity=.18+.82*focus(Math.PI*1.25);
    const transferIntensity=.10+.90*focus(Math.PI*1.75);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);

    // A quiet coordinate plane provides depth without an unrelated starfield.
    for(let i=-4;i<=4;i++) {
      line([i*70,135,-160],[i*70,135,120],sage,.055);
      line([-290,135,i*36],[290,135,i*36],sage,.045);
    }

    // Source sheets remain readable as planes, with their own spatial rotation.
    for(let sheet=0;sheet<3;sheet++) {
      const ox=-229+sheet*12;
      const oy=-13-sheet*13+Math.sin(angle+sheet*.7)*5;
      const turn=-.28+Math.sin(angle)*.08;
      const sheetPoint=(x,y)=>{
        const r=rotate([x,y,0],.05,turn,-.045);
        return [r[0]+ox,r[1]+oy,r[2]+sheet*14+20];
      };
      const corners=[[-33,-51],[33,-51],[33,51],[-33,51]].map(([x,y])=>sheetPoint(x,y));
      for(let i=0;i<4;i++) line(corners[i],corners[(i+1)%4],paper,(.16+sheet*.14)*(.5+sourceIntensity*.7));
      [0,1,2,0,2,3].forEach(index=>add(fills,corners[index],sage,.012));
      if(sheet===2) {
        [-26,-10,6,22].forEach((y,index)=>line(sheetPoint(-18,y),sheetPoint(index===3?7:20,y),index===0?copper:paper,index===0?.65:.23));
      }
    }

    // Lens: translucent discs, edge thickness, and an independently moving meridian.
    const lensPoint=(x,y,z)=>rotate([x,y,z],tiltX,tiltY,-.10);
    for(let ring=0;ring<4;ring++) {
      const radius=[131,126,116,108][ring];
      const z=[-7,7,8,9][ring];
      for(let i=0;i<120;i++) {
        const a=i/120*tau,b=(i+1)/120*tau;
        line(lensPoint(Math.cos(a)*radius,Math.sin(a)*radius,z),lensPoint(Math.cos(b)*radius,Math.sin(b)*radius,z),ring===0?paper:sage,[.43,.7,.14,.08][ring]);
        if(ring===1) {
          [lensPoint(0,0,7),lensPoint(Math.cos(a)*radius,Math.sin(a)*radius,7),lensPoint(Math.cos(b)*radius,Math.sin(b)*radius,7)].forEach(p=>add(fills,p,sage,.018));
        }
      }
    }
    for(let i=0;i<90;i++) {
      const a=i/90*tau,b=(i+1)/90*tau;
      line(lensPoint(Math.cos(a)*119,Math.sin(a)*119,Math.sin(a)*29),lensPoint(Math.cos(b)*119,Math.sin(b)*119,Math.sin(b)*29),paper,.085);
    }
    for(let i=0;i<24;i++) {
      const a=i/24*tau;
      const outer=i%3===0?142:137;
      line(lensPoint(Math.cos(a)*133,Math.sin(a)*133,0),lensPoint(Math.cos(a)*outer,Math.sin(a)*outer,0),sage,i%3===0?.5:.2);
    }
    const pointerAngle=angle-.85;
    const tracer=lensPoint(Math.cos(pointerAngle)*126,Math.sin(pointerAngle)*126,8);
    dot(tracer,copper,.60,16);dot(tracer,paper,1,5);

    const network=nodes.map(p=>rotate(p,Math.sin(angle)*.09,Math.sin(angle)*.24,.05));
    edges.forEach(([a,b],index)=>line(network[a],network[b],index===7||index===12?copper:sage,.06+mechanismIntensity*.48+evidenceIntensity*.15));
    network.forEach((p,index)=>{
      const tone=index===4?copper:paper;
      const strength=index===4?evidenceIntensity:mechanismIntensity;
      dot(p,tone,strength*.45,index===4?26:19);
      dot(p,tone,.30+strength*.70,index===4?9:7);
    });

    // A second topology keeps the relationship while changing its arrangement.
    const transferred=targetNodes.map((p,index)=>[p[0],p[1]+Math.sin(angle+index*.8)*4,p[2]]);
    targetEdges.forEach(([a,b])=>line(transferred[a],transferred[b],sage,.025+transferIntensity*.58));
    transferred.forEach((p,index)=>{
      dot(p,index===4?copper:sage,.08+transferIntensity*.46,21);
      dot(p,index===4?copper:paper,.20+transferIntensity*.76,6);
    });
    line([135,8,0],[177,8,0],sage,.23);
    line([-173,-6,20],[-140,-6,20],sage,.23);

    // Material particles narrow at the lens, then fan into the new context.
    for(let i=0;i<65;i++) {
      const progress=(seed(i+1)+cycle)%1;
      const x=mix(-306,303,progress);
      const spread=1-.84*Math.exp(-x*x/14000);
      const y=(seed(i+140)-.5)*137*spread+Math.sin(angle+seed(i)*tau)*7;
      const z=(seed(i+260)-.5)*95;
      const strength=Math.sin(progress*Math.PI)*.75;
      const tone=i%9===0?copper:sage;
      dot([x,y,z],tone,strength,i%4===0?8:4.5);
      if(i%4===0) line([x-10,y,z],[x,y,z],tone,strength*.20);
    }

    // A limited number of evidence marks orbit the mechanism rather than float everywhere.
    for(let i=0;i<7;i++) {
      const a=angle+i/7*tau;
      const p=lensPoint(Math.cos(a)*92,Math.sin(a)*92,35);
      dot(p,i===2?copper:sage,.24+evidenceIntensity*.26,4);
    }
    drawBatch(linesProgram,fills,gl.TRIANGLES,origin,scale);
    drawBatch(linesProgram,lines,gl.LINES,origin,scale);
    drawBatch(pointsProgram,points,gl.POINTS,origin,scale);
    if(interactive) {
      pointerX=mix(pointerX,targetX,.055);
      pointerY=mix(pointerY,targetY,.055);
    }
  }

  function animate(now) {
    frameRequest=0;
    const delta=Math.min((now-lastTime)/1000,.1);
    lastTime=now;
    if(!paused && !document.hidden && inView) elapsed=(elapsed+delta)%duration;
    render(elapsed,true);
    schedule();
  }

  function schedule() {
    if(!capture && !paused && !document.hidden && inView && !frameRequest) frameRequest=requestAnimationFrame(animate);
  }
  function syncAnimation() {
    cancelAnimationFrame(frameRequest);frameRequest=0;lastTime=performance.now();
    if(inView && !document.hidden) render(elapsed);
    schedule();
  }
  toggle.addEventListener('click',()=>{paused=!paused;updateToggle();syncAnimation();});
  phaseButtons.forEach((button,index)=>button.addEventListener('click',()=>{elapsed=index*2.5+.4;render(elapsed);}));
  canvas.addEventListener('pointermove',event=>{
    if(reducedMotion.matches || capture) return;
    const bounds=canvas.getBoundingClientRect();
    targetX=(event.clientX-bounds.left)/bounds.width-.5;
    targetY=(event.clientY-bounds.top)/bounds.height-.5;
  });
  canvas.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  document.addEventListener('visibilitychange',syncAnimation);
  reducedMotion.addEventListener('change',event=>{if(event.matches){paused=true;updateToggle();syncAnimation();}});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frameRequest);frameRequest=0;canvas.hidden=true;document.querySelector('#scene-poster').hidden=false;toggle.hidden=true;});
  new ResizeObserver(()=>{resize();render(elapsed);}).observe(canvas);
  resize();updateToggle();render(elapsed);
  if(!capture) new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncAnimation();},{threshold:.03}).observe(canvas);
  schedule();
  window.researchLens={
    ready:true,
    renderer:'webgl',
    duration,
    renderAt(time){elapsed=time;pointerX=0;pointerY=0;render(time);gl.finish();},
    getState(){return {paused,phase:lastPhase,time:elapsed,renderer:'webgl'};}
  };
})();
