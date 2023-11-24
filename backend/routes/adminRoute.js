const express = require('express')
const router = express.Router()
const {
    registerAdmin,
    loginAdmin,
    getAdmin
} = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')

/* Define las rutas de la API de admin */
router.post('/', registerAdmin)
router.post('/login', loginAdmin)
router.get('/me', protect, getAdmin)

module.exports = router