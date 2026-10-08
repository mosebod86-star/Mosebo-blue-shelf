import React, { useState } from "react";

function Transactions({
  books,
  users,
  transactions,
  borrowBook,
  returnBook,
}) {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");

  function handleBorrow(event) {
    event.preventDefault();

    const result = borrowBook(bookId, userId);

    alert(result.message);

    if (result.success) {
      setBookId("");
      setUserId("");
    }
  }

  function handleReturn(event) {
    event.preventDefault();

    const result = returnBook(bookId, userId);

    alert(result.message);

    if (result.success) {
      setBookId("");
      setUserId("");
    }
  }

  return (
    <main id="content">
      <h2>Transactions</h2>

      <div className="transaction-form">
        <h3>Borrow / Return Book</h3>

        <form>
          <select
            value={bookId}
            onChange={(event) =>
              setBookId(event.target.value)
            }
          >
            <option value="">
              Select Book
            </option>

            {books.map((book) => (
              <option
                value={book.id}
                key={book.id}
              >
                {book.title} — Stock: {book.quantity}
              </option>
            ))}
          </select>

          <select
            value={userId}
            onChange={(event) =>
              setUserId(event.target.value)
            }
          >
            <option value="">
              Select User
            </option>

            {users.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name} ({user.membershipId})
              </option>
            ))}
          </select>

          <div className="transaction-buttons">
            <button
              type="button"
              onClick={handleBorrow}
            >
              Borrow Book
            </button>

            <button
              type="button"
              onClick={handleReturn}
            >
              Return Book
            </button>
          </div>
        </form>
      </div>

      <section>
        <h2>Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <div className="transaction-list">
            {transactions.map((transaction) => (
              <div
                className="transaction-card"
                key={transaction.id}
              >
                <h3>{transaction.type}</h3>

                <p>
                  <strong>Book:</strong>{" "}
                  {transaction.bookTitle}
                </p>

                <p>
                  <strong>User:</strong>{" "}
                  {transaction.userName}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Transactions;