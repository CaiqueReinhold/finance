from datetime import date

from pydantic import BaseModel


class Transaction(BaseModel):
    id: int
    description: str
    amount: float
    date: date
    category_id: int

    class Config:
        orm_mode = True


class TransactionCreate(BaseModel):
    description: str
    amount: float
    date: str
    category_id: int
    type: str = "expense"


class PageinatedTransaction(BaseModel):
    data: list[Transaction]
    total: int
    page: int
    size: int
