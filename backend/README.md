# College Social Media System Backend

## Setting up the server

### Installing the Dependancies

1. Install latest version of Nodejs
2. Run `npm install` to download and install the dependencies required

### Setting up the environment variables

Create a new .env file with the following variables

#### Environment Variables

- **PORT** The port on which server is to be started
- **DATABASE_URI** The MYSQL database url
- **DATABASE_NAME** The MYSQL database name
- **DATABASE_USER** Database User Name
- **DATABASE_PASS** Database User password
- **SESSION_SECRET** Key to encrypt sessions

To start the Server, run `npm start` and the server will start on http://localhost:PORT
