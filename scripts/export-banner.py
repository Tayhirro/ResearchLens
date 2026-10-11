"""Export the live WebGL hero to a looping GIF using an existing browser and ffmpeg.

Run: python scripts/export-banner.py
Requires installed Python Playwright, Pillow, Microsoft Edge, and ffmpeg.
No browser profile, external font, or network service is used during export.
"""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from io import BytesIO
import argparse
import base64
import json
import shutil
import subprocess

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fps', type=int, default=12)
    args = parser.parse_args()
    if not 6 <= args.fps <= 30:
        parser.error('--fps must be between 6 and 30')
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise SystemExit('ffmpeg must already be installed and available on PATH')
    frames = ROOT / 'outputs' / 'banner-frames'
    frames.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/docs/?capture=1'
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(channel='msedge', headless=True, args=['--enable-unsafe-swiftshader'])
            try:
                page = browser.new_page(viewport={'width':1280,'height':560}, device_scale_factor=1)
                errors = []
                page.on('pageerror', lambda error: errors.append(str(error)))
                page.goto(url, wait_until='networkidle')
                page.wait_for_function('window.researchLens?.ready')
                if page.evaluate('window.researchLens.renderer') != 'webgl':
                    raise RuntimeError('WebGL did not initialize; refusing to export an empty scene')
                duration = page.evaluate('window.researchLens.duration')
                page.evaluate('window.researchLens.renderAt(3.5)')
                page.screenshot(path=str(ROOT/'assets'/'hero-poster.png'))
                scene = page.evaluate("document.querySelector('canvas').toDataURL('image/png').split(',')[1]")
                Image.open(BytesIO(base64.b64decode(scene))).crop((570,50,1280,435)).save(ROOT/'docs'/'lens-poster.png', optimize=True)
                frame_count = round(duration * args.fps)
                for index in range(frame_count):
                    page.evaluate('(t)=>window.researchLens.renderAt(t)', index / args.fps)
                    page.screenshot(path=str(frames/f'frame{index:04}.png'))
                    if index % (args.fps*2) == 0:
                        print(f'Rendered {index}/{frame_count} frames', flush=True)
                if errors:
                    raise RuntimeError('Browser errors: ' + '; '.join(errors))
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
    target = ROOT / 'assets' / 'banner.gif'
    command = [ffmpeg,'-hide_banner','-loglevel','error','-y','-framerate',str(args.fps),
               '-i',str(frames/'frame%04d.png'),'-frames:v',str(frame_count),
               '-filter_complex','[0:v]split[a][b];[a]palettegen=stats_mode=diff:max_colors=256[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle',
               '-loop','0',str(target)]
    subprocess.run(command, check=True)
    with Image.open(target) as gif:
        total = 0
        for index in range(gif.n_frames):
            gif.seek(index)
            total += gif.info.get('duration', 0)
        manifest = {'file':'assets/banner.gif','size':list(gif.size),'frames':gif.n_frames,
                    'duration_ms':total,'loop':gif.info.get('loop'),'bytes':target.stat().st_size,
                    'renderer':'docs/research-lens.js (WebGL)','fps':args.fps}
    (ROOT/'outputs'/'banner-manifest.json').write_text(json.dumps(manifest,indent=2), encoding='utf-8')
    print(json.dumps(manifest), flush=True)

if __name__ == '__main__':
    main()
