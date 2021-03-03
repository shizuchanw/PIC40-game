#!/usr/local/bin/php
<?php
	session_save_path(__DIR__.'/sessions/');
	session_name('shutTheBox');
	session_start();

	$welcome = isset($_SESSION['loggedin']) && $_SESSION['loggedin'];	//check whether we're logged in
	if ($welcome !== true)
	{
		header('Location: login.php');
		exit;
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Shut The Box</title>
	<script src="username.js" defer></script>
	<script src="welcome.js" defer></script>
</head>

<body>
	<header>
		<h1>Welcome! Ready to play “Shut The Box”?</h1>
	</header>

	<main>
		<section>
			<h2>Choose a username</h2>
			<p>So that we can post your score(s), please choose a username.</p>
			<fieldset>
				<label for="textboxid">Username: </label>
				<input type="text" id="textboxid">
				<input type="button" value="submit" onclick="submit_name();">
			</fieldset>
		</section>
	</main>

	<footer>
		<hr>
		<small>&copy; Flora Wang, 2021</small>
	</footer>
</body>
</html>