const d = document;
const textArea = d.querySelector(".form__input");
const imagenSalida = d.querySelector(".salida__img");
const tituloSalida = d.querySelector(".salida__titulo");
const textoSalida = d.querySelector(".salida__texto");
const botonEncriptar = d.querySelector(".form__btn1");
const botonDesencriptar = d.querySelector(".form__btn2");
const botonCopiar = d.querySelector(".form__btn3");


const llaves = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];

//funcion para encriptar mensaje
function encriptarmensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje [i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra===llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado
}

//funcion para desencriptar mensaje
function desencriptarMensaje (mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado
}

textArea.addEventListener("input",(e)=>{
    imagenSalida.style.display = "none";
    tituloSalida.textContent = "Capturando Mensaje";
    textoSalida.textContent = "";
    console.log(e.target.value);
})

botonEncriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    let mensaje = textArea.value.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, " ").toLowerCase();
    //let mensaje = txt.value.toLowerCase();
    let mensajeEncriptado = encriptarmensaje(mensaje);
    tituloSalida.textContent = "Mensaje Encriptado:";
    textoSalida.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("oculto")
})

botonDesencriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    textoSalida.textContent = mensajeDesencriptado;
    tituloSalida.textContent = "Mensaje Desencriptado:";
    botonCopiar.classList.remove("oculto");
})

botonCopiar.addEventListener("click",(e)=>{
    let textoCopiado = textoSalida.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        imagenSalida.style.display = "block";
        tituloSalida.textContent = "Mensaje Copiado";
        textoSalida.textContent = "";
        botonCopiar.classList.add("oculto");
    })
})