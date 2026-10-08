import React, { useState } from "react";

function Users({
  users,
  addUser,
  updateUser,
  deleteUser,
}) {
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    membershipId: "",
    role: "Member",
    email: "",
    phone: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      updateUser(editingId, form);
    } else {
      addUser(form);
    }

    setEditingId(null);

    setForm({
      name: "",
      membershipId: "",
      role: "Member",
      email: "",
      phone: "",
      password: "",
    });
  }

  function editUser(user) {
    setEditingId(user.id);

    setForm({
      name: user.name || "",
      membershipId: user.membershipId || "",
      role: user.role || "Member",
      email: user.email || "",
      phone: user.phone || "",
      password: user.password || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);

    setForm({
      name: "",
      membershipId: "",
      role: "Member",
      email: "",
      phone: "",
      password: "",
    });
  }

  function handleDelete(id) {
    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      deleteUser(id);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.membershipId
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main id="content">
      <h2>User Management</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <form
        className="user-form"
        onSubmit={handleSubmit}
      >
        <h3>
          {editingId ? "Update User" : "Add User"}
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="membershipId"
          placeholder="Membership ID"
          value={form.membershipId}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Administrator">
            Administrator
          </option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Login Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership ID</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.membershipId}</td>

              <td>{user.role}</td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(user.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}
    </main>
  );
}

export default Users;