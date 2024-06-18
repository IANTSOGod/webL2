document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('book-form')) {
        document.getElementById('book-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const titre = document.getElementById('title').value;
            const auteurs = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
            const genre = document.getElementById('genre').value;
            const editeur = document.getElementById('publisher').value;
            const datePublication = document.getElementById('date').value;
            const nombrePages = document.getElementById('pages').value;
            const resume = document.getElementById('summary').value;
            const langue = document.getElementById('language').value;
            const disponibilite = document.getElementById('availability').value;
            const etat = document.getElementById('condition').value;
            const emplacement = document.getElementById('location').value;
            const imageFile = document.getElementById('image').files[0]; // Récupère le fichier d'image

            // Validation simple des champs
            if (!titre || !auteurs || !isbn || !imageFile) {
                alert("Veuillez remplir tous les champs requis.");
                return;
            }

            // Convertir l'image en base64 pour la sauvegarde locale
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                addBook(titre, auteurs, isbn, genre, editeur, datePublication, nombrePages, resume, langue, disponibilite, etat, emplacement, base64Image);
            };
            reader.readAsDataURL(imageFile);
        });
    }

    if (document.getElementById('books')) {
        fetchBooks();
        
        document.getElementById('search').addEventListener('input', function(event) {
            const query = event.target.value.toLowerCase();
            const books = JSON.parse(localStorage.getItem('livres')) || [];
            const filteredBooks = books.filter(book =>
                book.titre.toLowerCase().includes(query) ||
                book.auteurs.join(', ').toLowerCase().includes(query) ||
                book.isbn.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query) ||
                book.editeur.toLowerCase().includes(query) ||
                book.datePublication.includes(query) || // La date n'est pas en format texte dans l'exemple JSON
                book.nombrePages.toString().includes(query) || // Nombre de pages en chaîne de caractères
                book.resume.toLowerCase().includes(query) ||
                book.langue.toLowerCase().includes(query) ||
                book.disponibilite.toLowerCase().includes(query) ||
                book.etat.toLowerCase().includes(query) ||
                book.emplacement.toLowerCase().includes(query)
            ); displayFilteredBooks(filteredBooks);
            paginate(filteredBooks);
        });

        document.getElementById('back-button').addEventListener('click', function() {
            window.location.href="affiche.html";
        });
    }
});



function fetchBooks() {
    fetch('assets/js/livre.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau lors du chargement du fichier JSON');
            }
            return response.json();
        })
        .then(data => {
            if (!localStorage.getItem('livres')) {
                localStorage.setItem('livres', JSON.stringify(data.livres));
            }
            displayBooks();
            paginate(JSON.parse(localStorage.getItem('livres')) || []);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des livres via fetch:', error);
            // En cas d'erreur, mettre les données par défaut dans localStorage
            const defaultBooks = {
                livres: [
                    {
                        "titre": "Le Seigneur des Anneaux",
                        "auteurs": ["J.R.R. Tolkien"],
                        "isbn": "978-2070612884",
                        "image": "assets/img/img1.jpg",
                        "editeur": "Gallimard",
                        "datePublication": "1954-1955",
                        "genre": "Fantasy",
                        "resume": "L'histoire de l'anneau unique et de sa destruction pour sauver la Terre du Milieu.",
                        "langue": "Français",
                        "nombrePages": 1200,
                        "disponibilite": "Disponible",
                        "etat": "Neuf",
                        "emplacement": "Étagère 1"
                    },{
                        "titre": "Le Seigneur des Anneaux",
                        "auteurs": ["J.R.R. Tolkien"],
                        "isbn": "978-2070612884",
                        "image": "assets/img/img2.jpg",
                        "editeur": "Gallimard",
                        "datePublication": "1954-1955",
                        "genre": "Fantasy",
                        "resume": "L'histoire de l'anneau unique et de sa destruction pour sauver la Terre du Milieu.",
                        "langue": "Français",
                        "nombrePages": 1200,
                        "disponibilite": "Disponible",
                        "etat": "Neuf",
                        "emplacement": "Étagère 1"
                      },
                      {
                        "titre": "1984",
                        "auteurs": ["George Orwell"],
                        "isbn": "978-2070373580",
                        "image": "assets/img/img3.jpg",
                        "editeur": "Gallimard",
                        "datePublication": "1949",
                        "genre": "Science-fiction",
                        "resume": "Un monde dystopique où la pensée est contrôlée par un régime totalitaire.",
                        "langue": "Français",
                        "nombrePages": 336,
                        "disponibilite": "Disponible",
                        "etat": "Bon",
                        "emplacement": "Étagère 2"
                      },
                      {
                        "titre": "Pride and Prejudice",
                        "auteurs": ["Jane Austen"],
                        "isbn": "978-0141439518",
                        "image": "assets/img/img4.jpg",
                        "editeur": "Penguin Classics",
                        "datePublication": "1813",
                        "genre": "Romance",
                        "resume": "L'histoire de la relation entre Elizabeth Bennet et Mr. Darcy dans la société anglaise du 19e siècle.",
                        "langue": "Anglais",
                        "nombrePages": 432,
                        "disponibilite": "Disponible",
                        "etat": "Bon",
                        "emplacement": "Étagère 3"
                      },
                      {
                        "titre": "Harry Potter à l'école des sorciers",
                        "auteurs": ["J.K. Rowling"],
                        "isbn": "978-2070541276",
                        "image": "assets/img/img1.jpg",
                        "editeur": "Gallimard Jeunesse",
                        "datePublication": "1997",
                        "genre": "Fantasy",
                        "resume": "Les aventures de Harry Potter lors de sa première année à Poudlard.",
                        "langue": "Français",
                        "nombrePages": 320,
                        "disponibilite": "Disponible",
                        "etat": "Neuf",
                        "emplacement": "Étagère 4"
                      },
                      {
                        "titre": "Les Misérables",
                        "auteurs": ["Victor Hugo"],
                        "isbn": "978-2080706504",
                        "image": "assets/img/img1.jpg",
                        "editeur": "Flammarion",
                        "datePublication": "1862",
                        "genre": "Roman historique",
                        "resume": "Les vies croisées de personnages tels que Jean Valjean et Javert dans la France du 19e siècle.",
                        "langue": "Français",
                        "nombrePages": 1984,
                        "disponibilite": "Disponible",
                        "etat": "Bon",
                        "emplacement": "Étagère 5"
                      },
                      {
                        "titre": "The Great Gatsby",
                        "auteurs": ["F. Scott Fitzgerald"],
                        "isbn": "978-0141182636",
                        "image": "assets/img/img1.jpg",
                        "editeur": "Penguin Classics",
                        "datePublication": "1925",
                        "genre": "Roman",
                        "resume": "Les aspirations et les désillusions de Jay Gatsby dans le Long Island des années 1920.",
                        "langue": "Anglais",
                        "nombrePages": 240,
                        "disponibilite": "Disponible",
                        "etat": "Bon",
                        "emplacement": "Étagère 6"
                      },
                ]
            };
            localStorage.setItem('livres', JSON.stringify(defaultBooks.livres));
            displayBooks();
            paginate(defaultBooks.livres);
        });
}


function displayBooks() {
    const books = JSON.parse(localStorage.getItem('livres')) || [];
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.titre}">
            <div>
                <h3>${book.titre}</h3>
                <p>Auteur: ${book.auteurs.join(', ')}</p>
                <p>ISBN: ${book.isbn}</p>
                <button onclick="showDetails('${book.isbn}')">Détails</button>
                <button onclick="editBook('${book.isbn}')">Modifier</button>
                <button onclick="deleteBook('${book.isbn}')">Supprimer</button>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

function displayFilteredBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.titre}">
            <div>
                <h3>${book.titre}</h3>
                <p>Auteur: ${book.auteurs.join(', ')}</p>
                <p>ISBN: ${book.isbn}</p>
                <button onclick="showDetails('${book.isbn}')">Détails</button>
                <button onclick="editBook('${book.isbn}')">Modifier</button>
                <button onclick="deleteBook('${book.isbn}')">Supprimer</button>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

function showDetails(isbn) {
    const books = JSON.parse(localStorage.getItem('livres')) || [];
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        const detailsContainer = document.getElementById('details');
        detailsContainer.style.display = 'block';
        detailsContainer.innerHTML = `
            <img src="${book.image}" alt="${book.titre}">
            <h2>${book.titre}</h2>
            <p><strong>Auteur(s):</strong> ${book.auteurs.join(', ')}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Éditeur:</strong> ${book.editeur}</p>
            <p><strong>Date de Publication:</strong> ${book.datePublication}</p>
            <p><strong>Nombre de Pages:</strong> ${book.nombrePages}</p>
            <p><strong>Résumé:</strong> ${book.resume}</p>
            <p><strong>Langue:</strong> ${book.langue}</p>
            <p><strong>Disponibilité:</strong> ${book.disponibilite}</p>
            <p><strong>État:</strong> ${book.etat}</p>
            <p><strong>Emplacement:</strong> ${book.emplacement}</p>
        `;
        document.getElementById('log-area').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('pagination').style.display = 'none';
        document.getElementById('books').style.display = 'none';
        document.getElementById('back-button').style.display = 'block';
    }
}

function editBook(isbn) {
    // Redirection vers la page de modification avec l'ISBN du livre
    window.location.href = `modifier.html?isbn=${isbn}`;
}

function deleteBook(isbn) {
    let books = JSON.parse(localStorage.getItem('livres')) || [];
    books = books.filter(book => book.isbn !== isbn);
    localStorage.setItem('livres', JSON.stringify(books));
    displayBooks(); // Mettre à jour l'affichage après la suppression
}

function paginate(books) {
    const itemsPerPage = 5;
    const pages = Math.ceil(books.length / itemsPerPage);

    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let page = 1; page <= pages; page++) {
        const button = document.createElement('button');
        button.classList.add('marge');
        button.innerText = page;
        button.addEventListener('click', function() {
            displayPage(books, page, itemsPerPage);
        });
        paginationContainer.appendChild(button);
    }

    // Afficher la première page par défaut
    displayPage(books, 1, itemsPerPage);
}

function displayPage(books, pageNumber, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedBooks = books.slice(startIndex, endIndex);

    displayFilteredBooks(displayedBooks);
}
