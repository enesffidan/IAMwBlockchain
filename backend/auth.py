import jwt
import hashlib
import bcrypt

class Auth():

    def __init__(self):
        pass

    def create_jwt_token(self, username):
        payload = {"username": username}
        jwt_token = jwt.encode(payload, "secret", algorithm="HS256")
        return jwt_token
    
    def verify_token(self, jwt_token):
        try:
            payload = jwt.decode(jwt_token, "secret", algorithms=["HS256"])
            return payload
        except jwt.InvalidTokenError:
            return False
        
    def hash_password(self, password):
        # Generate a salt
        salt = bcrypt.gensalt()

        # Hash the password with the salt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password


    def validate_password(self, password_attempt, hashed_password):
        # Validate the password attempt against the hashed password
        if bcrypt.checkpw(password_attempt.encode('utf-8'), hashed_password):
            return True
        else:
            return False