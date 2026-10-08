import React from "react";

function Dashboard({ books, users, transactions }) {
  const totalBooks = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  );

  const lowStockBooks = books.filter(
    (book) => book.quantity < 2
  );

  const borrowedCount = transactions.filter(
    (transaction) => transaction.type === "Borrow"
  ).length;

  const returnedCount = transactions.filter(
    (transaction) => transaction.type === "Return"
  ).length;

  return (
    <main id="content">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Books</h3>
          <p>{totalBooks}</p>
        </div>

        <div className="card">
          <h3>Available Books</h3>
          <p>
            {books.filter((book) => book.quantity > 0).length}
          </p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="card">
          <h3>Borrowed</h3>
          <p>{borrowedCount}</p>
        </div>

        <div className="card">
          <h3>Returned</h3>
          <p>{returnedCount}</p>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <p>{lowStockBooks.length}</p>
        </div>
      </div>

      <section className="recent-transactions">
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.slice(0, 5).map((transaction) => (
            <div
              className="transaction-card"
              key={transaction.id}
            >
              <strong>{transaction.type}</strong>

              <p>
                <b>Book:</b> {transaction.bookTitle}
              </p>

              <p>
                <b>User:</b> {transaction.userName}
              </p>

              <p>
                <b>Date:</b> {transaction.date}
              </p>
            </div>
          ))
        )}
      </section>

      <section className="low-stock-section">
        <h2>Low Stock Books</h2>

        {lowStockBooks.length === 0 ? (
          <p>No low-stock books.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {lowStockBooks.map((book) => (
                <tr key={book.id} className="low-stock">
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default Dashboard;