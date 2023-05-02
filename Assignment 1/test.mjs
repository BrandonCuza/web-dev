import { Course } from './courses.mjs'

Course.load('./muncourses.txt');
var courseObjectArray = Course.find('ANTH', '1031','001');
var newCourseObjectArray = courseObjectArray.concat(Course.find('ANTH', '2413'));
var newestCourseObjectArray = newCourseObjectArray.concat(Course.find('ANTH', '4071'));
var test1 = newestCourseObjectArray[0].conflictsWith(newestCourseObjectArray[1]);
var test2 = newestCourseObjectArray[0].conflictsWith(newestCourseObjectArray[2]);
var test3 = newestCourseObjectArray[1].conflictsWith(newestCourseObjectArray[2]);
console.log(test1);
console.log(test2);
console.log(test3);
