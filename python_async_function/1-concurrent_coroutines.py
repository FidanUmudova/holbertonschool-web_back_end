#!/usr/bin/env python3
"""Module for executing multiple coroutines concurrently"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawns wait_random n times and returns delays in ascending order"""
    delays = []

    async def collect(delay):
        result = await wait_random(delay)
        delays.append(result)

    await asyncio.gather(*[collect(max_delay) for _ in range(n)])

    return sorted(delays)
