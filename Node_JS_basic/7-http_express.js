const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
res.set('Content-Type', 'text/plain');
res.status(200).send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
res.set('Content-Type', 'text/plain');

let result = 'This is the list of our students\n';

countStudents(database)
.then(() => {
res.status(200).send(result);
})
.catch(() => {
res.status(500).send('Cannot load the database');
});
});

app.listen(1245);

module.exports = app;
