from typing import List

from fastapi import HTTPException

from account.models import Account
from core.exceptions import ValidationError

from .models import Category

DEFAULT_CATEGORIES = [
    ("Food", "#ff0000"),
    ("Transport", "#00ff00"),
    ("Entertainment", "#0000ff"),
    ("Health", "#ffff00"),
    ("Shopping", "#00ffff"),
    ("Other", "#ff00ff"),
]


async def create_category(*, name: str, color: str, account: Account) -> Category:
    if name is None or name == "":
        raise ValidationError(detail="Name is required")

    category = await Category.create(name=name, color=color, account=account)
    return category


async def update_category(
    *, category: Category, name: str = None, color: str = None
) -> Category:
    if name is not None and name != "":
        category.name = name
    if color is not None:
        category.color = color
    await category.save()
    return category


async def delete_category(*, category: Category) -> None:
    await category.delete()


async def get_categories(*, account: Account) -> List[Category]:
    categories = await Category.filter(account=account).all()
    return categories


async def get_category(*, account: Account, category_id: int) -> Category:
    category = await Category.get_or_none(account=account, id=category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


async def create_default_categories(*, account: Account) -> None:
    for name, color in DEFAULT_CATEGORIES:
        await Category.create(name=name, color=color, account=account)
