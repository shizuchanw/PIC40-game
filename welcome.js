const textbox = document.getElementById("textboxid");

//fill the textbox with username on load
window.onload = function(){
	const cookie_username = get_username();
	textbox.defaultValue = cookie_username;
}

function submit_name() {
	const input_name = textbox.value;
	//check username and give alerts
	let alert_msg = "";
	console.log(alert_msg);

	//first check the length of input_name
	if (input_name.length < 5)
	{
		alert_msg = alert_msg.concat("Username must be 5 characters or longer.\n");
		console.log("short length error checked");
		console.log(alert_msg);
	}
	if (input_name.length > 40)
		alert_msg = alert_msg.concat("Username cannot be longer than 40 characters.\n");

	//now check for space, comma, semicolon
	const space = new RegExp(' ');
	const comma = new RegExp(',');
	const semic = new RegExp(';');
	if(space.test(input_name))
		alert_msg = alert_msg.concat("Username cannot contain spaces.\n");
	if(comma.test(input_name))
		alert_msg = alert_msg.concat("Username cannot contain commas.\n");
	if (semic.test(input_name))
		alert_msg = alert_msg.concat("Username cannot contain semicolons.\n");

	//now check whether all characters are legal
	const legal_characters = "!@#$%^&*()-_=+[]{}:'|`~<.>/?" + 
							 'abcdefghijklmnopqrstuvwxyz' + 
							 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
							 '0123456789';

	if (input_name.length >= 5 && input_name.length <= 40)
	{
		for (char of input_name)
		{
			const char_regex = new RegExp(char);
			if ((char_regex.test(legal_characters) !== true) && (char_regex.test(" ,;") !== true))
			{
				alert_msg = alert_msg.concat("Username can only use characters from the following string:\n" +
							 'abcdefghijklmnopqrstuvwxyz' +
     	                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
							 "!@#$%^&*()-_=+[]{}:'|`~<.>/?\n");
				break;
			}
		}
	}

	//alert if username is illegal, else create a new cookie
	if (alert_msg !== "")
		alert(alert_msg);
	else
	{
		document.cookie = `username=${input_name}; expires=${hour_in_future()}`;		//change to hour later
		//redirect to shut_the_box.php
		window.location.href = "shut_the_box.php";
	}
}

//the cookie should expire in an hour, but should be alive after closing the browser
function hour_in_future(){
	let hour_in_future = new Date();
	hour_in_future.setHours(hour_in_future.getHours()+1);
	return hour_in_future.toUTCString();
}