import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";


function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");

    return savedBooks
      ? JSON.parse(savedBooks)
      : [
          {
            id: 1,
            title: "Things Fall Apart",
            author: "Chinua Achebe",
            genre: "Fiction",
            isbn: "9780385474542",
            quantity: 3,
          },
          {
            id: 2,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            isbn: "9780743273565",
            quantity: 2,
          },
          {
            id: 3,
            title: "Clean Code",
            author: "Robert C. Martin",
            genre: "Programming",
            isbn: "9780132350884",
            quantity: 1,
          },
        ];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");

    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            id: 1,
            name: "Admin",
            membershipId: "MBS001",
            role: "Administrator",
            email: "admin@blueshelf.com",
            phone: "000000000",
          },
        ];
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  function login(email, password) {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (user) {
      setLoggedInUser(user);
      return true;
    }

    // Demo administrator login
    if (email === "admin@blueshelf.com" && password === "admin123") {
      const admin = {
        id: 1,
        name: "Admin",
        membershipId: "MBS001",
        role: "Administrator",
        email: "admin@blueshelf.com",
      };

      setLoggedInUser(admin);
      return true;
    }

    return false;
  }

  function logout() {
    setLoggedInUser(null);
  }

  function addBook(book) {
    const newBook = {
      ...book,
      id: Date.now(),
      quantity: Number(book.quantity),
    };

    setBooks((currentBooks) => [...currentBooks, newBook]);
  }

  function updateBook(id, updatedBook) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              ...updatedBook,
              quantity: Number(updatedBook.quantity),
            }
          : book
      )
    );
  }

  function deleteBook(id) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id)
    );
  }

  function addStock(id, amount) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              quantity: book.quantity + Number(amount),
            }
          : book
      )
    );
  }

  function borrowBook(bookId, userId) {
    const book = books.find((item) => item.id === Number(bookId));
    const user = users.find((item) => item.id === Number(userId));

    if (!book || !user) {
      return { success: false, message: "Please select a book and user." };
    }

    if (book.quantity <= 0) {
      return {
        success: false,
        message: "This book is currently unavailable.",
      };
    }

    const alreadyBorrowed = transactions.some(
      (transaction) =>
        transaction.bookId === book.id &&
        transaction.userId === user.id &&
        transaction.type === "Borrow"
    );

    if (alreadyBorrowed) {
      return {
        success: false,
        message: `${user.name} already borrowed this book.`,
      };
    }

    setBooks((currentBooks) =>
      currentBooks.map((item) =>
        item.id === book.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    const transaction = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      userId: user.id,
      userName: user.name,
      type: "Borrow",
      date: new Date().toLocaleString(),
    };

    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);

    return {
      success: true,
      message: `${book.title} borrowed successfully.`,
    };
  }

  function returnBook(bookId, userId) {
    const book = books.find((item) => item.id === Number(bookId));
    const user = users.find((item) => item.id === Number(userId));

    if (!book || !user) {
      return {
        success: false,
        message: "Please select a book and user.",
      };
    }

    const borrowed = transactions.find(
      (transaction) =>
        transaction.bookId === book.id &&
        transaction.userId === user.id &&
        transaction.type === "Borrow"
    );

    if (!borrowed) {
      return {
        success: false,
        message: `${user.name} did not borrow ${book.title}.`,
      };
    }

    setBooks((currentBooks) =>
      currentBooks.map((item) =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    const transaction = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      userId: user.id,
      userName: user.name,
      type: "Return",
      date: new Date().toLocaleString(),
    };

    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);

    return {
      success: true,
      message: `${book.title} returned successfully.`,
    };
  }

  function addUser(user) {
    const newUser = {
      ...user,
      id: Date.now(),
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
  }

  function updateUser(id, updatedUser) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  }

  function deleteUser(id) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  }

  return (
    <>
      {loggedInUser && (
        <Navbar
          loggedInUser={loggedInUser}
          logout={logout}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login login={login} />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Dashboard
                books={books}
                users={users}
                transactions={transactions}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Books
                books={books}
                addBook={addBook}
                updateBook={updateBook}
                deleteBook={deleteBook}
                addStock={addStock}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Transactions
                books={books}
                users={users}
                transactions={transactions}
                borrowBook={borrowBook}
                returnBook={returnBook}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Users
                users={users}
                addUser={addUser}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;