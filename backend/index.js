
const getDataFromDB = require('./db');

(async function () {
  try {
    const { gen ,business , entertainment , sports ,health , science} = await getDataFromDB();
    global.gen = gen;
    global.business  = business;
    global.entertainment = entertainment;
    global.sports = sports;
    global.health = health;
    global.science = science;
  } catch (err) {
    console.log(err);
  }
})();
//The parentheses () at the end of the code snippet indicate that it's a self-executing anonymous function, also known as an Immediately Invoked Function Expression (IIFE)

  
  const express = require('express')
  const app = express()
  const port = 5000
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(express.json())
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.use('/api/auth', require('./Routes/Auth'));
  
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
  
  