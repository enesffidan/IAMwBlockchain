from flask import Flask
from backend.login import Login
from flask import request

from flask_cors import CORS



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

    login_class = Login(username, password)
    login_status = login_class.login_action()

    response_data = {"login_status":login_status}
    return response_data


app.run("127.0.0.1", port=8080, debug=False)