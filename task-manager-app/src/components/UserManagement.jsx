import React, { useState } from "react";
import { Plus, Edit2, Trash2, Shield } from "lucide-react";
import Can from "./Can";
import { getUsers } from "../data/mockData";

const UserManagement = ({ currentUser }) => {
  const [users, setUsers] = useState(getUsers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [selectedPermissions, setSelectedPermissions] = useState({
    dashboard: [],
    tasks: [],
    settings: [],
    "user-management": [],
  });

  const permissionOptions = {
    dashboard: ["read", "create", "update", "delete"],
    tasks: ["read", "create", "update", "delete"],
    settings: ["read", "create", "update", "delete"],
    "user-management": ["read", "create", "update", "delete"],
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: "temp123",
      role: "user",
      permissions: selectedPermissions,
    };

    setUsers([...users, newUser]);
    setFormData({ name: "", email: "" });
    setSelectedPermissions({
      dashboard: [],
      tasks: [],
      settings: [],
      "user-management": [],
    });
    setShowAddModal(false);
  };

  const handlePermissionToggle = (category, action) => {
    setSelectedPermissions((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(action)) {
        updated[category] = updated[category].filter((a) => a !== action);
      } else {
        updated[category].push(action);
      }
      return updated;
    });
  };

  const handleDeleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const getPermissionBadges = (permissions) => {
    const permissionCount = Object.values(permissions).reduce(
      (sum, actions) => sum + actions.length,
      0
    );
    return permissionCount;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <Can currentUser={currentUser} hasPermissions={["user-management:create"]}>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </Can>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
            </div>

            <div className="px-6 py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Permissions</span>
                </h4>
                <div className="space-y-4">
                  {Object.entries(permissionOptions).map(([category, actions]) => (
                    <div key={category} className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium text-gray-700 mb-3 capitalize">
                        {category.replace("-", " ")}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {actions.map((action) => (
                          <label
                            key={`${category}-${action}`}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPermissions[category].includes(
                                action
                              )}
                              onChange={() =>
                                handlePermissionToggle(category, action)
                              }
                              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 capitalize">
                              {action}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.email || user.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {(user.name || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'Unknown User'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {getPermissionBadges(user.permissions || {})} permissions
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Can
                        currentUser={currentUser}
                        hasPermissions={["user-management:update"]}
                      >
                        <button
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="Edit user"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Can>
                      <Can
                        currentUser={currentUser}
                        hasPermissions={["user-management:delete"]}
                      >
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Can>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;