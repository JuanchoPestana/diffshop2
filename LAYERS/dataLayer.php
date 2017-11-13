<?php
error_reporting(E_ALL);

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 1
	function dbConnection(){

		$server = "localhost";
		$username = "dataprod_diff2";
		$password = "monica28";
		$db = "dataprod_diffshop"; 

		$conn = new mysqli($server, $username, $password, $db);

		if ($conn->connect_error)
		{
			return null;
		}
		else
		{
			return $conn;
		}
	}// END DB CONNECTION

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 2
	function data_traerProducto($sexo, $categoria, $subcategoria){

		$connection = dbConnection();
		$tableName = $sexo . "_" . $categoria;

		if ($connection != null){

			$sql = "SELECT * FROM $tableName WHERE subCatProducto = '$subcategoria' ORDER BY rand()";

			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{

				while ($row = $result->fetch_assoc())
				{
					$response = array("nombreProducto"=>$row["nombreProducto"], "descProducto"=>$row["descProducto"], "imagenProducto1"=>$row["imagenProducto1"], "imagenProducto2"=>$row["imagenProducto2"], "imagenProducto3"=>$row["imagenProducto3"], "imagenProducto4"=>$row["imagenProducto4"], "imagenProducto5"=>$row["imagenProducto5"], "precioProducto"=>$row["precioProducto"]);
				}

				$connection->close();
				return array("producto"=>$response, "MESSAGE"=>"SUCCESS");
			}

			else
			{
				$connection->close();
				return array("MESSAGE"=>"204");
			}
		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_TRAERPRODUCTO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 3
	function data_insertarCarrito($nombreProducto, $precioProducto, $descProducto, $imagenProducto1, $imagenProducto2, $imagenProducto3, $imagenProducto4, $imagenProducto5, $estadoCarrito, $usuario){

		$connection = dbConnection();

		if ($connection != null){ 

			$sql = "INSERT INTO carritos (nombreProducto, precioProducto, descProducto, imagenProducto1, imagenProducto2, imagenProducto3, imagenProducto4, imagenProducto5, estadoCarrito, usuario) VALUES ('$nombreProducto', '$precioProducto', '$descProducto', '$imagenProducto1', '$imagenProducto2', '$imagenProducto3', '$imagenProducto4', '$imagenProducto5', '$estadoCarrito', '$usuario')";

			if (mysqli_query($connection, $sql)) {
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}

		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_INSERTARCARRITO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 4
	function data_traerCarrito($estado, $usuario){

		$connection = dbConnection();

		if ($connection != null){

			$sql = "SELECT * FROM carritos WHERE usuario = '$usuario' AND estadoCarrito = '$estado'";

			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
				$counter = 0;
				while ($row = $result->fetch_assoc())
				{
					$response[$counter++] = array("nombreProducto"=>$row["nombreProducto"], "descProducto"=>$row["descProducto"], "imagenProducto1"=>$row["imagenProducto1"], "imagenProducto2"=>$row["imagenProducto2"], "imagenProducto3"=>$row["imagenProducto3"], "imagenProducto4"=>$row["imagenProducto4"], "imagenProducto5"=>$row["imagenProducto5"], "precioProducto"=>$row["precioProducto"]);
				}

				$connection->close();
				return array("producto"=>$response, "MESSAGE"=>"SUCCESS");
			}

			else
			{
				$connection->close();
				return array("MESSAGE"=>"204");
			}
		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_TRAERPRODUCTO
	
	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 5
	function data_borrarDeCarrito($producto, $usuario){

		$connection = dbConnection();

		if ($connection != null){ 

			$sql = "DELETE FROM carritos WHERE usuario = '$usuario' AND nombreProducto = '$producto'";

			if (mysqli_query($connection, $sql)) {
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}

		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_TRAERPRODUCTO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 6
	function data_pasarAMaybe($producto, $usuario){


		$connection = dbConnection();

		if ($connection != null){ 

			$sql = "UPDATE carritos SET estadoCarrito = 'MAYBE' WHERE usuario = '$usuario' AND nombreProducto = '$producto'";

			if (mysqli_query($connection, $sql)) {
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}

		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_PASARAMAYBE

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 7
	function data_pasarAYes($producto, $usuario){


		$connection = dbConnection();

		if ($connection != null){ 

			$sql = "UPDATE carritos SET estadoCarrito = 'SI' WHERE usuario = '$usuario' AND nombreProducto = '$producto'";

			if (mysqli_query($connection, $sql)) {
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}

		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_PASARAMAYBE

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 8
	function data_enviarAAmigo($amigo, $nombreProducto){

		$connection = dbConnection();

		if ($connection != null){

			$sql = "SELECT * FROM productos WHERE nombreProducto = '$nombreProducto' LIMIT 1";
			$result = $connection->query($sql);
			$row = $result->fetch_assoc();

			$insertar_nombreProducto = $row["nombreProducto"];
			$insertar_precioProducto = $row["precioProducto"];
			$insertar_descProducto = $row["descProducto"];
			$insertar_imagenProducto1 = $row["imagenProducto1"];
			$insertar_imagenProducto2 = $row["imagenProducto2"];
			$insertar_imagenProducto3 = $row["imagenProducto3"];
			$insertar_imagenProducto4 = $row["imagenProducto4"];
			$insertar_imagenProducto5 = $row["imagenProducto5"];
			$insertar_estadoCarrito = "AMIGO";
			$insertar_usuario = $amigo;

	// INSERTAR EN CARRITO DEL AMIGO
			$sql = "INSERT INTO carritos (nombreProducto, precioProducto, descProducto, imagenProducto1, imagenProducto2, imagenProducto3, imagenProducto4, imagenProducto5, estadoCarrito, usuario) VALUES ('$insertar_nombreProducto', '$insertar_precioProducto', '$insertar_descProducto', '$insertar_imagenProducto1', '$insertar_imagenProducto2', '$insertar_imagenProducto3', '$insertar_imagenProducto4', '$insertar_imagenProducto5', '$insertar_estadoCarrito', '$insertar_usuario')";
			mysqli_query($connection, $sql);

	// INSERTAR EN TABLA RELACIONES
			session_start();
			$usuario = $_SESSION["usuario"];

			$sql = "INSERT INTO relaciones (usuario, amigo) VALUES ('$usuario', '$amigo')";
			mysqli_query($connection, $sql);



			$connection->close();
			return array("MESSAGE"=>"SUCCESS");
		}
		else{
			return array("MESSAGE"=>"500");
		}


	}// END DATA_ENVIARAAMIGO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 9
	function data_login($email, $usuario){

		$connection = dbConnection();

		if ($connection != null){ 

			$sql = "UPDATE carritos SET usuario = '$email' WHERE usuario = '$usuario'";

			if (mysqli_query($connection, $sql)) {
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}

		}
		else{
			return array("MESSAGE"=>"500");
		}


	}// END DATA LOGIN

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 10
	function data_search($usuario, $search_field, $estado){

		$connection = dbConnection();

		if ($connection != null){

			$sql = "SELECT * FROM carritos WHERE usuario = '$usuario' AND estadoCarrito = '$estado' AND (nombreProducto LIKE '%$search_field%' OR nombreProducto LIKE '%$search_field' OR nombreProducto LIKE '$search_field%')";

			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
				$counter = 0;
				while ($row = $result->fetch_assoc())
				{
					$response[$counter++] = array("nombreProducto"=>$row["nombreProducto"], "descProducto"=>$row["descProducto"], "imagenProducto1"=>$row["imagenProducto1"], "imagenProducto2"=>$row["imagenProducto2"], "imagenProducto3"=>$row["imagenProducto3"], "imagenProducto4"=>$row["imagenProducto4"], "imagenProducto5"=>$row["imagenProducto5"], "precioProducto"=>$row["precioProducto"]);
				}

				$connection->close();
				return array("producto"=>$response, "MESSAGE"=>"SUCCESS");
			}

			else
			{
				$connection->close();
				return array("MESSAGE"=>"204");
			}
		}
		else{
			return array("MESSAGE"=>"500");
		}

	}// END DATA_TRAERPRODUCTO

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 11
	function data_ponerCheckout(){

		$usuario = $_SESSION["usuario"];

		$connection = dbConnection();

		if ($connection != null){

			$sql = "SELECT SUM(precioProducto) as total FROM carritos WHERE usuario = '$usuario' AND estadoCarrito = 'SI'";
			$result = $connection->query($sql);
			$row = $result->fetch_assoc();

			$num_sin_redondear = $row["total"];
			$num_final = sprintf('%0.2f', $num_sin_redondear);

			$response = array("totalProductos"=>$num_final, "usuario"=>$usuario);


			$connection->close();
			return array("producto"=>$response, "MESSAGE"=>"SUCCESS");
		}
		else{
			return array("MESSAGE"=>"500");
		}


	}// END DATA_PONERCHECKOUT

	///////////////////////////////////////////////////
	///////////////////////////////////////////////////
	// FUNCION 12
	function data_pay($usuario, $order, $date, $email, $direccion){

		$connection = dbConnection();

		if ($connection != null){

			$sql = "SELECT * FROM carritos WHERE usuario = '$usuario' AND estadoCarrito = 'SI'";

			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{

				while ($row = $result->fetch_assoc())
				{

					$nombreProducto = $row["nombreProducto"];

					$sql2 = "INSERT INTO pedidos (order, nombreProducto, email, direccion, fecha, usuario) 
					VALUES ('$order', '$nombreProducto', '$email', '$direccion', '$date', '$usuario')";

					mysqli_query($connection, $sql2);

				}

				$connection->close();
				return array("MESSAGE"=>"SUCCESS");
			}

			else
			{
				$connection->close();
				return array("MESSAGE"=>"4000");
			}
		}
		else
		{
			return array("MESSAGE"=>"4000");
		}

	}// END DATA_PAY



	?>
