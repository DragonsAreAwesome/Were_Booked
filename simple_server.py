from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def myapp():
    message = "hello"
    return message


@app.route('/test')
def test():
    message = {'test': True}
    message['name'] = 'anissa'
    return message


if __name__ == '__main__':
    app.run()
