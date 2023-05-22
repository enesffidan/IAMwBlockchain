from web3 import Web3

class EthereumSmartContract:
    def __init__(self, contract_address, abi, private_key):
        self.contract_address = contract_address
        self.abi = abi
        self.w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:6545"))
        self.account = self.w3.eth.account.privateKeyToAccount(private_key)

    def create_contract(self, username, password):
        contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)
        tx_hash = contract.functions.createUserContract(username, password).transact({'from': self.account.address})
        self.w3.eth.waitForTransactionReceipt(tx_hash)
        address = contract.functions.getContractAddress().call()
        return tx_hash, address

    def update_variables(self, username, password):
        contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)
        tx_hash = contract.functions.updateUser(username, password).transact({'from': self.account.address})
        self.w3.eth.waitForTransactionReceipt(tx_hash)
        return tx_hash

    def read_variables(self, address):
        contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)
        username = contract.functions.getUsername(address).call()
        password = contract.functions.getPassword(address).call()
        return username, password
    
    def getTransactionStatus(self, transactionHash):
        print(self.w3.eth.getTransactionReceipt(transactionHash))