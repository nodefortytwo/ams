/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', {
        title : config.siteName,
        data : config.data
    })
};
