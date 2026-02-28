const express = require('express')
const router = express.Router()
// Controllers
const { create,
    list,
    read,
    update,
    remove,
    listby,
    searchFilters,
    createImages,
    removeImage
} = require('../controllers/product')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
// @ENDPOINT http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/product
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)

router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimages', authCheck, adminCheck, removeImage)




module.exports = router