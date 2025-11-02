const adminApiKey = (req, res, next) => {
	const API = req.header('admin-api-key');

	if (!API) res.status(401).json({ msg: 'Auth error.' });

	if (API !== process.env.ADMIN_API_KEY)
		res.status(403).json({ msg: 'Requiere API key.' });

	next();
};

export default adminApiKey;
