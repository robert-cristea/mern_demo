import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userService from "../services/user.service";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(`Home`, currentUser);

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  async function fetchUsers() {
    try {
      const { data } = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.warning(error.message);
      console.log(`Dashboard->fetchUsers:error`, error);
    }
  }

  if (!currentUser.role === "ROLE_ADMIN")
    return (
      <div className="container">
        <h5>User List</h5>
        <p>Not authorized!</p>
      </div>
    );

  return (
    <div className="container pt-5">
      <h5 className="text-center mb-5">User List</h5>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
