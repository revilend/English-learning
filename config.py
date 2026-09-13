import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass
class Config:
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DATABASE_PATH: str = os.getenv("DATABASE_PATH", "data/bot_database.sqlite3")
    ADMIN_ID: int = int(os.getenv("ADMIN_ID", "0"))

config = Config()

if not config.BOT_TOKEN:
    print("OGOHLANTIRISH: BOT_TOKEN o'rnatilmagan! .env faylni tekshiring.")
