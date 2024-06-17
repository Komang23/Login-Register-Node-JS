// Mengimpor modul yang diperlukan
import express from "express"; // Mengimpor modul express
import { getUsers, Register, Login } from "../controllers/Users.js"; // Mengimpor fungsi kontrol dari file Users.js
import { verifyToken } from "../middleware/VerifyToken.js"; // Mengimpor middleware verifyToken dari file VerifyToken.js
import { refreshToken } from "../controllers/RefreshToken.js";


// Membuat instance Router dari express
const router = express.Router(); // Menginisialisasi Router untuk mendefinisikan rute

// Mendefinisikan rute GET untuk mengambil data pengguna dengan middleware verifyToken
// Endpoint: /users
router.get('/users', verifyToken, getUsers); // Menambahkan rute GET untuk endpoint /users, dengan verifyToken sebagai middleware untuk memverifikasi token sebelum memanggil getUsers

// Mendefinisikan rute POST untuk mendaftarkan pengguna baru
// Endpoint: /users
router.post('/users', Register); // Menambahkan rute POST untuk endpoint /users, yang memanggil fungsi Register untuk mendaftarkan pengguna baru

// Mendefinisikan rute POST untuk login
// Endpoint: /Login
router.post('/Login', Login); // Menambahkan rute POST untuk endpoint /Login, yang memanggil fungsi Login untuk proses autentikasi pengguna
router.get('./token', refreshToken);

// Mengekspor router agar dapat digunakan di file lain
export default router; // Mengekspor router sebagai default export sehingga dapat diimpor dan digunakan dalam file lain
