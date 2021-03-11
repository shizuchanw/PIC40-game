function get_username(){
	let cookie = document.cookie;

	const searchTerm = 'username=';
 	const lengthOfSearchTerm = searchTerm.length;

 	let list = cookie.split('; ');			//an array of elements separated by '; '
 	let namestring = "";					//use this to store the substring that starts with "username"

 	//iterate through the list of elements to see if there is a 'name' "username"
 	//if found, store it in namestring
 	for (let element of list)
 	{
 		if (element.indexOf(searchTerm)===0)
 		{
 			namestring = element;
 			break;
 		}
 	}

 	//return name if exists
 	if (namestring !== "")
 	{
 		
 		return namestring.substring(lengthOfSearchTerm, namestring.length);
 	}

 	return "";
}