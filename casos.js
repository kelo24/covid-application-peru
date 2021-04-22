function casosPositivos(){
  var url = 'https://covid-peru-application.kelo15.repl.co/casos%20positivos.json';
  var table = document.getElementById('casos');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
      var casos = JSON.parse(this.responseText);

      // console.log(casos);

      for(var i = 0; i < casos.length; i++){

        var city = casos[i].region;
        var country = casos[i].pais;
        var pcr = casos[i].pcr;
        var pruebaRapida = casos[i].prueba_rapida;
        var pruebaAntigeno = casos[i].prueba_antigeno;
        var total = casos[i].total_casos;
        var fallecidos = casos[i].fallecidos;

        var letalidad = fallecidos * (100 / total);
        letalidad = Math.round(letalidad * 100) / 100;

        table.innerHTML += `
        <tr>
          <td>${city}</td>
          <td>${pcr}</td>
          <td>${pruebaRapida}</td>
          <td>${pruebaAntigeno}</td>
          <td>${total}</td>
        </tr>
        `
        
      };
      
    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();

};

// console.log(casos);

document.addEventListener('DOMContentLoaded', casosPositivos, false);