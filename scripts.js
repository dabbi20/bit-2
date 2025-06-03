'use strict'

console.log('Hola mundo')

const $root = document.getElementById("root")
const d = document;

let cards = '';

fetch('datos.json')
.then((res) => res.json())
.then((info) => {

    for (let i = 0; i < info.length; i++) {

        if (info[i].usernameGithub) {
            
            let notasHTML = '';
            if (info[i].projects && info[i].projects.length > 0) {
                notasHTML = '<ul>';
                info[i].projects.forEach(project => {
                    
                    const sumaScores = project.score.reduce((acum, val) => acum + val, 0);
                    notasHTML += `<li><strong>${project.name}:</strong> ${sumaScores.toFixed(2)}</li>`;
                });
                notasHTML += '</ul>';
            } else {
                notasHTML = 'No hay notas disponibles.';
            }

            cards += `
            <div class="card" style="width: 18rem; margin: 10px;">
              <img src="https://github.com/${info[i].usernameGithub}.png" class="card-img-top" alt="Avatar de ${info[i].student}">
              <div class="card-body">
                <h5 class="card-title">${info[i].student}</h5>
                <p class="card-text">${notasHTML}</p>
                <a href="https://github.com/${info[i].usernameGithub}" 
                  class="btn btn-primary" target="_blank">GIT HUB</a>
              </div>
            </div>`;
        }
    }

    $root.innerHTML = cards;
})
.catch((err) => {
    console.log('error', err);
});
