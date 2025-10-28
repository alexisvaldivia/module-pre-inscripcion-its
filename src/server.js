import app from './app.js';

const port = app.get('port');

app.listen(port, () => {
	console.log(`Server listening in http://localhost:${port}`);
});