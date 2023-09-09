from fastapi import APIRouter, Depends

from account.dependencies import require_auth
from account.models import Session

from . import serializers, services

router = APIRouter(tags=["transaction"])


@router.get("/month-aggregate/")
async def current_month_aggrate(
    *,
    session: Session = Depends(require_auth),
):
    agg = await services.month_aggregate_report(account=session.account)
    return serializers.MonthAggregate(**agg)


@router.get("/expenses-by-category/")
async def expenses_by_category(
    *,
    session: Session = Depends(require_auth),
):
    cat_expenses = await services.expenses_by_category(account=session.account)
    return [serializers.ExpensesByCategory(**exp) for exp in cat_expenses]


@router.get("/expenses-by-day/")
async def expenses_by_day(
    *,
    session: Session = Depends(require_auth),
):
    daily_expenses = await services.expenses_by_day(account=session.account)
    return [serializers.ExpensesByDay(**exp) for exp in daily_expenses]
