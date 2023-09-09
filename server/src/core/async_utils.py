import asyncio
from typing import Any, Awaitable, Callable


async def read_contents_async(path: str) -> str:
    loop = asyncio.get_event_loop()

    def read():
        with open(path, "r") as f:
            return f.read()

    return await loop.run_in_executor(None, read)


async def run_async(func: Callable, *args: Any) -> Any:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, func, *args)


def run_sync(func: Awaitable) -> Any:
    loop = asyncio.get_event_loop()
    ret = loop.run_in_executor(None, func)
    return ret
