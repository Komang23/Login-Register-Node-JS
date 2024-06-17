// Mengimpor Sequelize dari modul sequelize
import { Sequelize } from "sequelize";

// Mengimpor objek db dari konfigurasi Database
import db from "../config/Database.js";

// Mendestrukturisasi DataTypes dari Sequelize untuk kemudahan penggunaan
const { DataTypes } = Sequelize;

// Mendefinisikan model Users dengan Sequelize
const Users = db.define('users', {
    // Mendefinisikan atribut name dengan tipe STRING
    name: {
        type: DataTypes.STRING
    },
    // Mendefinisikan atribut email dengan tipe STRING
    email: {
        type: DataTypes.STRING
    },
    // Mendefinisikan atribut password dengan tipe STRING
    password: {
        type: DataTypes.STRING
    },
    // Mendefinisikan atribut refresh_token dengan tipe TEXT
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    // Mengatur freezeTableName menjadi true agar Sequelize tidak mengubah nama tabel menjadi bentuk jamak
    freezeTableName: true
});

// Mengekspor model Users agar dapat digunakan di file lain
export default Users;
