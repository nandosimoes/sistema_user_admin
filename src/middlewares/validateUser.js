const validateUser = (req, res, next) => {
    const { nome, email } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({
            msg: 'Nome inválido',
        });
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            msg: 'Email inválido',
        });
    }
    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({
            msg: 'Email deve conter "@" e "."',
        });
    }
    next();
};

const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            msg: 'ID inválido',
        });
    }
    next();
};

module.exports = { validateUser, validateUserId };
