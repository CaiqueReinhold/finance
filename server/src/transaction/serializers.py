from pydantic import BaseModel


class Transaction(BaseModel):
    id: int
    name: str
    amount: float
    date: str
    category_id: int

    class Config:
        orm_mode = True


class TransactionCreate(BaseModel):
    name: str
    amount: float
    date: str
    category_id: int


class PageinatedTransaction(BaseModel):
    data: list[Transaction]
    total: int
    page: int
    size: int
