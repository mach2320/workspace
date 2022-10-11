
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

var shopRouter = require('./routes/index');
var insertRouter = require('./routes/admin/insertProduct');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/user/product');
var usersRouter = require('./routes/user/users');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use( // request를 통해 세션 접근 가능 ex) req.session
  session({
    // key: "loginData",
    secret: "keyboard cat", // 반드시 필요한 옵션. 세션을 암호화해서 저장함
    resave: false, // 세션 변경되지 않아도 계속 저장됨. 기본값은 true지만 false로 사용 권장
    saveUninitialized: true, // 세션을 초기값이 지정되지 않은 상태에서도 강제로 저장. 모든 방문자에게 고유 식별값 주는 것.
    cookie: {
      maxAge: 3600000
    },
    rolling: true
    // store: new MYSQLStore(connt),
  })
);

app.use('/', shopRouter);
app.use('/insertRouter', insertRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;