const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.1.1.0',
    user: 'root',
    password: '',
    database: 'product_management',
    port: 3307
}).promise();

async function getProductList(req, res) {
    const page = parseInt(req.query.pn);
    const date_start = req.query.date_start;
    const date_end = req.query.date_end;
    const filter = req.query.filter;
    const sort = req.query.sort;
    let query = `SELECT * FROM Products WHERE 1`;
    if (!!filter) {
        query += ` AND name LIKE "%${filter}%"`;
    }
    if (!!date_start && !!date_end) {
        query += ` AND created_at >= "${date_start}" AND created_at <= "${date_end}"`;
    }
    const [result] = await pool.query(query + ` ORDER BY created_at ${sort} LIMIT 5 OFFSET ${(page - 1) * 5} ;`);
    res.send(result);
}

async function getProductDetail(req, res) {
    const id = req.params.id;
    const [result] = await pool.query(`SELECT * FROM Products WHERE id = ${id}`);
    res.send(result);
}

async function postProductInformation(req, res) {
    const dateObject = new Date();
    const date = (`0${dateObject.getDate()}`).slice(-2);
    const month = (`0${dateObject.getMonth() + 1}`).slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.000000`;
    const file_path = `/uploads/${req.file.filename}`;
    const sql = "INSERT INTO Products (name, price,image,created_at) VALUES ('" + req.body.name + "', '" + req.body.price + "' , '" + file_path + "', '" + timestamp + "')";
    const [result] = await pool.query(sql);
    if (result.affectedRows) {
        res.send({ status: 1, message: 'Item Inserted Successfully.' });
    } else {
        res.send({ status: 0, message: 'Something Went Wrong.' });
    }
}

async function updateProductInformation(req, res) {
    const file_path = `/uploads/${req?.file?.filename}`;
    let sql = `UPDATE Products SET name = '${req.body.name}', price= '${req.body.price}' `
    if (!!req?.file?.filename) {
        sql += `, image= '${file_path}'`;
    }
    sql += `WHERE id = ${req.body.id};`;
    const [result] = await pool.query(sql);
    if (result.affectedRows) {
        res.send({
            status: 1,
            message: 'Item Inserted Successfully.'
        });
    } else {
        res.send({
            status: 0,
            message: 'Something Went Wrong.'
        });
    }
}

module.exports = {
    getProductList: getProductList,
    getProductDetail: getProductDetail,
    postProductInformation: postProductInformation,
    updateProductInformation: updateProductInformation
}