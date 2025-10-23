function getCardHTML(book, i, commentsHtml, commentsTitle) {
  return `
    <h2>${book.name}</h2>
    <img class="bookPNG" src="./assets/Book_png.png" alt="book" />

    <div class="priceLike">
      <p class="price_value">
        <strong class="price">Preis:</strong> ${book.price.toFixed(2)} €
      </p>
      <p>
        <span 
          class="like_BTN ${book.liked ? "liked" : ""}" 
          onclick="toggleLike(${i})" 
          id="like-${i}">
          ${book.liked ? "❤️" : "♡"} ${book.likes}
        </span>
      </p>
    </div>

    <div class="author_sec">
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Erscheinungsjahr:</strong> ${book.publishedYear}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
    </div>

    <div class="comments overflow-y: auto" tabindex="0"">
      <h4>${commentsTitle}</h4>
      ${commentsHtml}
    </div>

    <div class="comment-section">
      <input class="comments_inputs" type="text" placeholder="Dein Name" id="name-${i}">
      <input class="comments_inputs" type="text" placeholder="Schreibe dein Kommentar..." id="comment-${i}">
      <button class="send_BTN" onclick="addComment(${i})">Senden</button>
    </div>
  `;
}

function getHTMLComments(comment) {
  return `
        <p>
          <strong class="commenter">${comment.name}</strong><br>
          ${comment.comment}<br><br>
        </p>
      `;
}
