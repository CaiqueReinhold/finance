from pydantic import BaseModel


class ErrorResponse(BaseModel):
    error_code: str | None
    detail: str
