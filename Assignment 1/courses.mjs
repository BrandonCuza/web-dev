import * as fs from 'fs';

export class Course 
{
    static courseList = new Array(); //Array that holds the Course instances after they are created for future use

    constructor(subject, number, name, section, crn, days, startTime, endTime, room, type) 
    {
        this.subject = subject;
        this.number = number;
        this.name = name;
        this.section = section;
        this.crn = crn;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.room = room;
        this.type = type;
        Course.courseList.push(this);
    }

    /**
     * Method used to read a file written in a particular way and parse course information to then create Course objects for each course
     * parsed and add them to the class Array courseList.
     * @param {*} fileName 
     */
    static load(fileName) 
    {
        Course.courseList.length = 0; //Empties the array in case the method is called spuriously so as to not duplicate entries
        var lines = fs.readFileSync(fileName, { encoding: 'utf8' }).split('\n'); //Split the .txt into lines
        for  (const element of lines) //Iterate over the lines and look for pertanent information
        {
            // Checks that there is a listed subject
            if (element.substring(0,4) != '' && element.substring(0,4) != '\r' && element.substring(0,4) != '    ' && 
                element.substring(0,4) == element.toUpperCase().substring(0,4))
            {
                new Course(element.substring(0,4).trim(), element.substring(5,9).trim(), element.substring(10,37).trim(), 
                           element.substring(38,41).trim(), element.substring(42,47).trim(), element.substring(53,66).trim(), 
                           element.substring(67,71), element.substring(72,76), element.substring(77,85).trim(), 
                           element.substring(86,90).trim());
            }
            // If there is no listed subject, checks if it is a different section of the previous course
            else if (element.substring(0,4) == '    ' && !isNaN(element.substring(38,41)) && element.substring(38,41) != '' && 
                     element.substring(38,41) != '   ')
            {
                new Course(Course.courseList[Course.courseList.length - 1].subject, Course.courseList[Course.courseList.length - 1].number,
                           Course.courseList[Course.courseList.length - 1].name, element.substring(38,41).trim(), element.substring(42,47).trim(), 
                           element.substring(53,66).trim(), element.substring(67,71), element.substring(72,76), element.substring(77,85).trim(), 
                           element.substring(86,90).trim());
            }
        }
    }

    /**
     * Method to search the instances of the Course class held in courseList for matching parameters and return them as an Array.
     * @param {String} findSubject 
     * @param {String} findNumber 
     * @param {String} findSection 
     * @returns Array 
     */
    static find(findSubject, findNumber, findSection = null) 
    {
        var courseObjectArray = new Array();
        for (const element of Course.courseList)
        {
            if (findSection == null)
            {
                if (element.subject == findSubject && element.number == findNumber)
                {
                    courseObjectArray.push(element);
                }
            }
            else
            {
                if (element.subject == findSubject && element.number == findNumber && element.section == findSection)
                {
                    courseObjectArray.push(element);
                }
            }
        }
        return courseObjectArray;
    }

    /**
     * Method called to check if the Course instance has a day and time conflict with the Course object handed in.
     * @param {Course} courseObject 
     * @returns boolean 
     */
    conflictsWith(courseObject) 
    {
        var conflict = this.#dayConflict(courseObject);
        return conflict;
    }

    /**
     * Private method that determines if the Course instance has overlapping days with the Course object handed in.
     * @param {Course} courseObject 
     * @returns boolean
     */
    #dayConflict(courseObject)
    {
        var conflict = false;
        if (this.days.includes('M') && courseObject.days.includes('M'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('T') && courseObject.days.includes('T'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('W') && courseObject.days.includes('W'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('R') && courseObject.days.includes('R'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('F') && courseObject.days.includes('F'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('S') && courseObject.days.includes('S'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        if (this.days.includes('U') && courseObject.days.includes('U'))
        {
            conflict = this.#timeConflict(courseObject);
        }
        return conflict;
    }

    /**
     * Private method that determines if the Course instance has overlapping timeslots with the Course object handed in.
     * @param {Course} courseObject 
     * @returns boolean
     */
    #timeConflict(courseObject)
    {
        var conflict = false;
        if (((courseObject.startTime <= this.endTime) && (this.endTime <= courseObject.endTime)) || ((this.startTime <= courseObject.endTime) && (courseObject.endTime <= this.endTime)))
        {
            conflict = true;
        }
        return conflict;
    }
}

export class Student
{
    static studentList = new Array();

    constructor(name, id)
    {
        this.name = name;
        this.id = id;
        this.courses = new Array();
        Student.studentList.push(this);
    }

    static load(studentFile)
    {
        var conflicts = new Array();
        var lines = fs.readFileSync(studentFile, { encoding: 'utf8' }).split('\n'); //Split the file into lines
        for (const element of lines)
        {
            var studentInfo = element.split(', ').reverse(); //Split each line along the commas and then reverse the array (for easier pop())
            var studentName = studentInfo.pop();
            var studentId = studentInfo.pop();
            var studentRef = new Student(studentName, studentId);
            for (const element of studentInfo) //At this point, studentInfo only contains courseInfo, so each element is a course
            {
                var courseInfo = element.split(' '); //Split the given course information into subject, number, and section (if given)
                conflicts = conflicts.concat(studentRef.add(Course.find(courseInfo[0], courseInfo[1], courseInfo[2].trim())));
            }
        }
        return conflicts;
    }

    add(courseObjectArray)
    {
        var conflicts = new Array();
        for (const newCourse of courseObjectArray)
        {
            try 
            {
                for (const oldCourse of this.courses)
                {
                    if (newCourse.conflictsWith(oldCourse))
                    {
                        if (newCourse.name == 'Laboratory' || newCourse.name == 'Laborarory')
                        {
                            this.courses.splice(this.courses.indexOf(oldCourse),1);
                            this.courses.push(newCourse);
                        }
                        throw new Error(`${this.name} has a timeslot conflict between ${newCourse.name} and ${oldCourse.name}`);
                    }
                }
            }
            catch(e)
            {
                conflicts.push(e);
                continue;
            }
            this.courses.push(newCourse);
        }
        return conflicts;
    }

    remove(courseSubject, courseNumber, courseSection)
    {
        for (const course of courses)
        {
            if (course.subject == courseSubject && course.number == courseNumber && course.section == courseSection)
            {
                courses.splice(courses.indexOf(course), 1);
            }
        }
    }
}