/**
 * Created by imac2 on 17/11/2017.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var mime = require('mime');

var conversion = require("phantom-html-to-pdf")({
    phantomPath: require("phantomjs-prebuilt").path
});

app.use(express.json());

app.post('/', function (req, res) {

console.log(req.body.cookies);
    conversion({
        url: "https://scaleupdiagnostic.co.uk/index.php/site/report",
        printDelay: 1250,
		cookies: req.body.cookies,
        viewportSize: {
            width: 750,
            height: 980
        },
        paperSize: {
            orientation: "portrait",
            width: "21cm",
            height: "29.7cm"
        },
        fitToPage: true
    }, function(err, pdf) {
        var file = pdf.stream.path;

        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + req.query.report + ".pdf");
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    });

});

app.listen(8447, function () {
    console.log('App listening on port 8447');
});
