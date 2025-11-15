const fs = require('fs');
if (!req.file) return res.status(400).json({ message: 'CSV file required' });
const filepath = req.file.path;
const stream = fs.createReadStream(filepath);
const csvStream = csv.parse({ headers: true, ignoreEmpty: true });

const batch = [];
const BATCH_SIZE = 100;
let inserted = 0;
let errors = 0;

csvStream.on('data', async (row) => {
    csvStream.pause();
    try {
        const name = row.name && row.name.trim();
        const price = parseFloat(row.price) || 0;
        const categoryName = row.category && row.category.trim();
        if (!name || !categoryName) { errors++; csvStream.resume(); return; }

        let category = await Category.findOne({ where: { name: categoryName } });
        if (!category) category = await Category.create({ name: categoryName });

        batch.push({ name, price, categoryId: category.id, createdAt: new Date(), updatedAt: new Date() });

        if (batch.length >= BATCH_SIZE) {
            await Product.bulkCreate(batch, { ignoreDuplicates: true });
            inserted += batch.length;
            batch.length = 0;
        }
    } catch (err) {
        console.error('row error', err);
        errors++;
    }
    csvStream.resume();
});


csvStream.on('end', async () => {
    try {
        if (batch.length) {
            await Product.bulkCreate(batch, { ignoreDuplicates: true });
            inserted += batch.length;
        }
        fs.unlinkSync(filepath);
        return res.json({ inserted, errors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed finalizing import' });
    }
});

csvStream.on('error', (err) => {
    console.error('csv error', err);
    return res.status(500).json({ message: 'CSV parse error' });
});

stream.pipe(csvStream);