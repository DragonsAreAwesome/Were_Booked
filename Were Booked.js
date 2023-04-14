const loginStatus = false;
const bookList = [{
  name: 'The Unwanteds',
  author: 'Lisa McMann',
  dateOfPublication: 'August 30, 2011',
  genre: ['Fantasy Fiction, Dystopian'],
  linkToAmazon: 'https://www.amazon.com/Unwanteds-Lisa-McMann/dp/1442407697',
  description: 'Every year in Quill, thirteen-year-olds are sorted into categories: the strong, intelligent Wanteds go to university, and the artistic Unwanteds are sent to their deaths…',
  ISBN: 9781442407695,
}]
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
    }

    function addNote() {
      var note = document.getElementById("note").value
      document.getElementById("printNote").innerHTML = note
      console.log(note)
    }