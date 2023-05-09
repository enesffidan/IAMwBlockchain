from flask import Flask
from flask import request


from auth import Auth
from user.display import *
from login import *
from database.DB import *

from ThirdApps.github import Github

from flask_cors import CORS


AUTH_SERVICE = Auth()
DB_SERVICE = DBService()



app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "<p>Index</p>"


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    login_class = Login()
    login_status, jwt_token, user_role = login_class.login_action(username, password)

    response_data = {"login_status":login_status,
                     "token": jwt_token,
                     "role": user_role}

    return response_data

@app.route("/requestApp", methods=['POST'])
def userRequestApp():
    # Get the token from the request headers
    token = request.headers.get("Authorization")
    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    data = request.get_json() #Have account

    if data == True: # Kullanıcının kendi accountu var
        pass
    elif data == False: #Kullanıcın kendi accountu yok olusturulacak 3rd party app için
        pass

@app.route("/addAppUser", methods=['POST'])
def userAddApp():
    # Get the token from the request headers
    token = request.headers.get("Authorization")
    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    #Data from frontend: HaveAccount, AppID, usernameForApp, passwordForApp
    data = request.get_json()
    print(data)

    if data["haveAnAccount"] == True:
        app_data = DB_SERVICE.DB_APP.search_app_by_id(data["appId"])
        DB_SERVICE.DB_USER.add_app_to_user(username, app_data["appname"])

        DB_SERVICE.DB_3RD.add_credentials(username, data["userName"], data["password"], app_data["appname"])
        
    return {"status":True}



@app.route("/appInstance", methods=['GET'])
def github():
    github = Github()
    # Get the token from the request headers
    token = request.headers.get("Authorization")
    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    app_list = DB_SERVICE.DB_3RD.search_apps_by_username_and_appname(username, "Github")

    if app_list != None:
        github_data = app_list[0]

    

    github.login("https://www.github.com/login/", "login_field", github_data["appusername"], "password", github_data["password"], "commit")


    return {"status": True}



@app.route("/adminNotification", methods=['POST'])
def adminNotification():
    data = request.get_json() #admin_username, username ve appid gelicek frontendden
    admin_username = data["admin_username"]

    notifications = DB_SERVICE.DB_NOTIFCIATIONS.get_notifications()

    print(notifications)
    return notifications
















@app.route("/requestAppDisplay", methods=['GET'])
def userRequestAppDisplay():
    # Get the token from the request headers
    token = request.headers.get("Authorization")

    # Extract the token value
    jwt_token = token.split("Bearer ")[1]
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]
    
    user_data = DB_SERVICE.DB_USER.find_user(username)
    user_apps = user_data["apps"]


    app_catalog_list = DB_SERVICE.DB_APP.fetch_all_apps()
    user_apps = DB_SERVICE.DB_USER.get_user_apps(username)
    

    result_apps = []
    for appName in user_apps:
        app_json = DB_SERVICE.DB_APP.search_app_by_name(appName)
        if app_json != None:
            result_apps.append(app_json)


    return app_catalog_list



@app.route("/myApps", methods=['GET'])
def myApps():
# Get the token from the request headers
    token = request.headers.get("Authorization")

    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    #Verify JWT Token
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    user_apps = DB_SERVICE.DB_USER.get_user_apps(username)
    

    result_apps = []
    for appName in user_apps:
        app_json = DB_SERVICE.DB_APP.search_app_by_name(appName)
        if app_json != None:
            result_apps.append(app_json)

    return {"apps": result_apps}



@app.route("/appCatalog", methods=['GET'])
def applicationCatalog():
    jwt_token = request.get_json()
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]
    



    #TODO: user'ın sahip olduğu app'ler tüm katalog listesinden exclude edilerek return edilmeli
    user_myapps_list = display_myapps(username)

@app.route("/addPerson", methods=['POST'])
def addPerson():
    data = request.get_json()

    token = request.headers.get("Authorization")

    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    #Verify JWT Token
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    if username == "admin":

        password_hash = AUTH_SERVICE.hash_password(data["password"])
        # user = {"username": data["username"],
        #         "password": data["password"],
        #         "apps": "",
        #         "role": "ROLE_USER"}

        #db_service.DB_USER.add_user(username="onur", password=auth_service.hash_password("123"), apps=[], role="USER")
        DB_SERVICE.DB_USER.add_user(data["username"], password_hash, [], "USER")

        return {'status' : True}
    else:
        return {'status' : False}
    

@app.route("/userAppsAdmin", methods=['POST'])
def userAppsAdmin():
    target_username = request.get_json()
    target_username = target_username['username']
    user_apps = DB_SERVICE.DB_USER.get_user_apps(target_username)

    result_apps = []
    for appName in user_apps:
        app_json = DB_SERVICE.DB_APP.search_app_by_name(appName)
        if app_json != None:
            result_apps.append(app_json)

    return {"apps": result_apps}

@app.route("/adminAssignAppToUser", methods=['POST'])
def adminAssignAppToUser():
    data = request.get_json()
    username = data["username"]
    appID = data["appid"]


    app_data = DB_SERVICE.DB_APP.search_app_by_id(appID)
    DB_SERVICE.DB_USER.add_app_to_user(username, app_data["appname"])

    return {"status": True}


@app.route("/fetchUsers", methods=['GET'])
def fetchAllUsers():
    user_list = DB_SERVICE.DB_USER.fetch_all_users()

    # users = []

    #     userWithoutPassword = {
    #         'id': user['id'],
    #         'username': user['username'],
    #         'apps': user['apps']
    #     }
    #     users.append(userWithoutPassword)

    return {'users' : user_list}
    

@app.route("/admin/displayUsers", methods=['GET'])
def display_users():
    #admin aksiyonları içerisinden display user la ilgili olan method çağırılıcak
    pass


app.run("127.0.0.1", port=8080, debug=False)

    


