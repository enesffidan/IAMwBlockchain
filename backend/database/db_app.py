import sqlite3
import json


class DB_APP():

    def __init__(self):
        pass

    def create_appCatalog_table(self):
        # connect to database (creates if it doesn't exist)
        conn = sqlite3.connect('IAM.db')

        # create a cursor object
        c = conn.cursor()

        # create a table
        c.execute('''CREATE TABLE apps
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    appname TEXT)''')

        # commit changes and close connection
        conn.commit()
        conn.close()

    def add_app_to_catalog(self, appname):
        # connect to database
        conn = sqlite3.connect('IAM.db')
        
        # create a cursor object
        c = conn.cursor()
        
        # execute query to insert a new row with the provided appname
        c.execute("INSERT INTO apps (appname) VALUES (?)", (appname,))
        
        # commit changes and close connection
        conn.commit()
        conn.close()

    def fetch_all_apps(self):
        # connect to the database
        conn = sqlite3.connect('IAM.db')

        # create a cursor object
        c = conn.cursor()

        # execute a SELECT query to fetch all apps
        c.execute("SELECT * FROM apps")

        # fetch all rows from the result set
        rows = c.fetchall()

        # close the connection
        conn.close()

        # build a list of dictionaries representing each app
        apps = []
        for row in rows:
            app = {
                'id': row[0],
                'appname': row[1]
            }
            apps.append(app)

        # convert the list to JSON
        json_apps = json.dumps(apps)

        # return the JSON representation of the fetched apps
        return json_apps
    
    def search_app_by_name(self, appname):
        # Connect to the database
        conn = sqlite3.connect('IAM.db')
        c = conn.cursor()

        # Execute SQL query to find the app by name
        c.execute("SELECT * FROM apps WHERE appname=?", (appname,))
        result = c.fetchone()

        # Close connection
        conn.close()

        # If app found, convert the result to JSON
        if result:
            app_data = {'id': result[0], 'appname': result[1]}
            return app_data
        else:
            return None