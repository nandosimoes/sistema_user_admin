const adminServices = require("../services/adminServices");

const adminController = {
    create: async (req, res) => {
        try {
            const admin = await adminServices.create(req.body);
            return res.status(201).json({
                msg: 'Admin criado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao criar o admin'
            });
        }
    },
    update: async (req, res) => {
        try {
            const admin = await adminServices.update(req.params.id, req.body);
            if (!admin) {
                return res.status(404).json({
                    msg: 'Admin não encontrado',
                });
            }
            return res.status(200).json({
                msg: 'Admin atualizado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar o admin'
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const admins = await adminServices.getAll();
            return res.status(200).json({
                msg: 'Admins:',
                admins
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao listar os admins'
            });
        }
    },
    getOne: async (req, res) => {
        try {
            const admin = await adminServices.getById(req.params.id);
            if (!admin) {
                return res.status(404).json({
                    msg: 'Admin não encontrado',
                });
            }
            return res.status(200).json({
                msg: 'Admin encontrado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao procurar o admin'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const adminDeleted = await adminServices.delete(req.params.id);
            if (!adminDeleted) {
                return res.status(404).json({
                    msg: 'Admin não encontrado',
                });
            }
            return res.status(200).json({
                msg: 'Admin deletado com sucesso',
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao deletar o admin'
            });
        }
    },
    login: async (req, res) => {
        try {
            const token = await adminServices.login(req.body);
            return res.status(200).json({
                msg: 'Login bem-sucedido',
                token
            });
        } catch (error) {
            return res.status(401).json({
                msg: 'Credenciais inválidas'
            });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const result = await adminServices.forgotPassword(email);
            return res.status(200).json({
                msg: result.msg
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
};

module.exports = adminController;
