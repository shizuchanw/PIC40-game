#!/usr/local/bin/php
<?php
	header('Content-Type: text/plain; charset=utf-8');
	$username = $_POST['username'];
	$score = $_POST['score'];

	$file = fopen('scores.txt', 'a');
	fwrite($file, $username." ".$score."\n");
	fclose($file);
	exit;
?>