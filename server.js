require("./config/db")
const app = require('express')(); 
const port =3000;

const UserRouter = require('./api/user')

const bodyParser = require('express').json;
app.use(bodyParser());

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});