import asyncio
from typing import Any, Awaitable, Callable


async def run_async(func: Callable, *args: Any) -> Any:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, func, *args)


def run_sync(func: Awaitable) -> Any:
    loop = asyncio.get_event_loop()
    ret = loop.run_in_executor(None, func)
    return ret
