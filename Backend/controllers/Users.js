// Mengimpor model Users dari UserModels
import Users from "../models/UserModels.js";
// Mengimpor modul bcrypt untuk enkripsi password
import bcrypt from "bcrypt";
// Mengimpor modul jsonwebtoken untuk pembuatan dan verifikasi JWT
import jwt from "jsonwebtoken";
// Mengimpor error UnknownConstraintError dari sequelize
import { UnknownConstraintError } from "sequelize";

// Fungsi untuk mengambil semua pengguna dari database
export const getUsers = async (req, res) => {
    try {
        // Mengambil semua pengguna menggunakan metode findAll dari Sequelize
        const users = await Users.findAll();
        // Mengirimkan daftar pengguna sebagai respons dalam format JSON
        res.json(users);
    } catch (error) {
        // Menangani error dan mengirimkan respons error dengan status 500
        console.log(error);
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil pengguna" });
    }
};

// Fungsi untuk mendaftarkan pengguna baru
export const Register = async (req, res) => {
    // Mendestrukturisasi data dari body request
    const { name, email, password, confPassword } = req.body;
    // Memeriksa apakah password dan konfirmasi password cocok
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Konfirmasi Password tidak cocok" });
    
    try {
        // Membuat salt untuk enkripsi password
        const salt = await bcrypt.genSalt();
        // Mengenkripsi password
        const hashPassword = await bcrypt.hash(password, salt);
        // Menyimpan pengguna baru ke dalam database
        await Users.create({
            name: name,
            email: email,
            password: hashPassword 
        });
        // Mengirimkan respons sukses
        res.json({ msg: "Registrasi berhasil" });
    } catch (error) {
        // Menangani error dan mengirimkan respons error dengan status 500
        console.log(error);
        res.status(500).json({ error: "Terjadi kesalahan saat mendaftar" });
    }
};

// Fungsi untuk login pengguna
export const Login = async (req, res) => {
    try {
        // Mencari pengguna berdasarkan email
        const users = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        // Memeriksa apakah pengguna ditemukan
        if (!users.length) {
            return res.status(404).json({ msg: "Email tidak ditemukan" });
        }

        // Membandingkan password yang diberikan dengan password yang tersimpan
        const match = await bcrypt.compare(req.body.password, users[0].password);
        // Jika password tidak cocok, mengirimkan respons error
        if (!match) {
            return res.status(400).json({ msg: "Password salah" });
        }

        // Mendestrukturisasi data pengguna untuk membuat token
        const userId = users[0].id;
        const name = users[0].name;
        const email = users[0].email;

        // Membuat access token dengan masa berlaku 50 detik
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '50s'
        });
        // Membuat refresh token dengan masa berlaku 1 hari
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        // Memperbarui refresh token di database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        // Mengirimkan refresh token sebagai cookie HTTP-only dengan masa berlaku 1 hari
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
        });

        // Mengirimkan access token sebagai respons dalam format JSON
        res.json({ accessToken });
    } catch (error) {
        // Menangani error dan mengirimkan respons error dengan status 500
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan dalam proses login" });
    }
};
