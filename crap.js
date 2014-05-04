 app.configure(function(){
   app.set('port', process.env.PORT || 3000);
   // app.set('views', __dirname + '/views');
   // app.set('view engine', 'jade');
   app.use(express.favicon());
   app.use(express.logger('dev'));
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.cookieParser('secret'));
   app.use(express.session());
   app.use(function(req, res, next) {
     res.locals.session = req.session;
     next();
   });

   app.use(app.router);
   // app.use(require('less-middleware')({src: __dirname + '/public'}));
   app.use(express.static(path.join(__dirname, 'public')));
 });