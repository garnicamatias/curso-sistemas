<?php
	//Inicio de sesión (Persistencia de datos en diferentes ejecuciones)
	session_start();

	//Conexión al motor de Bases de Datos
	$connection = null;
	
	//Ejecutando la conexión en un bloque protegido. En caso de falla X al conectar, se atrapa la excepción
	try
	{
		$connection = new PDO('mysql:host=127.0.0.1:3306;dbname=bd_final', 'root', '1234' );
		
		//Determinamos que en caso de errores (desde la base de datos), se reflejen como excepciones.
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $connectionException) 
	{
		//Contestamos al cliente que su petición no se puede efectuar por un problema
		$status = array( status=>'error', description=>$connectionException->getMessage() );
	    echo json_encode($status);

	    //Cortamos la ejecución del programa del servidor de forma forzada
	    die();
	};

	//Si no hubo problemas, obtenemos el cuerpo de la petición del cliente.
	//Pactamos que el intercambio es vía texto en formato JSON
	$json_body = file_get_contents('php://input');

	//Transformamos texto JSON en objeto PHP para poder manipularlo con el lenguaje
	$object = json_decode($json_body);

	//Tomamos la información necesaria del objeto recibido
	$key = $object->key;
	$action = $object->action;
	$data = $object->body;


	/******** CODIGO NUEVO **********/

	function login( $connection, $data )
	{
		$SQLCode = "SELECT password FROM login WHERE username = '$data->username'";
		
		$db_password = $connection->query($SQLCode)->fetch()['password'];
		

		if ( $db_password == $data->password )
		{
			$oldKey = $_SESSION["userKeyAccess"];
			$_SESSION["userKeyAccess"] = uniqid();
			return $_SESSION["userKeyAccess"];
		}
		else
		{
			return null;
		}
	}

	function authorize( $lastUserAccessKey, $connection, $action, $data )
	{
		if ( $action != 'login' )
		{
			if ( $_SESSION["userKeyAccess"] == $lastUserAccessKey )
			{
				$response = $action( $connection, $data );
				$_SESSION["userKeyAccess"] = uniqid();
				return [ "key" => $_SESSION["userKeyAccess"], "body" => $response ];
			}
		}
		else
		{
			return [ "key" => login($connection,$data), "body" => null ];
		}		
	}

	function register( $connection, $data )
	{
		return 'RegisterOK!';
	}


	/********************************/


	/*La siguiente línea tiene mucho significado:
	"Ejecuta la función correspondiente al nombre de acción enviado por el cliente, le suministra
	el argumento basado en el cuerpo del mensaje recibido en la petición, y a la respuesta la codifica
	en texto formato JSON e imprime este texto como respuesta al cliente"

	$action es el texto(string) del nombre de la función a invocar.
	$action() --> Invoca la función cuyo nombre coincide con la que existe programada aquí.
	Ejemplo: Si $action es 'create', entonces la línea se convierte en create()
	Como esto está generalizando la invocación de cualquier función, es peligroso
	dado que no todas las funciones tienen la misma cantidad de parámetros y no todas tienen
	datos de retorno. Por cuestión de simplificación se aborda así.*/
	
	echo json_encode( authorize($key, $connection, $action, $data) );
?>