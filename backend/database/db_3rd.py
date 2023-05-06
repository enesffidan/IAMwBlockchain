import sqlite3
import json

class DB_3RD():

    def __init__(self):
        pass

    def create_table(self):
        # connect to database (creates if it doesn't exist)
        conn = sqlite3.connect('IAM.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # create a table
        c.execute('''CREATE TABLE ThirdPartyApps
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    appusername TEXT,
                    password TEXT,
                    appname TEXT)''')
        
        # commit changes and close connection
        conn.commit()
        conn.close()

    def add_credentials(self, username, appusername, password, appname):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        c = conn.cursor()

        # Execute SQL query to insert a new entry
        c.execute("INSERT INTO ThirdPartyApps (username, appusername, password, appname) VALUES (?, ?, ?, ?)",
                (username, appusername, password, appname))

        # Commit changes and close connection
        conn.commit()
        conn.close()

    def search_apps_by_username_and_appname(self, username, appname):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        c = conn.cursor()

        # Execute SQL query to find rows matching the username and appname
        c.execute("SELECT * FROM ThirdPartyApps WHERE username=? AND appname=?", (username, appname))
        results = c.fetchall()

        # Close connection
        conn.close()

        # Convert results to JSON format
        json_results = []
        for row in results:
            app_data = {
                'id': row[0],
                'username': row[1],
                'appusername': row[2],
                'password': row[3],
                'appname': row[4]
            }
            json_results.append(app_data)

        # Return the results as JSON
        return json_results