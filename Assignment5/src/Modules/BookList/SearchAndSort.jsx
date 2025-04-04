import { useState, useEffect } from "react";

/**
 * Search component allows the user to filter out the books according to the book's title or author
 * Sort component allows the user to sort the book list in the ascending/descending order of author, title or rating
 *
 * @param {Object} props - Component props
 * @param {Book[]} props.books - Array of book objects to filter and sort
 * @param {Function} props.onFilteredBooksChange - Callback function to return the filtered and sorted books
 *
 * @returns {JSX.Element} Rendered SearchAndSort component with filter and sorting options
 */
const SearchAndSort = ({
  books,
  onFilteredBooksChange,
}) => {

  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [sortOption, setSortOption] = useState("NO_SORTING");
  const [triggerSubmit, setTriggerSubmit] = useState(false); // submit trigger

  useEffect(() => {
    // Execute function if triggerSubmit is true
    if (triggerSubmit) {
      // Sorting and filtering
      const filteredBooks = books.filter((book) => {
        if (!searchText) return books; // No filtertext -> return all books
        return book[searchOption]?.toString().toLowerCase().includes(searchText.toLowerCase());
      });

      const sortedBooks = filteredBooks.sort((a, b) => {
        if (sortOption === "NO_SORTING") return 0;

        const field = sortOption.split("_")[0].toLowerCase();
        const order = sortOption.endsWith("ASCENDING") ? 1 : -1;

        if (field === "rating") {
          const ratingA = a.rating || 1;
          const ratingB = b.rating || 1;
          return (ratingA - ratingB) * order;
        }
        if (a[field].toString().toLowerCase() < b[field].toString().toLowerCase()) return -1 * order;
        if (a[field].toString().toLowerCase() > b[field].toString().toLowerCase()) return 1 * order;
        return 0;
      });

      onFilteredBooksChange(sortedBooks);
      setTriggerSubmit(false);
    }
  }, [triggerSubmit, books, searchText, searchOption, sortOption, onFilteredBooksChange]);

  /**
   * Handles form submission and triggers the filtering and sorting of books
   */
  const handleSubmit = () => {
    setTriggerSubmit(true);
  };

  /**
   * Resets the search and sort options to their default values
   */
  const handleReset = () => {
    setSearchText("");
    setSearchOption("title");
    setSortOption("NO_SORTING");
    setTriggerSubmit(false);
    onFilteredBooksChange(books);
  };

  return (
    <div>
      <div className="form-row">
        <div className="form-group col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="form-group col-sm-3">
          <select
            className="form-control"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
          </select>
        </div>
        <div className="form-group col-sm-3">
          <select
            className="form-control"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="NO_SORTING">No Sorting</option>
            <option value="TITLE_ASCENDING">Title Ascending</option>
            <option value="TITLE_DESCENDING">Title Descending</option>
            <option value="AUTHOR_ASCENDING">Author Ascending</option>
            <option value="AUTHOR_DESCENDING">Author Descending</option>
            <option value="RATING_ASCENDING">Rating Ascending</option>
            <option value="RATING_DESCENDING">Rating Descending</option>
          </select>
        </div>
        <div className="form-group col-6 col-sm-1">
          <button className="btn btn-primary btn-block" onClick={handleSubmit}>
            <i className="fa fa-check"></i>
          </button>
        </div>
        <div className="form-group col-6 col-sm-1">
          <button className="btn btn-secondary btn-block" onClick={handleReset}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
