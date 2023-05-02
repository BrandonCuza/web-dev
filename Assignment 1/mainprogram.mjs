import * as fs from 'fs';
import * as process from 'process';
import { Course } from './courses.mjs';
import { Student } from './courses.mjs';

var studentFile = process.argv[2]; //Save the file path handed in.
Course.load('./muncourses.txt'); //Load the courses
var conflicts = Student.load(studentFile); //Save the conflicts into an array
fs.writeFileSync('./courses.log',''); //Clear the courses.log file
for (const conflict of conflicts) //Print the conflicts into the file
{
fs.appendFileSync('./courses.log', conflict + '\n');
}