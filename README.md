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
3) New Terminal: cd in database
4) docker pull postgres:latest
5) docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
   -- IF you don't have 'crudz' database--
    - docker ps -a
    - docker exec -it <container id> bash
    - psql -U postgres
    - create DATABASE crudz; //Comment: named based on database for CRUD for Z prefix
    - \list; [Note] This will show you your list of databases.
    - \c; cargo_bay [Note] This will allow you to connect to the cargo_bay database
    - \dt; [Note] This will show you the available schema for the tables.
    - \d; item [Note] This will show you the schema for the item table.
    - SELECT * FROM item; [note] This will show you the data within the item table.
    - q [note] This will quit whatever you are looking at and go up one level.
    - DELETE FROM item WHERE id=3; [note] Do this to manually delete and item from the item table.
6) New Terminal: cd into database
7) npx knex migrate:rollback several times(if errors in step 7-8)
8) npx knex migrate:latest
9) npx knex seed:run
10) npm start in the database folder first
11) New Terminal: npm start in the frontend folder (inventory-app folder)
===========================================================================
UNDER THE HOOD:

- Frontend (Client Side on Port 3000)
- Backend (Server Side on 8081)

- Database (Docker with POSTGRES)
    -- PostgreSQL (Postgres) is a SQL compliant database management system.

        -- TABLES:
        User Info Table
            - Contains: id, first_name, last_name, user_name, and password.

        Item Table
            - Contains: id, user_id , item_name, description, and quantity.
            - "user_id" is a foreign key.

===========================================================================
DEVELOPER NOTES:

- USER STORY:

1. Manager can create account.
  -- [X] First Name, Last Name, User Name, and Password can get POSTED to the database user_info table.

2. Manager can login.
  -- [/] Data is submitted and received, but the checker currently has a TypeError.

3. Manager can create new item.

  -- [X] While in edit mode, item attributes can get POSTED to the database info table.

4. Manager can see inventory (100…)
  -- [X] Both Edit Mode viewing window and default viewing window will truncate item descriptions after 100 characters and terminate it with ...

5. Manager can view full item.
  -- [X] Manager can see the selected item with full length description by clicking the view button when not in Edit Mode.

6. Manager can edit item.
  -- [X] Manager can submit changes to an item via a PATCH to database info table.

7. Manager can delete item.
  -- [ ] Functionality blocked by unknown configuration setting. Client actions and Backend delete routes exist but are blocked. Things can only be deleted by making the command directly to the database when signed in as user POSTGRES.

8. Visitor can see inventory (100...)
  -- [X] The default viewing window will truncate item descriptions after 100 characters and terminate it with ...

9. Visitor can see view full item.
  -- [X] Visitor can see the selected item with full length description by clicking the view button.

10. Manager can see all manager items
  -- [X] Manager can always see all items regardless of being in Edit Mode.

- CRUD Functionality:

-- [X] x4 GET Routes (root, item, item/:id, user_info)
-- [X] x2 POST Routes (user_info, item)
-- [X] x2 PUT/PATCH Routes (item, user_info/:id)
-- [/] x1 DELETE Route (item/:id) ~ This fully exists on frontend and backend but seems to not have permission.

===========================================================================
USAGE:

- As a viewer, you can scroll below and see the status of the current inventory or use the SignUp and Login panels at the top to authenticate as an Inventory Manager.

- As an authenticated inventory manager, you can add, edit, or delete items from the database.

===========================================================================
TROUBLE SHOOTING:

- If you run: {docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres} and the terminal gives you the error {bash: /usr/bin/docker: No such file or directory}, there is a possibility that your volume isn't being created properly. You can fix this by going into the Docker Desktop application, clicking on volumes, and creating a volume called "volumes". Then, in the terminal, run {docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres} without the {} and it should crate the container.

===========================================================================
FUTURE IMPLEMENTATION:

- Functionality:
  -- [/] Password protection before the site goes live with real data. Will use bcrypt to hash the passwords.Bcrypt is installed but not yet used.
  -- [/] Login Functionality mostly exists but needs adjustment to overcome uncaught TypeError: Assignment to constant variable before being moved to backend. However, you can register and then send your data to login. The positive detection of the registered data needs fine tuning. After logging in is fixed, the EditMode will be adjusted so it only renders when logged in. A logout button will be added.

- Presentation:
  -- [/] Work on spacing and minor visual polish. Make text fields return to default (empty) after data is submitted. While in edit mode, the inputs only receive one letter at a time and have to be clicked into again. This only happened after it was moved into the edit mode div. The 8081/item fetch currently runs once. By adding [inventory] to the fetch, it will auto update but it currently continuously runs instead of only running when a change occurs. It was set to [] to prevent possible crash.

- Code:
 -- [/] Clean up commented out dead-end code while keeping developer note comments.

 - Automation:
 -- [/] Docker compose up and compose down functionality is in progress, but not completely configured. NPM start front and back per instructions to launch app.