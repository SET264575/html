var myObj = {};
getObject('json/ddx.txt');
function getObject(website){
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function() { myObj = JSON.parse(this.responseText); console.log(myObj)};
      xmlhttp.open("GET",website);
      xmlhttp.send();
    }
