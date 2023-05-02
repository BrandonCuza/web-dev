## Assignment 2, CS3100 W2023

## Instructions

Create a javascript server to access a MongoDB database containing Canadian covid data. Assume the javascript and Mongo server will both run locally for test purposes.

Use express to designate the http routing endpoints and use promises and/or async/await to avoid any performance delay concerns.

Canadian covid data has been taken from <https://ourworldindata.org/coronavirus> and provided in the data file `can.csv`.

You can load the data into your local server for development purposes using the [_mongoimport_](https://www.mongodb.com/docs/database-tools/mongoimport/) tool:

      $ mongoimport --db=covid --type=csv --headerline --collection=canada can.csv

Note that this import gives the database name _covid_ and the collection name _canada_

Your application should have five client-side test applications as follows: one test for each of the standard CRUD operations performed on a single record invoked as an http request to the server; and a fifth test that reports the number of deaths between two given dates.

Your tests may be written as five standalone applications, or they may be written as Mocha tests.

Place your test code in a repository folder named _test_ and make your sever runnable as _app.js_

You may copy the server architecture from the class "contacts" examples if you want (with the appropriate attribution). Some relevant points regarding that server design are:

* It roughly follows the concept of a model-view-controller pattern
* the _db_ module contains code for creating and maintaining a connection to the mongodb server
* the _app.js_ main server code creates the express object, defines the http endpoints, and launches the server
* the endpoint functions for express request-response definitions are in the _controller_ folder 
* the javascript class in the _model_ folder is responsible for mapping data records from the database to javascript objects, and also contains static methods to perform mongodb operation to perform the mapping for specific records. 

Regarding the database records for this assignment:

* the covid record date field has a unique value for each record, so you can use the date to specify a record for CRUD operations 
* Many of the record field values are not reported in Canada, and others might be empty. In your data manipulation, you only need to include the following fields:

                _id
                iso_code
                continent
                location
                date
                total_cases
                new_cases
                total_deaths
                new_deaths


Push your solution to your assigned github repository prior to the due date. 

Include a README file to instruct the marker how to run your project and what they should see. NOTE: if you use outside sources or materials, or collaborate on the design and/or preparation of code for this assignment, make sure to acknowledge your sources in the README to address any possible claims of cheating or plagiarism.
