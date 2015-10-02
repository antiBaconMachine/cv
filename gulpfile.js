var shell = require('shelljs'),
    _ = require("lodash");
    vars = _.extend(require("./vars.json"), require("./private.json"));


var template = _.template('-V<%=key%>="<%=val%>" ');
var writeVar = function(v,k) {
    return template({key:k,val:v});
};
var walker = function(vars, key){
    return _.reduce(vars, function(acc, v, k) {
        if (typeof v === 'object') {
            acc += walker(v);
        } else {
            acc += template(v, k || key);
        }
    });
};
var options = walker(vars);

console.log(options);

gulp.task('default', function() {
    console.log(options);
})
//gulp.task("html", _.partial(shell.exec, "pandoc cv.md -o output/index.html" + options));