const apiKeyMiddleware = (req, res, next) => {
	const apiKey = req.header('p-api-key');

	if (!apiKey) res.status(401).json({ msg: 'Auth Error' });

	if (apiKey !== process.env.API_KEY)
		res.status(403).json({ msg: 'API KEY Invalida' });

	next();
};

export default apiKeyMiddleware