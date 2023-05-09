        var userList; //Necessary all over!
        var groupsList; //Necessary all over? So far...
        var bookList; //This is for the Load python books from the My books page
        var bookstoreList; //For the Bookstore in Load Books
        var user_booksList; //This is for a table, the user_books table
        var notesList; //This is for the notes table!
        var ratingsList; //This is for the ratings table!
        var user_groupsList; //This is for the user_group table!
        //var Were_Booked_pyURL = "http://127.0.0.1:5000"
        var Were_Booked_pyURL = "https://himicamagic.pythonanywhere.com/"
        var loginStatus = false;

//Home page below - 5/2/23
function loadHome() {
  var currentUserId= localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
    window.location = 'Were_Booked-Login.html'
  }
  //loadGroups();
  //loadUser_Groups()
  //loadUsers();
  //loadRatings();
  //loadNotes();
  //loadUser_Books();
}
//Profile page below - 5/2/23
function loadProfile() {
  var currentUserId= localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
    window.location = 'Were_Booked-Login.html'
  }
  loadGroups();
  //loadUser_Groups();
  loadUsers();
  //loadRatings();
  loadNotes();
  //loadUser_Books();
}
//My Books page below - 5/2/23
function loadMyBooks() {
  var currentUserId= localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
    window.location = 'Were_Booked-Login.html'
  }
  loadUser_Books();
  loadBookstore();
  loadUsers();
  loadRatings();
  loadNotes();
  loadMyBooksInfo()
}
//Books page below - 5/2/23
function loadBooks() {
  var currentUserId= localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
    window.location = 'Were_Booked-Login.html'
  }
  loadBooksPython();
  //loadBookstore();
  //loadGroups();
  //loadUser_Groups();
  //loadUsers();
  loadRatings();
  loadNotes();
  loadBookInfo();
}
//Add Books page below - 5/2/23
function loadAddBooks() {
  var currentUserId= localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
    window.location = 'Were_Booked-Login.html'
  }
  //loadGroups();
  //loadUser_Groups();
  //loadUsers();
}

//Going into TABLE FUNCTIONS BELOW!


function loadUser_Groups() {
  const xhr = new XMLHttpRequest();
  console.log('User_Groups function called')
  xhr.open("GET", Were_Booked_pyURL + '/user_groups');
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          user_groupsList=xhr.response;
          console.log(user_groupsList)
          for (i = 0; i < user_groupsList.length; i++) {
            console.log(user_groupsList[i].user_groups_id) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }
  
function loadRatings() {
  const xhr = new XMLHttpRequest();
  console.log('Ratings function called')
  xhr.open("GET", Were_Booked_pyURL + "/ratings");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          ratingsList=xhr.response;
          console.log(ratingsList)
          for (i = 0; i < ratingsList.length; i++) {
            console.log(ratingsList[i].userratings_id) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }

function loadNotes() {
  const xhr = new XMLHttpRequest();
  console.log('Notes function called')
  xhr.open("GET", Were_Booked_pyURL + "/notes");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          notesList=xhr.response;
          console.log(user_booksList)
          for (i = 0; i < notesList.length; i++) {
            console.log(notesList[i].usernotes_id) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }

function loadUser_Books() {
  const xhr = new XMLHttpRequest();
  console.log('User_Books function called')
  xhr.open("GET", Were_Booked_pyURL + "/user_books");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
        var currUserBooksList = xhr.response;
        user_booksList = [];
        var currentUserId = localStorage.getItem("id");
        for (i = 0; i < currUserBooksList.length; i++) {
           if (currentUserId == currUserBooksList[i].user_id) {
               user_booksList.push(currUserBooksList[i].book_id)
           }
        
        }      
        loadMyBooksPython()
            return user_booksList;
      } else {
          console.log(`Error: ${xhr.status}`);
          return []
      }
  };
  }

function loadGroups() {
  const xhr = new XMLHttpRequest();
  console.log('Groups function called')
  var ul = document.getElementById("groupList");
  var select = document.getElementById("selectGroup");
  xhr.open("GET", Were_Booked_pyURL + "/groups");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          groupsList=xhr.response;
          console.log(groupsList)
          for (i = 0; i < groupsList.length; i++) {
            ul.innerHTML+="<li class='myDIV'>"+groupsList[i].groupName+"<p>"+groupsList[i].groupDescription + "</p></li>"
            var el = document.createElement("option");
            el.textContent = groupsList[i].groupName;
            el.value = groupsList[i].groupID;
            select.appendChild(el);
            console.log(groupsList[i].groupName) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }
function joinGroup(){
    event.preventDefault();
    var currentUserId = localStorage.getItem("id");
   
    var selectGroup = document.getElementById("selectGroup").value;
   
    const xhr = new XMLHttpRequest();
   
    xhr.open("POST", Were_Booked_pyURL + "/user_groups");
   
      var new_data = [[currentUserId, selectGroup]];
   
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({"data": new_data}))
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.log(`Error: ${xhr.status}`);
        } //end of nested else
    }; // end of xhr.onload
   
   }

function loadUsers() {
  const xhr = new XMLHttpRequest();
  console.log('Users function called')
  var p = document.getElementById("profileUsername")
  var currentUserId= localStorage.getItem("id");
  xhr.open("GET", Were_Booked_pyURL + "/users");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          userList=xhr.response;
          console.log(userList)
          var currentUserId= localStorage.getItem("id");
          p.innerHTML+="<p>"+currentUserId+"</p>"
          for (i = 0; i < userList.length; i++) {
            console.log(userList[i].id) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }

  function loadBookstore() {
    const xhr = new XMLHttpRequest();
    console.log('Bookstore function called')
    xhr.open("GET", Were_Booked_pyURL + "/bookstore");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status == 200) {
          bookstoreList=xhr.response;
            console.log(bookstoreList)
            for (i = 0; i < bookstoreList.length; i++) {
              console.log(bookstoreList[i].bookstoreName) }

              var table = document.getElementById("bookstoreTable")
              for (var i = 0; i<bookstoreList.length; i++) {
                console.log(bookstoreList[0].bookstoreName);
                var row = table.insertRow(1)
                for (var j = 0; j< 3; j++) {
                var column = row.insertCell(j)
                switch (true) {
                  case (j === 0):
                    column.innerHTML = bookstoreList[i].bookstoreName
                    break;
                  case (j === 1):
                    column.innerHTML = bookstoreList[i].bookstoreAddress
                    break;
                  case (j === 2):
                    column.innerHTML = bookstoreList[i].bookstoreBook_id
                    break;
                  default:
                    alert('Unable to access bookstore table information, please reload page.');
                    break;
                }
                }
              }
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
    }

  function loadBooksPython() {
    const xhr = new XMLHttpRequest();
    console.log('LoadBooksPython function called')
    xhr.open("GET", Were_Booked_pyURL + "/books");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status == 200) {
          bookList=xhr.response;
            console.log(bookList)
            for (i = 0; i < bookList.length; i++) {
              console.log(bookList[i].ISBN) }

              var table = document.getElementById("booksTable")
              for (var i = 0; i<bookList.length; i++) {
                console.log(bookList[0].name);
                var row = table.insertRow(1)
                for (var j = 0; j< 7; j++) {
                var column = row.insertCell(j)
                switch (true) {
                  case (j === 0):
                    column.innerHTML = bookList[i].name
                    break;
                  case (j === 1):
                    column.innerHTML = bookList[i].author
                    break;
                  case (j === 2):
                    column.innerHTML = bookList[i].dateOfPublication
                    break;
                    case (j === 3):
                    column.innerHTML = bookList[i].genre
                    break;
                    case (j === 4):
                    column.innerHTML = "<a target='_blank' href=" + bookList[i].linkToAmazon + ">Link</a>"
                    break;
                    case (j === 5):
                    column.innerHTML = bookList[i].description
                    break;
                    case (j === 6):
                    column.innerHTML = bookList[i].ISBN
                    break;
                  default:
                    alert('Loading the new information of the book did not work! Please try reloading.');
                    break;
                }
                }
              }
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
    }

    function loadMyBooksPython() {
      const xhr = new XMLHttpRequest();
      console.log('LoadMyBooksPython function called')
      xhr.open("GET", Were_Booked_pyURL + "/books");
      xhr.send();
      xhr.responseType = "json";
      xhr.onload = () => {
          if (xhr.status == 200) {
            bookList=xhr.response;
              console.log(bookList)
                var table = document.getElementById("booksTable")
                for (var i = 0; i<bookList.length; i++) {
                  console.log(bookList[0].name);
                  if (user_booksList.indexOf(bookList[i].ISBN) >= 0) {
                    
              
                  var row = table.insertRow(1)
                  for (var j = 0; j< 7; j++) {
                  var column = row.insertCell(j)
                  switch (true) {
                    case (j === 0):
                      column.innerHTML = bookList[i].name
                      break;
                    case (j === 1):
                      column.innerHTML = bookList[i].author
                      break;
                    case (j === 2):
                      column.innerHTML = bookList[i].dateOfPublication
                      break;
                      case (j === 3):
                      column.innerHTML = bookList[i].genre
                      break;
                      case (j === 4):
                      column.innerHTML = "<a target='_blank' href=" + bookList[i].linkToAmazon + ">Link</a>"
                      break;
                      case (j === 5):
                      column.innerHTML = bookList[i].description
                      break;
                      case (j === 6):
                      column.innerHTML = bookList[i].ISBN
                      break;
                    default:
                      alert('Loading the new information of the book did not work! Please try reloading.');
                      break;
                  }
                  } }
                }
          } else {
              console.log(`Error: ${xhr.status}`);
          }
      };
      }


/*const usersname = [['Anissa-Books', 'password', 'rgb(35, 211, 135)'], ['HimicaReads!', 'password', 'rgb(122, 202, 153)']]
const bookFactory = (name, author, dateOfPublication, genre, linkToAmazon, description, ISBN) => {
    let book = {
        name: name,
        author: author,
        dateOfPublication: dateOfPublication,
        genre: genre,
        linkToAmazon: linkToAmazon,
        description: description,
        ISBN: ISBN,
        }
      bookList.push(book)
    }; */
    function login() {
      event.preventDefault();
      // let userName = 'Anissa-Books' || 'HimicaReads!' || 'Programmer-READER'
      let userName = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      console.log('Working.')
      for (i = 0; i < userList.length; i++) {
        console.log(userList[i].id)
        if (userName === userList[i].user_name && password === userList[i].password) {
          loginStatus = true;
          localStorage.setItem("id",userList[i].id);
          alert(userName + ' logged in!')
          break;
        }
         }
      /* switch (true) {
        case (userName === 'Anissa-Books' && password === 'password'):
          alert('Anissa Logged in');
          loginStatus = true
          break;
        case (userName === 'HimicaReads!' && password === 'password'):
          alert('Himica Logged in');
          loginStatus = true
          break;
        case (userName === 'Programmer-READER' && password === 'password'):
          alert('Programmer Logged in');
          loginStatus = true
          break;
        default:
          alert('Alert! Invalid username or password');
          break;
      } */
      loginStatus ? window.location = "index.html" :
      window.location = "Were_Booked-Login.html"
      console.log('login');
    
    }
    
    function addBook2() {
      event.preventDefault()
      console.log('Submit')
      var name = document.getElementById("book_name").value;
      var author = document.getElementById("book_author").value;
      var dateOfPublication = document.getElementById("book_publication").value;
      var genre = document.getElementById("genre");
      var linkToAmazon = document.getElementById("book_link").value;
      var description = document.getElementById("book_description").value;
      var ISBN = document.getElementById("book_id").value;
      var i = 0;
      var genre_array=[];
      
      for (i = 0; i < genre.options.length; i++) {
                if (genre.options[i].selected) {
                    console.log(genre.options[i].value)
                  genre_array.push(genre.options[i].value)
                }
    
      }
      console.log(name + author + dateOfPublication + linkToAmazon + description + ISBN)
      const xhr = new XMLHttpRequest();
xhr.open("POST", Were_Booked_pyURL + "/books");
var new_data = [[ISBN, name, description, linkToAmazon, author, genre_array.join(", "), dateOfPublication]];

xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({"data": new_data})) //xhr.send(new_data) OR xhr.send(JSON.parse(JSON.stringify(new_data)))
xhr.responseType = "json";
xhr.onload = () => {
   if (xhr.readyState == 4 && xhr.status == 200) {
       console.log(xhr.response);
       alert('Thank you for adding ' + name + '.')
   } else {
       console.log(`Error: ${xhr.status}`);
   } //end of nested else
}; // end of xhr.onload
console.log(name + author + dateOfPublication + linkToAmazon + description + ISBN)
    }
    //Sort of working func below?... Work in progress, but nice!
    function addNote() {
      var noted = document.getElementById("noted").value
      var newnoted = document.getElementById("newnoted").value
      document.getElementById("printNoted").innerHTML = noted + "<br>" + newnoted
      console.log(noted)
    }
    //The job fo the function below is to save the users to the database.
    function signUserSave() {
      console.log('SignUserSave function woring')
      var signusername = document.getElementById("signusername").value;
      var signpassword = document.getElementById("signpassword").value;
      var signpassword2 = document.getElementById("signpassword2").value;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", Were_Booked_pyURL + "/users");
//var formData = new FormData(document.getElementById("my-form-id"));
var user_id =  Date.now(); //Anissa
var new_data=[[user_id,signusername,signpassword,"rgb(35, 211, 135)"]];
//new_data={data:new_data}
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({ "data":new_data})) //xhr.send(new_data) OR xhr.send(JSON.parse(JSON.stringify(new_data)))
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response);
      localStorage.setItem("id",user_id);
      alert("Your account information has been saved! Thank you for joining the We're Booked community!")
      window.location = 'index.html'
  } else {
      console.log(`Error: ${xhr.status}`);
  } //end of nested else
}; // end of xhr.onload
    }

    //Sign up page!
    function signUp() {
      console.log('Submit')
      var signusername = document.getElementById("signusername").value;
      var signpassword = document.getElementById("signpassword").value;
      var signpassword2 = document.getElementById("signpassword2").value;
      if (signpassword !== signpassword2) {
        alert('Your password and confirmed password are different. Please fill out again.')
        window.location = 'Were_Booked-Sign.html'
      } else {
        signUserSave()
      } //End of else statement
      console.log(signusername + signpassword)
      
      event.preventDefault()
      }

function loadLogout() {
  localStorage.clear();
  window.location = "Were_Booked-Login.html"
}

function loadUserBooksInfo() {

  var select = document.getElementById("selectBook");
  const xhr = new XMLHttpRequest();
  console.log('loadUserBooksInfo function called')
  xhr.open("GET", Were_Booked_pyURL + "/books");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          bookList = xhr.response;
          console.log(bookList)
          for (var i = 0; i < bookList.length; i++) {
              if (user_booksList.indexOf(bookList[i].ISBN) < 0) {
                  continue;
              }

              var el = document.createElement("option");
              el.textContent = bookList[i].name;
              el.value = bookList[i].ISBN;
              select.appendChild(el);

          }
      }
  }
}

function loadMyBooksInfo() {
  var currentUserId = localStorage.getItem("id");
  console.log(currentUserId)
  if (currentUserId === null) {
      window.location = 'Were_Booked-Login.html'
  }

  const xhr = new XMLHttpRequest();
  console.log('User_Books function called')
  xhr.open("GET", Were_Booked_pyURL + "/user_books");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          console.log(user_booksList)
          var currUserBooksList = xhr.response;
          user_booksList = [];
          var currentUserId = localStorage.getItem("id");

          for (i = 0; i < currUserBooksList.length; i++) {
              if (currentUserId == currUserBooksList[i].user_id) {
                  user_booksList.push(currUserBooksList[i].book_id)
              }

          }
          loadUserBooksInfo();
      }
  }
}

function addBookInfo() {
  var ISBN = document.getElementById("selectBook").value;
  var ratings = document.getElementById("ratings").value;
  var notes = document.getElementById("notes").value;
  var currentUserId = localStorage.getItem("id");
  post_ratings(currentUserId,ISBN,ratings);
  post_notes(currentUserId,ISBN,notes);
  event.preventDefault();
}

function post_ratings(currentUserId,ISBN,ratings) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", Were_Booked_pyURL + "/ratings");

    var new_data = [[currentUserId, ISBN, ratings + ' stars', new Date().toJSON()]];

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"data": new_data})) //xhr.send(new_data) OR xhr.send(JSON.parse(JSON.stringify(new_data)))
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
      } else {
          console.log(`Error: ${xhr.status}`);
      } //end of nested else
      event.preventDefault();
  }; // end of xhr.onload
}

function post_notes(currentUserId,ISBN,notes) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", Were_Booked_pyURL + "/notes");

  var new_data = [[currentUserId, ISBN, notes , new Date().toJSON()]];

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"data": new_data})) //xhr.send(new_data) OR xhr.send(JSON.parse(JSON.stringify(new_data)))
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
      } else {
          console.log(`Error: ${xhr.status}`);
      } //end of nested else
      event.preventDefault();
  }; // end of xhr.onload
}


function addAllBookInfo() {
  event.preventDefault();
  var ISBN = document.getElementById("selectBook").value;
  var priority = document.getElementById("priority").value;
  var finishBy = document.getElementById("finishBookBy").value;
      var status = document.getElementById("status").value;

  var currentUserId = localStorage.getItem("id");
  post_user_books(currentUserId,ISBN,priority,finishBy,status)
}

function loadBookInfo() {
    var select = document.getElementById("selectBook");
  const xhr = new XMLHttpRequest();
  console.log('loadUserBooksInfo function called')
  xhr.open("GET", Were_Booked_pyURL + "/books");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          bookList = xhr.response;
          for (var i = 0; i < bookList.length; i++) {
              var el = document.createElement("option");
              el.textContent = bookList[i].name;
              el.value = bookList[i].ISBN;
              select.appendChild(el);
          }
      }
  }
}

function post_user_books(currentUserId,ISBN,priority,finishBy,status) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", Were_Booked_pyURL + "/user_books");

    var new_data = [[currentUserId, ISBN, priority,finishBy,status]];

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"data": new_data})) //xhr.send(new_data) OR xhr.send(JSON.parse(JSON.stringify(new_data)))
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
      } else {
          console.log(`Error: ${xhr.status}`);
      } //end of nested else
  }; // end of xhr.onload
}
