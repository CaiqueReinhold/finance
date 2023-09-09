import asyncio
from datetime import date, timedelta
from typing import Any

from jinjasql import JinjaSql
from tortoise import Tortoise

from account.models import Account

from .queries import DAILY_AGG_QUERY, EXPENSES_BY_CATEGORY_QUERY, MONTH_AGG_QUERY


async def query_report_database(query: str, params: dict) -> list[dict[str, Any]]:
    query_, bind_params = JinjaSql().prepare_query(query, params)
    conn = Tortoise.get_connection("default")
    results = await conn.execute_query_dict(query_, bind_params)
    return results


async def month_aggregate_report(account: Account) -> dict[str, Any]:
    current_month = date.today().replace(day=1)
    last_month = (current_month - timedelta(days=1)).replace(day=1)

    current_month_agg, last_month_agg = await asyncio.gather(
        query_report_database(
            MONTH_AGG_QUERY, {"account_id": account.id, "month": current_month}
        ),
        query_report_database(
            MONTH_AGG_QUERY, {"account_id": account.id, "month": last_month}
        ),
    )

    current_month_agg = current_month_agg[0]
    last_month_agg = last_month_agg[0]

    return {
        "income": current_month_agg["income"],
        "expenses": current_month_agg["expenses"],
        "balance": current_month_agg["balance"],
        "projected_expenses": current_month_agg["projected_expenses"],
        "income_increase": (
            current_month_agg["income"]
            - last_month_agg["income"] / last_month_agg["income"]
        ),
        "expenses_increase": (
            current_month_agg["expenses"]
            - last_month_agg["expenses"] / last_month_agg["expenses"]
        ),
    }


async def expenses_by_category(account: Account) -> list[dict[str, Any]]:
    current_month = date.today().replace(day=1)

    expenses_by_category = await query_report_database(
        EXPENSES_BY_CATEGORY_QUERY, {"account_id": account.id, "month": current_month}
    )

    return expenses_by_category


async def expenses_by_day(account: Account) -> list[dict[str, Any]]:
    current_month = date.today().replace(day=1)

    expenses_by_day = await query_report_database(
        DAILY_AGG_QUERY, {"account_id": account.id, "month": current_month}
    )

    return expenses_by_day
