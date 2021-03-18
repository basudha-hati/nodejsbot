var express = require('express');
const path = require('path');
var morgan = require('morgan');
var router =express.Router();



const fetch = require('node-fetch');

var hostname = 'localhost';
var port = 3000;

var app =express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs')


function fetchData(){

}

router.get('/covid_info1', function(req, res) {
  fetch("https://corona.lmao.ninja/v2/countries?today&sort").then(response=>{
    return response.json();
  }).then(data =>{
    res.render('covid_info1', { html: data });
    //document.getElementById("app").innerHTML += "</table>";
    console.log(data);
  });


});


app.use('/',router);

module.exports = router;






// request.createServer((req, res) => {
//   if (req.url === "/covid_info"){
//     apiCallFromRequest.callApi(function (response){
//       console.log('here');
//       console.log('response');
//
//       res.write(response);
//       res.end();
//     });
//
//   }
// });




app.listen(port,hostname,function () {
  console.log(`Server Running at http://${hostname}:{port}/`);
});


