
const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require("./db");



app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


(async () => {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json())

app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
