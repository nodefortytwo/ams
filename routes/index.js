/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res) {
    res.render('index', {
        title : config.siteName,
        data : config.data
    })
};

exports.getConfig = function(req, res) {
    res.end(JSON.stringify(config.data))
};

exports.saveConfig = function(req, res) {
    config.data = req.body;
    if(config.dataFile) {
        fs.writeFile('./data/' + config.dataFile, JSON.stringify(config.data), function(err, data) {
            if(err)
                throw err;
        });
    }
    res.end('dude!');
};


