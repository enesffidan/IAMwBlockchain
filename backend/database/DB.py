from database.db_user import DB_USER
from database.db_app import DB_APP
from database.db_3rd import DB_3RD
from database.db_notifications import DB_NOTIFICATION
from database.db_contract import DB_CONTRACT
from database.db_key import DB_KEY


class DBService():

    DB_USER = DB_USER()
    DB_APP = DB_APP()
    DB_3RD = DB_3RD()
    DB_NOTIFCIATIONS = DB_NOTIFICATION()
    DB_CONTRACT = DB_CONTRACT()
    DB_KEY = DB_KEY()
    

    def __init__(self):
        pass


