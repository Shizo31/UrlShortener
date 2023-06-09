// Body parser for Express [NodeJS]
var qry = require('kc-qstr');
module.exports = function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });
    req.on('end', function() {
        req.body = data;
        
        // Querystring
        req.query = req.query || {};
        
        // Cookies
        req.cookie =
        qry(req.headers.cookie, ';');
        
        // JSON body
        req.json = {};
        try { req.json =
        JSON.parse(req.body)
        } catch(err){}
        
        // Form body
        req.form = {};
        try {
        if (!Object.keys(req.json).length)
        req.form = qry(req.body);
        } catch(err){}
        
        // Text body
        req.text = req.body;
        
        // Merged body
        req.body = {};
        for (var k in req.cookie) {
            req.body[k] = req.cookie[k];
        }
        for (var k in req.json) {
            req.body[k] = req.json[k];
        }
        for (var k in req.form) {
            req.body[k] = req.form[k];
        }
        for (var k in req.query) {
            req.body[k] = req.query[k];
        }
        
        // Language
        if (req.body.lang)
        req.lang = req.body.lang;
        if (!req.lang) {
            try {
            req.lang = req.headers['accept-language'];
            req.lang = req.lang.split(';')[0];
            req.lang = req.lang.split(',')[0];
            req.lang = req.lang.split('-')[0];
            } catch (err) { req.lang = 'en' }
        } req.lang = req.lang.toLowerCase();
        
        next();
    });
}
