import os
import tempfile
from gtts import gTTS

async def generate_speech(text: str, lang: str = 'en') -> str:
    """
    Matnni inglizcha audio faylga aylantiradi va vaqtinchalik fayl yo'lini qaytaradi.
    """
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(tmp_file.name)
    return tmp_file.name
