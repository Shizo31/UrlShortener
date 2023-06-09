// Read a querystring and parse params.
function qstr(query, sep1, sep2) {
    sep1 = sep1 || '&';
    sep2 = sep2 || '=';
    var out = {};
    if (query) {
        query.split(sep1).forEach(function(kv){
            kv = kv.split(sep2);
            kv[0] = decodeURIComponent(kv[0].trim());
            out[kv[0]] = '';
            if (typeof kv[1] !== 'undefined') {
                kv[1] = decodeURIComponent(kv[1].trim());
                out[kv[0]] = kv[1];
            }
        });
    } return out;
}
