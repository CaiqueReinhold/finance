from datetime import datetime

from tortoise import fields, models

import config


class Account(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    email = fields.CharField(max_length=255, unique=True)
    password_hash = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    valid_email = fields.BooleanField(default=False)

    class Meta:
        table = "account"


class EmailValidationCode(models.Model):
    id = fields.IntField(pk=True)
    account = fields.ForeignKeyField("account.Account", on_delete=fields.CASCADE)
    created_at = fields.DatetimeField(auto_now_add=True)
    request_code = fields.CharField(max_length=255)

    class Meta:
        table = "email_validation_code"


class Session(models.Model):
    id = fields.IntField(pk=True)
    account = fields.ForeignKeyField("account.Account", on_delete=fields.CASCADE)
    created_at = fields.DatetimeField(auto_now_add=True)
    last_used = fields.DatetimeField(null=True)
    token = fields.CharField(max_length=255)
    user_agent = fields.CharField(max_length=500)
    ip = fields.CharField(max_length=255)

    class Meta:
        table = "session"

    async def touch(self):
        self.last_used = datetime.now(tz=config.TIMEZONE)
        await self.save()

    def is_expired(self):
        last_used = self.last_used or self.created_at
        return (
            last_used - datetime.now(tz=config.TIMEZONE)
        ).total_seconds() > config.SESSION_EXPIRATION_SECONDS
