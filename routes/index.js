var express = require('express');
var router = express.Router();

const login = require('./login');
const home = require('./admin/home.js');
const adminInsert = require('./admin/insertProduct.js');
const cart = require('./user/cart.js');
const details = require('./user/details.js');
const insertCart = require('./user/insertCart.js');
const product = require('./user/product.js');
const payment = require('./user/payment.js');


router.use('/', (req,res,next) => {
    if(req.url == '/' || req.url == '/login' || '/admin/home') {
        // console.log("세션 검사 하지않는 페이지")
        next();
    } else {                                            // 로그인 페이지 이외의 페이지에 진입하려고 하는 경우
        if(req.session.user) {
            // console.log("세션이 있다.")
            next();                        // user와 admin이 같은 페이지를 이용할 때 구분해줘야 할 때
        } else {
            // console.log("세션이 없다.")
            res.send("<script>alert('로그인이 필요합니다.');location.href='/'</script>");
        }
    }
});


// 로그인
router.use('/',login);

// 회원
router.use('/user/details', details);
router.use('/user/cart', cart);
router.use('/user/insertCart', insertCart);
router.use('/user/payment', payment);



//관리자
router.use('/admin/home', product);
router.use('/admin/home', home);
router.use('/admin/insertProduct', adminInsert);

module.exports = router;