const books = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        available: true,
        publishedYear: 1960
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        description: "1984 is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        available: true,
        publishedYear: 1949
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        available: false,
        publishedYear: 1925
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Fiction",
        description: "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        available: true,
        publishedYear: 1813
    },
    {
        id: 5,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        description: "A Brief History of Time: From the Big Bang to Black Holes is a popular-science book on cosmology by English physicist Stephen Hawking. It was first published in 1988. Hawking wrote the book for readers without prior knowledge of the universe and people who are just interested in learning something new.",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        available: true,
        publishedYear: 1988
    },
    {
        id: 6,
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "Biography",
        description: "The Diary of a Young Girl, also known as The Diary of Anne Frank, is a book of the writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.",
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        available: false,
        publishedYear: 1947
    }
];

// DOM Elements
const featuredBooksGrid = document.getElementById('featured-books-grid');
const modal = document.getElementById('book-modal');
const closeButton = document.querySelector('.close-button');
const modalBookDetails = document.getElementById('modal-book-details');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize the application
function init() {
    displayFeaturedBooks();
    setupEventListeners();
}

// Display featured books
function displayFeaturedBooks() {
    featuredBooksGrid.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = createBookCard(book);
        featuredBooksGrid.appendChild(bookCard);
    });
}

// Create a book card element
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;
    
    bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${book.coverImage}" alt="${book.title}">
        </div>
        <div class="book-info">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <span class="category">${book.category}</span>
            <p class="rating">★ ${book.rating.toFixed(1)}</p>
            <div class="status">
                <span class="${book.available ? 'available' : 'unavailable'}">
                    ${book.available ? 'Available' : 'Borrowed'}
                </span>
                <button class="btn btn-primary">View Details</button>
            </div>
        </div>
    `;
    
    return bookCard;
}

// Setup event listeners
function setupEventListeners() {
    // Book card click event
    featuredBooksGrid.addEventListener('click', (e) => {
        const bookCard = e.target.closest('.book-card');
        if (bookCard) {
            const bookId = parseInt(bookCard.dataset.id);
            const book = books.find(b => b.id === bookId);
            if (book) {
                showBookDetails(book);
            }
        }
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Category card click event
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            alert(`You clicked on the ${category} category. This would navigate to the ${category} books page.`);
        });
    });
    
    // Search form submission
    const searchContainer = document.querySelector('.search-container');
    searchContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = searchContainer.querySelector('input');
        alert(`You searched for: ${searchInput.value}`);
    });
    
    // Prevent default form submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => e.preventDefault());
    });
}

// Show book details in modal
function showBookDetails(book) {
    modalBookDetails.innerHTML = `
        <div class="book-details">
            <div class="book-details-cover">
                <img src="${book.coverImage}" alt="${book.title}">
            </div>
            <div class="book-details-info">
                <h2>${book.title}</h2>
                <p class="author">by ${book.author}</p>
                <span class="category">${book.category}</span>
                <p class="rating">★ ${book.rating.toFixed(1)}</p>
                <p class="description">${book.description}</p>
                <p class="status">Status: <span class="${book.available ? 'available' : 'unavailable'}">${book.available ? 'Available' : 'Borrowed'}</span></p>
                <p>Published: ${book.publishedYear}</p>
                <div class="book-details-actions">
                    ${book.available ? 
                        '<button class="btn btn-primary">Borrow Book</button>' : 
                        '<button class="btn btn-secondary">Join Waitlist</button>'}
                    <button class="btn btn-secondary">Add to Favorites</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);