let timeoutID = null;
Update();

function playAgain(){
	window.location.href = "welcome.php";
}

function Update(){
	const score_area = document.getElementById('score-display');

	const request = new XMLHttpRequest();
	request.onload = function(){
		if(this.status === 200)
		{
			let scores = this.responseText.split("\n");
			let score_html = "";
			for (let score of scores) {score_html += score+"<br>";}

			score_area.innerHTML = score_html;
			timeoutID = setTimeout(Update, 10000);

		}
	}
	request.open('GET', 'scores.txt?v=' + Math.random());
	request.send();

}

function stopUpdate(){
	clearTimeout(timeoutID);
}

function forceUpdate(){
	stopUpdate();	//in case we have 2 timers going on at the same time
  	Update();
}