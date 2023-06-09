# Helsinki city bike app (Solita Dev Academy pre-assignment)

## Description

This project is my submission for the Solita Dev Academy 2023 pre-assignment. The task was to create a full-stack web application for displaying data from journeys made with city bikes in the Helsinki Capital area.

### Features

The assignment contained a list of functional requirements together with some extra features. Some of them were **recommended**, and others considered _additional_. The following is a list of those features, marked either completed :white_check_mark: or yet to be implemented :round_pushpin::

#### Data import:

- **import data to db** :white_check_mark:
- **validate the data** :white_check_mark:
- **exclude journeys lasting less than 10s** :white_check_mark:
- **exclude journeys with distance less than 10m** :white_check_mark:

#### Journey list view:

- **list the journeys** :white_check_mark:
- **for each journey, show departure and return stations, covered distance in km and duration in mins** :white_check_mark:
- _pagination_ :white_check_mark:
- _ordering per column_ :white_check_mark:
- _searching_ :round_pushpin:
- _filtering_ :round_pushpin:

#### Station list view:

- **list all stations** :white_check_mark:
- _pagination_ :white_check_mark:
- _searching_ :white_check_mark:

#### Single station view

- **station name** :white_check_mark:
- **station address** :white_check_mark:
- **number of journeys starting from the station** :white_check_mark:
- **number of journeys ending at the station** :white_check_mark:
- _station location on the map_ :round_pushpin:
- _the average distance of a journey starting from the station_ :round_pushpin:
- _the average distance of a journey ending at the station_ :round_pushpin:
- _top 5 most popular return stations for journeys starting from the station_ :round_pushpin:
- _top 5 most popular departure stations for journeys ending at the station_ :round_pushpin:
- _ability to filter all the calculations per month_ :round_pushpin:

#### Extras

- _endpoints to store new journeys data and new bicycle stations_ :white_check_mark:
- _running backend in Docker_
  :white_check_mark:
- _E2E tests_ :round_pushpin:
- _UI for adding journeys or bicycle stations_ :round_pushpin:

## Running the project

There are two ways to run the project:

1. Run backend with Docker (recommended)
2. Run with local mysql installation

> **Prerequisites** for both options: [Node.js (version 18+)](https://nodejs.org/en)

Clone the project repository, make sure you have Node.js installed and move on to one of the two options.

### 1. Run the backend with Docker

> **Prerequisites**: Docker and Docker Compose

1. Navigate to the **backend/** directory, and run _**npm install**_.

2. From the root of the project folder, run **docker compose --profile setup up**. This will build the database and start the backend application. On following startups, the database is preserved in a volume, so just run **docker compose up**.

- Note: building the database will take a few minutes, so this is a great time to grab a cup of coffee :coffee:
- the setup is done when you see the following log message on your screen: _app running on port 3000_

3. In another terminal window, navigate to the **frontend/** directory, and run _**npm install**_. After the installation is completed, run _**npm run dev**_. The frontend React app will now be running at _http://localhost:5173_.

### 2. Run with local mysql installation

> **Prerequisites**: local mysql installation, Python 3.8+, Linux distribution with Bash

1. Create two files named **.env**, one in the **data/** directory and another in the **backend/** directory. In both files, add the following content, replacing the \<user\> and \<password\> with the credentials of the user in your local mysql installation:

> DB_USER=\<user\>  
> DB_PASSWORD=\<password\>  
> HOST=localhost

2. Unzip the data-files located in **data/dataset/journeys** and **data/dataset/stations** (from both folders, run unzip "*.zip")

3. Navigate to **data/** and create a python virtual environment by running _**python3 -m venv env**_ (if this did not work, google on how to install the venv module on python)

4. Activate the python virtual environment by running _**source env/bin/activate**_
5. From **data/**, run _**pip install -r requirements.txt**_
6. From **data/**, run _**python3 populate_db.py**_
7. Navigate to **backend/** and first run _**npm install**_, then _**npm run dev**_
8. On a different terminal window, navigate to **frontend/**, then first run _**npm install**_, then _**npm run dev**_

## Running tests

This project contains three sets of tests:

### 1. Unittests for the Python function validate_journey that is used in validating the journey data in the importing script.

  - to run the tests, you need python 3.8+ installed: navigate to **/data** and run _**python3 validate_journey.test.py**_

### 2. Unittests to test some of the React components used in the frontend of the app.

- to run the tests, navigate to **/frontend**, make sure you have ran _**npm install**_, and then run _**npm test**_

### 3. Integration tests for the backend API



If you chose option 1:  

- Stop the containers with Ctrl+C or by running _**docker compose down**_ from the project root
- From the project root, run _**docker compose --profile testing up**_ (Note: this will only work after building the db as instructed earlier in the "Run the backend with Docker" section.). This will first run the tests and then start up the backend app normally.

- If you chose option 2:
1. Stop the backend app with Ctrl+C
2. Run _**npm test**_ from the **/backend** directory





## Tech choices

### Backend

The backend technologies used were Node.js together with express, and mysql for the database. I have a reasonable amount of experience working with Node in school courses and projects, so the choice felt natural. In the dataset, there was a clear foreign-key relationship between the arrival and departure station id:s in the journeys and the stations, so it seemed clear that the use of an SQL database would get the job done.

### Frontend

For the frontend, React was used. The first idea was just to implement server side rendering with the EJS template engine, but switching to React allowed some UI operations to be instantaneous (for example, searching for a single bike station).

## TODO

With more time, the next steps in this project would have been the unfinished features marked in the features section. The main development roadmap would be to take the app from a simple data display app into one that can provide insights through smart data aggregation.