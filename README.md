# Assignment
Angular frontend + Node.js/Express backend with MySQL/PostgreSQL.

## Backend Setup
cd backend
npm install

# Create `.env`:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=assignment_db
DB_DIALECT=mysql
JWT_SECRET=secret

# Start server:
npm start


## Frontend Setup

cd frontend
npm install
ng serve

## Features

* User auth (JWT)
* Category CRUD
* Product CRUD (image, price, uniqueId, category)
* Pagination + sorting + search
* Bulk upload (CSV, streamed)
* Report download (CSV/XLSX)


## Notes

* Use JWT token for protected APIs
* Postman collection included
* Sequelize auto-creates tables
