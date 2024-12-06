const SORT_OPTIONS = {
  NO_SORTING: "no-sorting",
  TITLE_ASCENDING: "title-ascending",
  TITLE_DESCENDING: "title-descending",
  AUTHOR_ASCENDING: "author-ascending",
  AUTHOR_DESCENDING: "author-descending",
};

const sortBooksAscending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return -1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return 1;
    }

    return 0;
  });

  return books;
};

const sortBooksDescending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return 1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return -1;
    }

    return 0;
  });

  return books;
};

const sortBooksBySortOption = (books, sortOption) => {
  if (sortOption === SORT_OPTIONS.NO_SORTING) {
    return books;
  }

  if (sortOption === SORT_OPTIONS.TITLE_ASCENDING) {
    return sortBooksAscending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.TITLE_DESCENDING) {
    return sortBooksDescending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_ASCENDING) {
    return sortBooksAscending(books, "author");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_DESCENDING) {
    return sortBooksDescending(books, "author");
  }

  return books;
};

export { SORT_OPTIONS, sortBooksBySortOption };
