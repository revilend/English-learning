"""
Keep-Alive server — Render.com bepul rejaning uyquga ketmasini ta'minlaydi.
Landing page saytni va health check endpoint'ni taqdim etadi.
"""
import logging
import threading
import time
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

logger = logging.getLogger(__name__)

PORT = int(os.getenv("PORT", "8080"))
PING_INTERVAL = 300  # 5 minutes

# Landing page HTML'ni yuklash
WEBSITE_PATH = os.path.join(os.path.dirname(__file__), "website", "index.html")
landing_html = None


def load_landing_page():
    global landing_html
    try:
        with open(WEBSITE_PATH, "r", encoding="utf-8") as f:
            landing_html = f.read()
        logger.info("🌐 Landing page yuklandi")
    except Exception as e:
        logger.warning(f"Landing page yuklanmadi: {e}")
        landing_html = """<!DOCTYPE html>
<html><head><title>English Zero-to-Hero Bot</title></head>
<body style="font-family: Inter, sans-serif; background: #0f172a; color: #f8fafc;
             display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
    <div style="text-align: center; padding: 40px;">
        <h1 style="font-size: 2.5rem;">🇺🇸 English Zero-to-Hero Bot</h1>
        <p style="font-size: 1.25rem; color: #94a3b8;">Telegram bot ishlayapti! 🤖</p>
    </div>
</body></html>"""


class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in ("/health", "/healthz", "/ping"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            data = json.dumps({
                "status": "alive",
                "service": "English Zero-to-Hero Bot",
                "message": "Bot ishlayapti! 🤖"
            })
            self.wfile.write(data.encode())
        elif self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            if landing_html:
                self.wfile.write(landing_html.encode("utf-8"))
            else:
                self.wfile.write(b"Bot ishlayapti!")
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress request logs


def start_server():
    """HTTP serverni alohida thread'da ishga tushiradi."""
    try:
        load_landing_page()
        server = HTTPServer(("0.0.0.0", PORT), HealthHandler)
        logger.info(f"🌐 Keep-alive server ishga tushdi (port: {PORT})")
        server.serve_forever()
    except Exception as e:
        logger.error(f"Keep-alive server xatosi: {e}")


def self_ping():
    """Service o'zini ping qiladi — uyquga ketmaslik uchun."""
    import urllib.request
    import urllib.error

    time.sleep(5)
    while True:
        time.sleep(PING_INTERVAL)
        try:
            url = f"http://localhost:{PORT}/health"
            req = urllib.request.urlopen(url, timeout=10)
            if req.status == 200:
                logger.info("✅ Self-ping muvaffaqiyatli")
            else:
                logger.warning(f"⚠️ Self-ping status: {req.status}")
        except Exception as e:
            logger.warning(f"⚠️ Self-ping xatosi: {e}")


def run_keep_alive():
    """Keep-alive serverni ishga tushiradi."""
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    ping_thread = threading.Thread(target=self_ping, daemon=True)
    ping_thread.start()
    logger.info(f"🏓 Self-ping boshlandi (har {PING_INTERVAL} soniyada)")
