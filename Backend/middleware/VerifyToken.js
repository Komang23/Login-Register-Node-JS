// Mengimpor modul jsonwebtoken
import jwt from "jsonwebtoken";

// Mendefinisikan middleware verifyToken
export const verifyToken = (req, res, next) => {
    // Mengambil header authorization dari request
    const authHeader = req.headers['authorization'];
    // Jika authHeader ada, memisahkan dan mengambil token dari header
    const token = authHeader && authHeader.split(' ')[1];
    // Jika token tidak ada, mengirim status 401 (Unauthorized)
    if (token == null) return res.sendStatus(401);
    
    // Memverifikasi token dengan secret yang ada di environment variable
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // Jika terjadi error saat verifikasi, mengirim status 403 (Forbidden)
        if (err) return res.sendStatus(403);
        // Jika verifikasi berhasil, menyimpan email yang ter-decode ke dalam request
        req.email = decoded.email;
        // Melanjutkan ke middleware berikutnya
        next();
    });
};
