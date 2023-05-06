import sqlite3
import json

from db_app import DB_APP
from db_user import DB_USER


class DBService():

    DB_USER = DB_USER()
    DB_APP = DB_APP()
    
    def __init__(self):
        pass


