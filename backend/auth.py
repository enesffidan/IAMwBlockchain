import jwt


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