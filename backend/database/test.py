from DB import DBService


db_service = DBService()

#db_service.create_users_table()
#db_service.add_user("enes", "123", "Github", "User")
#db_service.add_user("admin", "admin", "Github, Facebook", "Admin")

#db_service.add_user("admin1", "admin", "Github, Facebook", "ROLE_SİSTEM_ADMİNİ")
db_service.add_user("baran", "123", "Github, Facebook", "ROLE_USER")

#result = db_service.find_user("enes", "123")
#print(result)





