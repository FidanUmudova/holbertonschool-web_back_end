#!/usr/bin/env python3
"""Module for to_kv function"""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns a tuple of a string and the square of an int/float"""
    return (k, float(v ** 2))
