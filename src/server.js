import express from 'express';
import helpers from './data/helpers';
import cors from 'cors';
import _ from 'lodash';

const app = express();

app.set('port', process.env.API_PORT || 3001);

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Root');
});
app.get('/specialties', async (req, res) => {
    const params = req.originalUrl;
    //debugger;
    //const params={code,text,grouping,classification,specialization};
    const results = await helpers.callApi(params);
    //debugger;
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/coordinates', async (req,res)=>{
    const params = req.originalUrl;
    //debugger;
    //const params={code,text,grouping,classification,specialization};
    const results = await helpers.callApi(params);
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/networks', async (req,res) =>{
  const params = req.originalUrl;
    //debugger;
    const results = await helpers.callApi(params);
    //debugger;
    res.set('x-total-count', _.get(results.headers, 'x-total-count')); 
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    //debugger;
    res.send(results.data);
});
app.get('/zips',async(req,res) =>{
  const params = req.originalUrl;
    //debugger;
    const results = await helpers.callApi(params);
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