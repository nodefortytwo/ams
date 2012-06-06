/*
 * GET home page.
 */

exports.index = function(req, res) {
    console.log(config);
    res.render('index', {
        title : config.siteName
    })
};
