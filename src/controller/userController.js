const userServices = require("../services/userServices")

const userController = {
    create: async (req, res) => {
        try {
            const user = await userServices.create(req.body)
            return res.status(201).json({
                msg: 'usuário criado com sucesso',
                user
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao criar o usuário'
            })
        }
    },
    update: async (req, res) => {
        try {
            const user = await userServices.update(req.params.id, req.body)
            if (!user) {
                return res.status(404).json({
                    msg: 'usuário não encontado',
                })    
            }
            return res.status(200).json({
                msg: 'usuário atualizado com sucesso',
                user
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar o usuário'
            })
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await userServices.getAll(req.body)
            return res.status(201).json({
                msg: 'Úsuarios:',
                users
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao listar os usuário'
            })
        }
    },
    getOne: async (req, res) => {
        try {
            const user = await userServices.getById(req.params.id)
            if (!user) {
                return res.status(404).json({
                    msg: 'usuário não encontado',
                })    
            }
            return res.status(200).json({
                msg: 'usuário encontado com sucesso',
                user
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao procurar o usuário'
            })
        }
    },
    delete: async (req, res) => {
        try {
            const userDeleted = await userServices.delete(req.params.id)
            if (!userDeleted) {
                return res.status(404).json({
                    msg: 'usuário não encontado',
                })    
            }
            return res.status(200).json({
                msg: 'usuário deletado com sucesso',
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao deletar o usuário'
            })
        }
    },

}
module.exports = userController