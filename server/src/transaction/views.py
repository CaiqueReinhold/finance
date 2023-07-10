from datetime import date

from fastapi import APIRouter, Depends

from account.dependencies import require_auth
from account.models import Session
from config import DEFAULT_PAGE_SIZE
from core.exceptions import ValidationError

from . import serializers, services

router = APIRouter(tags=["transaction"])


@router.post("/", status_code=201, response_model=serializers.Transaction)
async def create_transaction(
    *,
    session: Session = Depends(require_auth),
    transaction: serializers.TransactionCreate,
):
    transaction = await services.create_transaction(
        account=session.account, **transaction.dict()
    )
    return serializers.Transaction.from_orm(transaction)


@router.get("/", response_model=serializers.PageinatedTransaction)
async def get_transactions(
    *,
    session: Session = Depends(require_auth),
    page: int = 1,
    page_size: int = DEFAULT_PAGE_SIZE,
    inverse: bool = False,
    since: str = None,
    until: str = None,
    category_id: int = None,
    description: str = None,
):
    try:
        since = date.fromisoformat(since) if since else None
        until = date.fromisoformat(until) if until else None
    except ValueError:
        raise ValidationError("Invalid date format")

    transctions, total = await services.get_transactions(
        account=session.account,
        page=page,
        page_size=page_size,
        inverse=inverse,
        since=since,
        until=until,
        category_id=category_id,
        description=description,
    )

    return {
        "data": [serializers.Transaction.from_orm(t) for t in transctions],
        "total": total,
        "page": page,
        "size": page_size,
    }


@router.get("/{transaction_id}", response_model=serializers.Transaction)
async def get_transaction(
    *, session: Session = Depends(require_auth), transaction_id: int
):
    return serializers.Transaction.from_orm(
        await services.get_transaction(
            account=session.account, transaction_id=transaction_id
        )
    )


@router.put("/{transaction_id}", response_model=serializers.Transaction)
async def update_transaction(
    *,
    session: Session = Depends(require_auth),
    transaction_id: int,
    transaction_data: serializers.TransactionCreate,
):
    transaction = await services.get_transaction_by_id(
        account=session.account, transaction_id=transaction_id
    )
    transaction = await services.update_transaction(
        transaction=transaction, **transaction_data.dict()
    )
    return serializers.Transaction.from_orm(transaction)


@router.delete("/{transaction_id}", status_code=204)
async def delete_transaction(
    *, session: Session = Depends(require_auth), transaction_id: int
):
    transaction = await services.get_transaction_by_id(
        account=session.account, transaction_id=transaction_id
    )
    await services.delete_transaction(transaction=transaction)
