from datetime import datetime

from pydantic import BaseModel


class CreateAccountRequest(BaseModel):
    name: str
    email: str
    password: str


class Account(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ResetPasswordRequest(BaseModel):
    new_password: str


class LoginRequest(BaseModel):
    email: str
    password: str
