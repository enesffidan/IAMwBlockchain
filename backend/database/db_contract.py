import sqlite3
import json
import pickle
import ast


class DB_CONTRACT():

    def __init__(self):
        pass

    def create_third_party_app_contract_table(self):
        # Connect to the database (creates if it doesn't exist)
        conn = sqlite3.connect('IAM.db')

        # Create a cursor object
        c = conn.cursor()

        # Create the table
        c.execute('''CREATE TABLE ThirdPartyAppContract
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    contractAddress TEXT,
                    appName TEXT)''')

        # Commit changes and close connection
        conn.commit()
        conn.close()

    def add_entry_to_third_party_app_contract(self, username, contract_address, app_name):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')

        # Create a cursor object
        c = conn.cursor()

        # Execute an insert query to add a new entry
        c.execute("INSERT INTO ThirdPartyAppContract (username, contractAddress, appName) VALUES (?, ?, ?)",
                (username, contract_address, app_name))

        # Commit changes and close connection
        conn.commit()
        conn.close()
    
    def get_contract_by_username(self, username):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')

        # Create a cursor object
        c = conn.cursor()

        # Execute a select query to retrieve the row with the given username
        c.execute("SELECT * FROM ThirdPartyAppContract WHERE username=?", (username,))

        # Fetch the result
        row = c.fetchone()

        # Close the connection
        conn.close()

        return row
