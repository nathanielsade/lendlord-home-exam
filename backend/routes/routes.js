const Router = require('koa-router')
const router = new Router()

const ctrl =  require('../controllers/users')
console.log('aaaaaa')
router.get('/users', ctrl.getAllUsers); 
router.get('/user/:id', ctrl.getUserById);
router.post('/user', ctrl.createUser);
router.put('/user/:id', ctrl.updateUser);
router.delete('/user/:id', ctrl.deleteUser);
router.get('/manager/:id/employees', ctrl.getManagerAndEmployees);

router.allowedMethods()

module.exports = router
