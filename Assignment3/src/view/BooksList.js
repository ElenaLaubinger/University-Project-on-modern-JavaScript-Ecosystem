import { Animator } from "../userInterface/Animator.js";

export function BooksList() {
  const $viewSpace = document.querySelector("#viewSpace");

  const animator = Animator();

  function renderView(books) {
    const view = `
      <div class="container mt-2">
        <form class="mt-4">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputSearchText" id="accessibilityLabel">Search Text</label>
              <input type="text" class="form-control" id="inputSearchText" name="inputSearchText" placeholder="Search Text">
            </div>
            <div class="form-group col-md-3">
              <label for="searchOption" id="accessibilityLabel">Search Option</label>
              <select name="searchOption" id="searchOption" class="form-control">
                <option selected value="title">Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="sortOption" id="accessibilityLabel">Sort Option</label>
              <select name="sortOption" id="sortOption" class="form-control">
                <option selected value="noSort">No sorting</option>
                <option value="titleAsc">Title Ascending</option>
                <option value="titleDesc">Title Descending</option>
                <option value="authorAsc">Author Ascending</option>
                <option value="authorDesc">Author Descending</option>
              </select>
            </div>
            <div class="col-md-2">
              <button type="button" id="searchSortButton" class="btn btn-success pl-3 pr-3"><i class="fa fa-check"></i></button>
              <button type="reset" id="resetButton" class="btn btn-danger pl-3 pr-3 ml-1">✖</button>
            </div>
          </div>
        </form>
        <table class="table table-striped mt-5">
          <thead>
           <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="book-list"></tbody>
        </table>
      </div>
      `;

    $viewSpace.innerHTML = view;
    addBooksToTable(books);
  }


  function getDropdown(dropdownName) {
    // Get dropdown values of form
    const item = document.forms[0][dropdownName].selectedIndex;
    const result = document.forms[0][dropdownName].options[item].value;
    return result;
  }

  function sanitizeInput(input) {
    // Remove special characters and morph to lower case
    return input.replace(/[/\\#,+()$~%.^'"*<>{}]/g, "");
  }


  function addBooksToTable(books) {
    books.forEach(function (book) {
      addBookAsTableRow(book);
    });
  }

  function addBookAsTableRow(book) {
    const $bookList = document.querySelector("#book-list");
    const $row = document.createElement("tr");
    $row.setAttribute("data-isbn", book.isbn);

    $row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
        `;

    const $deleteCell = createDeleteCell(book.isbn);
    const $detailCell = createDetailCell(book.isbn);

    $row.appendChild($detailCell);
    $row.appendChild($deleteCell);

    $bookList.insertBefore($row, $bookList.firstChild);
  }

  function createDetailCell(isbn) {
    const $detailCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.setAttribute("data-isbn", isbn);
    $link.classList.add("fas", "fa-eye", "text-primary", "detail-button");

    $detailCell.appendChild($link);

    return $detailCell;
  }

  function createDeleteCell(isbn) {
    const $deleteCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.classList.add("fas", "fa-trash", "text-primary", "remove-button");
    $link.setAttribute("data-isbn", isbn);

    $deleteCell.appendChild($link);

    return $deleteCell;
  }

  function removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    function remove() {
      $bookToRemove.remove();
    }

    animator.moveToRight($bookToRemove, remove);
  }

  function removeTable() {
    const $tableToRemove = document.querySelector("#book-list");
    $tableToRemove.innerHTML = ``;
  }

  return {
    removeBook: removeBook,
    removeTable: removeTable,
    addBooksToTable: addBooksToTable,
    renderView: renderView,
    sanitizeInput: sanitizeInput,
    getDropdown: getDropdown,
  };
}
