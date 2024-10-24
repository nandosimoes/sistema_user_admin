const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Usado para gerar nova senha aleatória

const adminServices = {
    create: async (adminData) => {
        try {
            return await Admin.create(adminData);
        } catch (error) {
            throw new Error('Ocorreu um erro ao criar o admin');
        }
    },
    update: async (id, adminData) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            await admin.update(adminData);
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao atualizar o admin');
        }
    },
    getById: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar um admin');
        }
    },
    getAll: async () => {
        try {
            return await Admin.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos os admins');
        }
    },
    delete: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            await admin.destroy();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o admin');
        }
    },
    login: async ({ email, senha }) => {
        try {
            const admin = await Admin.findOne({ where: { email } });
            if (!admin || !await bcrypt.compare(senha, admin.senha)) {
                throw new Error('Credenciais inválidas');
            }
            const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            return token;
        } catch (error) {
            throw new Error('Erro no login');
        }
    },
    forgotPassword: async (email) => {
        if (!email || typeof email !== 'string') {
            throw new Error('Email inválido');
        }

        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            throw new Error('Admin com esse email não foi encontrado');
        }

        const novaSenha = crypto.randomBytes(4).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(novaSenha, salt);

        admin.senha = senhaHash;
        await admin.save();

        console.log(`Enviar email para ${email} com a nova senha: ${novaSenha}`);

        return {
            msg: `Nova senha gerada e enviada por email, ${novaSenha}`,
            novaSenha 
        };
    }
};

module.exports = adminServices;
