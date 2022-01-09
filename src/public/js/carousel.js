//esta version es la mas optima par autilizar
$(function(){
    // cuando el documento esta cargado
    $('.carousel-prymary-eco').slick({
        // convierte la clase en carousel
        // flechas
        arrows: false,
        // loop
        infinite: true,
        // velocidad en milisegundos
        speed: 300,
        // diapositivas a mostrar
        slidesToShow: 3,
        // slides a scrollear
        slidesToScroll: 3,
        // autoplay 
        autoplay: true,
        // autplaay velocidad
        autoplaySpeed: 2000,
        // responsive = breakpoints
        responsive: [
            // cada objeto es un breakpoint
            {
            // breakpoint px
            breakpoint: 1024,
            // configuracion
            settings: {
                // configuracion > 1024px
                // mostrar 3 slides
                slidesToShow: 3,
                // slides para escrolear
                slidesToScroll: 3,
                // loop infinito
                infinite: true,
            }
            },
            {
            // breakpoint px
            breakpoint: 600,
            // configuracion
            settings: {
                // configuracion para 600px
                // slides par amostrar 
                slidesToShow: 2,
                // slides para scroller
                slidesToScroll: 2
                // el loop infinito se queda heredado
            }
            },
            {
            // breakpoint px
            breakpoint: 480,
            // configuracion
            settings: {
                // configuracion para 480px 
                slidesToShow: 1,
                // slides par amostrar
                slidesToScroll: 1
                // slides para scrollear
            }
            }
        ]
    });         
});