from pydantic import BaseModel


class Category(BaseModel):
    id: int
    name: str
    color: str

    class Config:
        orm_mode = True


class CategoryCreate(BaseModel):
    name: str
    color: str
