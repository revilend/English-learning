"""
Keep-Alive server — Render.com bepul rejaning uyquga ketmasini ta'minlaydi.
Har 5 daqiqada o'zini ping qiladi.
"""
import asyncio
import logging
import threading
import time
from aiohttp import web

logger = logging.getLogger(__name__)

# Server port (Render PORT env var bilan almashtiriladi)
import os
PORT = int(os.getenv("KEEP_ALIVE_PORT", "8080"))

# Self-ping interval (seconds)
PING_INTERVAL = 300  # 5 minutes


async def health_handler(request):
    """Health check endpoint — Render va UptimeRobot uchun."""
    return web.json_response({
        "status": "alive",
        "service": "English Zero-to-Hero Bot",
        "message": "Bot ishlayapti! 🤖"
    })


async def root_handler(request):
    """Asosiy sahifa."""
    return web.Response(
        text="""
        <html>
        <head><title>English Zero-to-Hero Bot</title></head>
        <body style="font-family: Inter, sans-serif; background: #0f172a; color: #f8fafc; 
                     display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
            <div style="text-align: center; padding: 40px;">
                <h1 style="font-size: 2.5rem;">🇺🇸 English Zero-to-Hero Bot</h1>
                <p style="font-size: 1.25rem; color: #94a3b8;">Telegram bot ishlayapti! 🤖</p>
                <a href="https://t.me/" 
                   style="display: inline-block; margin-top: 20px; padding: 12px 24px; 
                          background: linear-gradient(135deg, #2563eb, #7c3aed); 
                          color: white; text-decoration: none; border-radius: 12px; 
                          font-weight: 600;">
                   🚀 Botni ochish
                </a>
                <div style="margin-top: 40px; padding: 20px; background: #1e293b; border-radius: 12px;">
                    <p style="color: #94a3b8; margin: 0;">Keep-alive server faol ✅</p>
                    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 0.875rem;">
                        Har 5 daqiqada avtomatik ping
                    </p>
                </div>
            </div>
        </body>
        </html>
        """,
        content_type="text/html"
    )


def start_server():
    """HTTP serverni alohida thread'da ishga tushiradi."""
    app = web.Application()
    app.router.add_get("/", root_handler)
    app.router.add_get("/health", health_handler)
    app.router.add_get("/healthz", health_handler)
    app.router.add_get("/ping", health_handler)
    
    try:
        web.run_app(app, host="0.0.0.0", port=PORT, print=None)
    except Exception as e:
        logger.error(f"Keep-alive server xatosi: {e}")


def self_ping():
    """Service o'zini ping qiladi — uyquga ketmaslik uchun."""
    import aiohttp as aio
    
    while True:
        time.sleep(PING_INTERVAL)
        try:
            # Localhost bo'lsa ham ping qiladi
            url = f"http://localhost:{PORT}/health"
            with aio.ClientSession() as session:
                with session.get(url, timeout=aio.ClientTimeout(total=10)) as resp:
                    if resp.status == 200:
                        logger.info("✅ Self-ping muvaffaqiyatli")
                    else:
                        logger.warning(f"⚠️ Self-ping status: {resp.status}")
        except Exception as e:
            logger.warning(f"⚠️ Self-ping xatosi: {e}")


def run_keep_alive():
    """Keep-alive serverni ishga tushiradi."""
    # HTTP server (alohida thread)
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    logger.info(f"🌐 Keep-alive server ishga tushdi (port: {PORT})")
    
    # Self-ping (alohida thread)
    ping_thread = threading.Thread(target=self_ping, daemon=True)
    ping_thread.start()
    logger.info(f"🏓 Self-ping boshlandi (har {PING_INTERVAL} soniyada)")
