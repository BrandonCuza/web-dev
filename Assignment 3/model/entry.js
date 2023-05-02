import { getDb } from '../utils/db.js';

async function _get_entries_collection (){
    let db = await getDb();
    return await db.collection('canada');
};

/**
 * The class Entry, with a main constructor
 */

class Entry {
    constructor(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths){
        this.iso_code = iso_code;
        this.continent = continent;
        this.location = location;
        this.date = date;
        this.total_cases = total_cases;
        this.new_cases = new_cases;
        this.total_deaths = total_deaths;
        this.new_deaths = new_deaths;
    }

    /**
     * This method saves the current object Entry in the Database
     * @returns {String} - A message if entry was saved in the db or not
     */
    async save(){
        try{
            let collection = await _get_entries_collection();
            let mongoObj = await collection.insertOne(this);
            console.log('1 Entry was inserted in the database with id -> '+mongoObj.insertedId);
            return 'Entry correctly inserted in the Database.';            
        } catch(err){
            throw err
        }        
    }

    /**
     * This static method for the class Entry will retrieve
     * all the entries inside the database
     * @returns {Array[Entry]} - An array with all entries retrieved
     */
    static async getAll(){
        let collection = await _get_entries_collection();
        let objs = await collection.find({}).toArray();
        return objs;                
    }

    /**
     * This method will retrieve an entry with the date passed
     * as a parameter
     * @param {String} date - the date of the entry to be retrieved
     * @returns {Entry} - An object Entry with all the entry's data
     */
    static async get(date){
        let collection = await _get_entries_collection();
        let obj = await collection.find({"date": date}).toArray();
        return obj;
    }

    /**
     * This method will update the entry's data
     * @param {String} date - The date of entry to be updated
     * @param {Entry} new_entry - An object of class Entry
     * @returns {String} A message if the entry was updated or not
     */
    static async update(date, new_entry){
        let collection = await _get_entries_collection();
        let new_vals = {$set: { 'iso_code': new_entry.iso_code, 'continent': new_entry.continent, 'location': new_entry.location, 'date': new_entry.date, 
                                'total_cases': new_entry.total_cases, 'new_cases':new_entry.new_cases, 'total_deaths': new_entry.total_deaths, 'new_deaths': new_entry.new_deaths}};
        let obj = await collection.updateOne({'date': date}, new_vals)
        if (obj.modifiedCount > 0){
            return 'Entry correctly updated.';
        }else{
            return 'Entry was not updated'
        }        
    }

    /**
     * This method will delete the entry with the specified
     * date.
     * @param {String} date_to_delete - The date of the entry to be deleted
     * @returns {String} A message if the entry was deleted or not
     */
    static async delete(date_to_delete){
        let collection = await _get_entries_collection();
        let obj = await collection.deleteOne({'date': date_to_delete})
        if (obj.deletedCount > 0){
            console.log(`1 Entry with date ${date_to_delete} was deleted from database.`)
            return 'Entry was deleted.'
        }else{
            return 'Entry was not found'
        }
    }
}

const _Entry = Entry;
export { _Entry as Entry };