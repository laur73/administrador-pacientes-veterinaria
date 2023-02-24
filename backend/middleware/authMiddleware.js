const checkAuth = (req, res, next) => {
	console.log('Desde middleware custom');
	next();
}

export default checkAuth;