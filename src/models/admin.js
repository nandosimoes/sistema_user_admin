const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require('bcrypt');

const Admin = sequelize.define('admin', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (admin) => {
            const salt = await bcrypt.genSalt(10);
            admin.senha = await bcrypt.hash(admin.senha, salt);
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        }
    }
});

module.exports = Admin;
