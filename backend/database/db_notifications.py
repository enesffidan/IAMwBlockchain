import sqlite3
from datetime import datetime
import json

class DB_NOTIFICATION():

    def __init__(self):
        pass


    def create_notifications_table(self):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Create the notifications table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notifications (
                username TEXT,
                targetUser TEXT,
                app TEXT,
                date TEXT,
                notification TEXT,
                notificationType BOOLEAN
            )
        ''')

        conn.commit()
        conn.close()


    def add_notification(self, username, app, notification, notification_type, targetUser):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Get the current date and time
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Insert the new notification into the table
        cursor.execute('INSERT INTO notifications (username, targetUser, app, date, notification, notificationType) VALUES (?, ?, ?, ?, ?, ?)',
                    (username,targetUser, app, date, notification, notification_type))

        conn.commit()
        conn.close()


    def get_user_notifications(self, username):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Retrieve all rows for the specified username
        cursor.execute('SELECT * FROM notifications WHERE username = ?', (username,))
        rows = cursor.fetchall()

        conn.close()

        return rows


    
    def delete_notifications_table(self):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Delete the notifications table
        cursor.execute('DROP TABLE IF EXISTS notifications')

        conn.commit()
        conn.close()

    def delete_notification(self, username, notification):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Delete the specific notification from the table
        cursor.execute('DELETE FROM notifications WHERE username = ? AND notification = ?', (username, notification))

        conn.commit()
        conn.close()