// Combined general mock users and authenticated users into a single `mockUsers` array
export const mockUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'John Doe',
    role: 'Admin',
    permissions: {
      settings: ["read", "create", "delete"],
      tasks: ["read", "create", "delete"],
    },
  },
  {
    email: 'user@example.com',
    password: 'user123',
    name: 'Jane Smith',
    role: 'User',
    permissions: {
      settings: ["read"],
      tasks: ["read"],
    },
  },
  {
    name: "Jignesh",
    permissions: {
      settings: ["read", "create"],
      tasks: ["read", "create"],
    },
  },
  {
    name: "Piyush",
    permissions: {
      settings: ["read"],
      tasks: ["read"],
    },
  },
];

export const mockTasks = [
  { 
    id: 1, 
    title: 'Complete project proposal', 
    description: 'Draft and review the Q2 project proposal', 
    status: 'pending', 
    priority: 'high', 
    dueDate: '2025-06-15', 
    assignee: 'John Doe' 
  },
  { 
    id: 2, 
    title: 'Update website content', 
    description: 'Refresh homepage and about page content', 
    status: 'in-progress', 
    priority: 'medium', 
    dueDate: '2025-06-20', 
    assignee: 'Jane Smith' 
  },
  { 
    id: 3, 
    title: 'Team meeting preparation', 
    description: 'Prepare agenda and materials for weekly team meeting', 
    status: 'completed', 
    priority: 'low', 
    dueDate: '2025-06-12', 
    assignee: 'John Doe' 
  },
  { 
    id: 4, 
    title: 'Code review', 
    description: 'Review pull requests from development team', 
    status: 'pending', 
    priority: 'high', 
    dueDate: '2025-06-14', 
    assignee: 'Jane Smith' 
  },
  { 
    id: 5, 
    title: 'Database optimization', 
    description: 'Optimize database queries for better performance', 
    status: 'in-progress', 
    priority: 'medium', 
    dueDate: '2025-06-25', 
    assignee: 'John Doe' 
  }
];

export const getAuthenticatedUser = () => {
  // Simulate fetching the authenticated user
  return mockUsers[0]; // Default to the first user
};

export const createUser = (name, permissions) => {
  // Simulate creating a new user
  const newUser = { name, permissions };
  mockUsers.push(newUser);
  return newUser;
};

export const getUsers = () => mockUsers;