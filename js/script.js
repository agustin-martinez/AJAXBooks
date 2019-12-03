const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=S08Kk';
console.log('1 Script started');
  
$(document).ready(() => {  // window load
	console.log('Script started.');
	let ajaxButton = $('#ajaxButton');

	ajaxButton.on('click', event => {
		const settings = {
			method: 'GET',
			data: {
        key: 'value'
			}  // ?key=value
    };
    
    let url = apiUrl + '&op=select';
		// console.log('Before AJAX');
		let jqXHR = $.ajax(url);
		// console.log('AJAX in progress, waiting for response');
		jqXHR.done(onSuccess).fail(onFailure);
		// console.log('Still waiting for response');
	}) // ajaxButton click
});

function onSuccess(data) {
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
  console.log('The object is: ', object);

  for(let i = 0; i < object.data.length;i++) {
    console.log(object.data[i]);
  }


	let result = $('#resultDiv');
	result.html('Message from server: <br>' + data.title)
}
function onFailure(message) {
	console.log('AJAX onFailure', message);
}

