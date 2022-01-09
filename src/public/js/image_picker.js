//ARCANGELLMAR DEL FUTURO, RECUERDA CAMBIAR A JQUERY
// se utiliza js vanilla para encontrar os elemtos por id
const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
// obtengo el emlemento por js
$imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
// preview de la image
// este evento esta tomado de la documentacio
// evento on change
$seleccionArchivos.addEventListener("change", () => {
    // sleciona achivks
    const archivos = $seleccionArchivos.files;
    // si no existe archivo
    if (!archivos || !archivos.length) {
        // no preview
        $imagenPrevisualizacion.src = "";
        // break de la funcion
        return;
    }
    // solo primer archivo
    const primerArchivo = archivos[0];
    // creo url para imagen
    const objectURL = URL.createObjectURL(primerArchivo);
    // mando la imagen al preview
    $imagenPrevisualizacion.src = objectURL;
});