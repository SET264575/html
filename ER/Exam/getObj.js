var myObj = {};
getObject('neuro2.json');
function getObject(website){
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function() { myObj = JSON.parse(this.responseText); console.log(myObj)};
      xmlhttp.open("GET",website);
      xmlhttp.send();
    }
