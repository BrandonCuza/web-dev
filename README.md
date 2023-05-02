# web-dev
Copies of my projects for "Web Development" with Dr. Edward Brown

### Assignment 1

To assess my submission, first open a terminal, set Assignment 1 as the working directory and run:

    node mainprogram.mjs [the path of the file with the student information]

For example, using the example student information file we were given, you would write:

    node mainprogram.mjs ./students.txt

This will log all of the errors thrown by the add() method for the student's given course list.

### Assignment 2

To assess my submission, first open a terminal, set Assignment 2 as the working directory and run:

    node app.js

Then, in another terminal (with the same setup and without closing the first), run:

    npm test

Please note that I could not get the testing rig to stop showing the test for number of dead between two dates as a failure. I also couldn't get the timing to work on the console.log,
so it prints the number of dead in between the other test outputs. Sorry.

Additionally, the test will say failed by timeout, which I also couldn't fix.

#### Attributions

Amilcar Soares, created the 'Contacts-App-v4' on which most of this code is based.

Alex McNeill, helped in debugging and understanding databases, personal friend and working SysAdmin.

Zachary Northcott, helped in debugging, personal friend and working programmer.

### Assignment 3

To assess my submission, first open a terminal, set Assignment 3 as the working directory and run:

    node app.js

Next, while leaving that terminal open, open a web browser of your choice and enter into the URL bar:

    localhost:3000

This will open the home page for the server. From here, you can access the read, update, and delete methods in the 'find' tab, and the
number of dead in a range method in the range tab.

The terminal from earlier will log the replies to any requests made through the browser.

#### Attributions

Amilcar Soares, created the 'Contacts-App-v5' on which most of this code is based.
