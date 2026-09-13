from aiogram import Router
from .start import router as start_router
from .lessons import router as lessons_router
from .skills import router as skills_router

main_router = Router()
main_router.include_routers(start_router, lessons_router, skills_router)
