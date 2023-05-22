from auth import Auth
#from login import Login
from database.DB import DBService
import json
from database.ethereum import EthereumSmartContract






db_service = DBService()

db_service.DB_KEY.create_keys_table()

exit()




# auth_service = Auth()


#db_service.DB_3RD.create_table()

#db_service.DB_NOTIFCIATIONS.create_notifications_table()
# db_service.DB_NOTIFCIATIONS.add_notification("admin", "Linkedin", "onur1 request to Linkedin!", "1", "onur1")



#db_service.DB_NOTIFCIATIONS.add_notification("admin", "First notification test!")




#db_service.DB_USER.delete_user("enes")

#USER TABLOSU OLUSTURULDU
#db_service.DB_USER.create_users_table()

#USER EKLENDI (HASH PASSWORD)
#db_service.DB_USER.add_user(username="admin", password=auth_service.hash_password("admin123"), apps=["Github", "Linkedin"], role="ADMIN")
#db_service.DB_USER.add_user(username="enes", password=auth_service.hash_password("123"), apps=["Github", "Linkedin"], role="USER")
# db_service.DB_USER.add_user(username="onur1", password=auth_service.hash_password("123"), apps=[], role="USER")
#db_service.DB_USER.delete_user('aliveli')

#APP CATALOG TABLE OLUSTURULUP 3 ENTRY EKLENDI
#db_service.DB_APP.create_appCatalog_table()
#db_service.DB_APP.add_app_to_catalog("Github")
#db_service.DB_APP.add_app_to_catalog("Linkedin")
#db_service.DB_APP.add_app_to_catalog("Facebook")


#print(type(db_service.DB_USER.get_user_apps("enes")))

#print(db_service.DB_USER.find_user("enes"))

# Example usage:
contract_address = "0x793912D3dFD8946B638d0e5929F5D4f8C19247BA"  # Replace with your actual contract address
with open("./truffle/build/contracts/UserFactory.json") as f:
    info_json = json.load(f)
abi = info_json["abi"]

# print(abi)
  # Replace with the contract's ABI
private_key = "0x90167bb5c6588fd1275a8e3bec7198dae30ffb13e6bbe7caef7af0adac8634f8"  # Replace with your private key

smart_contract = EthereumSmartContract(contract_address, abi, private_key)

# Create a new smart contract
tx_hash, contract = smart_contract.create_contract("onurcihangir1912@gmail.com", "C0aa0c2548")
print("Create Contract Transaction Hash:", tx_hash)
print("Create Contract:", contract)

db_service.DB_CONTRACT.add_userContract(str(contract))

username, password = smart_contract.read_variables(contract)
print("Username:", username)
print("Password:", password)





