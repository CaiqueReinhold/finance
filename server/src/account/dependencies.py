from fastapi import Request

import config

from .exceptions import AuthRequiredError
from .models import Session


async def get_session(*, request: Request) -> Session | None:
    session_id = request.cookies.get(config.SESSION_COOKIE_NAME, None)
    if session_id is None:
        return None
    session = await Session.get_or_none(token=session_id).select_related("account")
    if session is not None and session.is_expired():
        await session.delete()
        session = None
    return session


async def require_auth(*, request: Request) -> Session:
    session = await get_session(request=request)
    if session is None:
        raise AuthRequiredError()
    await session.touch()
    return session
