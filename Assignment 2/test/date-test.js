import { strictEqual } from 'assert';
import { validate_date } from '../utils/validate-fields.js';
import axios from 'axios';
import promptSync from 'prompt-sync';
const create = axios.create;

var myurl = 'http://localhost:3000';           
// Let's configure the base url
const instance = create({
    baseURL: myurl,
    timeout: 30000, //30 seconds max
    headers: {'content-type': 'application/json'}
});

describe('Canada Covid Database App v1 - Tests with Mocha', function(){
    it('Success 2. Get number of deaths between two dates.', async function(){
    let prompt1 = promptSync(); 
    let date1 = prompt1('Input the start date (yyyy-mm-dd).');
    strictEqual(await validate_date(date1), true);
    let prompt2 = promptSync();
    let date2 = prompt2('Input the end date (yyyy-mm-dd).')
    strictEqual(await validate_date(date2), true);
    let res_get1 = await instance.get('/canada/'+date1);
    let res_get2 = await instance.get('/canada/'+date2);
    let upperNum = res_get2.data.total_deaths;
    let lowerNum = res_get1.data.total_deaths;
    let difference = upperNum - lowerNum;
    console.log(difference);
    });
});