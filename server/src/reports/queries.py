MONTH_AGG_QUERY = """
SELECT
    income, expenses, balance, projected_expenses
FROM
    month_aggregate
WHERE
    account_id = {{account_id}} AND
    month = {{month}}
"""


EXPENSES_BY_CATEGORY_QUERY = """
SELECT
    mca1.category_id, mca1.category_name, mca1.expenses, (
        SELECT expenses FROM month_category_aggregate mca2
        WHERE
            mca2.account_id = {{account_id}} AND
            mca2.month >= ({{month}} - INTERVAL '6 MONTH') AND
            mca2.category_id = mca1.category_id
        ORDER BY mca2.month ASC
        LIMIT 6
    ) AS history
FROM
    month_category_aggregate mca1
WHERE
    mca1.account_id = {{account_id}} AND
    mca1.month = {{month}}
ORDER BY mca1.expenses DESC
"""


DAILY_AGG_QUERY = """
SELECT
    day, expenses, income
FROM
    daily_aggregate
WHERE
    account_id = {{account_id}} AND
    day >= {{month}} AND
"""
