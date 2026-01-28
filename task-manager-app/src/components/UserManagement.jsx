import React, { useState } from "react";
import { createUser, getUsers } from "../data/mockData";

const UserManagement = () => {
  const [users, setUsers] = useState(getUsers());
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    settings: [],
    tasks: [],
  });

  const handleCreateUser = () => {
    const newUser = createUser(name, permissions);
    setUsers([...users, newUser]);
    setName("");
    setPermissions({ settings: [], tasks: [] });
  };

  const handlePermissionChange = (category, action) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(action)) {
        updated[category] = updated[category].filter((a) => a !== action);
      } else {
        updated[category].push(action);
      }
      return updated;
    });
  };

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <h3>Permissions</h3>
          {Object.keys(permissions).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {["read", "create", "delete"].map((action) => (
                <label key={action}>
                  <input
                    type="checkbox"
                    checked={permissions[category].includes(action)}
                    onChange={() => handlePermissionChange(category, action)}
                  />
                  {action}
                </label>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <h2>Existing Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {JSON.stringify(user.permissions)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;