import { BookManager } from "../model/BookManager.js";
import { ThemeSwitcher } from "../userInterface/ThemeSwitcher.js";
import { BooksList } from "../view/BooksList.js";
import { AddBook } from "../view/AddBook.js";
import { BookDetail } from "../view/BookDetail.js";
import { Router } from "./Router.js";

export function Controller() {
  const bookManager = BookManager();

  // start ThemeSwitcher
  ThemeSwitcher();

  const booksListView = BooksList();
  const addBookView = AddBook();
  const bookDetailView = BookDetail();

  const router = Router();
  registerRoutes();
  router.determineCurrentRouteAndExecuteCallback(); // triggers initial view rendering

  function registerRoutes() {
    router.addRoute("#/books", executeBookListRoute);
    router.addRoute("#/addBooks", executeAddBookRoute);
    router.addRoute("#/details", executeBookDetailRoute);
  }

  function executeBookDetailRoute() {
    const isbn = getBookIsbnFromHash();
    const book = bookManager.getBook(isbn);
    bookDetailView.renderView(book);
  }

  function handleSearch() {
    document
      .getElementById("searchSortButton")
      .addEventListener("click", function () {
        let searchText = document.forms[0].inputSearchText.value;
        let sanitizedInput = booksListView.sanitizeInput(searchText);
        let searchOption = booksListView.getDropdown("searchOption");
        let sortOption = booksListView.getDropdown("sortOption");
        const filteredBooks = filterBooks(sanitizedInput, searchOption);
        const sortedBooks = sortBooks(filteredBooks, sortOption);
        // Remove Table
        booksListView.removeTable();
        // Pass filtered and sorted books to the view
        booksListView.addBooksToTable(sortedBooks);
        handleDetails();
        handleDelete();
        handleReset();
      });
  }
  function handleDetails() {
    console.log("clicked");
    const $detailButtons = document.querySelectorAll(".detail-button");

    for (const element of $detailButtons) {
      const $detailButton = element;
      $detailButton.addEventListener("click", function () {
        const isbn = $detailButton.dataset.isbn;
        location.hash = "#/details/" + isbn;
      });
    }
  }

  function handleDelete() {
    const $deleteButtons = document.querySelectorAll(".remove-button");
    console.log("clicked Delete");
    for (const element of $deleteButtons) {
      const $deleteButton = element;
      $deleteButton.addEventListener("click", function () {
        const isbn = $deleteButton.dataset.isbn;
        booksListView.removeBook(isbn);
        removeBook(isbn);
      });
    }
  }
  function handleReset() {
    document
      .getElementById("resetButton")
      .addEventListener("click", function () {
        const books = bookManager.getBooks();
        booksListView.renderView(books);
        handleSearch();
        handleDetails();
        handleDelete();
      });
  }

  function executeBookListRoute() {
    const books = bookManager.getBooks();
    booksListView.renderView(books);
    handleSearch();
    handleDetails();
    handleDelete();
    handleReset();
  }

  function filterBooks(textInput, searchOption) {
    let books = bookManager.getBooks();

    if (searchOption === "title") {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(textInput.toLowerCase())
      );
    } else if (searchOption === "author") {
      books = books.filter((book) =>
        book.author.toLowerCase().includes(textInput.toLowerCase())
      );
    } else if (searchOption === "isbn") {
      books = books.filter((book) =>
        book.isbn.toLowerCase().includes(textInput.toLowerCase())
      );
    }

    return books;
  }

  function sortBooks(books, sortOption) {
    let sortedBooks;

    if (sortOption === "titleAsc") {
      sortedBooks = books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "titleDesc") {
      sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "authorAsc") {
      sortedBooks = books.sort((a, b) => b.author.localeCompare(a.author));
    } else if (sortOption === "authorDesc") {
      sortedBooks = books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortOption === "noSort") {
      sortedBooks = books;
    }

    return sortedBooks;
  }

  function executeAddBookRoute() {
    addBookView.renderView();
    addBookView.bindAddBookButtonClick(function () {
      try {
        const input = addBookView.getFormInputs();

        // Add Book to Store
        bookManager.addBook(
          input.title,
          input.author,
          input.isbn,
          input.description
        );

        addBookView.addBook();

        // Go to books view
        location.hash = "#/books";
      } catch (error) {
        addBookView.addBook(error);
      }
    });
  }

  function getBookIsbnFromHash() {
    const hash = location.hash;

    const hashParts = hash.split("/");
    const isbn = hashParts[hashParts.length - 1];

    return isbn;
  }

  function removeBook(isbn) {
    // Remove Book from store
    bookManager.removeBook(isbn);
    booksListView.removeBook(isbn);
  }
}
