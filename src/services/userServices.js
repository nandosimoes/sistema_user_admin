const User = require('../models/user'); 

const userServices = {
    create: async (userData) => {
        try {
            return await User.create(userData); 
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw new Error('Ocorreu um erro ao criar o usuário');
        }
    },

    update: async (id, userToUpdate) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return null;
            }
            await user.update(userToUpdate);
            return user;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error('Ocorreu um erro ao atualizar o usuário');
        }
    },

    getById: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw new Error('Ocorreu um erro ao buscar um usuário único');
        }
    },

    getAll: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            console.error("Erro ao buscar todos os usuários:", error);
            throw new Error('Ocorreu um erro ao buscar todos os usuários');
        }
    },

    delete: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return null;
            }
            await user.destroy();
            return user;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw new Error('Ocorreu um erro ao deletar o usuário');
        }
    },
};

module.exports = userServices;
