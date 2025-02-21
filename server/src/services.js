//CREATE: method POST
// function createFilms(){

async function addFilm(newFilm) {
    try {
        let response = await fetch("http://localhost:3000/films", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newFilm)
        });
        if (response.ok) {
            console.log("Movie added successfully");
            printFilms();
        } else {
            console.log("Error adding movie");
        }
    } catch (error) {
    }        console.log("Error POST movie", error);
}

document.getElementById("addFilmForm").addEventListener("submit", function(event) {
    event.preventDefault();

    
    const newFilm = {
        title: document.getElementById("Title").value,
        director: document.getElementById("Director").value,
        year: parseInt(document.getElementById("Year").value)
    };

    
    addFilm(newFilm);

    // Limpiar el formulario después de enviar
    document.getElementById("addFilmForm").reset();
});



// }
//READ: method GET
//async, await, method fetch and show in console
    // http://localhost:3000/films
async function getAllFilms() {

    try {
        let response = await fetch ("http://localhost:3000/films");
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error al obtener la película", error);

    }
}

// async function simpleGet(){
//     const response = await fetch("http://localhost:3000/films", {
//         method: `GET`,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data = await response.json();
//     console.log(data);
// }


// }
// simpleGet();
async function getOneFilm(id){
    try {
        let response = await fetch(`http://localhost:3000/films/${id}`);
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error al obtener la película", error);

    }

}


// //UPDATE: Method PUT
// function updateFilms(){

async function updateOrEditFilms(id) {
    const updateButton = event.target;

    if (updateButton.innerText === 'Update/Edit') {
        const film = await getOneFilm(id);

        document.getElementById('ID').value = film.id;
        document.getElementById('Title').value = film.title;
        document.getElementById('Director').value = film.director; 
        document.getElementById('Year').value = film.year;

        updateButton.innerText = 'Save';
} else if (updateButton.innerText === 'Save') {
    const title = document.getElementById('Title').value;
    const director = document.getElementById('Director').value;
    const year = document.getElementById('Year').value;

    if (title && director && year) {
        const response = await fetch(`http://localhost:3000/films/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                director: director,
                year: year
            })
        });

        if (response.ok) {
            printFilms();
            updateButton.innerText = 'Update/Edit';
        } 
    }   }
} 




// Agregar un evento al botón para cargar las películas
document.getElementById('loadContentButton').addEventListener('click', printFilms);



// }
// //DELETE: method DELETE
// function deleteFilm(){
    
async function deleteFilm(id) {
    if (confirm('Are you sure you want to delete this movie?')) {
        try {
            let response = await fetch(`http://localhost:3000/films/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Película con ID ${id} eliminada exitosamente`);
                printFilms();
            } else {
                console.log(`Error al eliminar la película con ID ${id}`);
            }
        } catch (error) {
            console.log("Error al eliminar la película", error);
        }
    }
}


    
// }
// //PRINT: 
// function printFilms(){

async function printFilms() {
    const table = document.getElementById('films-table');  // Definir la tabla
    const tableHead = `
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Year</th>
            <th>Director</th>
            
        </tr>
    `;

    const films = await getAllFilms();
    table.innerHTML = ''; 
    table.innerHTML = tableHead; 

    films.forEach((film) => {
        table.insertAdjacentHTML("beforeend", 
            `<tr>
                <td>${film.id}</td>
                <td>${film.title}</td>
                <td>${film.year}</td>
                <td>${film.director}</td>
                <td>
                    <button onclick="updateOrEditFilms('${film.id}')">Update/Edit</button>
                    <button onclick="deleteFilm('${film.id}')">Delete</button>
                 
                
                </td>
            </tr>`
        );
    });
}


document.getElementById('loadContentButton').addEventListener('click', printFilms);


