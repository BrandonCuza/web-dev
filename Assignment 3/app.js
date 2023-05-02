import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({extended: true}));

import { create, read, readAll, update_entry, delete_entry } from './controller/entries.js';
import { connectToDB, closeDBConnection } from './utils/db.js';

var server;

async function createServer(){
  try {
    await connectToDB();

    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(__dirname + '/view'));

    // contacts resource paths
    app.post('/canada', create);
    app.get('/canada/:date', read);
    app.get('/canada', readAll)
    app.put('/canada/:date', update_entry);
    app.delete('/canada/:date', delete_entry);

    // start the server
    server = app.listen(port, () => {
      console.log('Example app listening at http://localhost:%d', port);
    });
  }catch(err){
    console.log(err)
  }
}
createServer();

// I created this callback function to capture
// when for when we kill the server. 
// This will avoid us to create many mongo connections
// and use all our computer resources
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await closeDBConnection()   ;
    console.log(msg);
  });
});
