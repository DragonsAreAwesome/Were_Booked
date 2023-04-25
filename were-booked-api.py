from flask import Flask, request,jsonify
from flask_cors import CORS

from sheets_util import authenticate_sheet, get_values

app = Flask(__name__)
CORS(app)
creds = None


@app.route('/')
def myapp():
    message = "To use this app:" + request.base_url
    return message


@app.route('/users')
def users():
    users = get_values("users", creds)
    print(users)
    users_list = []
    for i in range(len(users)):
        user_object = {}
        user_object['id'] = users[i][0]
        user_object['user_name'] = users[i][1]
        user_object['password'] = users[i][2]
        users_list.append(user_object)

    return jsonify(users_list)


@app.route('/add')
def add():
    # Checking that both parameters have been supplied
    if not 'x' in request.args:
        return "x value is missing"
    if not 'y' in request.args:
        return "y value is missing"

    # Make sure they are numbers too
    try:
        x = float(request.args['x'])
        y = float(request.args['y'])
    except:
        return "x and y should be numbers"
    return {"result": str(x + y)}


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['fname']
        print(user)
        return {}
    else:
        return {}


if __name__ == '__main__':
    creds = authenticate_sheet()
    app.run()
