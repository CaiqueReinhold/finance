from aipo import Aipo
from tortoise import Tortoise

import config

app = Aipo(config.AIPO_CONFIG)


@app.on_event("startup")
async def init_worker(*args, **kwargs):
    import account.tasks  # noqa

    if Tortoise._inited:
        return
    await Tortoise.init(config.DB_CONFIG)


@app.on_event("shutdown")
async def shutdown_worker(*args, **kwargs):
    await Tortoise.close_connections()
