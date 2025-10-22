function init() {
  renderBooks();
}

function renderBooks() {
  var container = document.getElementById('bookContainer');
  container.innerHTML = '';

  for (var i = 0; i < books.length; i++) {
    var book = books[i];

    var card = document.createElement('div');
    card.className = 'book_card';

    var commentsHtml = '';
    for (var j = 0; j < book.comments.length; j++) {
      var comment = book.comments[j];
      commentsHtml += '<p><strong class="commenter">' + comment.name + '</strong>: ' + comment.comment + '</p>';
    }

    card.innerHTML = `
      <h2>${book.name}</h2>
      <img class="bookPNG" src="./assets/Book_png.png" alt="book" />
      <div class="priceLike">
        <p><strong>Preis:</strong> ${book.price.toFixed(2)} €</p>
        <p>
          <span class="like_BTN ${book.liked ? 'liked' : ''}" onclick="toggleLike(${i})" id="like-${i}">
          ❤️ ${book.likes}
          </span>
        </p>
      </div>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Erscheinungsjahr:</strong> ${book.publishedYear}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <div class="comments">
        <h4>Kommentare:</h4>
        ${commentsHtml}
      </div>
      <div class="comment-section">
        <input type="text" placeholder="Dein Name" id="name-${i}">
        <input type="text" placeholder="Schreibe dein Kommentar..." id="comment-${i}">
        <button onclick="addComment(${i})">Senden</button>
      </div>
    `;

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

    renderBooks();
  }
}
