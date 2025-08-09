# Book Covers Directory

This folder contains cover images for the books displayed in the library section.

## How to Add a New Book

1. **Add the book data to `books.js`**:
   - Open the `books.js` file in the root directory
   - Add a new book object to the `books` array
   - Follow the existing structure for consistency

2. **Add the cover image** (optional):
   - Add your book cover image to this `book-covers` folder
   - Recommended format: JPG or PNG
   - Recommended size: 400x600 pixels (or similar aspect ratio)
   - Name the file to match what you specified in `coverImage` property

3. **Image naming convention**:
   - Use lowercase letters
   - Replace spaces with hyphens
   - Keep it short and descriptive
   - Example: `zero-to-one.jpg`, `meditations.jpg`

## Book Object Structure

```javascript
{
    id: 10, // Unique ID
    title: "Book Title",
    author: "Author Name",
    category: "philosophy", // Options: philosophy, fiction, business, technology, self-help, creativity
    rating: 5, // 1-5 stars
    coverImage: "book-covers/book-title.jpg", // Path to cover image
    coverEmoji: "📖", // Fallback emoji if no image
    coverGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Fallback gradient
    summary: "Brief description of the book",
    tags: ["Tag1", "Tag2", "Tag3"],
    yearRead: 2024,
    currentlyReading: false, // Set to true if currently reading
    progress: 0, // Reading progress percentage (if currently reading)
    recommendedFor: "Who should read this book",
    keyTakeaways: [
        "Key takeaway 1",
        "Key takeaway 2",
        "Key takeaway 3"
    ],
    favoriteQuote: "A memorable quote from the book",
    personalNotes: "Your personal thoughts about the book",
    purchaseLink: "https://www.amazon.com/dp/..." // Optional Amazon or other link
}
```

## If You Don't Have a Cover Image

No problem! The library will automatically use:
1. The `coverEmoji` as a fallback
2. The `coverGradient` for a colorful background

## Tips for Good Cover Images

- Use high-quality images (at least 400px wide)
- Ensure good contrast for readability
- Compress images for web (use tools like TinyPNG)
- Keep file sizes under 200KB when possible