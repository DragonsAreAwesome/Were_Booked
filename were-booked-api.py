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

@app.route('/groups')
def groups():
    groups = get_values("groups", creds)
    print(groups)
    groups_list = []
    for i in range(len(groups)):
        groups_object = {}
        groups_object['groupID'] = groups[i][0]
        groups_object['groupName'] = groups[i][1]
        groups_object['groupDescription'] = groups[i][2]
        groups_list.append(groups_object)

    return jsonify(groups_list)

@app.route('/books')
def books():
    books = get_values("books", creds)
    print(books)
    books_list = []
    for i in range(len(books)):
        book_object = {}
        book_object['ISBN'] = books[i][0]
        book_object['name'] = books[i][1]
        book_object['description'] = books[i][2]
        book_object['linkToAmazon'] = books[i][3]
        book_object['author'] = books[i][4]
        book_object['genre'] = books[i][5]
        book_object['dateOfPublication'] = books[i][6]
        books_list.append(book_object)

    return jsonify(books_list)

@app.route('/user-books')
def user-books():
    user-books = get_values("user-books", creds)
    print(user-books)
    user-books_list = []
    for i in range(len(user-books)):
        user-books_object = {}
        user-books_object['user_id'] = user-books[i][0]
        user-books_object['book_id'] = user-books[i][1]
        user-books_object['priority'] = user-books[i][2]
        user-books_object['finish_book_by'] = user-books[i][3]
        user-books_object['status'] = user-books[i][4]
        users-books_list.append(user-books_object)

    return jsonify(user-books_list)

@app.route('/notes')
def notes():
    notes = get_values("notes", creds)
    print(notes)
    notes_list = []
    for i in range(len(notes)):
        notes_object = {}
        notes_object['usernotes_id'] = notes[i][0]
        notes_object['booknotes_id'] = notes[i][1]
        notes_object['notes'] = notes[i][2]
        notes_object['note_publication'] = notes[i][3]
        notes_list.append(notes_object)

    return jsonify(notes_list)

@app.route('/ratings')
def ratings():
    ratings = get_values("ratings", creds)
    print(ratings)
    ratings_list = []
    for i in range(len(ratings)):
        ratings_object = {}
        ratings_object['userratings_id'] = ratings[i][0]
        ratings_object['bookratings_id'] = ratings[i][1]
        ratings_object['ratings'] = ratings[i][2]
        ratings_object['ratings_publication'] = ratings[i][3]
        ratings_list.append(ratings_object)

    return jsonify(ratings_list)

@app.route('/user-groups')
def user-groups():
    user-groups = get_values("user-groups", creds)
    print(user-groups)
    user-groups_list = []
    for i in range(len(user-groups)):
        user-groups_object = {}
        user-groups_object['user-groups_id'] = user-groups[i][0]
        user-groups_object['groupName'] = user-groups[i][1]
        user-groups_list.append(user-groups_object)

    return jsonify(user-groups_list)

@app.route('/bookstore')
def bookstore():
    bookstore = get_values("bookstore", creds)
    print(bookstore)
    bookstore_list = []
    for i in range(len(bookstore)):
        bookstore_object = {}
        bookstore_object['bookstoreName'] = bookstore[i][0]
        bookstore_object['bookstoreAddress'] = bookstore[i][1]
        bookstore_object['bookstoreBook_id'] = bookstore[i][2]
        bookstore_list.append(bookstore_object)

    return jsonify(bookstore_list)

#http://127.0.0.1:5000/add?x=10&y=5&z=24
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
        z = float(request.args['z'])
    except:
        return "x and y should be numbers"
    return {"result": str(x + y + z)}


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
