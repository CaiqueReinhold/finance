from datetime import date
from decimal import Decimal
from typing import List, Tuple

from fastapi import HTTPException

from account.models import Account
from category.models import Category
from config import DEFAULT_PAGE_SIZE

from .models import Transaction


async def create_transaction(
    account: Account,
    description: str,
    amount: Decimal,
    date: date,
    type: str,
    category: Category,
) -> Transaction:
    transaction = await Transaction.create(
        account=account,
        description=description,
        amount=amount,
        date=date,
        type=type,
        category=category,
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
    description: str = None,
) -> Tuple[List[Transaction], int]:
    transactions = Transaction.filter(account=account)

    if since:
        transactions = transactions.filter(date__gte=since)
    if until:
        transactions = transactions.filter(date__lte=until)
    if category_id:
        transactions = transactions.filter(category_id=category_id)
    if description:
        transactions = transactions.filter(description__icontains=description)

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
    category: Category = None,
) -> Transaction:
    if description:
        transaction.description = description

    if amount:
        transaction.amount = amount

    if date:
        transaction.date = date

    if type:
        transaction.type = type

    if category:
        transaction.category = category

    await transaction.save()
    return transaction


async def delete_transaction(transaction: Transaction) -> None:
    await transaction.delete()
