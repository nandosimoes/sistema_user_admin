const { Router } = require("express")
const userController = require("../controller/userController")
const router = Router()
const { validateUser, validateUserId } = require("../middlewares/validateUser")

router.post('/', validateUser, userController.create)
router.put('/:id', validateUser, validateUserId, userController.update)
router.delete('/:id',validateUserId, userController.delete)
router.get('/:id', validateUserId, userController.getOne)
router.get('/', userController.getAll)

module.exports = router

