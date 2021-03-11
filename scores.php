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
	<link rel="stylesheet" href="style.css">
	<script src="scores.js" defer></script>
</head>

<body>
	<header>
		<h1>Shut The Box</h1>
	</header>

	<main>
		<section>
			<h2>Scores</h2>
			<p>Well done! Here are the scores so far...</p>
			<p id="score-display"></p>
			<fieldset>
				<input type="button" value="PLAY AGAIN!!!" onclick="playAgain()">
			</fieldset>
			<fieldset>
				<input type="button" value="Force update/start updating" onclick="forceUpdate();">
				<input type="button" value="Stop updating" onclick="stopUpdate()">
			</fieldset>
		</section>
	</main>

	<footer>
		<hr>
		<small>&copy; Flora Wang, 2021</small>
	</footer>
</body>
</html>