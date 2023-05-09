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
                date TEXT,
                notification TEXT
            )
        ''')

        conn.commit()
        conn.close()

    def add_notification(self, username, notification):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Get the current date and time
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Insert the new notification into the table
        cursor.execute('INSERT INTO notifications (username, date, notification) VALUES (?, ?, ?)', (username, date, notification))

        conn.commit()
        conn.close()


    def get_notifications(username):
        conn = sqlite3.connect('IAM.db')  # Replace 'IAM.db' with the path to your SQLite database file
        cursor = conn.cursor()

        # Retrieve notifications and dates for the specified username
        cursor.execute('SELECT notification, date FROM notifications WHERE username = ?', (username,))
        notifications = cursor.fetchall()

        conn.close()

        # Convert notifications to a JSON list
        notifications_list = []
        for notification in notifications:
            notification_data = {
                'notification': notification[0],
                'date': notification[1]
            }
            notifications_list.append(notification_data)

        return notifications_list
    
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