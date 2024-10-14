const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createToughts)
router.post('/add', checkAuth, ToughtsController.createToughtsSave)
router.get('/edit/:id', checkAuth, ToughtsController.updateTought)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/', ToughtsController.showToughts)

module.exports = router