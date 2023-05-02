## Assignment 1, CS3100 W2023

## Instructions

Create an ES6 courses module called 'courses' to describe the courses at MUN for Winter 2023.


The module should provide a Course class which has at least the following instance properties:

        course.subject
        course.number
        course.name
        course.section
        course.crn
        course.room
        course.type

Construct the course description objects for each course section by parsing the provided data file 'muncourses.txt'. The course objects should be created using the static course method load:

        Course.load(datafile)

The class should have the following static method to return an array of course objects matching the find parameters:

        courseObjectArray = Course.find(name, number, [section])

The course should have an instance method that will check for a schedule time conflict with another course:

        booleanvar = courseObject1.conflictsWith(courseObject2)

Also implement a Student object which will include a student name, id, and methods to add and remove courses from the student's schedule. Attempting to add a course which creates a conflict should throw an error from inside the add method.

Write your main program to read a file of students with their course registration and log any conflicts that are thrown by the student.add method into a log file 'courses.log'. A sample student file is provided to illustrate the file format, but we will use our own file for input test of your program for evaluation.

The _asgn1check_ javascript file is provided to give an idea how the Course module interface or exports should work. 

Push your solution to your assigned github repository prior to the due date. 

Include a README file to instruct the marker how to run your project and what they should see. NOTE: if you use outside sources or materials, or collaborate on the design and/or preparation of code for this assignment, make sure to acknowledge your sources in the README to address any possible claims of cheating or plagiarism.