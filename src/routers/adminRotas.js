const { Router } = require("express");
const adminController = require("../controller/adminController");
const { validateAdmin, validateAdminId, validateAdminLogin } = require("../middlewares/validateAdmin");

const router = Router();

router.post('/', validateAdmin, adminController.create);
router.put('/:id', validateAdmin, validateAdminId, adminController.update);
router.delete('/:id', validateAdminId, adminController.delete);
router.get('/:id', validateAdminId, adminController.getOne);
router.get('/', adminController.getAll);


router.post('/login', validateAdminLogin, adminController.login);
router.post('/forgot-password', adminController.forgotPassword);

module.exports = router;
