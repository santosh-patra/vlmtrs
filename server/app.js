import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
import { fileURLToPath } from 'url';
// import productRoutes from '../routes/productroutes.js';
import vendorRoutes from '../routes/vendorRoutes.js';
import spareRoutes from '../routes/spareRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from 'jsonwebtoken'
import sequelize from '../config/mysqlconfig.js';
const SECRET_KEY = 'my-high-level-secret-key';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 
app.use(cors())
// console.log("dhgcdhc--->",path.join(__dirname,'../controller/qr-images'));
// console.log("dhgcdhc--->",path.basename(__filename));
// app.use('/v1/product', productRoutes)
app.use('/v1/vendor', vendorRoutes)
app.use('/v1/spare', spareRoutes)


app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: "Success"
  })

})
// caution : All your data will be removed from database.Please hit this api carefully
app.post('/force-all-remove-data', (req, res) => {
  sequelize.sync({ force: true })
    .then(() => {
      console.log("All data are removed from Database");
      res.status(200).send({
        success: true,
        message: "All data are removed from Database...Please add new data to Proceed"
      })
    })
    .catch(err => console.log("Error in deleting all data from database--->", err));
})
// caution : All your schema will be modfied from database.Please hit this api carefully
app.post('/alter-table-cloumn', (req, res) => {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log("All Table Schemas are altered");
      res.status(200).send({
        success: true,
        message: "All Table Schemas are altered"
      })
    })
    .catch(err => console.log("Error in deleting all data from database--->", err));
})

//jwt token creation
app.get('/token', (req, res) => {
  var token = jwt.sign({ foo: 'bar' }, SECRET_KEY);
  console.log("token--->", token)
  res.status(200).send({
    success: true,
    token
  })

})

app.use((req, res, next) => {
  console.log("Yoh have entered the wrong Url......Please Check and try with correct URL");
  const err = new Error("Not Found");
  err.status = 404;
  return res.status(err.status).json({
    success: false,
    message: "Oops!! It seems that the URL might be incorrect..Please Check the Method, Endpoint and try Again",
    data: {
      url: req.originalUrl
    }
  });
});




export default app;