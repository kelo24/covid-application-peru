function muertes(){

  var url = 'https://covid-peru-application.kelo15.repl.co/muertes.json';
  var tablaPorGenero = document.getElementById('deaths-for-gender');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){

      var muertes = JSON.parse(this.responseText);

      // console.log(muertes);

      var total = muertes.length;

      // por género
      var masc = 0;
      var fem = 0;
      var jsonGender = new Array();
      
      var objectMasc = new Object();
      var objectFem = new Object();
      
      // por etapa de vida
      var jsonAge = new Array();
      
      
      var result;
      
      for (var i = 0; i < muertes.length; i++){
        
        var stage = muertes[i].etapa_de_vida;
        var age = muertes[i].edad;
        var gender = muertes[i].sexo;
        var dep = muertes[i].departamento;
        var place = muertes[i].categoria;
        
        //por etapa de vida
        if (jsonAge.includes(age)) {
          result = '';
        } else {
          jsonAge.push(age);
        }
        
        // por género
        if (gender == 'MASCULINO') {
          masc = masc + 1 
        }
        if (gender == 'FEMENINO') {
          fem = fem + 1
        }
      }
      
      // por género
      var letalidadMasc = masc * (100 / total);
      letalidadMasc = Math.round(letalidadMasc * 100) / 100;
      
      var letalidadFem = fem * (100 / total);
      letalidadFem = Math.round(letalidadFem * 100) / 100;
        
      Object.defineProperties(objectMasc, {
        "cantidad": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: masc
        },
        "gender": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: 'MASCULINO'
        },
        "letalidad": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: letalidadMasc
        }
      });

      Object.defineProperties(objectFem, {
        "cantidad": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: fem
        },
        "gender": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: 'FEMENINO'
        },
        "letalidad": {
          enumerable: true,
          writable: true,
          configurable: true,
          value: letalidadFem
        }
      });

      jsonGender.push(objectMasc, objectFem);

      for (var i = 0; i < jsonGender.length; i++){
        var cant = jsonGender[i].cantidad;
        var sex = jsonGender[i].gender;
        var letal = jsonGender[i].letalidad;
        
        tablaPorGenero.innerHTML += `
        <tr>
          <td>${sex}</td>
          <td>${cant}</td>
          <td>${letal}</td>
        </tr>
        `;

      }
      
      var differ = calcTime('2020-03-15');

      // console.log(differ);

      var perDay = Math.round(total / differ);

      document.getElementById('per-day').innerText = `*Muertos por día: ${perDay}`;
      
      // console.log(jsonGender);
      // console.log(masc, fem);
      // console.log(jsonAge);
      // console.log(result);

    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();

}


document.addEventListener('DOMContentLoaded', muertes, false);



var calcTime = (date /* aaaa-mm-dd */ ) => {

  // var date = '2020-03-15';

  // var FechaNacimiento = string.val();
  // Crear objeto de fecha inicial con el valor del input
  var fechaIni = new Date(date);
  // Crear objeto de fecha final (actual)
  var fechaFin = new Date();

  // Calcular diferencia en milisegundos
  var diff = fechaFin - fechaIni;
  // console.log(diff);

  // Calcular días
  diferenciaDias = Math.floor(diff / (1000 * 60 * 60 * 24));
  // console.log(diferenciaDias);
  return diferenciaDias;
};