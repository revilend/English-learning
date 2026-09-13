"""
Keep-Alive server — Render.com bepul rejaning uyquga ketmasini ta'minlaydi.
HTTP serverni alohida thread'da ishga tushiradi.
"""
import logging
import threading
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

logger = logging.getLogger(__name__)

# Server port (Render PORT env var bilan almashtiriladi)
import os
PORT = int(os.getenv("PORT", "8080"))

# Self-ping interval (seconds)
PING_INTERVAL = 300  # 5 minutes


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
        elif self.path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            html = """<!DOCTYPE html>
<html><head><title>English Zero-to-Hero Bot</title></head>
<body style="font-family: Inter, sans-serif; background: #0f172a; color: #f8fafc;
             display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
    <div style="text-align: center; padding: 40px;">
        <h1 style="font-size: 2.5rem;">🇺🇸 English Zero-to-Hero Bot</h1>
        <p style="font-size: 1.25rem; color: #94a3b8;">Telegram bot ishlayapti! 🤖</p>
        <p style="color: #94a3b8; margin-top: 20px;">Keep-alive server faol ✅</p>
    </div>
</body></html>"""
            self.wfile.write(html.encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress request logs


def start_server():
    """HTTP serverni alohida thread'da ishga tushiradi."""
    try:
        server = HTTPServer(("0.0.0.0", PORT), HealthHandler)
        logger.info(f"🌐 Keep-alive server ishga tushdi (port: {PORT})")
        server.serve_forever()
    except Exception as e:
        logger.error(f"Keep-alive server xatosi: {e}")


def self_ping():
    """Service o'zini ping qiladi — uyquga ketmaslik uchun."""
    import urllib.request
    import urllib.error

    time.sleep(5)  # Server tayyor bo'lguncha kutish
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
    # HTTP server (alohida thread)
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Self-ping (alohida thread)
    ping_thread = threading.Thread(target=self_ping, daemon=True)
    ping_thread.start()
    logger.info(f"🏓 Self-ping boshlandi (har {PING_INTERVAL} soniyada)")
