from auth import Auth
from login import Login



login_service = Login()
auth_service = Auth()

booolean, jwt_token = login_service.login_action("admin", "admin")

test = auth_service.verify_token(jwt_token)
print(test)
