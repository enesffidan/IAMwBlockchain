import sqlite3
import json
import pickle
import ast

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

    def add_app_to_user(self, username, app):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        c = conn.cursor()

        # Execute SQL query to fetch the user's current apps
        c.execute("SELECT apps FROM users WHERE username=?", (username,))
        result = c.fetchone()
        
        if result is None:
            # User not found
            conn.close()
            return False
        
        current_apps = json.loads(result[0]) if result[0] else []

        # Add the new app to the current apps list
        current_apps.append(app)

        # Serialize the updated apps list into a string
        serialized_apps = json.dumps(current_apps)

        # Execute SQL query to update the user's apps
        c.execute("UPDATE users SET apps=? WHERE username=?", (serialized_apps, username))

        # Commit changes and close connection
        conn.commit()
        conn.close()

        return True

    def delete_user(self, username):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        c = conn.cursor()

        # Execute SQL query to delete the user
        c.execute("DELETE FROM users WHERE username=?", (username,))

        # Commit changes and close connection
        conn.commit()
        conn.close()

        return True



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
                        #  "password": user[2],
                         "apps": ast.literal_eval(user[3]),
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