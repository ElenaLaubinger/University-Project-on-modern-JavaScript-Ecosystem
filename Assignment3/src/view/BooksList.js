import { Animator } from "../userInterface/Animator.js";

export function BooksList(SearchAndSortCallback) {
  const $viewSpace = document.querySelector("#viewSpace");

  const animator = Animator();

  function renderView(books) {
    const view = `
      <div class="container mt-2">
        <form class="mt-4">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputSearchText" id="accessibilityLabel">Search Text</label>
              <input type="text" class="form-control" id="inputSearchText" placeholder="Search Text">
            </div>
            <div class="form-group col-md-3">
              <label for="searchOption" id="accessibilityLabel">Search Option</label>
              <select id="searchOption" class="form-control">
                <option selected value="title">Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="sortOption" id="accessibilityLabel">Sort Option</label>
              <select id="sortOption" class="form-control">
                <option selected value="noSort">No sorting</option>
                <option value="titleAsc">Title Ascending</option>
                <option value="titleDesc">Title Descending</option>
                <option value="authorAsc">Author Ascending</option>
                <option value="authorDesc">Author Descending</option>
              </select>
            </div>
            <div class="col-md-2">
              <button type="submit" id="searchButton" class="btn btn-success pl-3 pr-3"><i class="fa fa-check"></i></button>
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

  function bindSearchButtonClick() {
    const $searchButton = document.querySelector("#searchButton");
    const inputText = document.querySelector("#inputSearchText");
    // Sanitize Input
    const sanitizedInput = sanitizeInput(inputText.value);
    const searchOption = document.querySelector("#searchOption").value;
    const sortOption = document.querySelector("#sortOption").value;

    $searchButton.addEventListener("click", () => {
      // Pass data of form to controller
      SearchAndSortCallback(sanitizedInput, searchOption, sortOption);
    });
  }

  function sanitizeInput(input) {
    // Remove special characters from given input
    return input.replace(/[/\\#,+()$~%.^'"*<>{}]/g, "");
  }

  function bindResetButtonClick(books) {
    const $resetButton = document.querySelector("#resetButton");

    $resetButton.addEventListener("click", () => {
      // Reset of tableview
      renderView(books);
    });
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

  function bindDetailButtonClick(callback) {
    const $detailButtons = document.querySelectorAll(".detail-button");

    for (const element of $detailButtons) {
      const $detailButton = element;
      $detailButton.addEventListener("click", function (event) {
        callback(event);
      });
    }
  }

  function bindRemoveButtonClick(callback) {
    const $removeButtons = document.querySelectorAll(".remove-button");

    for (const element of $removeButtons) {
      const $removeButton = element;
      $removeButton.addEventListener("click", function (event) {
        callback(event);
      });
    }
  }

  function removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    function remove() {
      $bookToRemove.remove();
    }

    animator.moveToRight($bookToRemove, remove);
  }

  function removeTable() {
    /* const tableToRemove = document.querySelector("#book-list");
 */
  }

  return {
    bindSearchButtonClick: bindSearchButtonClick,
    bindResetButtonClick: bindResetButtonClick,
    removeBook: removeBook,
    removeTable: removeTable,
    bindRemoveButtonClick: bindRemoveButtonClick,
    bindDetailButtonClick: bindDetailButtonClick,
    renderView: renderView,
  };
}
