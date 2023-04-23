from database.DB import *


DB_SERVICE = DBService()

def display_myapps(username):
    
    user_app_list = DB_SERVICE.get_user_apps()
    return user_app_list
    