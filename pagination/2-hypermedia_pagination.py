#!/usr/bin/env python3
"""
This module provides hypermedia pagination support for the baby names database.
"""
import csv
import math
from typing import List, Tuple, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate the start and end indexes for a specific page and page size.

    Args:
        page (int): The 1-indexed page number.
        page_size (int): The total number of items per page.

    Returns:
        Tuple[int, int]: A tuple containing the start and end indexes.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes the server instance and sets the dataset cache to None.
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset retrieval method.

        Returns:
            List[List]: The loaded dataset containing lists of row elements,
            excluding the header row.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Finds and returns the appropriate page of rows from the dataset.

        Args:
            page (int): The 1-indexed page number. Must be an integer > 0.
            page_size (int): The number of rows per page. Must be > 0.

        Returns:
            List[List]: A list of rows representing the page. Returns an
            empty list if the calculated indexes are out of dataset bounds.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start, end = index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []

        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Returns a dictionary containing pagination metadata alongside the data.

        Args:
            page (int): The current page number. Defaults to 1.
            page_size (int): The number of data items per page. Defaults to 10.

        Returns:
            Dict[str, Any]: A structural summary containing keys for page size,
            current page, data list, next page, prev page, and total pages.
        """
        page_data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(page_data),
            "page": page,
            "data": page_data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
