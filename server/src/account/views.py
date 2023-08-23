from fastapi import APIRouter, Depends, Request, Response
from fastapi.responses import JSONResponse
from tortoise.transactions import atomic

import config
from core.serializers import ErrorResponse

from . import exceptions, serializers, services
from .dependencies import require_auth
from .models import Session

router = APIRouter(tags=["account"])


async def set_session_cookie(response: Response, session_id: str):
    response.set_cookie(
        config.SESSION_COOKIE_NAME,
        session_id,
        max_age=config.SESSION_EXPIRATION_SECONDS,
        httponly=True,
        secure=True,
    )


@router.post("/", status_code=201)
@atomic()
async def create_account(account: serializers.CreateAccountRequest):
    return serializers.Account.from_orm(await services.create_account(**account.dict()))


@router.post("/validate/", response_model=serializers.Account)
@atomic()
async def validate_account(*, request: Request, response: Response, token: str):
    session, account = await services.validate_account(
        token=token,
        user_agent=request.headers.get("User-Agent"),
        ip=request.client.host,
    )
    await set_session_cookie(response, session.token)
    return serializers.Account.from_orm(account)


@router.post("/reset-password/", status_code=204)
@atomic()
async def reset_password(
    *, body: serializers.ResetPasswordRequest, session: Session = Depends(require_auth)
):
    await services.reset_password(account=session.account, password=body.new_password)
    return None


@router.post(
    "/login/",
    response_model=serializers.Account,
    responses={
        401: {"model": ErrorResponse},
        400: {"model": ErrorResponse},
    },
)
@atomic()
async def login(
    request: Request, response: Response, login_request: serializers.LoginRequest
):
    try:
        session, account = await services.login(
            email=login_request.email,
            password=login_request.password,
            user_agent=request.headers.get("user-agent", ""),
            ip=request.client.host,
        )
    except exceptions.InvalidCredentials:
        return JSONResponse(
            status_code=401,
            content=ErrorResponse(detail="Invalid email or password").dict(),
        )

    await set_session_cookie(response, session.token)
    return serializers.Account.from_orm(account)


@router.post("/logout/", status_code=204)
@atomic()
async def logout(*, response: Response, session: Session = Depends(require_auth)):
    response.delete_cookie(config.SESSION_COOKIE_NAME)
    await session.delete()
    return None


@router.get("/me/", response_model=serializers.Account)
@atomic()
async def get_account(*, session: Session = Depends(require_auth)):
    return serializers.Account.from_orm(session.account)
