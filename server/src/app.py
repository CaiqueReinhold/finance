from importlib import import_module

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from tortoise import Tortoise

import config
from account.exceptions import AuthRequiredError
from core.exceptions import ValidationError
from core.serializers import ErrorResponse

app = FastAPI()


@app.on_event("startup")
async def startup():
    await Tortoise.init(config.DB_CONFIG)


@app.on_event("shutdown")
async def shutdown():
    await Tortoise.close_connections()


@app.exception_handler(ValidationError)
async def handle_validation_error(_, exc):
    return JSONResponse(
        status_code=400,
        content=ErrorResponse(error_code=exc.error_code, detail=exc.detail).dict(),
    )


@app.exception_handler(AuthRequiredError)
async def handle_auth_required_error(_, exc):
    response = JSONResponse(
        status_code=401,
        content=ErrorResponse(detail="Authentication required").dict(),
    )
    response.delete_cookie(config.SESSION_COOKIE_NAME)
    return response


for web_app in config.APPS:
    views = import_module(f"{web_app}.views")
    app.include_router(views.router, prefix=f"/api/{web_app}")
