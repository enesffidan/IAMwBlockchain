import jwt
import hashlib
import bcrypt
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
from Crypto.Random import get_random_bytes

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

    def generate_aes_key(self):
        return get_random_bytes(16)  # 16 bytes = 128 bits (AES-128)

    def aes_encrypt(self, plaintext):
        plaintext = plaintext.encode('utf-8')
        key = self.generate_aes_key()
        cipher = AES.new(key, AES.MODE_CBC)
        iv = cipher.iv
        ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
        return iv + ciphertext, key

    def aes_decrypt(self, ciphertext, key):
        iv = ciphertext[:AES.block_size]
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted_data = unpad(cipher.decrypt(ciphertext[AES.block_size:]), AES.block_size)
        return decrypted_data.decode('utf-8')