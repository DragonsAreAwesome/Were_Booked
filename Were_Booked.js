        var userList;


function loadHomeBody() {
  loadGroups();
  loadUsers();
}
var groupsList;
function loadGroups() {
  const xhr = new XMLHttpRequest();
  var ul = document.getElementById("groupList");

  xhr.open("GET", "http://127.0.0.1:5000/groups");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          groupsList=xhr.response;
          console.log(groupsList)
          for (i = 0; i < groupsList.length; i++) {
            ul.innerHTML+="<li class='myDIV'>"+groupsList[i].groupName+"<p>"+groupsList[i].groupDescription + "</p></li>"
            console.log(groupsList[i].groupName) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }
function loadUsers() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "http://127.0.0.1:5000/users");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
      if (xhr.status == 200) {
          userList=xhr.response;
          console.log(userList)
          for (i = 0; i < userList.length; i++) {
            console.log(userList[i].id) }
      } else {
          console.log(`Error: ${xhr.status}`);
      }
  };
  }
  var bookList;
  

  function loadBooksPython() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/books");
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
                      var link = 'https://www.w3schools.com'
                    column.innerHTML = "<a href=" + bookList[i].linkToAmazon + ">Link</a>"
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

const loginStatus = false;
const usersname = [['Anissa-Books', 'password', 'rgb(35, 211, 135)'], ['HimicaReads!', 'password', 'rgb(122, 202, 153)']]
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
    };
    function login() {
      // let userName = 'Anissa-Books' || 'HimicaReads!' || 'Programmer-READER'
      let userName = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      switch (true) {
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
      }
      loginStatus ? window.location = "Were_Booked-Home.html" :
      window.location = "Were_Booked-Login.html"
      console.log('login');
      event.preventDefault();
    
    }
    
    function addBook2() {
      console.log('Submit')
      var name = document.getElementById("book_name").value;
      var author = document.getElementById("book_author").value;
      var dateOfPublication = document.getElementById("book_publication").value;
      var genre = document.getElementById("genre");
      var linkToAmazon = document.getElementById("book_link").value;
      var description = document.getElementById("book_description").value;
      var ISBN = document.getElementById("book_id").value;
    bookFactory(name, author, dateOfPublication, genre, linkToAmazon, description, ISBN)
      var i = 0;
      var genre_array=[];
      
      for (i = 0; i < genre.options.length; i++) {
                if (genre.options[i].selected) {
                    console.log(genre.options[i].value)
                  genre_array.push(genre.options[i].value)
                }
    
      }
      console.log(name + author + dateOfPublication + linkToAmazon + description + ISBN)
      
      event.preventDefault()
    }

    function loadBooks() {
      loadBooksPython();
     
    }

    function addNote() {
      var note = document.getElementById("note").value
      document.getElementById("printNote").innerHTML = note
      console.log(note)
    }





    function signUp() {
      console.log('Submit')
      var signusername = document.getElementById("signusername").value;
      var signpassword = document.getElementById("signpassword").value;
      var signpassword2 = document.getElementById("signpassword2").value;
      if (signpassword !== signpassword2) {
        alert('Your password and confirmed password are different. Please fill out again.')
        window.location = 'Were_Booked-Sign.html'
      } else {
        alert("Your account information has been saved! Thank you for joining the We're Booked community!")
        usersname.push(signusername, signpassword)
      }
      console.log(signusername + signpassword)
      
      event.preventDefault()
      }