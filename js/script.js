const apiUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?";
/* let agustinKey = "S08Kk"; */

window.addEventListener("load", () => {
  // Get a key
  const buttonGetKey = document.getElementById("buttonGetKey");
  const addKeyBox = document.getElementById("addKeyBox");
  let yourKey = document.getElementById("yourKey");

  buttonGetKey.addEventListener("click", async event => {
    const urlKey = apiUrl + "requestKey";
    const response = await fetch(urlKey);
    const data = await response.json();
    addKeyBox.value = data.key;
  });

  // Let me in

  let buttonLetMeIn = document.getElementById("buttonLetMeIn");
  let loginContainer = document.querySelector(".login-container");
  let noBooks = document.querySelector(".no-books");
  let footer = document.querySelector("footer");
  let header = document.querySelector("header");

  function viewBook(data) {
    data.data.forEach(book => {
      let articleBooks = document.querySelector(".articleBooks");
      articleBooks.className = "articleBooks";

      let newBook = document.createElement("section");
      newBook.className = "newBook";
      articleBooks.appendChild(newBook);

      let h2Book = document.createElement("h2");
      h2Book.className = "h2Book";
      h2Book.innerHTML = book.title;
      newBook.appendChild(h2Book);

      let spanBook = document.createElement("span");
      spanBook.className = "spanBook";
      spanBook.innerHTML = "by " + book.author;
      newBook.appendChild(spanBook);

      let updatedBook = document.createElement("p");
      updatedBook.className = "updatedBook";
      updatedBook.innerHTML = "Updated: " + book.updated;
      newBook.appendChild(updatedBook);

/*       let editBook = document.createElement("img");
      editBook.className = "editBook";
      newBook.appendChild(editBook); */

      let deleteBook = document.createElement("div");
      deleteBook.className = "deleteBook";
      deleteBook.innerHTML = "";
      newBook.appendChild(deleteBook);
    });
  }

/*   let deleteBookButton = document.querySelector(".deleteBook");
  deleteBookButton.addEventListener ("click", async event => {
    async function deleteBook() {
      const deleteUrl = apiUrl + "key=" + myKey + "&op=delete" + "id=" + bookId;
      const response = await fetch(deleteUrl);
      const bookDelete = await response.json();
      console.log(bookDelete);
    }
    deleteBook();
  }); */


  buttonLetMeIn.addEventListener("click", async event => {
    let count = 0;
    async function getBooks() {
      errorField.innerHTML = "";
      yourKey.style.display = "block";
      let myKey = addKeyBox.value;
      yourKey.innerHTML = "Your key is: " + myKey;
      loginContainer.style.display = "none";
      const selectUrl = apiUrl + "key=" + myKey + "&op=select";
      const response = await fetch(selectUrl);
      const data = await response.json();
      if (data.status === "success") {
        noBooks.style.display = "none";
        addBookContainer.style.display = "none";
        viewBook(data);
      } else {
        noBooks.innerHTML =
          "There are no books in this collection. Find books to add to your list by browsing.";
        errorField.innerHTML += " • " + data.message + " • ";
        count++;
        if (count <= 4) {
          getBooks();
        }
      }
    }
    getBooks();
    indexContainer.style.display = "grid";
    header.style.display = "grid";
    footer.style.display = "grid";
  });

  // Add Book View

  let toAddBook = document.getElementById("addBook");
  let buttonAddBook = document.getElementById("buttonAddBook");
  let addTitleBox = document.getElementById("addTitleBox");
  let addAuthorBox = document.getElementById("addAuthorBox");
  let indexContainer = document.querySelector(".index-container");
  let addBookContainer = document.querySelector(".add-book-container");
  let headerAddBook = document.querySelector(".headerAddBook");

  toAddBook.addEventListener("click", async event => {
    indexContainer.style.display = "none";
    addBookContainer.style.display = "grid";
    addTitleBox.style.display = "block";
    addAuthorBox.style.display = "block";
    buttonAddBook.style.display = "block";
    header.style.display = "none";
    headerAddBook.style.display = "grid";
  });

  // Add Book

  let buttonSubmitBook = document.getElementById("buttonAddBook");
  let errorField = document.getElementById("errorField");

  buttonSubmitBook.addEventListener("click", async event => {
    errorField.innerHTML = "";
    let count = 0;
    async function addBook() {
      let myKey = addKeyBox.value;
      const urlAdd =
        apiUrl +
        "key=" +
        myKey +
        "&op=insert&title=" +
        addTitleBox.value +
        "&author=" +
        addAuthorBox.value;
      const response = await fetch(urlAdd);
      const data = await response.json();
      let bookId = data.id;
      if (data.status === "success") {
        noBooks.style.display = "none";
        createBook(bookId);
      } else {
        errorField.innerHTML += " • " + data.message + " • ";
        count++;
        if (count <= 4) {
          addBook();
        }
      }
    }
    addBook();
    addBookContainer.style.display = "none";
    indexContainer.style.display = "grid";
    header.style.display = "grid";
    headerAddBook.style.display = "none";
  });

  //Create New Book

  function createBook(bookId) {
    let articleBooks = document.querySelector(".articleBooks");
    articleBooks.className = "articleBooks";

    let newBook = document.createElement("section");
    newBook.className = "newBook";
    articleBooks.appendChild(newBook);

    let h2Book = document.createElement("h2");
    h2Book.className = "h2Book";
    h2Book.innerHTML = addTitleBox.value;
    newBook.appendChild(h2Book);

    let spanBook = document.createElement("span");
    spanBook.className = "spanBook";
    spanBook.innerHTML = "by " + addAuthorBox.value;
    newBook.appendChild(spanBook);

    let updatedBook = document.createElement("p");
    updatedBook.className = "updatedBook";
    updatedBook.innerHTML = "Recently added";
    newBook.appendChild(updatedBook);

/*     let editBook = document.createElement("div");
    editBook.className = "editBook";
    newBook.appendChild(editBook); */
    let deleteBook = document.createElement("div");
    deleteBook.className = "deleteBook";
    deleteBook.value = bookId;
    newBook.appendChild(deleteBook);
  }

  let toCollection = document.getElementById("toCollection");

  toCollection.addEventListener("click", async event => {
    addBookContainer.style.display = "none";
    indexContainer.style.display = "grid";
    headerAddBook.style.display = "none";
    header.style.display = "grid";
    viewBook(data);
  });
});
