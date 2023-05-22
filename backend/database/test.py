from DB import DBService
from ethereum import EthereumSmartContract
import json
from web3 import Web3

# from auth import Auth

db_service = DBService()
# auth_service = Auth()

#USER TABLOSU OLUSTURULDU
db_service.DB_CONTRACT.create_third_party_app_contract_table()

exit()

#USER EKLENDI (HASH PASSWORD)
# db_service.DB_USER.add_user(username="admin", password=auth_service.hash_password("admin123"), apps=["Github", "Linkedin"], role="ADMIN")
# db_service.DB_USER.add_user(username="enes", password=auth_service.hash_password("123"), apps=["Github", "Linkedin"], role="USER")


#APP CATALOG TABLE OLUSTURULUP 3 ENTRY EKLENDI
#db_service.DB_APP.create_appCatalog_table()
#db_service.DB_APP.add_app_to_catalog("Github")
#db_service.DB_APP.add_app_to_catalog("LinkedIn")
#db_service.DB_APP.add_app_to_catalog("Facebook")

#print(db_service.DB_USER.find_user("admin"))


#print(db_service.DB_APP.fetch_all_apps())

# Example usage:
contract_address = "0x793912D3dFD8946B638d0e5929F5D4f8C19247BA"  # Replace with your actual contract address
with open("../truffle/build/contracts/UserFactory.json") as f:
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

# db_service.DB_USER.add_user(username="enes", password=auth_service.hash_password("123"), apps=["Github", "Linkedin"], role="USER")


# Update variables in the smart contract
# tx_hash = smart_contract.update_variables("user1", "user1234")
# print("Update Variables Transaction Hash:", tx_hash)

# Read variables in the smart contract
# username, password = smart_contract.read_variables('0xB9AF1eCeC476050a661C718310C86166761098d6')
# print("Username:", username)
# print("Password:", password)
# smart_contract.getTransactionStatus('0x99fc771e06c9e4dc157d6caa97c5c5f4c49c7ef69b6d806cecc25dc2da9ca58d')







