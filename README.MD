# Tiny HaikuJam

This project creates a small haikuJam for people to play around. In this project you can fetch incomplete Jams and show the world your creativity by completing them. Also you can create new jam with brand new topic of yours and let the others complete it. you can also get the list of all the completed jams for a nice JAM Trip of your own.

---
## Requirements

- Node js : Versin 14.15.0
- Express : Version 4.17.1
- MongoDB : Version 3.6.3
- EJS : Version 3.1.5


### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.15.0

    $ npm --version
    6.14.8

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---


## Configure app

Open 'haikuTask/server.js' file and edit 'connectionString' variable along with your mongodb username and password. Basically, this variable is the URL of your database be it local or remote.

Note: you can get your MongoDB URL through connect button in cluster home page of mongodb atlas

For more info, follow this path: https://docs.atlas.mongodb.com/tutorial/create-atlas-account

## Running the project
This project consists of 3 APIs

API 1: Get the incomplete Jam from Database
    - app.get('/', (req, res)=>{ //this api list the incomplete jam 

API 2: Fill the next line of incomplete Jam
    - app.post('/jam', (req, res)=>{ //this api writes the completed jams to database


API 3: Get the database stats
    - app.get('/getDBStats', (req, res)=>{ //this api returns database stats in (console for now)
