module.exports = {
    env: 'development',
    db: process.env.DB,
    dbURL: process.env.DBURL,
    expireToken: process.env.EXPIRE,
    serverPort: process.env.PORT,
    origin: process.env.DOMAIN,
    secret: process.env.SECRET
}