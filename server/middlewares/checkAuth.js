import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, "")

    if(token) {
        try {
            const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.userId = decodedInfo.id
            next()
        } catch (error) {
            res.json({ message: "Нет доступа" })
        }
    }
}