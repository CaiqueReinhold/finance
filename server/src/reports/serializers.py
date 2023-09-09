from decimal import Decimal

from pydantic import BaseModel

from .services import ReportType


class ReportParams(BaseModel):
    report_type: ReportType
    params: dict


class MonthAggregate(BaseModel):
    income: Decimal
    expenses: Decimal
    balance: Decimal
    projected_expenses: Decimal
    income_increase: Decimal
    expenses_increase: Decimal


class ExpensesByCategory(BaseModel):
    category_name: str
    category_id: int
    expenses: Decimal
    history: list[Decimal]


class ExpensesByDay(BaseModel):
    day: str
    expenses: Decimal
    income: Decimal
