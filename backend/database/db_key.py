import sqlite3
import hashlib
import secrets


class DB_KEY():

    def __init__(self):
        pass

    def create_keys_table(self):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        cursor = conn.cursor()

        # Create the "keys" table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS keys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                appname TEXT NOT NULL,
                key TEXT NOT NULL
            )
        ''')

        # Commit the changes and close the connection
        conn.commit()
        conn.close()

    def add_key_to_database(self, username, appname, key):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        cursor = conn.cursor()

        # Insert the key into the key table
        cursor.execute("INSERT INTO keys (username, appname, key) VALUES (?, ?, ?)",
                    (username, appname, key))
        conn.commit()

        # Close the database connection
        conn.close()

    def retrieve_key_by_appname_and_username(self, appname, username):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        cursor = conn.cursor()

        # Retrieve the row based on appname and username
        cursor.execute("SELECT key FROM keys WHERE appname = ? AND username = ?", (appname, username))
        row = cursor.fetchone()

        # Close the connection
        conn.close()

        if row:
            return row[0]  # Return the key value
        else:
            return None  # Row not found
