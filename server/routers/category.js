const express = require('express')
const router = express.Router()
const { create, list, remove } = require('../controllers/category')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// @ENDPOINT http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/category
router.post('/category', authCheck, adminCheck, create)
router.get('/category', list)
router.delete('/category/:id', authCheck, adminCheck, remove)






module.exports = router