const { Product, Category } = require('../models');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;
const ExcelJS = require('exceljs');

exports.downloadCSV = async (req, res) => {
    const products = await Product.findAll({ include: [{ model: Category, attributes: ['name'] }] });
    const csvStringifier = createCsvWriter({
        header: [
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'Name' },
            { id: 'price', title: 'Price' },
            { id: 'category', title: 'Category' }
        ]
    });
    const records = products.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.Category ? p.Category.name : '' }));
    const header = csvStringifier.getHeaderString();
    const body = csvStringifier.stringifyRecords(records);
    const csv = header + body;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.send(csv);
};

exports.downloadXLSX = async (req, res) => {
    const products = await Product.findAll({ include: [{ model: Category, attributes: ['name'] }] });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Products');
    sheet.columns = [
        { header: 'ID', key: 'id', width: 36 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Price', key: 'price', width: 12 },
        { header: 'Category', key: 'category', width: 20 }
    ];
    products.forEach(p => sheet.addRow({ id: p.id, name: p.name, price: p.price, category: p.Category ? p.Category.name : '' }));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
    await workbook.xlsx.write(res);
    res.end();
};