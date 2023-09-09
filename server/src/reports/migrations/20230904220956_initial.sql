CREATE TABLE daily_aggregate (
    account_id INTEGER NOT NULL,
    day DATE NOT NULL,
    income DECIMAL(10, 2) NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
);

CREATE UNIQUE INDEX daily_aggregate_account_id_day ON daily_aggregate (account_id, day);

CREATE TABLE month_category_aggregate (
    account_id INTEGER NOT NULL,
    month DATE NOT NULL,
    income DECIMAL(10, 2) NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
    category_id INTEGER NOT NULL,
    category_name VARCHAR(255) NOT NULL,
);

CREATE UNIQUE INDEX month_category_aggregate_account_id_month ON month_category_aggregate (account_id, month);

CREATE TABLE month_aggregate (
    account_id INTEGER NOT NULL,
    month DATE NOT NULL,
    income DECIMAL(10, 2) NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    projected_expenses DECIMAL(10, 2) NOT NULL,
);

CREATE UNIQUE INDEX month_aggregate_account_id_month ON month_aggregate (account_id, month);
