import sqlite3
import json


class DBService():

    def __init__(self):
        pass

    def create_users_table(self):
        # connect to database (creates if it doesn't exist)
        conn = sqlite3.connect('example.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # create a table
        c.execute('''CREATE TABLE users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    password TEXT,
                    apps TEXT,
                    role TEXT)''')
        
        # commit changes and close connection
        conn.commit()
        conn.close()

    def create_appCatalog_table():
        # connect to database (creates if it doesn't exist)
        conn = sqlite3.connect('example.db')

        # create a cursor object
        c = conn.cursor()

        # create a table
        c.execute('''CREATE TABLE appCatalog
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    appname TEXT)''')

        # commit changes and close connection
        conn.commit()
        conn.close()

    def add_user(self, username, password, apps, role):
        # connect to database
        conn = sqlite3.connect('example.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # serialize apps list as JSON
        apps_json = json.dumps(apps)
        
        # insert user into table
        c.execute("INSERT INTO users (username, password, apps, role) VALUES (?, ?, ?, ?)", (username, password, apps_json, role))
        
        # commit changes and close connection
        conn.commit()
        conn.close()

    def get_user_apps(username):
        # connect to database
        conn = sqlite3.connect('example.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # retrieve user's apps from table
        c.execute("SELECT apps FROM users WHERE username=?", (username,))
        result = c.fetchone()
        
        # deserialize apps JSON and return as list
        apps = json.loads(result[0])
        
        # close connection and return apps list
        conn.close()
        return apps
    
    def add_app_to_catalog(appname):
        # connect to database
        conn = sqlite3.connect('example.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # execute query to insert a new row with the provided appname
        c.execute("INSERT INTO appCatalog (appname) VALUES (?)", (appname,))
        
        # commit changes and close connection
        conn.commit()
        conn.close()

    def find_user(self, username, password):
        # connect to database
        conn = sqlite3.connect('/Users/macbook/Desktop/IAM-Tez/backend/database/example.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # execute SQL query to find user by username and password
        c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        
        # fetch the results
        result = c.fetchone()
        
        # close connection
        conn.close()
        
        # return the result as a dictionary if found, or None if not found
        if result:
            return {'id': result[0], 'username': result[1], 'password': result[2], 'apps': result[3], 'role': result[4]}
        else:
            return None