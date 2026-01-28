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

Prompt 2

there is duplicate variable names, please make sure that variable name which you are using it should not create conflict with existing ones

Prompt 3

add new navItem in navigation for user management and it should visible only if user have 'user-management' related permissions

Prompt 4

i don't want to navigate user to login page since we don't have any routing if user dont have permissions in ProtectedRoute instead just show you dont have enough permission to view this page section

Prompt 5

Add proper permission/authorization checks in both the Navigation and App components.
Update ProtectedRoute to use the local user state (in-memory state / context) instead of reading from localStorage.
Ensure the permission logic is applied consistently across the app.
Carefully review and verify all recent changes to confirm nothing is broken and behavior remains correct.

Prompt 6

tasks

- add button should be visible only if user has create permissions
- edit if update permission
- delete if delete permission

settings

- all the input fields, toggle & dropdown should be editable only if user have update permissions else it should be disabled

Pls use Can componet to handle this

Prompt 7

pls create user management page ui similar to tasks page

Prompt 8

filter is not required. let's just show all the users & no need to take input of role and show role field
