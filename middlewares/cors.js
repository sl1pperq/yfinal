const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    'localhost:3000',
    "127.0.0.1:3000",
    "localhost:3003",
    "127.0.0.1:3003",
    "localhost:3002",
    "127.0.0.1:3002",
    'https://front.banjosurf.ru'
];


function cors(req, res, next) {
    const {origin} = req.headers;
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    }
    next();
    console.log('CORS IS OKAY')
}

module.exports = cors;