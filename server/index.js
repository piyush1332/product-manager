const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { getProductList, getProductDetail, postProductInformation, updateProductInformation } = require('./service');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const upload = multer({ dest: './uploads/' });
const directory = path.join(__dirname, './uploads');

function init() {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/uploads', express.static(directory));
}
init();

function apiInit() {
    app.get('/api/products/', (req, res) => getProductList(req, res))
    app.get('/api/product/:id', (req, res) => getProductDetail(req, res))
    app.post('/api/product/create', upload.single('image'), (req, res) => postProductInformation(req, res))
    app.put('/api/product/create', upload.single('image'), (req, res) => updateProductInformation(req, res))
}
apiInit();

app.listen(4000, () => {
    console.log('app running on 4000...')
})