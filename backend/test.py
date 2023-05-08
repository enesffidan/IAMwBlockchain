from auth import Auth
#from login import Login
from database.DB import DBService






db_service = DBService()




auth_service = Auth()


#db_service.DB_3RD.create_table()

#db_service.DB_USER.delete_user("enes")

#USER TABLOSU OLUSTURULDU
#db_service.DB_USER.create_users_table()

#USER EKLENDI (HASH PASSWORD)
#db_service.DB_USER.add_user(username="admin", password=auth_service.hash_password("admin123"), apps=["Github", "Linkedin"], role="ADMIN")
#db_service.DB_USER.add_user(username="enes", password=auth_service.hash_password("123"), apps=["Github", "Linkedin"], role="USER")
# db_service.DB_USER.add_user(username="onur1", password=auth_service.hash_password("123"), apps=[], role="USER")
db_service.DB_USER.delete_user('aliveli')

#APP CATALOG TABLE OLUSTURULUP 3 ENTRY EKLENDI
#db_service.DB_APP.create_appCatalog_table()
#db_service.DB_APP.add_app_to_catalog("Github")
#db_service.DB_APP.add_app_to_catalog("Linkedin")
#db_service.DB_APP.add_app_to_catalog("Facebook")


#print(type(db_service.DB_USER.get_user_apps("enes")))

#print(db_service.DB_USER.find_user("enes"))




