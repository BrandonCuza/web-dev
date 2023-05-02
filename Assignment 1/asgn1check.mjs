import { Course } from './courses.mjs'

/*  This is a test of the courses module to make sure the courses object works
    as expected
*/

Course.load('./muncourses.txt');

/* some sample courses that should appear in the file */


var someCourses = [ ["COMP", "3100"],
                ["PHYS", "1051"],
                ["ECE", "8420"]
             ]   

for (let info of someCourses ){
    console.log(`The section for ${info[0]} ${info[1]} are:`)
    let cArray = Course.find(info[0], info[1])
    for( let c of cArray){
        console.log(`${c.subject}${c.number} ${c.type} ${c.name} Section: ${c.section} Slot: ${c.slot}` )
    }

}
