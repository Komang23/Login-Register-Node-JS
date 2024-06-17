// Import modul yang diperlukan
import express, { Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/index.js";

// Konfigurasi dotenv untuk menggunakan variabel lingkungan dari file .env
dotenv.config();

// Inisialisasi aplikasi Express
const app = express()

// Mengautentikasi koneksi ke database
try {
    await db.authenticate();
    console.log('Database Connected'); // Jika berhasil, cetak pesan ini
} catch (error) {
    console.error(error); // Jika gagal, cetak error
}


app.use(cookieParser());
// Menggunakan middleware untuk mengurai JSON dalam permintaan
app.use(express.json());

// Menggunakan router yang diimport dari ./routes/index.js
app.use(router);

// Menjalankan server pada port 5000
app.listen(5000, () => console.log('Server Running at Port 5000'));
