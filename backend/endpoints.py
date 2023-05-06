from flask import Flask
from flask import request


from auth import Auth
from user.display import *
from login import *
from database.DB import *

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
    print(type(data))
    username = data["username"]
    password = data["password"]

    login_class = Login()
    login_status, jwt_token, user_role = login_class.login_action(username, password)

    response_data = {"login_status":login_status,
                     "token": jwt_token,
                     "role": user_role}
    print(response_data)
    return response_data

@app.route("/requestApp", methods=['POST'])
def userRequestApp():
    # Get the token from the request headers
    token = request.headers.get("Authorization")
    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    data = request.get_json() #Have account

    if data == True: # Kullanıcının kendi accountu var
        pass
    elif data == False: #Kullanıcın kendi accountu yok olusturulacak 3rd party app için
        pass





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

    
    user_apps_result = []
    for app in user_apps:
        app_data = DB_SERVICE.DB_APP.search_app_by_name(app)
        user_apps_result.append(app_data)

    return app_catalog_list, user_apps_result



@app.route("/myApps", methods=['GET'])
def myApps():
# Get the token from the request headers
    token = request.headers.get("Authorization")

    # Extract the token value
    jwt_token = token.split("Bearer ")[1]

    #Verify JWT Token
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    user_data = DB_SERVICE.DB_USER.find_user(username)
    user_apps = user_data["apps"]

    result = []
    for app in user_apps:
        print(app)
        app_data = DB_SERVICE.DB_APP.search_app_by_name(app)
        result.append(app_data)
    
    return result


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

    token = data["token"]
    payload = AUTH_SERVICE.verify_token(token)

    if payload["username"] == "admin1":

        password_hash = AUTH_SERVICE.hash_password(data["password"])
        # user = {"username": data["username"],
        #         "password": data["password"],
        #         "apps": "",
        #         "role": "ROLE_USER"}

        DB_SERVICE.add_user(data["firstName"], password_hash, "", "ROLE_USER")

        return {'status' : True}
    else:
        return {'status' : False}
    




@app.route("/fetchUsers", methods=['GET'])
def fetchAllUsers():
    user_list = DB_SERVICE.fetch_all_users()

    return user_list
    

@app.route("/admin/displayUsers", methods=['GET'])
def display_users():
    #admin aksiyonları içerisinden display user la ilgili olan method çağırılıcak
    pass


app.run("127.0.0.1", port=8080, debug=False)

    


