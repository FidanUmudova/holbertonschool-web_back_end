#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination module.
"""
import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes the server instance and sets dataset structures to None.
        """
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset retrieval method.

        Returns:
            List[List]: The loaded dataset rows, excluding the header.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0.

        Returns:
            Dict[int, List]: A dictionary mapping position index to data rows.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(
        self, index: int = None, page_size: int = 10
    ) -> Dict[str, Any]:
        """
        Retrieves a page of data from a given index resilient to deletions.

        Args:
            index (int): The starting absolute index of the page.
            page_size (int): The target item amount per page.

        Returns:
            Dict[str, Any]: A dictionary containing index, next_index,
            page_size, and the data list.
        """
        indexed_data = self.indexed_dataset()
        if index is None:
            index = 0

        # Validate index boundaries against the initial loaded scope
        assert isinstance(index, int) and 0 <= index < len(indexed_data)
        assert isinstance(page_size, int) and page_size > 0

        data = []
        current_index = index

        # Find page_size elements, skipping deleted index slots along the way
        while len(data) < page_size and current_index < len(indexed_data):
            item = indexed_data.get(current_index)
            if item is not None:
                data.append(item)
            current_index += 1

        next_index = current_index if current_index < len(indexed_data) else None

        return {
            "index": index,
            "data": data,
            "page_size": page_size,
            "next_index": next_index
        }
