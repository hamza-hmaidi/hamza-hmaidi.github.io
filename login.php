<?php 
	$message="" ; 
	$md5 = "1a52e17fa899cf40fb04cfc42e6352f1";//= hash('md5', 'XyZzy12*_php123'); 
	
	if(  isset($_POST['pwd'])  ){
		
		$pwd=hash('md5','XyZzy12*_'.$_POST['pwd']) ;
		
		if( $_POST['pwd']=="" or $_POST['username']==""  )
			$message="<p style=\"color:red\">password and username required</p>" ;
		elseif (  $pwd==$md5  ) 
		 	header('Location:game.php?name='.urlencode($_POST['username']));
		else 
		 	$message="<p style=\"color:red\">Incorrect password</p>" ;
			
	}
	

	if ( isset($_POST['cancel'] ) ) {
    	header("Location: index.php");
	}
?>





<!DOCTYPE html>
<html>
<head>
	<title>Log In-Hamza Hmaidi 2c471a5a</title>
	<?php require_once "boots.php"; ?>
</head>
<body>
	<div class="container">
		<h1>Please log in </h1>
		<?php echo $message;  ?>
		<form method="POST">
			<label>User Name : </label>
			<input type="text" name="username">
			<label>Password :</label>
			<input type="text" name="pwd">
			<input type="submit" value="Log in">
			<input type="submit" name="cancel" value="cancel">
		</form>
	</div>	
</body>
</html>