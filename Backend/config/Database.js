// Mengimpor modul Sequelize dari library sequelize
import { Sequelize } from "sequelize";

// Membuat instance Sequelize baru untuk koneksi ke database
const db = new Sequelize('auth_db', 'root', '', {
    host: "localhost", // Host database, biasanya adalah 'localhost' untuk lingkungan pengembangan lokal
    dialect: "mysql"   // Dialek database yang digunakan, dalam hal ini adalah MySQL
});

// Mengekspor instance Sequelize yang sudah dikonfigurasi sehingga bisa digunakan di file lain
export default db;
