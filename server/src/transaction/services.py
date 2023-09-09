from datetime import date
from decimal import Decimal
from typing import List, Tuple

from fastapi import HTTPException
from tortoise.expressions import Q

from account.models import Account
from category.services import get_category
from config import DEFAULT_PAGE_SIZE

from .models import Transaction


async def create_transaction(
    account: Account,
    description: str,
    amount: Decimal,
    date: date,
    type: str,
    category_id: int,
) -> Transaction:
    transaction = await Transaction.create(
        account=account,
        description=description,
        amount=amount,
        date=date,
        type=type,
        category=await get_category(account=account, category_id=category_id),
    )
    return transaction


async def get_transactions(
    account: Account,
    page: int = 1,
    page_size: int = DEFAULT_PAGE_SIZE,
    inverse: bool = False,
    since: date = None,
    until: date = None,
    category_id: int = None,
    q: str = None,
) -> Tuple[List[Transaction], int]:
    transactions = Transaction.filter(account=account)

    if since:
        transactions = transactions.filter(date__gte=since)
    if until:
        transactions = transactions.filter(date__lte=until)
    if category_id:
        transactions = transactions.filter(category_id=category_id)
    if q and (q.startswith(">") or q.startswith("<")):
        amt = float(q[1:])
        transactions = (
            transactions.filter(amount__gte=amt)
            if q.startswith(">")
            else transactions.filter(amount__lte=amt)
        )
    elif q:
        transactions = transactions.filter(
            Q(description__icontains=q) | Q(category__name__icontains=q)
        )

    total = await transactions.count()

    if inverse:
        transactions = transactions.order_by("date")
    else:
        transactions = transactions.order_by("-date")

    transactions = await transactions.offset((page - 1) * page_size).limit(page_size)

    return transactions, total


async def get_transaction_by_id(account: Account, transaction_id: int) -> Transaction:
    transaction = await Transaction.get_or_none(account=account, id=transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return transaction


async def update_transaction(
    transaction: Transaction,
    description: str = None,
    amount: Decimal = None,
    date: date = None,
    type: str = None,
    category_id: int = None,
) -> Transaction:
    if description:
        transaction.description = description

    if amount:
        transaction.amount = amount

    if date:
        transaction.date = date

    if type:
        transaction.type = type

    if category_id:
        transaction.category = await get_category(
            account=await transaction.account, category_id=category_id
        )

    await transaction.save()
    return transaction


async def delete_transaction(transaction: Transaction) -> None:
    await transaction.delete()
