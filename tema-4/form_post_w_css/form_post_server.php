<?php

	$_REQUEST['name'];
	$_REQUEST['surname'];
	$_REQUEST['email'];
	$_REQUEST['password'];
	$_REQUEST['password2'];
	$_REQUEST['gender'];
	$_REQUEST['sourceIncome'];
	$_REQUEST['income'];
	$_REQUEST['age'];
	$_REQUEST['Bio'];
   
?>

<html>
   <body>      
       <p><?php echo "Hola ". $_REQUEST['surname'] . ',' . $_REQUEST['name'] ?></p><br>
       <p><?php echo "Ha completado el formulario satisfactoriamente. Email: ". $_REQUEST['email'] . ', password: ' . $_REQUEST['password'] ?></p>

   </body>
</html>