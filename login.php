#!/usr/local/bin/php
<?php
	session_save_path(__DIR__.'/sessions/');
	session_name('shutTheBox');
	session_start();


	$incorr_submiss = false;
	if (isset ($_POST['password_submitted']))
	{
		validate($_POST['password_submitted'], $incorr_submiss);
	}

	function validate($submiss, &$incorr_submiss)
	{
		//get the hashed password from h_password.txt
		$file = fopen('h_password.txt', 'r') or die('Unable to find the hashed password');
		$hashed_password = fgets($file);
    	$hashed_password = trim ($hashed_password);
    	fclose($file);

    	//hash the password_submitted using the same algorithm
    	$hashed_submiss = hash('md2', $submiss);

    	//check whether the 2 are the same
    	if ($hashed_submiss !== $hashed_password)
    	{
    		$incorr_submiss = true;
    		$_SESSION['loggedin'] = false;	//store this information in session
    	}
    	else
    	{
    		$_SESSION['loggedin'] = true;
    		header('Location: welcome.php');
      		exit;
    	}
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="style.css">
	<title>Shut The Box</title>
</head>
<body>
	<header>
		<h1>Welcome! Ready to play “Shut The Box”?</h1>
	</header>
	<main>
		<section>
			<h2>Login</h2>
			<p>In order to play you need the password.</p>
			<p>If you know it, please enter it below and login.</p>

			<fieldset>
				<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
					<label for="password_id" id="password-label">Password:</label>
					<input type="password" name="password_submitted" id="password_id">
					<input type="submit" class="button" value="Login">
				</form>
			</fieldset>
			<?php
          		if ($incorr_submiss) {
            		echo '<p>Invalid password!</p>';
          		}
        	?>
		</section>
	</main>
	<footer>
		<hr>
		<small>&copy; Flora Wang, 2021</small>
	</footer>
</body>
</html>