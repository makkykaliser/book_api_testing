google.books.load();

function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('ISBN:0738531367');
}



async function searchByString(string) {
    const result = await axios({
        method: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q='+string,
    });
    console.log(result);

    displayBookList(result);

    return result;
}

function displayBook(book) {
    var result = `<div class="bookPreview"><img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Cover of ${book.volumeInfo.title}">
    <h3>${book.volumeInfo.title}</h3>
    <h4>${book.volumeInfo.authors[0]}</h4>
    <p>${book.volumeInfo.description}</p>
    <p>ISBN (13): ${book.volumeInfo.industryIdentifiers.filter(isbn => isbn.type=='ISBN_13')[0].identifier}</p>
    <button type="button" id="${book.accessInfo.id}">View</button></div>`;
    $('#searchList').append(result);
}

function displayBookList(htmlResponse) {
    htmlResponse.data.items.forEach((book) => {
        displayBook(book);
    });
}

var s = searchByString('gamer');



google.books.setOnLoadCallback(initialize);