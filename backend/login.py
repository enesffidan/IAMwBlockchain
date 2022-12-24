from flask import Flask
from flask import request



class Login():

    def __init__(self, username, password):
        self.username = username
        self.password = password


    def login_action(self):
        #TO:DO- Check username and password existincy

        if self.username == "enes" and self.password == "123":
            return True

        else:
            return False


    




"""
app = Flask("test")

@app.route("/")
def index():
    return "<p>Index</p>"

@app.route("/login", methods=['GET','POST'])
def login():


    if request.method == 'GET':
        return "<p>Get reqeust.</p>"
    elif request.method == 'POST':
        data = request.get_data
        print(data)
        return "<p>Post request. {}</p>".format(data)



app.run("0.0.0.0", port=8080)
"""