import uuid
from datetime import datetime
from typing import Tuple

import config
from account import error_codes
from core.exceptions import ValidationError

from . import tasks, validators
from .exceptions import InvalidCredentials
from .models import Account, EmailValidationCode, Session
from .password_hasher import PBKDF2Hasher


async def send_email_validation_code(*, account: Account) -> None:
    email_code = await EmailValidationCode.create(
        account=account, request_code=uuid.uuid4().hex
    )
    await tasks.send_email_validation_code(email_code.id)


async def create_account(*, name: str, email: str, password: str) -> Account:
    try:
        name = validators.validate_name(name)
        email = validators.validate_email(email)
        password = validators.validate_password(password)
    except AssertionError as e:
        raise ValidationError(detail=str(e))

    email_in_use = await Account.filter(email=email).exists()
    if email_in_use:
        raise ValidationError(
            detail="Email already in use", error_code=error_codes.EMAIL_IN_USE
        )

    hasher = PBKDF2Hasher()
    account = await Account.create(
        name=name,
        email=email,
        password=password,
        password_hash=hasher.hash_password(password),
    )
    await send_email_validation_code(account=account)
    return account


async def create_session(*, account: Account, user_agent: str, ip: str) -> Session:
    session = await Session.create(
        account_id=account.id, token=str(uuid.uuid4()), user_agent=user_agent, ip=ip
    )
    return session


async def login(
    *, email: str, password: str, user_agent: str, ip: str
) -> Tuple[Session, Account]:
    try:
        email = validators.validate_email(email)
    except AssertionError as e:
        raise ValidationError(detail=str(e))
    account = await Account.get_or_none(email=email)
    if account is None:
        raise InvalidCredentials(detail="Invalid email or password")
    if not account.valid_email:
        raise ValidationError(
            detail="Account email is not valid",
            error_code=error_codes.INVALID_ACCOUNT_EMAIL,
        )
    hasher = PBKDF2Hasher()
    if not hasher.verify(password, account.password_hash):
        raise InvalidCredentials(detail="Invalid email or password")
    session = await create_session(account=account, user_agent=user_agent, ip=ip)
    return session, account


async def validate_account(
    *, token: str, user_agent: str, ip: str
) -> Tuple[Session, Account]:
    email_code = await EmailValidationCode.get_or_none(request_code=token)
    if email_code is None:
        raise ValidationError(
            detail="Invalid request code", error_code=error_codes.INVALID_REQUEST_CODE
        )
    if (
        email_code.created_at - datetime.now(email_code.created_at.tzinfo)
    ).total_seconds() > config.REQUEST_TOKEN_EXPIRATION_SECONDS:
        raise ValidationError(
            detail="Request code expired", error_code=error_codes.REQUEST_CODE_EXPIRED
        )

    account = await Account.get_or_none(id=email_code.account_id)
    account.valid_email = True
    await account.save()
    session = await create_session(
        account=account,
        user_agent=user_agent,
        ip=ip,
    )
    return session, account


async def reset_password(*, account: Account, password: str) -> None:
    try:
        password = validators.validate_password(password)
    except AssertionError as e:
        raise ValidationError(detail=str(e))
    hasher = PBKDF2Hasher()
    account.password_hash = hasher.hash_password(password)
    await account.save()
