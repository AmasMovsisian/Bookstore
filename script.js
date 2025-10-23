function init() {
  loadBooksFromLocalStorage();
  renderBooks();
}

function renderBooks() {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const card = document.createElement("div");
    card.className = "book_card";
    let commentsHtml = "";
    for (let j = 0; j < book.comments.length; j++) {
      const comment = book.comments[j];
      commentsHtml += getHTMLComments(comment);
    }
    const commentsTitle = checkComments(book);
    card.innerHTML = getCardHTML(book, i, commentsHtml, commentsTitle);
    container.appendChild(card);
  }
}

function checkComments(book) {
  const hasComments = book.comments && book.comments.length > 0;
  return hasComments ? "Kommentare" : "Noch keine Kommentare";
}

function toggleLike(index) {
  const book = books[index];
  if (book.liked) {
    book.liked = false;
    book.likes--;
  } else {
    book.liked = true;
    book.likes++;
  }
  saveBooksToLocalStorage();
  renderBooks();
}

function addComment(index) {
  const nameInput = document.getElementById("name-" + index);
  const commentInput = document.getElementById("comment-" + index);
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  if (name && comment) {
    books[index].comments.push({ name: name, comment: comment });
    nameInput.value = "";
    commentInput.value = "";
    saveBooksToLocalStorage();
    renderBooks();
  }
}

function saveBooksToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}
