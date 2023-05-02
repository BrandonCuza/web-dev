import { strictEqual, fail } from 'assert';
import { Entry } from '../model/Entry.js';
import { validate_fields, validate_date } from '../utils/validate-fields.js';
import axios from 'axios';
import promptSync from 'prompt-sync';
const create = axios.create;

var myurl = 'http://localhost:3000';           
// Let's configure the base url
const instance = create({
    baseURL: myurl,
    timeout: 5000, //5 seconds max
    headers: {'content-type': 'application/json'}
});

describe('Canada Covid Database App v1 - Tests with Mocha', function(){
    describe('Test Models', function(){
        describe('Entry', function(){
            let ciso= 'CAN';
            let ccont = 'North America';
            let cloc = 'Canada';
            let cdate = '2018-08-06';
            let ct_c = 23;
            let cn_c = 5;
            let ct_d = 7;
            let cn_d = '';       

            it('Test if entry is invalid function (Invalid ISO code)', async function(){
                let c = new Entry('Bad ISO', ccont, cloc, cdate, ct_c, cn_c, ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid continent)', async function(){
                let c = new Entry(ciso, 'Bad Continent', cloc, cdate, ct_c, cn_c, ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid location)', async function(){
                let c = new Entry(ciso, ccont, 'Bad Location', cdate, ct_c, cn_c, ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid date)', async function(){
                let c = new Entry(ciso, ccont, cloc, 'Bad Date', ct_c, cn_c, ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid number of total cases)', async function(){
                let c = new Entry(ciso, ccont, cloc, cdate, 'Bad Total Cases', cn_c, ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid number of new cases)', async function(){
                let c = new Entry(ciso, ccont, cloc, cdate, ct_c, 'Bad New Cases', ct_d, cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid number of total deaths)', async function(){
                let c = new Entry(ciso, ccont, cloc, cdate, ct_c, cn_c, 'Bad Total Deaths', cn_d);
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
            it('Test if entry is invalid function (Invalid number of new deaths)', async function(){
                let c = new Entry(ciso, ccont, cloc, cdate, ct_c, cn_c, ct_d, 'Bad New Deaths');
                strictEqual(await validate_fields(c.iso_code, c.continent, c.location, c.date, c.total_cases, c.new_cases, c.total_deaths, c.new_deaths), false);
            });
        });
    });
    describe('Test API calls', function(){
        describe('Entries', async function(){            
            it('Fail 1. POST - Test invalid ISO code in the object', async function(){
                let data = {
                    iso_code: 'Bad ISO', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 2. POST - Test invalid continent in the object', async function(){
                let data = { 
                    iso_code: 'CAN', 
                    continent: 'Bad Continent', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 3. POST - Test invalid location in the object', async function(){
                let data = {
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Bad Country',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 4. POST - Test invalid date in the object', async function(){
                let data = {
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: 'Bad Date',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');
            });
            it('Fail 5. POST - Test invalid number of total cases in the object', async function(){
                let data = { 
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 'Bad Total Cases',
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 6. POST - Test invalid number of new cases in the object', async function(){
                let data = { 
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 'Bad New Cases',
                    total_deaths: 7,
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 7. POST - Test invalid number of total deaths in the object', async function(){
                let data = {
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 'Bad Total Deaths',
                    new_deaths: ''
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 8. POST - Test invalid number of new deaths in the object', async function(){
                let data = { 
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: 'Bad New Deaths'
                }
                let res = await instance.post('/canada', data)
                strictEqual(res.data, 'Error. Entry not inserted in the database.');                
            });
            it('Fail 9. GET - /canada/:date (No entry with date)', async function(){
                let entry_date = 'Someone Unknown';
                let res = await instance.get('/canada/'+entry_date)
                strictEqual(res.data,'No item was found');                  
            });
            it('Fail 10. DELETE - /canada/:date (No entry with date)', async function(){
                let entry_date = 'Someone Unknown';
                let res = await instance.delete('/canada/'+entry_date);
                strictEqual(res.data, 'Entry was not found');
            });
            it('Success 1. POST - Valid entry, PUT - Valid data, GET - entry, DELETE - entry', async function(){
                let data1 = { 
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 23,
                    new_cases: 5,
                    total_deaths: 7,
                    new_deaths: ''
                }
                let data2 = { 
                    iso_code: 'CAN', 
                    continent: 'North America', 
                    location: 'Canada',
                    date: '2018-08-06',
                    total_cases: 60,
                    new_cases: 15,
                    total_deaths: 21,
                    new_deaths: 9
                }
                let res_post = await instance.post('/canada', data1)
                strictEqual(res_post.data, 'Entry correctly inserted in the Database.');
                let res_put = await instance.put('/canada/'+data1.date, data2);
                strictEqual(res_put.data, 'Entry correctly updated.');
                let res_get = await instance.get('/canada/'+data2.date);
                strictEqual(res_get.data.iso_code, data2.iso_code);
                strictEqual(res_get.data.continent, data2.continent);
                strictEqual(res_get.data.location, data2.location);
                strictEqual(res_get.data.date, data2.date);
                strictEqual(res_get.data.total_cases, data2.total_cases);
                strictEqual(res_get.data.new_cases, data2.new_cases);
                strictEqual(res_get.data.total_deaths, data2.total_deaths);
                strictEqual(res_get.data.new_cases, data2.new_cases);
                let res_del = await instance.delete('/canada/'+data1.date);
                strictEqual(res_del.data, 'Entry was deleted.');                
            });          
        });        
    });   
});