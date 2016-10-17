import 'babel-polyfill';
import express from 'express';
import * as helpers from './data/helpers';
import cors from 'cors';
import _ from 'lodash';
import path from 'path';
import open from 'open';
import compression from 'compression';

let url= process.env.API_URL;
let staticFilePath = __dirname+'/ui';

if(_.size(process.argv) <=2){    
    url= process.env.API_URL;
}
else{
    url= process.argv[2];    
}
console.log(`url is: ${url}`);
const app = express();
app.set('port', process.env.PORT || 3001);
//For CORS headers and errors 
app.use(cors());
helpers.setBaseUrl(url);
//Root path
app.get('/',(req,res)=>{
    res.send(`Root, calling api from here: ${url}`);
});
//UI app path 
app.get('/ui', function(req, res) {
    //For static file serving through express for the UI app. 
    app.use(compression());
    app.use(express.static(staticFilePath));
    res.sendFile(path.join(staticFilePath, 'index.html'));
});
app.get('/specialties', async (req, res) => {
    const params = req.originalUrl;
    //debugger;
    const results = await helpers.getApiData(params);
    //debugger;
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/coordinates', async (req,res)=>{
    const params = req.originalUrl;
    //debugger;
    const results = await helpers.getApiData(params);
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/networks', async (req,res) =>{
  const params = req.originalUrl;
    //debugger;
    const results = await helpers.getApiData(params);
    //debugger;
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/zips',async(req,res) =>{
  const params = req.originalUrl;
    //debugger;
    const results = await helpers.getApiData(params);
    //debugger;
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

export default app;