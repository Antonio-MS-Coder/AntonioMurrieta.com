// Book Library Data Management
// Add new books to this array to display them on the library page

const books = [
    {
        id: 1,
        title: "No Longer Human",
        author: "Osamu Dazai",
        category: "philosophy",
        rating: 5,
        coverImage: "book-covers/no-longer-human.jpg", // Add image to book-covers folder
        coverEmoji: "📚", // Fallback if no image
        coverGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        summary: "A profound exploration of alienation and the human condition. Dazai's masterpiece delves into the psyche of a man who feels disconnected from humanity.",
        tags: ["Philosophy", "Japanese", "Classic"],
        yearRead: 2024,
        recommendedFor: "Those interested in existential philosophy and Japanese literature",
        keyTakeaways: [
            "The struggle of authentic self-expression in society",
            "The masks we wear to fit in",
            "The cost of alienation from one's true self"
        ],
        favoriteQuote: "Mine has been a life of much shame.",
        personalNotes: "A haunting exploration of what it means to be human in modern society.",
        purchaseLink: "https://www.amazon.com/dp/0811204812" // Optional
    },
    {
        id: 2,
        title: "Before the Coffee Gets Cold",
        author: "Toshikazu Kawaguchi",
        category: "fiction",
        rating: 4,
        coverImage: "book-covers/before-coffee-cold.jpg",
        coverEmoji: "☕",
        coverGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        summary: "A magical story about a Tokyo café where customers can travel back in time, exploring themes of regret, love, and the importance of living in the present.",
        tags: ["Fiction", "Time Travel", "Japanese"],
        yearRead: 2024,
        recommendedFor: "Readers who enjoy magical realism and emotional stories",
        keyTakeaways: [
            "The importance of living in the present",
            "You cannot change the past, but you can change how you feel about it",
            "Small moments can have profound meaning"
        ],
        favoriteQuote: "The present doesn't last long. That's why we have to do what we want to do now.",
        personalNotes: "A beautiful meditation on time, regret, and acceptance."
    },
    {
        id: 3,
        title: "What I Know For Sure",
        author: "Oprah Winfrey",
        category: "self-help",
        rating: 5,
        coverImage: "book-covers/what-i-know.jpg",
        coverEmoji: "🌟",
        coverGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        summary: "Oprah's insights on gratitude, possibility, awe, clarity, and power. A collection of wisdom gained through experience and reflection.",
        tags: ["Self-Help", "Memoir", "Inspiration"],
        yearRead: 2024,
        recommendedFor: "Anyone seeking inspiration and life wisdom",
        keyTakeaways: [
            "The power of gratitude in transforming your life",
            "Living with intention and purpose",
            "The importance of self-awareness and growth"
        ],
        favoriteQuote: "What I know for sure is that what you give comes back to you.",
        personalNotes: "Profound wisdom delivered with warmth and authenticity."
    },
    {
        id: 4,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "philosophy",
        rating: 5,
        coverImage: "book-covers/alchemist.jpg",
        coverEmoji: "🧭",
        coverGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        summary: "A mystical story about following your dreams. Santiago's journey teaches us about listening to our hearts and recognizing opportunity.",
        tags: ["Philosophy", "Adventure", "Classic"],
        yearRead: 2023,
        recommendedFor: "Dreamers and seekers on their personal journey",
        keyTakeaways: [
            "When you want something, the universe conspires to help you",
            "The journey is as important as the destination",
            "Personal legends are achievable through persistence"
        ],
        favoriteQuote: "And, when you want something, all the universe conspires in helping you to achieve it.",
        personalNotes: "A timeless tale that speaks to the dreamer in all of us."
    },
    {
        id: 5,
        title: "Zero to One",
        author: "Peter Thiel",
        category: "business",
        rating: 4,
        coverImage: "book-covers/zero-to-one.jpg",
        coverEmoji: "💡",
        coverGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        summary: "Notes on startups and how to build the future. Thiel challenges conventional thinking about innovation and competition in business.",
        tags: ["Business", "Startups", "Innovation"],
        yearRead: 2024,
        recommendedFor: "Entrepreneurs and innovators",
        keyTakeaways: [
            "Monopoly is the condition of every successful business",
            "Competition is for losers",
            "Start small and monopolize"
        ],
        favoriteQuote: "Madness is rare in individuals—but in groups, parties, nations, and ages it is the rule.",
        personalNotes: "Contrarian thinking that challenges Silicon Valley orthodoxy."
    },
    {
        id: 6,
        title: "Life 3.0",
        author: "Max Tegmark",
        category: "technology",
        rating: 5,
        coverImage: "book-covers/life-3.jpg",
        coverEmoji: "🤖",
        coverGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        summary: "An exploration of AI and its implications for the future of life. Tegmark examines scenarios for humanity in the age of artificial intelligence.",
        tags: ["Technology", "AI", "Future"],
        yearRead: 2024,
        recommendedFor: "Those interested in AI's impact on humanity",
        keyTakeaways: [
            "AI safety is crucial for humanity's future",
            "We need to think carefully about AI alignment",
            "The future of intelligence may be substrate-independent"
        ],
        favoriteQuote: "We're the guardians of the future of life now as we shape the age of AI.",
        personalNotes: "Essential reading for understanding our AI-driven future."
    },
    {
        id: 7,
        title: "Meditations",
        author: "Marcus Aurelius",
        category: "philosophy",
        rating: 5,
        coverImage: "book-covers/meditations.jpg",
        coverEmoji: "🏛️",
        coverGradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        summary: "Personal writings of the Roman Emperor on Stoic philosophy. Timeless wisdom on virtue, mortality, and the nature of human existence.",
        tags: ["Philosophy", "Stoicism", "Classic"],
        yearRead: 2023,
        recommendedFor: "Anyone seeking timeless wisdom and personal growth",
        keyTakeaways: [
            "You have power over your mind, not outside events",
            "Waste no more time arguing what a good person should be. Be one",
            "What we do now echoes in eternity"
        ],
        favoriteQuote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        personalNotes: "2000-year-old wisdom that remains profoundly relevant."
    },
    {
        id: 8,
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        category: "fiction",
        rating: 4,
        coverImage: "book-covers/norwegian-wood.jpg",
        coverEmoji: "🌙",
        coverGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        summary: "A nostalgic story of loss and burgeoning sexuality. Murakami's poignant exploration of love and loneliness in 1960s Tokyo.",
        tags: ["Fiction", "Romance", "Japanese"],
        yearRead: 2024,
        recommendedFor: "Fans of literary fiction and Japanese literature",
        keyTakeaways: [
            "The complexity of human relationships",
            "How memory shapes our present",
            "The beauty in melancholy"
        ],
        favoriteQuote: "Death is not the opposite of life, but a part of it.",
        personalNotes: "Beautifully melancholic exploration of youth and loss."
    },
    {
        id: 9,
        title: "The Creative Act",
        author: "Rick Rubin",
        category: "creativity",
        rating: 5,
        coverImage: "book-covers/creative-act.jpg",
        coverEmoji: "🎨",
        coverGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        summary: "A beautiful exploration of the creative process from legendary music producer Rick Rubin. Insights on how to access creativity in all aspects of life.",
        tags: ["Creativity", "Art", "Music"],
        yearRead: 2024,
        currentlyReading: true,
        progress: 65,
        recommendedFor: "Artists, creators, and anyone seeking to live more creatively",
        keyTakeaways: [
            "Creativity is not a rare ability, it is a way of operating",
            "The universe is constantly creating, we're just tuning in",
            "Trust the process over the outcome"
        ],
        favoriteQuote: "The artist's goal is not merely to produce, but to make the finest work they are capable of making.",
        personalNotes: "Currently reading - transforming how I think about creativity."
    }
    // Add more books here following the same structure
];

// Function to get currently reading book
function getCurrentlyReading() {
    return books.find(book => book.currentlyReading === true);
}

// Function to get books by category
function getBooksByCategory(category) {
    if (category === 'all') return books;
    return books.filter(book => book.category === category);
}

// Function to search books
function searchBooks(searchTerm) {
    const term = searchTerm.toLowerCase();
    return books.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.summary.toLowerCase().includes(term) ||
        book.tags.some(tag => tag.toLowerCase().includes(term))
    );
}

// Function to get book statistics
function getBookStats() {
    const totalBooks = books.length;
    const categories = [...new Set(books.map(book => book.category))];
    const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / totalBooks;
    const booksThisYear = books.filter(book => book.yearRead === new Date().getFullYear()).length;
    
    return {
        total: totalBooks,
        categories: categories.length,
        averageRating: averageRating.toFixed(1),
        booksThisYear: booksThisYear,
        booksPerYear: 52 // Target
    };
}

// Export for use in library.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { books, getCurrentlyReading, getBooksByCategory, searchBooks, getBookStats };
}