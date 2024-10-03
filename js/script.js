
let arr_valores = [];

window.addEventListener('load', function() {
    
    if(localStorage.getItem("user") != null){

        let getUser = localStorage.getItem("user");
        var user = JSON.parse(getUser);

        arr_valores.push(user);
        //pintarDatos();

        let container = document.querySelector(".container");
        container.innerHTML += "";

        for (let i = 0; i < user.length; i++) {

            let fichaID = user[i].id;

            container.innerHTML += `
            <div class="box box1" id="${fichaID}">
                <div>Usuario: ${user[i].nombre}</div>
                <div>Email: ${user[i].email}</div>
                <div>Comentario: ${user[i].comentario}</div>
                <div>Imagen: ${user[i].imagen}</div>
                <button onclick="eliminarFicha('${fichaID}')">Eliminar ficha</button>
            </div>
            `;
        }
    }
});

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // paraliza envío formulario

    // console.log(event.target.elements);

    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const comentario = event.target.comentario.value; // select
    const imagen = event.target.imagen.value;

    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{3,}\.(?:[a-zA-Z]{2,4})$/;

    // Comprobar si el correo electrónico cumple con el patrón
    if (emailPattern.test(email)) {
        console.log("Correo electrónico válido.");
        guardarDatos(event.target.elements);
        //pintarDatos();

        let getUser = localStorage.getItem("user");
        var user = JSON.parse(getUser);

        let container = document.querySelector(".container");
        container.innerHTML = "";

        
        for (let i = 0; i < user.length; i++) {

            let fichaID = user[i].id;

            container.innerHTML += `
            <div class="box box1" id="${fichaID}">
                <div>Usuario: ${user[i].nombre}</div>
                <div>Email: ${user[i].email}</div>
                <div>Comentario: ${user[i].comentario}</div>
                <div>Imagen: ${user[i].imagen}</div>
                <button onclick="eliminarFicha('${fichaID}')">Eliminar ficha</button>
            </div>
            `;
        }
    } else {
        console.log("Correo electrónico no válido.");
        return false;
    }
});

function guardarDatos(datos) {

    let miObjeto = {
        id: "_id_" + Date.now(),
        nombre: datos.nombre.value,
        email: datos.email.value,
        comentario: datos.comentario.value,
        imagen: datos.imagen.value,
    }
    arr_valores.push(miObjeto);

    localStorage.setItem(
        "user",
        JSON.stringify(arr_valores)
    );
}

function leerDatos() {

    let getUser = localStorage.getItem("user");
    var user = JSON.parse(getUser);

    return user;
}

function pintarDatos() {

    let datosUsuario = leerDatos();

    let container = document.querySelector(".container");
    container.innerHTML += "";

    for (let i = 0; i < datosUsuario.length; i++) {

        let fichaID = datosUsuario[i].id;

        container.innerHTML += `
        <div class="box box1" id="${fichaID}">
			<div>Usuario: ${datosUsuario[i].nombre}</div>
			<div>Email: ${datosUsuario[i].email}</div>
			<div>Comentario: ${datosUsuario[i].comentario}</div>
            <div>Imagen: ${datosUsuario[i].imagen}</div>
            <button onclick="eliminarFicha('${fichaID}')">Eliminar ficha</button>
		</div>
        `;
    }
}

function eliminarFicha(ficha) {

    let fichaBorrar = document.querySelector("#" + ficha)
    fichaBorrar.remove();

    let getUser = localStorage.getItem("user");
    var user = JSON.parse(getUser);
    console.log(user);

    let arrayActualizado = eliminarPorId(user, ficha);
    //console.log("Array actualizado:", arrayActualizado);

    localStorage.setItem(
        "user",
        JSON.stringify(arrayActualizado)
    );
}

function eliminarPorId(arr, id) {
    // Recorremos todos los elementos del array y 
    //retornamos el índice del primer elemento que cumpla con la condición especificada
    const indice = arr.findIndex(el => el.id === id);
    
    // Si el objeto existe, eliminarlo
    if (indice !== -1) {
        // índice_inicio, número_elementos_a_eliminar
        arr.splice(indice, 1); // Elimina el objeto en la posición encontrada
    }
    return arr; // devolvemos el array
}

