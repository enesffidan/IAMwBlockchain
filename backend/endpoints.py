from flask import Flask
from flask import request


from auth import Auth
from user.display import *
from login import *
from database.DB import *

from flask_cors import CORS


AUTH_SERVICE = Auth()


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

@app.route("/assign", methods=['POST'])
def assignApplication():

    data = request.get_json()
    appName = data["appName"]
    username = data["username"]



@app.route("/myApps", methods=['GET'])
def myApps():
    #JWT Token from front
    jwt_token = request.get_json()

    #Verify JWT Token
    verify_token_data = AUTH_SERVICE.verify_token(jwt_token)
    username = verify_token_data["username"]

    #TODO: Kullanıcının admin ya da düz user oldugunu belirleyeceğimiz yapı eklenecek (DB'den bu veri çekilebilir)
    #TODO: 


    user_myapps_list = display_myapps(username)

    return user_myapps_list


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

    


