const submit_button = document.getElementById('submit_button');
const roll_button = document.getElementById('roll_button');
let result = document.getElementById("roll_result");
let labels = document.getElementsByTagName('td');
let checkboxes = document.querySelectorAll('input[type=checkbox]');


window.onload = function(){
	//disable submit button onload
	submit_button.disabled = !submit_button.disabled;

	//we want to assign eventlisteners to the number labels of the checkboxes onload,
	//so that when we click on the numbers, the checkboxes will be checked/unchecked
	for (let i=0; i<9; i++)
	{
		labels[i].addEventListener('click', function(){checkboxes[i].checked = !checkboxes[i].checked;});
	}
}


/**
This function generates 1 or 2 random integers in [1,6], 
and display the result in the designated span in HTML
This function also disables the roll dice button and enables the submit selection button
*/
let dice_sum = 0;
const total_boxes_sum = 45;
function roll_dice() {
	//check the sum of the remaining boxes left
	const checkboxes_state = [0];
	for (checkbox of checkboxes)
	{
		checkboxes_state.push(checkbox.disabled);
	}
	const boxes_sum = sum_checked_indices(checkboxes_state);
	const remaining_boxes_sum = total_boxes_sum - boxes_sum;

	//do the rolling
	let roll = function(){return 1 + Math.floor(6*Math.random());}
	if (remaining_boxes_sum > 6)
	{
		let die1 = roll();
		let die2 = roll();
		result.innerHTML = `Result: ${die1} + ${die2} = ${die1+die2}`;
		dice_sum = die1 + die2;
	}
	else
	{
		let die = roll();
		result.innerHTML = `Result: ${die}`;
		dice_sum = die;
	}


	//enable submit selection button
  	submit_button.disabled = !submit_button.disabled;
  	//disable roll dice button
  	roll_button.disabled = !roll_button.disabled;
}


/**
This function is a helper function that sums the index of elements that returns true
*/
function sum_checked_indices(arr) {
	let count = 0;
	for (let i=0; i<arr.length; i++)
	{
		if (arr[i])
			count += i;
	}
	return count;
}

/**
This function either alert the user to reselect, 
or disable the used boxes and start another round of rolling
*/
function submit(){
	//create an array of checkboxes' status: index 1 would be box with label 1
	const checkboxes_state = [0];
	for (checkbox of checkboxes)
	{
		checkboxes_state.push(checkbox.checked && !checkbox.disabled);
	}
	const boxes_sum = sum_checked_indices(checkboxes_state);


	if (boxes_sum !== dice_sum)
	{
		alert('The total of the boxes you selected does not match the dice roll.\nPlease make another selection and try again.');
	}
	else
	{
		//disable all the checked checkboxes and their label's eventlisteners, then uncheck them
		for (let i=0; i<9; i++)
		{
			if(checkboxes[i].checked)
				{
					checkboxes[i].disabled = !checkboxes[i].disabled;
					checkboxes[i].checked = !checkboxes[i].checked;
					const new_label = labels[i].cloneNode(true);
					labels[i].parentNode.replaceChild(new_label, labels[i]);
				}
		}

		//remove the last rolling result
		result.innerHTML = "Result:";


  		//enable roll dice button
  		roll_button.disabled = !roll_button.disabled;
  		//disable submit selection button
  		submit_button.disabled = !submit_button.disabled;
  	}
}


/**
This function gives an alert of the user's score when give up
*/
function giveup(){
	const checkboxes_state = [0];
	for (checkbox of checkboxes)
	{
		checkboxes_state.push(checkbox.disabled);
	}
	const boxes_sum = sum_checked_indices(checkboxes_state);
	const remaining_boxes_sum = total_boxes_sum - boxes_sum;

	alert(`Your score is ${remaining_boxes_sum}.`);
}
