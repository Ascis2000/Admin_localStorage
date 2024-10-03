
window.addEventListener('load', function() {
    
    // Si existe el id 'user' del localStorage
    if(localStorage.getItem("user") != null){

        // obtenemos el valor actual del localStorage 'user'
        let user = leer_localStorage("user");

        // obtenemos el contenedor HTML y lo vaciamos
        let container = document.querySelector(".container");
        container.innerHTML = "";

        // recorremos 'user' al ser un array
        for (let i = 0; i < user.length; i++) {

            let fichaID = user[i].id; // identificador único

            // creamos el HTML de la ficha
            container.innerHTML += `
            <div class="box box1" id="${fichaID}">
                <div>Usuario: ${user[i].nombre}</div>
                <div>Email: ${user[i].email}</div>
                <div>Comentario: ${user[i].comentario}</div>
                <div>Imagen: ${user[i].imagen}</div>
                <div onclick="eliminarFicha('${fichaID}')" style="width:100%; text-align:right;">
                    <i class="fas fa-trash delete-icon" title="Eliminar ficha de ${user[i].nombre}"></i>
                </div>
            </div>
            `;
        }
        // definimos el boton 'btn_borrarTodos'
        const btn_borrarTodos = document.getElementById('btn_borrarTodos');

        // mostramos el boton 'btn_borrarTodos'
        btn_borrarTodos.setAttribute('style', 'display: block');
    }

    // Evento para eliminar todas las capas
    btn_borrarTodos.addEventListener('click', (event) => {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        localStorage.removeItem("user");
        event.target.setAttribute('style', 'display: none');
    });
});

// función que obtiene los valores del localStorage 
// del identificador pasado por parametro
function leer_localStorage(identificador){
    let datos = localStorage.getItem(identificador);
    return JSON.parse(datos);
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // paraliza envío formulario

    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const comentario = event.target.comentario.value;
    const imagen = event.target.imagen.value;

    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{3,}\.(?:[a-zA-Z]{2,4})$/;

    // Comprobar si el correo electrónico cumple con el patrón
    if (emailPattern.test(email)) {
        console.log("Correo electrónico válido.");

        guardarDatos(event.target.elements);

        let container = document.querySelector(".container");
        container.innerHTML = "";

        let user = leer_localStorage("user");

        for (let i = 0; i < user.length; i++) {

            let fichaID = user[i].id;

            container.innerHTML += `
            <div class="box box1" id="${fichaID}">
                <div>Usuario: ${user[i].nombre}</div>
                <div>Email: ${user[i].email}</div>
                <div>Comentario: ${user[i].comentario}</div>
                <div>Imagen: ${user[i].imagen}</div>
                <div onclick="eliminarFicha('${fichaID}')" style="width:100%; text-align:right;">
                    <i class="fas fa-trash delete-icon" title="Eliminar ficha de ${user[i].nombre}"></i>
                </div>
            </div>
            `;
        }
        btn_borrarTodos.setAttribute('style', 'display: block');
    } else {
        console.log("Correo electrónico no válido.");
        return false;
    }
});

function guardarDatos(datos) {

    // vacio el array arr_valores
    let arr_valores = [];
    let popo;

    // Si existe el id 'user' del localStorage
    if(localStorage.getItem("user") != null){
        
        // obtenemos el valor actual del localStorage 'user'
        let user = leer_localStorage("user");

        // momento crucial 1
        // el valor de 'user' llega como un array
        // Creamos una copia superficial de los valores 'user'
        // con el operador de propagación y los asignamos al array arr_valores
        // Si hacemos un arr_valores.push(user) lo estamos haciendo mal
        // porque creamos un array de arrays
        arr_valores = [...user];
        console.log("1. arr_valores", arr_valores);
    }
    
    // obtengo los datos del formulario 
    // y los inserto en el array
    // y lo guardo en localStorage
    let nuevoUser = {
        id: "_id_" + Date.now(), // creamos un identificador unico
        nombre: datos.nombre.value,
        email: datos.email.value,
        comentario: datos.comentario.value,
        imagen: datos.imagen.value,
    }
    // momento crucial 2
    // inserto el objeto 'nuevoUser' dentro del array 'arr_valores'
    arr_valores.push(nuevoUser);
    console.log("2. arr_valores", arr_valores);

    // guardamos los valores del array 'arr_valores' en el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(arr_valores)
    );
}

function eliminarFicha(ficha_id) {

    // eliminamos la ficha del HTML
    let fichaID = document.querySelector("#" + ficha_id)
    fichaID.remove();

    // obtenemos el valor actual del localStorage 'user'
    let user = leer_localStorage("user");

    // modificamos el localStorage
    let arrayActualizado = eliminarPorId(user, ficha_id);

    // actualizamos el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(arrayActualizado)
    );
}

function eliminarPorId(arr, f_id) {
    // Recorremos todos los elementos del array y 
    // devolvemos el índice del primer elemento que cumpla con la condición especificada
    // de hecho, solo puede encontrar un identificador unico en todo el array
    const indice = arr.findIndex(f => f.id === f_id);
    
    // Si el objeto existe, eliminarlo
    if (indice !== -1) {
        // índice_inicio, número_elementos_a_eliminar
        arr.splice(indice, 1); // Elimina el objeto en la posición encontrada
    }
    return arr; // devolvemos el array
}



