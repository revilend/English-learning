import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from config import config
from database import db
from handlers import main_router
from keep_alive import run_keep_alive

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

async def main():
    if not config.BOT_TOKEN:
        logger.error("BOT_TOKEN aniqlanmadi! Iltimos, .env faylga BOT_TOKEN ni kiriting.")
        return

    # Initialize SQLite database
    logger.info("Ma'lumotlar bazasi initsializatsiya qilinmoqda...")
    await db.init_db()

    # Initialize Bot and Dispatcher
    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher()
    dp.include_router(main_router)

    logger.info("Bot ishga tushirildi va xabarlarni kutmoqda...")
    try:
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        # Keep-alive serverni ishga tushir (Render uyquga ketmaslik uchun)
        run_keep_alive()
        
        # Botni ishga tushir
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot to'xtatildi.")
