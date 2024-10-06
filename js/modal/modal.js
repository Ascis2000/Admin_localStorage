
let mMdl = {
    boxEdicion: document.querySelector("#boxEdicion")
}
mMdl.divs = {
    modal: mMdl.boxEdicion.querySelector('.modal'),
    overlay: boxEdicion.querySelector('.overlay')
}
mMdl.buttons = {
    cancelar: mMdl.boxEdicion.querySelector('.cancelar'),
    modificar: mMdl.boxEdicion.querySelector('.modificar')
}
mMdl.inputs = {
    nombre: mMdl.boxEdicion.querySelector('#nombre'),
    email: mMdl.boxEdicion.querySelector('#email'),
    comentario: mMdl.boxEdicion.querySelector('#comentario'),
    imagen: mMdl.boxEdicion.querySelector('#imagen'),
    idFicha: mMdl.boxEdicion.querySelector('#idFicha')
}

mMdl.boxEdicion.querySelector(".modificar").addEventListener("click", function (){
    modificarEdicion();
});

function abrirModoEdicion(ficha_id) {
    mMdl.divs["overlay"].style.display = 'block';
    mMdl.divs["modal"].style.display = 'block';

    let boxFichaID = ficha_id;

    let fichaID = document.querySelector("#" + ficha_id);
    let labels = fichaID.querySelectorAll("label");

    mMdl.inputs["nombre"].value = labels[0].textContent;
    mMdl.inputs["email"].value = labels[1].textContent;
    mMdl.inputs["comentario"].value = labels[2].textContent;
    mMdl.inputs["imagen"].value = labels[3].textContent;

    mMdl.inputs["idFicha"].value = ficha_id;
}

function modificarEdicion() {

    let user = leer_localStorage("user");
    let arrayActualizado = modificarPorId(user, mMdl.inputs["idFicha"].value);

    // actualizamos el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(arrayActualizado)
    );

    let fichaID = document.querySelector("#" + mMdl.inputs["idFicha"].value);
    let labels = fichaID.querySelectorAll("label");

    labels[0].textContent =  mMdl.inputs["nombre"].value;
    labels[1].textContent = mMdl.inputs["email"].value;
    labels[2].textContent = mMdl.inputs["comentario"].value;
    labels[3].textContent = mMdl.inputs["imagen"].value;

    mMdl.divs["overlay"].style.display = 'none';
    mMdl.divs["modal"].style.display = 'none';
}

function cancelarEdicion(event) {
    mMdl.divs["overlay"].style.display = 'none';
    mMdl.divs["modal"].style.display = 'none';
}
