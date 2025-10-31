import app from './app.js';
import connectDB from './config/database.js';

const port = app.get('port');

app.listen(port, () => {
	connectDB()
		.then('Conectado a la Base de Datos')
		.catch((err) => console.log(err));

	console.log(`Server listening in http://localhost:${port}`);
});