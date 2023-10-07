# bookList

Connects to a local PostgreSQL database named 'booklist' and lists the data from its three tables: 'current', 'completed', and 'next'.

New entries can be added to each list and existing entries can be removed from each list.

![remove](/images/remove.png)

Entries can be edited by clicking on a field. Changes are saved by clicking away.

![edit](/images/edit_1.png)
![edit](/images/edit_2.png)
![edit](/images/edit_3.png)

An entry from one list can be moved to another list.

![move](/images/move.png)

## Setup

In the `server` directory, create a file named `db.js` and copy and paste the following and replace the values with your PostgreSQL information:

```
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'booklist',
  port: 5432,
  user: 'postgres',
  password: 'password'
});

module.exports = pool;
```

Create the following tables in the 'booklist' database:

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

## Run Locally

Clone the repo and go to the cloned directory.  
Type

```
npm install
npm start
```

in a terminal session in the `server` directory to run the server and in another terminal session in the `client` directory to run the client.