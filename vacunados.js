function positividad() {

    var url = 'https://covid-peru-application.kelo15.repl.co/vacunados.json';
    var table = document.getElementById('vacunados');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(this.responseText);

            console.log(data);

            for (var i = 0; i < data.length; i++) {

                var dato1 = data[i].name;
                var dato2 = data[i].total;
                var dato3 = data[i].number;

                table.innerHTML += `
                <tr>
                  <td>${dato1}</td>
                  <td>${dato2}</td>
                  <td>${dato3}</td>
                </tr>
                `
            }

            
        };
    };

    xhttp.open('GET', url, true);
    xhttp.send();

}


document.addEventListener('DOMContentLoaded', positividad, false);
