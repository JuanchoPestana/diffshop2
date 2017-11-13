<?php
error_reporting(E_ALL);
header('Content-type: application/json');
header('Accept: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];


	switch($action)
	{
		case "TRAERPRODUCTO" : 
		traerProducto();
		break;	

		case "INSERTARCARRITO" : 
		insertarCarrito();
		break;

		case "TRAERCARRITOSI" : 
		traerCarritoSi();
		break;

		case "TRAERCARRITOMAYBE" : 
		traerCarritoMaybe();
		break;

		case "TRAERCARRITOFRIENDS" : 
		traerCarritoFriends();
		break;

		case "BORRARDECARRITO" : 
		borrarDeCarrito();
		break;

		case "PASARAMAYBE" : 
		pasarAMaybe();
		break;

		case "PASARAYES" : 
		pasarAYes();
		break;

		case "ENVIARAMIGO" : 
		enviarAAmigo();
		break;

		case "LOGIN" : 
		login();
		break;

		case "SESSION" : 
		sessionCarrito();
		break;

		case "SEARCH" : 
		search();
		break;

		case "PONERCHECKOUT" : 
		ponerCheckout();
		break;

		case "PAY" : 
		pay();
		break;

	}// END SWITCH

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 1
	function traerProducto() {

		$sexo = $_POST["sexo"];
		$categoria = $_POST["categoria"];
		$subcategoria = $_POST["subcategoria"];

		session_start();
		$_SESSION["sexo"] = $sexo;
		$_SESSION["categoria"] = $categoria;
		$_SESSION["subcategoria"] = $subcategoria;


		$var_traerProducto = data_traerProducto($sexo, $categoria, $subcategoria);

		if ($var_traerProducto["MESSAGE"] == "SUCCESS") {
			$response = $var_traerProducto["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END TRAERPRODUCTO	

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 2
	function insertarCarrito(){

		session_start();
		$usuario = $_SESSION["usuario"];

		$nombreProducto = $_POST["nombreProducto"];
		$precioProducto = $_POST["precioProducto"];
		$descProducto = $_POST["descProducto"];
		$imagenProducto1 = $_POST["imagenProducto1"];
		$imagenProducto2 = $_POST["imagenProducto2"];
		$imagenProducto3 = $_POST["imagenProducto3"];
		$imagenProducto4 = $_POST["imagenProducto4"];
		$imagenProducto5 = $_POST["imagenProducto5"];
		$estadoCarrito = $_POST["estadoCarrito"];



		$var_insertarCarrito = data_insertarCarrito($nombreProducto, $precioProducto, $descProducto, $imagenProducto1, $imagenProducto2, $imagenProducto3, $imagenProducto4, $imagenProducto5, $estadoCarrito, $usuario);

		if ($var_insertarCarrito["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}


	}// END INSERTARCARRITO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 3
	function sessionCarrito(){

		$usuario = $_POST["usuario"];

		session_start();
		if (isset($_SESSION["usuario"])) {
			$usuario = $_SESSION["usuario"];
			echo json_encode("SUCCESS SESSION 1: " . $usuario);
		}
		else
		{
			$_SESSION["usuario"] = $usuario;
			echo json_encode("SUCCESS SESSION 2: " . $usuario);
		}



	}// END FUNCTION SESSION CARRITO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 4
	function traerCarritoSi() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$estado = "SI";

		$var_traerCarrito = data_traerCarrito($estado, $usuario);

		if ($var_traerCarrito["MESSAGE"] == "SUCCESS") {
			$response = $var_traerCarrito["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END TRAER CARRITOSI

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 5
	function traerCarritoMaybe() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$estado = "MAYBE";


		$var_traerCarrito = data_traerCarrito($estado, $usuario);

		if ($var_traerCarrito["MESSAGE"] == "SUCCESS") {
			$response = $var_traerCarrito["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END TRAER CARRITO MAYBE

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 6
	function traerCarritoFriends() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$estado = "AMIGO";


		$var_traerCarrito = data_traerCarrito($estado, $usuario);

		if ($var_traerCarrito["MESSAGE"] == "SUCCESS") {
			$response = $var_traerCarrito["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END TRAER CARRITO FRIENDS

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 7
	function borrarDeCarrito() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$producto = $_POST["nombreProducto"];


		$var_borrarCarrito = data_borrarDeCarrito($producto, $usuario);

		if ($var_borrarCarrito["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END BORRARDECARRITO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 8
	function pasarAMaybe() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$producto = $_POST["nombreProducto"];


		$var_pasarAMaybe = data_pasarAMaybe($producto, $usuario);

		if ($var_pasarAMaybe["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END PASARAMAYBE

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 9
	function pasarAYes() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$producto = $_POST["nombreProducto"];


		$var_pasarAYes = data_pasarAYes($producto, $usuario);

		if ($var_pasarAYes["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END PASARAYES

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 10
	function enviarAAmigo() {

		$amigo = $_POST["amigo"];
		$producto = $_POST["nombreProducto"];

		$var_EnviarAmigo = data_enviarAAmigo($amigo, $producto);

		if ($var_EnviarAmigo["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");
		}

	}// END ENVIAR A AMIGO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 11
	function login() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$email = $_POST["email"];

		$var_Login = data_login($email, $usuario);

		if ($var_Login["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			$_SESSION["usuario"] = $email;
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END LOGIN

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 12
	function search() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$search_field = $_POST["search_field"];
		$estadoCarrito = $_POST["estadoCarrito"];

		$var_Search = data_search($usuario, $search_field, $estadoCarrito);

		if ($var_Search["MESSAGE"] == "SUCCESS") {
			$response = $var_Search["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END SEARCH

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 13
	function ponerCheckout() {

		session_start();
		$usuario = $_SESSION["usuario"];

		$var_ponerCheckout = data_ponerCheckout();

		if ($var_ponerCheckout["MESSAGE"] == "SUCCESS") {
			$response = $var_ponerCheckout["producto"];
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END PONER CHECKOUT

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 14
	function pay() {

		session_start();
		$usuario = $_SESSION["usuario"];
		$order = $_POST["order"];
		$date = $_POST["date"];
		$email = $_POST["email"];
		$direccion = $_POST["direccion"];

		$var_pay = data_pay($usuario, $order, $date, $email, $direccion);

		if ($var_pay["MESSAGE"] == "SUCCESS") {
			$response = "SUCCESS";
			echo json_encode($response);
		}
		else 
		{
			genericErrorFunction("4000");	
		}

	}// END PAY

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 15
	function genericErrorFunction($errorCode){
		switch($errorCode)
		{
			case "4000" : header("HTTP/1.1 400 Not found");
			die("SOMETHING WENT WRONG!");
			break;
		}
	}// END GENERIC ERROR FUNCTION


	?>