#!/usr/bin/env python3
"""Module for task_wait_n function"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawns task_wait_random n times and returns delays in ascending order"""
    delays = []

    async def collect(task):
        result = await task
        delays.append(result)

    await asyncio.gather(*[collect(task_wait_random(max_delay))
                           for _ in range(n)])

    return sorted(delays)
