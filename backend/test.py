from auth import Auth
from login import Login
from database.DB import *


db_service = DBService()




login_service = Login()
auth_service = Auth()
#USER TABLOSU OLUSTURULDU
#db_service.DB_USER.create_users_table()

#USER EKLENDI (HASH PASSWORD)
#db_service.DB_USER.add_user(username="admin", password=auth_service.hash_password("admin123"), apps=["Github", "Linkedin"], role="ADMIN")
#db_service.DB_USER.add_user(username="enes", password=auth_service.hash_password("123"), apps=["Github", "Linkedin"], role="USER")


#APP CATALOG TABLE OLUSTURULUP 3 ENTRY EKLENDI
#db_service.DB_APP.create_appCatalog_table()
#db_service.DB_APP.add_app_to_catalog("Github")
#db_service.DB_APP.add_app_to_catalog("LinkedIn")
#db_service.DB_APP.add_app_to_catalog("Facebook")

#print(db_service.DB_USER.find_user("enes"))


