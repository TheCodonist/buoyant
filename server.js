const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
});

app.listen(3000, () => {
	console.log('Demo listening on 3000')
});

app.use(express.static(`${__dirname}/`));