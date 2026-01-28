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

Prompt 1

I want to add RBAC capability to existing application where there should be new page for user management where we can create new user and assign permission and permission structure will be as below and you can create mock services for autheticated user and create user based on the below data

{
user: {
permissions: {
settings: ["read", "create", "delete"],
tasks: ["read", "create", "delete"],
}
}
}

above api response will be mapped on the ui something like permissions: ["settings:read", "settings:delete", "tasks:read" ...]

on the UI we want to create one component which we help us to to show certain actions based on the permissions e.g.

<Can hasPermissions={["task:write"]} >
<button>Add Task</button>
</Can>

and also we want to create protected route where we will check the permissions.

Create a prompt for the above usecase and i want to make sure you follow exact data model which i have shared. Create reusable components, utils to check for the permissions which we are going to use in Can comp & protected route.

Acceptance testcases

- create one user named Jignesh, with permissions settings: read, create, tasks: read, create
- create one more user named Piyush, with permissions settings: read, tasks: read
