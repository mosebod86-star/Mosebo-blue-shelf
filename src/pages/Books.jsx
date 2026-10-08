import React, { useState } from "react";

function Books({
  books,
  addBook,
  updateBook,
  deleteBook,
  addStock,
}) {
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: "",
  });

  const [stockAmounts, setStockAmounts] = useState({});

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      updateBook(editingId, form);
      setEditingId(null);
    } else {
      addBook(form);
    }

    setForm({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: "",
    });
  }

  function editBook(book) {
    setEditingId(book.id);

    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: book.quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);

    setForm({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: "",
    });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  }

  function handleAddStock(id) {
    const amount = Number(stockAmounts[id]);

    if (!amount || amount <= 0) {
      alert("Enter a valid stock amount.");
      return;
    }

    addStock(id, amount);

    setStockAmounts({
      ...stockAmounts,
      [id]: "",
    });
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main id="content">
      <h2>Book Management</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search books by title or author..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <form
        className="book-form"
        onSubmit={handleSubmit}
      >
        <h3>
          {editingId ? "Update Book" : "Add New Book"}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          min="0"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit" className="add-book-btn">
          {editingId ? "Update Book" : "Add Book"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Books</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr
                key={book.id}
                className={
                  book.quantity < 2
                    ? "low-stock"
                    : ""
                }
              >
                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.genre}</td>

                <td>{book.isbn}</td>

                <td>{book.quantity}</td>

                <td>
                  {book.quantity > 0
                    ? "Available"
                    : "Unavailable"}
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editBook(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(book.id)
                    }
                  >
                    Delete
                  </button>

                  <div className="stock-control">
                    <input
                      type="number"
                      min="1"
                      placeholder="+Stock"
                      value={
                        stockAmounts[book.id] || ""
                      }
                      onChange={(event) =>
                        setStockAmounts({
                          ...stockAmounts,
                          [book.id]:
                            event.target.value,
                        })
                      }
                    />

                    <button
                      onClick={() =>
                        handleAddStock(book.id)
                      }
                    >
                      Add Stock
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBooks.length === 0 && (
        <p>No books found.</p>
      )}
    </main>
  );
}

export default Books;