from DB import DBService

import sys
sys.path.append('../')

from auth import Auth

db_service = DBService()
auth_service = Auth()

#USER TABLOSU OLUSTURULDU
#db_service.DB_USER.create_users_table()

#USER EKLENDI (HASH PASSWORD)
#db_service.DB_USER.add_user(username="admin", password=auth_service.hash_password("admin123"), apps=["Github", "Linkedin"], role="ADMIN")


#APP CATALOG TABLE OLUSTURULUP 3 ENTRY EKLENDI
#db_service.DB_APP.create_appCatalog_table()
#db_service.DB_APP.add_app_to_catalog("Github")
#db_service.DB_APP.add_app_to_catalog("LinkedIn")
#db_service.DB_APP.add_app_to_catalog("Facebook")

print(db_service.DB_USER.find_user("admin"))


#print(db_service.DB_APP.fetch_all_apps())







