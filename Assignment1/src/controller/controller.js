class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.displayBookList(this.model.getBooks());
        this.navigation();
       
    }

    handleAddBook(title, author, isbn, description) {
        if (this.view.validateForm()) {
        this.model.addBook(title, author, isbn, description);
    }
    }
    handleDeleteBook(index) {
            this.model.deleteBook(index);  // Buch aus dem Modell löschen
           
    }
    showErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.innerText = message;
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');
    
            setTimeout(() => {
                errorMessage.classList.remove('show');
                errorMessage.style.display = 'none';
            }, 3000);
        }
    }

       validateForm(){
            var author = document.getElementById('author').value;
            var title = document.getElementById('title').value;
            var isbn = document.getElementById('isbn').value;
            var description = document.getElementById('description').value;

            if (author === '' || title === '' || isbn === '' || description === '') {
                this.showErrorMessage('Please fill in all fields');
                return false;
            }
            // Regex für gültiges ISBN-Format
            const isbnRegex = /^(?:\d{1,5}-){2}\d{1,7}-[\dX]$/;
            if (!isbnRegex.test(isbn)){
                this.showErrorMessage('Invalid ISBN format. Example: 0-9752298-0-X');
                return false;
            }

            const books = this.model.getBooks(); // Aktuelle Bücherliste abrufen
            const isDuplicate = books.some(book => book.isbn === isbn);
            if (isDuplicate) {
                this.showErrorMessage('This ISBN already exists in the book list.');
                return false; // ISBN ist nicht einzigartig
            }


            var bookListTab = new bootstrap.Tab(document.querySelector('[href="#section1-content"]'));
            bookListTab.show();

            return true;
        }

       navigation(){ document.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                const tabId = tab.getAttribute('href').substring(1);
                const tabContent = document.getElementById(tabId);
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                    this.view.displayAddBookForm();
                });
                document.querySelectorAll('.tab-pane').forEach(content => {
                    content.classList.remove('show','active');
                });
                tab.classList.add('active');
                tabContent.classList.add('show','active');
            });
        });
    }}
