import pytz
from starlette.config import Config

config = Config()

APP_SECRET = config("APP_SECRET", default="secret")

APPS = ["account", "transaction", "category"]

DB_CONFIG = {
    "connections": {
        "default": {
            "engine": "tortoise.backends.asyncpg",
            "credentials": {
                "host": config("DB_HOST", default="postgres"),
                "port": config("DB_PORT", default=5432),
                "user": config("DB_USER", default="postgres"),
                "password": config("DB_PASSWORD", default="postgres"),
                "database": config("DB_NAME", default="finance"),
            },
        },
    },
    "apps": {app: {"models": [f"{app}.models"]} for app in APPS},
    "use_tz": True,
    "timezone": "UTC",
}

if config("RUN_MIGRATIONS", default=False, cast=bool):
    DB_CONFIG["apps"].update(
        {
            "aerich": {
                "models": ["aerich.models"],
                "default_connection": "default",
            },
        }
    )

SMTP_HOST = config("SMTP_HOST", default="mail")
SMTP_PORT = config("SMTP_PORT", default=1025, cast=int)

AIPO_CONFIG = {
    "broker_url": config("BROKER_URL", default="redis://redis:6379/0"),
}

# account settings
SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 2
SESSION_COOKIE_NAME = "session_id"
REQUEST_TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24

DEFAULT_PAGE_SIZE = 50

TIMEZONE = pytz.timezone("UTC")
