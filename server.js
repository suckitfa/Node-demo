var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true);
    var path = request.url;
    var query = '';
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')); }
    var pathNoQuery = parsedUrl.pathname;
    var queryObject = parsedUrl.query;
    var method = request.method;

    /******** 从这里开始看，上面不要看 ************/

    console.log('HTTP 路径为\n' + path);
    if (path == '/') {
        response.write("<h1>Hello world!</h1>");
    } else if (path == '/index.frank') {
        //设置响应头告诉浏览器这相关信息
        response.setHeader('Content-type', 'text/html;charset=utf-8');
        response.write("<!DOCTYPE>\n<html><head></head><body><h1>你好,Node.js</h1></body></html>");
    } else if (path == '/script.frank') {
        response.setHeader('Content-type', 'text/javascript;charset=utf-8');
        response.write("alert('这是JS执行的')");
        response.end();
    } else if (path == '/style.frank') {
        response.setHeader('Content-type', 'text/css;charset=utf-8');
        response.write('body{backgroud-color:#ddd;}h1{color:red;}');
    } else if (path == '/index') {
        response.setHeader('Content-type', 'text/html;charset=utf-8');
        response.write('<!DOCTYPE>\n<html>' +
            '<head><link rel="stylesheet" href="/style.frank"></head><body>' +
            '<h1>你好！</h1></body></html>'
        );
    } else {
        response.statusCode = 404;
    }
    response.end();
    /******** 代码结束，下面不要看 ************/
});

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);