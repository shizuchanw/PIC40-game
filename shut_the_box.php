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

	if (isset($_COOKIE['username']) !== true)
	{
		header('Location: welcome.php');
		exit;
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Shut The Box</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" defer></script>
	<script src="shut_the_box.js" defer></script>
</head>

<body>
	<header>
		<h1>Shut The Box</h1>
	</header>

	<main>
		<section>
			<h2>The Rules</h2>
			<ol type="i"> 
				<li>Each turn, you roll the dice (or die) and select 1 or more boxes which sum to the value of your roll.</li>
				<li>You will not be allowed to pick the boxes which you choose on subsequent turns.</li>
				<li>When the sum of the boxes which are left is less than or equal to 6, you will only roll a single die.</li>
				<li>When you cannot make a move or you give up, the sum of the boxes which are left gives your score.</li>
				<li>Lower scores are better and a score of 0 is called "shutting the box".</li>
			</ol>
		</section>

		<section>
			<h2>Dice roll</h2>
			<fieldset>
				<input type="button" id="roll_button" value="Roll dice" onclick="roll_dice();">
				<span id="roll_result">Result: </span>
			</fieldset>
		</section>

		<section>
			<h2>Box selection</h2>
			<table>
				<thead>
					<tr>
						<?php
							for ($i = 1; $i <=9 ; ++$i)
							{
								echo "<td>{$i}</td>";
							}
							unset($i);
						?>
					</tr>
				</thead>
				<tbody>
					<tr>
						<?php
							for ($i = 1; $i <=9 ; ++$i)
							{
								echo "<td><input type=\"checkbox\"></td>";
							}
							unset($i);
						?>
					</tr>
				</tbody>
			</table>
			<fieldset>
				<input type="button" id="submit_button" value="Submit box selection" onclick="submit();">
				<input type="button" id="give_up_button" value="I give up/I can't make a valid move" onclick="giveup();">
			</fieldset>
		</section>
	</main>

	<footer>
		<hr>
		<small>&copy; Flora Wang, 2021</small>
	</footer>
</body>
</html>