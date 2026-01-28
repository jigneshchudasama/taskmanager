- readonly
- admin

// UI

- Settings
  - Read
  - Write
  -
- Tasks
  -....

permissions: [read, write, delete, update]
feats: dynamic data

User Management

- List
- Create User
- Name, Email, Password
- Permission :{ { "settings": [permissions] }, "tasks": [permissions]}
- Update User
- same as create but we will pass user_id
- Delete
- id as input

Services

- user_service
- user_details [authenticated_user]
- permission: {
  "settings": [permissions],
  "tasks": [permissions]
  }
- create_user
  - name
  - email
  - permission: {
    "settings": [permissions],
    "tasks": [permissions]
    }
- update_user .....

<!-- Reusable Component -->

// checkRequiredPermissions
<Can hasPermissions={["task:write"]} >
<button>Add Task</button>
</Can>

<!-- Protected Route -->

//checkRequiredPermissions
{
path: "/add-task",
permissions: ["task:write"]
}

<!-- Utils -->

// checkRequiredPermissions: function to check if authenticated user has required permissions or not

RBAC

// admin user

{
user: {
permissions: {
settings: ["read", "create", "delete"],
tasks: ["read", "create", "delete"],
}
}
}

// read only user

{
user: {
permissions: {
settings: ["read"],
tasks: ["read"],
}
}
}

<!--  -->

<!-- admin can create/update settings, view -->

- Settings
  - List
  - CRUD
- Tasks
  - List
  - CRUD
