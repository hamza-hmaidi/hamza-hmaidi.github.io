
<?php  
$message = "Please select a strategy and press Play." ; 
if(!isset($_GET['name'] )){
	echo "Name parameter missing" ; 
	return ; 
}
if(isset($_POST['Logout'])){
	header('location:index.php') ;
}

if(isset($_POST['play'])){

	$myplay = $_POST['turn'] ; 
	$x = rand(1,3) ; 
	switch ($x) {
			case 1:
				$advplay = 'Rock' ;
				break;
			case 2 :
				$advplay = 'Paper' ;
				break;
			default:
				$advplay = 'Scissors' ;
				break;
		}	
	function check($myplay,$advplay){	
		if($myplay=="Rock" and $advplay=="Paper"){
			return "You Lose" ; 
		}	
		elseif($myplay=="Rock" and $advplay=="Scissors")
			return "You Win" ; 
		elseif($myplay=="Paper" and $advplay=="Scissors")
			return "You Lose" ; 
		elseif ($myplay=="Paper" and $advplay=="Rock")
			return "You win" ; 
		elseif ($myplay=="Scissors" and $advplay=="Rock")
			return "You Lose" ; 
		elseif ($myplay=="Scissors" and $advplay=="Paper")
			return "You Win" ;
		else 
			return "Tie" ; 
	}	
	$message=" Your Play=$myplay Computer Play=$advplay Result=".check($myplay,$advplay); 
}

?>


<!DOCTYPE html>
<html>
<head>
	<title>Game-Hamza Hmaidi 2c471a5a</title>
	<?php require_once "boots.php"; ?>
</head>
<body>
	<div class="container">
		<h1>Rock Paper Scissors</h1>
		<p>Welcome : <?php echo $_GET['name']  ?> </p>
		<form method="POST">
			<select name="turn">
				<option value="Rock">Rock</option>
				<option value="Paper">Paper</option>
				<option value="Scissors">Scissors</option>
			</select>
			<input type="submit" name="play" value="play">
			<input type="submit" name="Logout" value="Logout">
			<pre>
				<?php echo $message ?>
			</pre>	
		</form>
	</div>
</body>
</html>