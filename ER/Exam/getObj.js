var myObj = {};
getObject('neuro.json');
console.log('test");
function getObject(website){
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function() { myObj = JSON.parse(this.responseText); console.log("test");console.log(myObj)};
      xmlhttp.open("GET",website);
      xmlhttp.send();
    }
