module.exports = function (app) {

  const fs = require('fs');
  const path = 'views/pages/';
  const nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport(require('./mg.config.js'));
  // POST request =============================================================

  app.post("/contact", function ( req, res, next ) {
    var mailOptions = {
      from : req.body.email,
      to : 'thomas@thomasrstorey.net',
      subject : 'Contact regarding: ' + req.body.reason,
      text: req.body.message,
      html: '<p>'+req.body.message+'</p>'
    };
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        console.error(err);
        res.json({err: true});
      } else {
        res.json({err: false});
      }
    });
  });

  // GET page =================================================================
  app.get('/:page', function (req, res, next) {
    // make sure we're not getting a static file
    if(req.path.match(/\.\w+$|\.\d+$/) !== null){
      next();
    } else {
      // get data for page
      const page = req.params.page;
      console.log(page);
      try{
        var data = JSON.parse(fs.readFileSync(path+req.params.page+".json"));
        // render page
        res.render('pages/'+page, {page: data}, function (err, html){
          if(err){
            console.error(err);
            next();
          } else {
            res.send(html);
          }
        });
      } catch (e) {
        console.error(e);
        next();
      }
    }
  });

  // GET home =================================================================
  app.get('/', function ( req, res ) {
    var data = exposePages();
    // filter the different metadatas into categories for rendering
    data = {
      artworkPgs : data.filter(filterType('artwork')),
      developmentPgs : data.filter(filterType('development')),
      academiaPgs : data.filter(filterType('academia')),
      blogPgs : data.filter(filterType('blog'))
    };
    // render page
    res.render('home', data);
  });

  // 404 ======================================================================
  app.use(function(req, res, next) {
    res.status(404).render('404', {path: req.path});
  });

  // Middleware ===============================================================
  function exposePages () {
    // get all the json files in the pages array
    var files = fs.readdirSync(path).filter(
      function(v){
        return v.match(/\.json/) !== null ? true : false;
      });
    // read all the files
    var jsonData = [];
    files.forEach(function(fn){
      jsonData.push(JSON.parse(fs.readFileSync(path+fn)));
    });

    return jsonData;
  }

  function filterType (type) {
    return function (v, i, arr){
      return v.type == type;
    }
  }

}
