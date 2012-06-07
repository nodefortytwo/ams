/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), fs = require('fs');

var app = module.exports = express.createServer();

// Load configurations
var config_file = require('yaml-config')
exports = module.exports = config = config_file.readConfig('config/config.yaml')
console.log(config);
//load in any required data
if(config.dataFile) {
    fs.readFile('./data/' + config.dataFile, function(err, data) {
        if(err)
            throw err;
        config.data = JSON.parse(data);
    });
}

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
});

app.use(function(req, res, next) {
    var schema = req.headers["x-forwarded-proto"];
 
    // --- Do nothing if schema is already https
    if (schema === "https")
        return next();
 
    // --- Redirect to https
    //res.redirect("https://" + req.headers.host + req.url);
});
// Routes

app.get('/', routes.index);
app.post('/', routes.index);

app.listen(process.env.PORT, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
