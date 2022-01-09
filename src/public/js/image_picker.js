//ARCANGELLMAR DEL FUTURO, RECUERDA CAMBIAR A JQUERY
const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
// obtengo el emlemento por js
$imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
// preview de la image

// evento on change
$seleccionArchivos.addEventListener("change", () => {
    // sleciona achivks
    const archivos = $seleccionArchivos.files;
    // si no existe archivo
    if (!archivos || !archivos.length) {
        // no preview
        $imagenPrevisualizacion.src = "";
        return;
    }
    // solo primer archivo
    const primerArchivo = archivos[0];
    // creo url para imagen
    const objectURL = URL.createObjectURL(primerArchivo);
    // mando la imagen al preview
    $imagenPrevisualizacion.src = objectURL;
});