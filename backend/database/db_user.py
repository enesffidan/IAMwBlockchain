import sqlite3
import json

class DB_USER():


    def __init__(self):
        pass


    def create_users_table(self):
        # connect to database (creates if it doesn't exist)
        conn = sqlite3.connect('IAM.db')
        
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


    def add_user(self, username, password, apps, role):
        # connect to database
        conn = sqlite3.connect('IAM.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # serialize apps list as JSON
        apps_json = json.dumps(apps)
        
        # insert user into table
        c.execute("INSERT INTO users (username, password, apps, role) VALUES (?, ?, ?, ?)", (username, password, apps_json, role))
        
        # commit changes and close connection
        conn.commit()
        conn.close()


    def fetch_all_users(self):
        # connect to the database
        conn = sqlite3.connect('IAM.db')

        # create a cursor
        c = conn.cursor()

        # execute the query to get all users
        c.execute("SELECT * FROM users")

        # fetch all the results
        users = c.fetchall()

        # close the cursor and connection
        c.close()
        conn.close()

        user_list = []
        for user in users:
            user_json = {"id": user[0],
                         "username": user[1],
                         "password": user[2],
                         "apps": user[3],
                         "role": user[4]}
            user_list.append(user_json)
        return user_list
    
    def get_user_apps(self, username):
        # connect to database
        conn = sqlite3.connect('IAM.db')
        
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
    
    def find_user(self, username):
        # connect to database
        conn = sqlite3.connect('IAM.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # execute SQL query to find user by username
        c.execute("SELECT * FROM users WHERE username=?", (username,))
        
        # fetch the results
        result = c.fetchone()
        
        # close connection
        conn.close()
        
        # return the result as a dictionary if found, or None if not found
        if result:
            return {'id': result[0], 'username': result[1], 'password': result[2], 'apps': result[3], 'role': result[4]}
        else:
            return None