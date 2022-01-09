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
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            }
            },
            {
            // breakpoint px
            breakpoint: 600,
            // configuracion
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            // breakpoint px
            breakpoint: 480,
            // configuracion
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });         
});