#!/usr/bin/env python3
"""
Task 11: List schools by specific topic in Python using pymongo
"""
def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of schools having a specific topic.
    """
    return list(mongo_collection.find({"topics": topic}))
