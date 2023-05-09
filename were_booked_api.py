from flask import Flask, request,jsonify
from flask_cors import CORS

from sheets_util import authenticate_sheet, get_values, insert_values

app = Flask(__name__)
CORS(app)
creds = None
creds = authenticate_sheet()

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

@app.route('/user_books')
def user_books():
    user_books = get_values("user_books", creds)
    print(user_books)
    user_books_list = []
    for i in range(len(user_books)):
        user_books_object = {}
        user_books_object['user_id'] = user_books[i][0]
        user_books_object['book_id'] = user_books[i][1]
        user_books_object['priority'] = user_books[i][2]
        user_books_object['finish_book_by'] = user_books[i][3]
        user_books_object['status'] = user_books[i][4]
        user_books_list.append(user_books_object)

    return jsonify(user_books_list)

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

@app.route('/user_groups')
def user_groups():
    user_groups = get_values("user_groups", creds)
    print(user_groups)
    user_groups_list = []
    for i in range(len(user_groups)):
        user_groups_object = {}
        user_groups_object['user_groups_id'] = user_groups[i][0]
        user_groups_object['groupName'] = user_groups[i][1]
        user_groups_list.append(user_groups_object)

    return jsonify(user_groups_list)

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

@app.route('/users', methods=['POST'])
def post_users():
    data = request.json
    print(data)
    data= data["data"]
    print(data)
    insert_values("users",list_values=data,creds=creds)
    return {}

@app.route('/books', methods=['POST'])
def post_books():
   data = request.json
   print(data)
   data = data["data"]
   print(data)
   insert_values("books", list_values=data, creds=creds)
   return {}

@app.route('/user_books', methods=['POST'])
def post_user_books():
   data = request.json
   print(data)
   data = data["data"]
   print(data)
   insert_values("user_books", list_values=data, creds=creds)
   return {}


@app.route('/ratings', methods=['POST'])
def post_ratings():
   data = request.json
   print(data)
   data = data["data"]
   print(data)
   insert_values("ratings", list_values=data, creds=creds)
   return {}

@app.route('/notes', methods=['POST'])
def post_notes():
   data = request.json
   print(data)
   data = data["data"]
   print(data)
   insert_values("notes", list_values=data, creds=creds)
   return {}

@app.route('/user_groups', methods=['POST'])
def post_user_groups():
  data = request.json
  print(data)
  data = data["data"]
  print(data)
  insert_values("user_groups", list_values=data, creds=creds)
  return {}


if __name__ == '__main__':
    
    app.run()
