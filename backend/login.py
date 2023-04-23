from flask import Flask
from flask import request
import hashlib
from auth import Auth
from database.DB import DBService



class Login():

    AUTH_SERVICE = Auth()
    DB_SERVICE = DBService()



    @classmethod
    def hash_password(password):
        # Function to hash a password
        # Convert the password to bytes and hash it using SHA-256
        hash_obj = hashlib.sha256(password.encode('utf-8'))
        # Return the hexadecimal representation of the hash
        return hash_obj.hexdigest()
    
    @classmethod
    def validate_password(password):
        # Hash the password using the same algorithm and salt as the stored password
        hash_obj = hashlib.sha256(password.encode('utf-8'))
        hashed_password = hash_obj.hexdigest()
        # Compare the hashed password to the stored hashed password
        stored_password = "" #From database
        if hashed_password == stored_password:
            return True
        else:
            return False

    def login_action(self, username, password):
        #TODO: user login oldugunda jwt token üretilecek ve bu token tüm aksiyonlarda verify edilerek
        #o action'ın hangi user tarafından yapıldığı belirlenecek.

        #self.DB_SERVICE.create_users_table()
        #self.DB_SERVICE.add_user("enes", "123", "Github", "User")
        result = self.DB_SERVICE.find_user(username,password)

        if result == None:
            return False, None
        
        else:
            if username == result["username"] and password == result["password"]:
                jwt_token = self.AUTH_SERVICE.create_jwt_token(username)
                

                return True, jwt_token, result["role"]
