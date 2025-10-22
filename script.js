function init() {
  loadBooksFromLocalStorage();
  renderBooks();
}

function getCardHTML(book, i, commentsHtml) {
  return `
    <h2>${book.name}</h2>
    <img class="bookPNG" src="./assets/Book_png.png" alt="book" />
    <div class="priceLike">
      <p class="price_value"><strong class="price">Preis:</strong> ${book.price.toFixed(2)} €</p>
      <p>
        <span class="like_BTN ${book.liked ? 'liked' : ''}" onclick="toggleLike(${i})" id="like-${i}">
        ${book.liked ? '❤️' : '♡'} ${book.likes}
        </span>
      </p>
    </div>
    <div class="author_sec">
    <p><strong>Autor:</strong> ${book.author}</p>
    <p><strong>Erscheinungsjahr:</strong> ${book.publishedYear}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    </div>
    <div class="comments">
      <h4>Kommentare:</h4>
      ${commentsHtml}
    </div>
    <div class="comment-section">
      <input class="comments_inputs" type="text" placeholder="Dein Name" id="name-${i}">
      <input class="comments_inputs" type="text" placeholder="Schreibe dein Kommentar..." id="comment-${i}">
      <button class="send_BTN" onclick="addComment(${i})">Senden</button>
    </div>
  `;
}

function renderBooks() {
  var container = document.getElementById('bookContainer');
  container.innerHTML = '';

  for (var i = 0; i < books.length - 1; i++) {
    var book = books[i];

    var card = document.createElement('div');
    card.className = 'book_card';

    var commentsHtml = '';
    for (var j = 0; j < book.comments.length; j++) {
      var comment = book.comments[j];
      commentsHtml += '<p><strong class="commenter">' + comment.name + '</strong> <br> ' + comment.comment + ' <br><br> </p>';
    }

    card.innerHTML = getCardHTML(book, i, commentsHtml);
    container.appendChild(card);
  }
}

function toggleLike(index) {
  var book = books[index];

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
  var nameInput = document.getElementById('name-' + index);
  var commentInput = document.getElementById('comment-' + index);

  var name = nameInput.value.trim();
  var comment = commentInput.value.trim();

  if (name && comment) {
    books[index].comments.push({ name: name, comment: comment });

    nameInput.value = '';
    commentInput.value = '';

    saveBooksToLocalStorage();
    renderBooks();
  }
}

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  var storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}
