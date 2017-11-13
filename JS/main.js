    var global_nombreProducto;
    var global_precioProducto;
    var global_imagenProducto1;
    var global_imagenProducto2;
    var global_imagenProducto3;
    var global_imagenProducto4;
    var global_imagenProducto5;
    var global_descProducto;
    var tipo_de_carrito;

    var global_sexo;
    var global_categoria;
    var global_subcategoria;

    var global_correo_amigo;
    var global_enviar_correo_escrito;
    var global_enviar_nombreProducto;

    $(document).ready(function(){

        funcionSession();

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // VARIABLES
    global_sexo = "null";
    global_categoria = "null";
    global_subcategoria = "null";

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PAY
    $("#button_pay").click(function( event ) {
        funcionPay();
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // SEARCH
    $("#button_search").click(function( event ) {
        funcionSearch();
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCIONES DE NAVIGATION
    $("#go_to_cart").click(function( event ) {
        window.location.replace("cart.html");
    });
    $("#go_to_home").click(function( event ) {
        window.location.replace("index.html");
    });
    $("#go_to_maybe").click(function( event ) {
        window.location.replace("maybe.html");
    });
    $("#go_to_friends").click(function( event ) {
        window.location.replace("friends.html");
    });
    $("#go_to_checkout").click(function( event ) {
        window.location.replace("checkout.html");
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // SELECTS DE ARRIBA
    $("#select_sexo").change(function( event ) {
        global_sexo = this.value;
        funcionLlamarATraerProducto();
    });

    $("#select_categoria").change(function( event ) {
        global_categoria = this.value;
        funcionLlamarATraerProducto();
    });

    $("#select_subcategoria").change(function( event ) {
        global_subcategoria = this.value;
        funcionLlamarATraerProducto();
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // ACTIVAR OBJETOS
    $('.modal').modal();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.carousel').carousel();
    $('select').material_select();

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // BOTONES DE TARJETA CARRITO SI
    $("#card-general").on("click", ".si_button_no", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionBorrarDeCarrito(nombre);
    });
    $("#card-general").on("click", ".si_button_maybe", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionPasarAMaybe(nombre);
    });
    $("#card-general").on("click", ".si_button_yes", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionPasarAYes(nombre);
    });
    $("#button_no").click(function( event ) {
        funcionAccionNo();
    });
    $("#button_maybe").click(function( event ) {
        funcionAccionMaybe();
    });
    $("#button_yes").click(function( event ) {
        funcionAccionSi();
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // BOTONES DE TARJETA CARRITO FRIENDS
    $("#card-general").on("click", ".friends_button_no", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionBorrarDeCarrito(nombre);
    });
    $("#card-general").on("click", ".friends_button_maybe", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionPasarAMaybe(nombre);
    });
    $("#card-general").on("click", ".friends_button_yes", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionPasarAYes(nombre);
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // BOTONES DE TARJETA CARRITO MAYBE
    $("#card-general").on("click", ".maybe_button_no", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionBorrarDeCarrito(nombre);
    });
    $("#card-general").on("click", ".maybe_button_yes", function( event){
        var nombre = $(this).parent().parent().attr("id");
        funcionPasarAYes(nombre);
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // BOTONES DE ENVIAR CORREO A TU AMIGO
    $("#card-general").on("click", ".enviar_correo_amigo", function( event){
        global_enviar_correo_escrito = $(this).parent().parent().find("input").val();
        global_enviar_nombreProducto = $(this).parent().parent().attr("id");
        funcionEnviarAmigo(global_enviar_correo_escrito, global_enviar_nombreProducto);

    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // BOTON DE LOGIN
    $("#button_login").click(function( event ) {
        funcionLogin();
    });

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // SELECCIONAR TIPO DE CARRITO A TRAER
    if($('body').is('.cart-si')){
        tipo_de_carrito = "SI";
        funcionTraerCarritoSI();
    }

    if($('body').is('.cart-maybe')){
        tipo_de_carrito = "MAYBE";
        funcionTraerCarritoMAYBE();
    }
    if($('body').is('.cart-friends')){
        tipo_de_carrito = "FRIENDS";
        funcionTraerCarritoFRIENDS();
    }
    if($('body').is('.checkout')){
        funcionPonerCheckout();
    }

    });// END READY FUNCTION


    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 1
    function funcionTraerProducto($sexo, $categoria, $subcategoria){

        var sexo = global_sexo;
        var categoria = global_categoria;
        var subcategoria = global_subcategoria;


        var jsonData = {
            "action" : "TRAERPRODUCTO",
            "sexo" : sexo,
            "categoria" : categoria,
            "subcategoria" : subcategoria
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

    // PONER EN HTML
    $("#titulo").html(jsonResponse.nombreProducto + '<i class="material-icons right">more_vert</i>');
    $("#subtitulo").text('$ ' + jsonResponse.precioProducto + ' mxn');
    $('#titulo_descripcion').html(jsonResponse.nombreProducto + '<i class="material-icons right">close</i>');
    $('#descripcion').text(jsonResponse.descProducto);
    $('#imagenProducto1').attr("src",'IMAGES/' + jsonResponse.imagenProducto1);
    $('#imagenProducto2').attr("src",'IMAGES/' + jsonResponse.imagenProducto2);
    $('#imagenProducto3').attr("src",'IMAGES/' + jsonResponse.imagenProducto3);
    $('#imagenProducto4').attr("src",'IMAGES/' + jsonResponse.imagenProducto4);
    $('#imagenProducto5').attr("src",'IMAGES/' + jsonResponse.imagenProducto5);

    // PONER EN VARIABLES GLOBALES
    global_nombreProducto = jsonResponse.nombreProducto;
    global_descProducto = jsonResponse.descProducto;
    global_precioProducto = jsonResponse.precioProducto;
    global_imagenProducto1 = jsonResponse.imagenProducto1;
    global_imagenProducto2 = jsonResponse.imagenProducto2;
    global_imagenProducto3 = jsonResponse.imagenProducto3;
    global_imagenProducto4 = jsonResponse.imagenProducto4;
    global_imagenProducto5 = jsonResponse.imagenProducto5;

    },
    error: function(errorMessage) {
    //alert("ERROR IN DATABASE CONNECTION.");
    }
    });   
    }// END TRAERPRODUCTO

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 2
    function funcionAccionNo(){
        Materialize.toast('NOT A CHANCE!', 600);
        funcionTraerProducto();

    }
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 3
    function funcionAccionSi(){
    Materialize.toast('LOVE IT!', 600); // meterle frases random

    var seconds = new Date().getTime() / 1000;

    var jsonData = {

        "action" : "INSERTARCARRITO",
        "nombreProducto" : global_nombreProducto,
        "precioProducto" : global_precioProducto,
        "descProducto" : global_descProducto,
        "imagenProducto1" : global_imagenProducto1,
        "imagenProducto2" : global_imagenProducto2,
        "imagenProducto3" : global_imagenProducto3,
        "imagenProducto4" : global_imagenProducto4,
        "imagenProducto5" : global_imagenProducto5,
        "estadoCarrito" : "SI"

    };

    $.ajax({
        url: "./LAYERS/applicationLayer.php",
        type: "POST",
        data: jsonData,
        dataType: "json",
        success: function(jsonResponse) {

            funcionTraerProducto();

        },
        error: function(errorMessage) {
            alert("ERROR AL INSERTARCARRITO.");
        }
    }); 

    // MANDAR A PEDIR SIGUIENTE PRODUCTO
    funcionTraerProducto();
    }// END FUNCION ACCION SI

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 4
    function funcionAccionMaybe(){
        Materialize.toast('LET ME THINK...', 600);

        var seconds = new Date().getTime() / 1000;

        var jsonData = {

            "action" : "INSERTARCARRITO",
            "nombreProducto" : global_nombreProducto,
            "precioProducto" : global_precioProducto,
            "descProducto" : global_descProducto,
            "imagenProducto1" : global_imagenProducto1,
            "imagenProducto2" : global_imagenProducto2,
            "imagenProducto3" : global_imagenProducto3,
            "imagenProducto4" : global_imagenProducto4,
            "imagenProducto5" : global_imagenProducto5,
            "estadoCarrito" : "MAYBE",
            "usuario" : seconds
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

                funcionTraerProducto();

            },
            error: function(errorMessage) {
                alert("ERROR AL INSERTARCARRITO.");
            }
        }); 

    // MANDAR A PEDIR SIGUIENTE PRODUCTO
    funcionTraerProducto();
    }// END FUNCION ACCION SI

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 5
    function funcionTraerCarritoSI(){

        var jsonData = {
            "action" : "TRAERCARRITOSI"
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                $("#card-general").html("");
                for (var key in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(key)) {     
                        $("#card-general").append('<div id= "' 
                            + jsonResponse[key].nombreProducto 
                            + '"' 
    // IMAGEN
    + 'class="card"><div class="card-image waves-effect waves-block waves-light">' 
    // CAROUSEL
    + '<div class="carousel carousel-slider" data-indicators="true">'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto1" src="IMAGES/'
    + jsonResponse[key].imagenProducto1
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto2" src="IMAGES/'
    + jsonResponse[key].imagenProducto2
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto3" src="IMAGES/'
    + jsonResponse[key].imagenProducto3
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto4" src="IMAGES/'
    + jsonResponse[key].imagenProducto4
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto5" src="IMAGES/'
    + jsonResponse[key].imagenProducto5
    + '"></a>'
    + '</div></div>'
    // TITULO
    + '<div class="card-content"><span id = "titulo" class="card-title activator grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    // PRECIO
    + '<i class="material-icons right">more_vert</i></span><p id="subtitulo">' 
    + jsonResponse[key].precioProducto 
    + ' mxn</p></div>' 
    // BOTONES SI,NO,MAYBE
    + '<div class="card-action row row-juancho">'
    + '<button class="si_button_no waves-effect waves-teal btn-flat col s6 boton-juancho red-juancho">NO</button>'
    + '<button class="si_button_maybe waves-effect waves-teal btn-flat col s6 boton-juancho green-juancho">MAYBE</button></div>' 
    // EMAIL
    + '<div class="card-action">'
    + '<input id="textfield_email" placeholder="Your friend\'s email" id="correo_amigo_escrito" type="text" class="validate">'
    + '<button class="enviar_correo_amigo waves-effect waves-teal btn-flat boton-send" type="submit" name="action">SEND'
    + '</button></div>'
    // DESCRIPCION
    + '<div class="card-reveal"><span id="titulo_descripcion" class="card-title grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    + '<i class="material-icons right">close</i></span><p id="descripcion">' 
    + jsonResponse[key].descProducto 
    + '</p></div>' 
    + '</div>  <div class="container row" style="margin-bottom: 4%;">');


                        $('.carousel.carousel-slider').carousel({fullWidth: true});


                    }
                }
            },
            error: function(errorMessage) {
                alert("EMPTY CART");
            }
        });   
    }// END CARRITOSI

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 6
    function funcionTraerCarritoMAYBE(){

        var jsonData = {
            "action" : "TRAERCARRITOMAYBE"
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                $("#card-general").html("");
                for (var key in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(key)) {     
                        $("#card-general").append('<div id= "' 
                            + jsonResponse[key].nombreProducto 
                            + '"' 
    // IMAGEN
    + 'class="card"><div class="card-image waves-effect waves-block waves-light">' 
    // CAROUSEL
    + '<div class="carousel carousel-slider" data-indicators="true">'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto1" src="IMAGES/'
    + jsonResponse[key].imagenProducto1
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto2" src="IMAGES/'
    + jsonResponse[key].imagenProducto2
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto3" src="IMAGES/'
    + jsonResponse[key].imagenProducto3
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto4" src="IMAGES/'
    + jsonResponse[key].imagenProducto4
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto5" src="IMAGES/'
    + jsonResponse[key].imagenProducto5
    + '"></a>'
    + '</div></div>'
    // TITULO
    + '<div class="card-content"><span id = "titulo" class="card-title activator grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    // PRECIO
    + '<i class="material-icons right">more_vert</i></span><p id="subtitulo">' 
    + jsonResponse[key].precioProducto 
    + ' mxn</p></div>' 
    // BOTONES SI,NO,MAYBE
    + '<div class="card-action row row-juancho">'
    + '<button class="maybe_button_no waves-effect waves-teal btn-flat col s6 boton-juancho red-juancho">NO</button>'
    + '<button class="maybe_button_yes waves-effect waves-teal btn-flat col s6 boton-juancho green-juancho">YES</button></div>' 
    // EMAIL
    + '<div class="card-action">'
    + '<input id="textfield_email" placeholder="Your friend\'s email" id="correo_amigo_escrito" type="text" class="validate">'
    + '<button class="enviar_correo_amigo waves-effect waves-teal btn-flat boton-send" type="submit" name="action">SEND'
    + '</button></div>'
    // DESCRIPCION
    + '<div class="card-reveal"><span id="titulo_descripcion" class="card-title grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    + '<i class="material-icons right">close</i></span><p id="descripcion">' 
    + jsonResponse[key].descProducto 
    + '</p></div>' 
    + '</div>  <div class="container row" style="margin-bottom: 4%;">');


                        $('.carousel.carousel-slider').carousel({fullWidth: true});


                    }
                }
            },
            error: function(errorMessage) {
                alert("EMPTY CART");
            }
        });   


    }// END CARRITOMAYBE

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 7
    function funcionTraerCarritoFRIENDS(){

        var jsonData = {
            "action" : "TRAERCARRITOFRIENDS"
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                $("#card-general").html("");
                for (var key in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(key)) {     
                        $("#card-general").append('<div id= "' 
                            + jsonResponse[key].nombreProducto 
                            + '"' 
    // IMAGEN
    + 'class="card"><div class="card-image waves-effect waves-block waves-light">' 
    // CAROUSEL
    + '<div class="carousel carousel-slider" data-indicators="true">'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto1" src="IMAGES/'
    + jsonResponse[key].imagenProducto1
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto2" src="IMAGES/'
    + jsonResponse[key].imagenProducto2
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto3" src="IMAGES/'
    + jsonResponse[key].imagenProducto3
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto4" src="IMAGES/'
    + jsonResponse[key].imagenProducto4
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto5" src="IMAGES/'
    + jsonResponse[key].imagenProducto5
    + '"></a>'
    + '</div></div>'
    // TITULO
    + '<div class="card-content"><span id = "titulo" class="card-title activator grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    // PRECIO
    + '<i class="material-icons right">more_vert</i></span><p id="subtitulo">' 
    + jsonResponse[key].precioProducto 
    + ' mxn</p></div>' 
    // BOTONES SI,NO,MAYBE
    + '<div class="card-action row row-juancho">'
    + '<button class="friends_button_no waves-effect waves-teal btn-flat col s4 boton-juancho red-juancho">NO</button>'
    + '<button class="friends_button_maybe waves-effect waves-teal btn-flat col s4 boton-juancho red-juancho">MAYBE</button>'
    + '<button class="friends_button_yes waves-effect waves-teal btn-flat col s4 boton-juancho red-juancho">YES</button>'
    + '</div>' 
    // EMAIL
    + '<div class="card-action">'
    + '<input id="textfield_email" placeholder="Your friend\'s email" id="correo_amigo_escrito" type="text" class="validate">'
    + '<button class="enviar_correo_amigo waves-effect waves-teal btn-flat boton-send" type="submit" name="action">SEND'
    + '</button></div>'
    // DESCRIPCION
    + '<div class="card-reveal"><span id="titulo_descripcion" class="card-title grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    + '<i class="material-icons right">close</i></span><p id="descripcion">' 
    + jsonResponse[key].descProducto 
    + '</p></div>' 
    + '</div>  <div class="container row" style="margin-bottom: 4%;">');


                        $('.carousel.carousel-slider').carousel({fullWidth: true});


                    }
                }
            },
            error: function(errorMessage) {
                alert("EMPTY CART");
            }
        });   


    }// END FRIENDS

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 8
    function funcionBorrarDeCarrito($nombreProducto){

        var jsonData = {
            "action" : "BORRARDECARRITO",
            "nombreProducto" : $nombreProducto
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                if (tipo_de_carrito === 'SI') {
                    $("#card-general").html("");
                    funcionTraerCarritoSI();
                }else if (tipo_de_carrito === 'MAYBE'){
                    $("#card-general").html("");
                    funcionTraerCarritoMAYBE();
                }else if (tipo_de_carrito === 'FRIENDS'){
                    $("#card-general").html("");
                    funcionTraerCarritoFRIENDS();
                }

            },
            error: function(errorMessage) {
                alert("ERROR IN DELETING FROM CART");
            }
        });   
    }// END BORRARDECARRITO

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 9
    function funcionPasarAMaybe($nombreProducto){

        var jsonData = {
            "action" : "PASARAMAYBE",
            "nombreProducto" : $nombreProducto
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                if (tipo_de_carrito === 'SI') {
                    $("#card-general").html("");
                    funcionTraerCarritoSI();
                }else if (tipo_de_carrito === 'MAYBE'){
                    $("#card-general").html("");
                    funcionTraerCarritoMAYBE();
                }else if (tipo_de_carrito === 'FRIENDS'){
                    $("#card-general").html("");
                    funcionTraerCarritoFRIENDS();
                }

            },
            error: function(errorMessage) {
                alert("ERROR IN MOVING TO MAYBE");
            }
        });   
    }// END PASARAMAYBE

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 10
    function funcionPasarAYes($nombreProducto){

        var jsonData = {
            "action" : "PASARAYES",
            "nombreProducto" : $nombreProducto
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                if (tipo_de_carrito === 'SI') {
                    $("#card-general").html("");
                    funcionTraerCarritoSI();
                }else if (tipo_de_carrito === 'MAYBE'){
                    $("#card-general").html("");
                    funcionTraerCarritoMAYBE();
                }else if (tipo_de_carrito === 'FRIENDS'){
                    $("#card-general").html("");
                    funcionTraerCarritoFRIENDS();
                }

            },
            error: function(errorMessage) {
                alert("ERROR IN MOVING TO YES");
            }
        });   
    }// END PASARAMAYBE

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 11
    function funcionLlamarATraerProducto(){

        if (global_sexo != "null" && global_categoria != "null" && global_subcategoria != "null") {
            funcionTraerProducto();
        }
    }// END LLAMAR A TRAER PRODUCTO

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 12
    function funcionEnviarAmigo($amigo, $nombreProducto){

        var jsonData = {
            "action" : "ENVIARAMIGO",
            "nombreProducto" : $nombreProducto,
            "amigo" : $amigo
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

                Materialize.toast('PRODUCT SENT!', 900);
                $("#textfield_email").text('');               

            },
            error: function(errorMessage) {
                alert("ERROR IN SENDING TO FRIEND");
            }
        }); 

    }// END LLAMAR A TRAER PRODUCTO

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 13
    function funcionLogin(){

        var email_login_escrito = $("#login_email").val();

        var jsonData = {
            "action" : "LOGIN",
            "email" : email_login_escrito
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

                Materialize.toast('YOU ARE LOGGED IN!', 1000);   

            },
            error: function(errorMessage) {
                alert("ERROR IN LOGIN");
            }
        }); 

    }// END FUNCION LOGIN

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 14
    function funcionSession(){

        var seconds = new Date().getTime() / 1000;

        var jsonData = {
            "action" : "SESSION",
            "usuario" : seconds
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

            },
            error: function(errorMessage) {
                
            }
        }); 

    }// END FUNCION SESSION

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 15
    function funcionSearch(){

        var search_escrito = $("#search_field").val();

        var jsonData = {
            "action" : "SEARCH",
            "search_field" : search_escrito,
            "estadoCarrito" : tipo_de_carrito
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {


                $("#card-general").html("");
                for (var key in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(key)) {     
                        $("#card-general").append('<div id= "' 
                            + jsonResponse[key].nombreProducto 
                            + '"' 
    // IMAGEN
    + 'class="card"><div class="card-image waves-effect waves-block waves-light">' 
    // CAROUSEL
    + '<div class="carousel carousel-slider" data-indicators="true">'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto1" src="IMAGES/'
    + jsonResponse[key].imagenProducto1
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto2" src="IMAGES/'
    + jsonResponse[key].imagenProducto2
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto3" src="IMAGES/'
    + jsonResponse[key].imagenProducto3
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto4" src="IMAGES/'
    + jsonResponse[key].imagenProducto4
    + '"></a>'
    + '<a class="carousel-item"><img alt="IMAGE NOT AVAILABLE" id="imagenProducto5" src="IMAGES/'
    + jsonResponse[key].imagenProducto5
    + '"></a>'
    + '</div></div>'
    // TITULO
    + '<div class="card-content"><span id = "titulo" class="card-title activator grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    // PRECIO
    + '<i class="material-icons right">more_vert</i></span><p id="subtitulo">' 
    + jsonResponse[key].precioProducto 
    + ' mxn</p></div>' 
    // BOTONES SI,NO,MAYBE
    + '<div class="card-action row row-juancho">'
    + '<button class="si_button_no waves-effect waves-teal btn-flat col s6 boton-juancho red-juancho">NO</button>'
    + '<button class="si_button_maybe waves-effect waves-teal btn-flat col s6 boton-juancho green-juancho">MAYBE</button></div>' 
    // EMAIL
    + '<div class="card-action">'
    + '<input id="textfield_email" placeholder="Your friend\'s email" id="correo_amigo_escrito" type="text" class="validate">'
    + '<button class="enviar_correo_amigo waves-effect waves-teal btn-flat boton-send" type="submit" name="action">SEND'
    + '</button></div>'
    // DESCRIPCION
    + '<div class="card-reveal"><span id="titulo_descripcion" class="card-title grey-text text-darken-4">' 
    + jsonResponse[key].nombreProducto 
    + '<i class="material-icons right">close</i></span><p id="descripcion">' 
    + jsonResponse[key].descProducto 
    + '</p></div>' 
    + '</div>  <div class="container row" style="margin-bottom: 4%;">');

                        $('.carousel.carousel-slider').carousel({fullWidth: true});

                    }
                }
            },
            error: function(errorMessage) {
                alert("COULD NOT FIND THAT KEYWORD...");
            }
        }); 

    }// END FUNCION SEARCH

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 16
    function funcionPonerCheckout() {

        var jsonData = {
            "action" : "PONERCHECKOUT"
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

                $("#checkout_total").text('$ ' + jsonResponse.totalProductos + ' mxn');
                $("#checkout_email").val(jsonResponse.usuario);
                Materialize.updateTextFields();

            },
            error: function(errorMessage) {
                alert("ERROR IN BRINGING CHECKOUT");
            }
        }); 

    }// END PONERCHECKOUT

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // FUNCION 17
    function funcionPay() {

        var order = new Date().getTime() / 1000;
        var date = new Date();
        var email = $("#checkout_email").val();
        var direccion = $("#checkout_address").val();

        var jsonData = {
            "action" : "PAY",
            "order" : order,
            "date" : date,
            "email" : email,
            "direccion" : direccion
        };

        $.ajax({
            url: "./LAYERS/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            success: function(jsonResponse) {

                alert("COMPRA EXITOSA!");

    },
    error: function(errorMessage) {
        alert("ERROR IN PAYING");
    }
    }); 

    }// END PONERCHECKOUT


///////////////////////////////////////////////////
///////////////////////////////////////////////////
// END MAIN JS
