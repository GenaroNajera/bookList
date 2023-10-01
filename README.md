# bookList

Connects to local PostgreSQL database named 'booklist' which contains three tables: 'current', 'completed', and 'next'.

**In `server` folder, add file `db.js`**:

```
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'booklist',
  port: 5432,
  user: 'postgres',
  password: // your postgres password
});

module.exports = pool;
```

## Tables

```
current (
	id serial PRIMARY KEY,
	title varchar(50),
	author varchar(50),
	start_date varchar(10),
	bookmark varchar(5)
)

completed (
	id serial PRIMARY KEY,
	title varchar(50),
	author varchar(50),
	rating varchar(1),
	start_date varchar(10),
	finish_date varchar(10)
)

next (
	id serial PRIMARY KEY,
	title varchar(50),
	author varchar(50)
)
```
