from typing import List

from fastapi import APIRouter, Depends

from account.dependencies import require_auth
from account.models import Session

from . import serializers, services

router = APIRouter(tags=["category"])


@router.get("/", response_model=List[serializers.Category])
async def get_categories(*, session: Session = Depends(require_auth)):
    return [
        serializers.Category.from_orm(category)
        for category in await services.get_categories(account=session.account)
    ]


@router.post("/", status_code=201, response_model=serializers.Category)
async def create_category(
    *, session: Session = Depends(require_auth), category: serializers.CategoryCreate
):
    return serializers.Category.from_orm(
        await services.create_category(account=session.account, **category.dict())
    )


@router.put("/{category_id}", response_model=serializers.Category)
async def update_category(
    *,
    session: Session = Depends(require_auth),
    category_id: int,
    category: serializers.CategoryCreate
):
    category = await services.get_category(
        account=session.account, category_id=category_id
    )
    category = await services.update_category(category=category, **category.dict())
    return serializers.Category.from_orm(category)


@router.delete("/{category_id}", status_code=204)
async def delete_category(
    *, session: Session = Depends(require_auth), category_id: int
):
    category = await services.get_category(
        account=session.account, category_id=category_id
    )
    await services.delete_category(category=category)
    return None
