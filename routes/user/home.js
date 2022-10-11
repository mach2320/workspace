var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

router.get('/', (req, res) => {
    let route = req.app.get('views') + '/admin/home';
    res.render(route, {
        
    })
})

module.exports = router;