import { validate_fields } from '../utils/validate-fields.js';
import { Entry } from '../model/entry.js';

/**
 * A function that adds an entry to the database.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */

export async function create(req, res) {
    let iso_code = req.body.iso_code;
    let continent = req.body.continent; 
    let location = req.body.location;
    let date = req.body.date;
    let total_cases = req.body.total_cases;
    let new_cases = req.body.new_cases;
    let total_deaths = req.body.total_deaths;
    let new_deaths = req.body.new_deaths;
    let isValid = await validate_fields(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths);
    if (isValid){
        let new_entry = new Entry(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths);
        let msg = await new_entry.save();
        res.send(msg);                
    } else {
        console.log('The Entry was not inserted in the database since it is not valid.');
        res.send('Error. Entry not inserted in the database.');
    }
}

/**
 * A function that gets an entry by date and returns all
 * data of the requested entry. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read(req, res) {
    let date_to_match = req.params.date;
    let obj = await Entry.get(date_to_match);
    if (obj.length > 0){
        console.log(obj.length+' item(s) sent.');
        res.send(obj[0]);        
    }else{
        res.send('No item was found');
    }  
}

/**
 * A function that lists all entries with all information that is
 * in the file. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function readAll(req, res) {
    let objs = await Entry.getAll();
    console.log(objs.length+' item(s) sent.')
    res.send(objs);
}

/**
 * A function to update the information about a given entry.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_entry(req, res) {
    let date_to_match = req.params.date;
    let iso_code = req.body.iso_code;
    let continent = req.body.continent; 
    let location = req.body.location;
    let date = req.body.date;
    let total_cases = req.body.total_cases;
    let new_cases = req.body.new_cases;
    let total_deaths = req.body.total_deaths;
    let new_deaths = req.body.new_deaths;
    let isValid = await validate_fields(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths);
    if (isValid){
        let msg = await Entry.update(date_to_match, new Entry(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths));
        console.log(`1 Entry with date ${date_to_match} was updated.`);
        res.send(msg);
    } else {
        console.log("The document was not updated");
        let msg = 'The new entry data is not valid.';
        res.send(msg);
    }
}

/**
 * A function that deletes the information about a given entry.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function delete_entry(req, res) {
    let date_to_delete = req.params.date;
    let msg = await Entry.delete(date_to_delete);
    res.send(msg);
}