function mostrarPassword(element, button){
    // encuentra el elemento 
    let cambio = document.getElementById(element);
    // si es tipo pwassword
    if(cambio.type == "password"){
        // cambia a texto
        cambio.type = "text";
        // cambio el boton a su costado
        $("#"+ button).removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        // si es texto cambia a password
        cambio.type = "password";
        // cambia el boton a su costado
        $("#"+ button).removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
} 