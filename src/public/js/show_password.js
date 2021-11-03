function mostrarPassword(element, button){
    let cambio = document.getElementById(element);
    if(cambio.type == "password"){
        cambio.type = "text";
        $("#"+ button).removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $("#"+ button).removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
} 