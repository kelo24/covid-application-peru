function positividad() {
    
  var url = 'https://covid-peru-application.kelo15.repl.co/positividad.json';
  var table = document.getElementById('positividad');
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          
          var data = JSON.parse(this.responseText);
          
        //   console.log(data);
          
          for (var i = 0; i < data.length; i++){

              var region = data[i].region;
              var muestras = data[i].muestras;
              var confirmados = data[i].confirmed;

              var positividad = confirmados * (100 / muestras);
              positividad = Math.round(positividad * 100) / 100;

              table.innerHTML += `
                <tr>
                  <td>${region}</td>
                  <td>${muestras}</td>
                  <td>${confirmados}</td>
                  <td>${positividad}</td>
                </tr>
              `;
          }

        //   console.log(data.length);
      };  
    };
    
  xhttp.open('GET', url, true);
  xhttp.send();

}


document.addEventListener('DOMContentLoaded', positividad, false);



