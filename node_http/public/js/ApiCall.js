 function fetchData(){
    fetch("https://corona.lmao.ninja/v2/continents?yesterday=true&sort").then(response=>{
        return response.json();
    }).then(data =>{

        const html = data.map(continents =>{
            document.getElementById("app").innerHTML += "<td><tr> "+  continents.continent + "</tr> <tr> "+continents.active  +
                "</tr> <tr>"+ continents.tests+" </tr></td><br>";

        return html;
        }).join("");

        document.getElementById("app").innerHTML += "</table>";
        console.log(data);
    });

}

fetchData();
