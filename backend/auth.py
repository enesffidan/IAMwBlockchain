import jwt
import hashlib

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
            return None
        
    def hash_password(self, password):
        # Function to hash a password
        # Convert the password to bytes and hash it using SHA-256
        hash_obj = hashlib.sha256(password.encode('utf-8'))
        # Return the hexadecimal representation of the hash
        return hash_obj.hexdigest()