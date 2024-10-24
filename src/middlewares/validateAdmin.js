const validateAdmin = (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({
            msg: 'campos inválidos'
        });
    }

    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            msg: 'campos inválidos'
        });
    }

    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({
            msg: 'campo email inválido'
        });
    }

    if (!senha || typeof senha !== 'string' || senha.length < 6) {
        return res.status(400).json({
            msg: 'campo senha inválido, deve ter pelo menos 6 caracteres'
        });
    }

    next();
};

const validateAdminId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            msg: 'Parametro ID inválido'
        });
    }

    next();
};

const validateAdminLogin = (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            msg: 'campos inválidos'
        });
    }

    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({
            msg: 'campo email inválido'
        });
    }

    if (!senha || typeof senha !== 'string' || senha.length < 6) {
        return res.status(400).json({
            msg: 'campo senha inválido, deve ter pelo menos 6 caracteres'
        });
    }

    next();
};

module.exports = {
    validateAdmin,
    validateAdminId,
    validateAdminLogin
};
