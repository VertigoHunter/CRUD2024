# CRUD2024
===========================================================================
PROJECT TITLE: CARGO BAY

OVERVIEW: "Cargo Bay" is being developed as a full stack application that provides basic inventory management capability.
===========================================================================
TABLE OF CONTENTS:

- Description
- Installation
- Under the Hood
- Developer Notes
- Usage
- Trouble Shooting
- Future Implementation
===========================================================================
DESCRIPTION:

- The website acts as a simple dashboard that lets the user view the existing inventory of items. Creating an account and signing in will allow you to access an Edit Mode that provides the ability to add, edit, or delete items from the inventory.

===========================================================================
INSTALLATION:

To get started until docker compose is completed:

1) npm install in all folders (backend, inventory-app)
2) open docker desktop
3) docker pull postgres:latest
4) docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
   -- IF you don't have 'crudz' database--
    - docker ps -a
    - docker exec -it <container id> bash
    - psql -U postgres
    - create DATABASE crudz; //Comment: named based on database for CRUD for Z prefix
5) cd into database
6) npx knex migrate:rollback several times(if errors in step 7-8)
7) npx knex migrate:latest
8) npx knex seed:run
9) npm start in the database folder first
10) npm start in the frontend folder (inventory-app folder)
===========================================================================
UNDER THE HOOD:

- Frontend (Client Side on Port 3000)
- Backend (Server Side on 8081)

- Database (Docker with POSTGRES)
    -- PostgreSQL (Postgres) is a SQL compliant database management system.

        -- TABLES:
        User Info Table
            - Contains: user_info_id, first_name, last_name, user_name, and password.

        Item Table
            - Contains: item_id, user_info_id , item_name, description, and quantity.
            - "user_info_id" is a foreign key.

===========================================================================
DEVELOPER NOTES:

- User Story (Viewer): Not logged in.
  -- [X] Can see full inventory.
  -- [X] Can see expanded view on individual item. //Comment: currently covered due to all fields being visible within normal inventory view.
  -- [/] Can signup to create a login. //Comment: Signup State variables exist. POST exists. Submission button functionality is in progress.
  -- [/] Can login. //Comment: Login variables exist. Submission button functionality is in progress.

- User Story (Inventory Manager):
  -- [X] Can see full inventory.
  -- [/] Can enable Edit Mode. //Comment: Edit buttons are in a div which will render based on the [editFlag, setEditFlag] useState.
  -- [/] Can create a new item and be redirected to inventory. //Comment: Item State variables exist. POST and button functionality in progress.
  -- [/] Can edit an item and be redirected to inventory. //Comment: PUT requests exist but are untested until buttonolgy completed.
  -- [/] Can delete an item and be redirected to inventory. //Comment: Deletion buttons exist but will not be implemented until POSTs function.

- User Story (Both):
  -- [ ] Items should only display first 100 characters of description with ... at end.

- Full Stack Status:
  -- [X] Frontend Client exists and communicates with Backend Server.
  -- [X] Backend Server exists and can communicate with Database.
  -- [X] Database exists and can hold data.

- Connectivity Status:
  -- [3.5] User Interface: Matches layout specified. Users can see resource but not create them.
  -- [4] App-Server Communication: There are two functioning GET requests with the App showing the inventory from item_table database.
  -- [4] Server: Server exists with two functioning GET requests and a built POST request that is awaiting buttonology.
  -- [3.5] DB Interaction: DB & Server communicate, DB contains dummy data. A POST request exists but is awaiting buttonology.
  -- [?] Authentication: **Authentication does not yet work but is planned out. After hitting login to confirm the entered username and password    matches an entry in the user_info table within the database, the loginFlag (which exists) within frontend App.js will be toggled to true. This will denote the viewer as an Inventory Manager. This will reveal a toggle for Edit Mode controlled by the editFlag (which exists). Once edit mode is activated, the buttons within className edit-bar will become visible.**

- Latest Developer Update:

===========================================================================
USAGE:

- As a viewer, you can scroll below and see the status of the current inventory or use the SignUp and Login panels at the top to authenticate as an Inventory Manager.

- As an authenticated inventory manager, you can add, edit, or delete items from the database.

===========================================================================
TROUBLE SHOOTING:

- If you run: {docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres} and the terminal gives you the error {bash: /usr/bin/docker: No such file or directory}, there is a possibility that your volume isn't being created properly. You can fix this by going into the Docker Desktop application, clicking on volumes, and creating a volume called "volumes". Then, in the terminal, run {docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres} without the {} and it should crate the container.

===========================================================================
FUTURE IMPLEMENTATION:

- User Story (Viewer): Not logged in.
  -- [/] Can signup to create a login. //Comment: Signup State variables exist. POST exists. Submission button functionality is in progress.
  -- [/] Can login. //Comment: Login variables exist. Submission button functionality is in progress.

- User Story (Inventory Manager):
  -- [/] Can enable Edit Mode. //Comment: Edit buttons are in a div which will render based on the [editFlag, setEditFlag] useState.
  -- [/] Can create a new item and be redirected to inventory. //Comment: Item State variables exist. POST and button functionality in progress.
  -- [/] Can edit an item and be redirected to inventory. //Comment: PUT requests exist but are untested until buttonolgy completed.
  -- [/] Can delete an item and be redirected to inventory. //Comment: Deletion buttons exist but will not be implemented until POSTs function.

- User Story (Both):
  -- [ ] Items should only display first 100 characters of description with ... at end.
  -- [ ] Password protection before the site goes live with real data.