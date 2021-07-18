const express =require('express');
const app = express();
const routes = require('./routes/routes');
//env
const dotenv=require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(port,() => console.log('Server is running')); 
 