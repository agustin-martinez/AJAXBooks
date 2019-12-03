const apiUrl = 'https://opentdb.com/api.php?amount=3&category=23&difficulty=medium';
console.log('1 Script started');

window.addEventListener('load', () => {
	console.log('2 Window load event');

	// skicka request till api-servern
	// ta hand om information vi får tillbaka
	// visa datan på webbsidan
	// förbättra design och CSS
	let bert = document.querySelector('#bert');
	bert.addEventListener('click', async e => {
		console.log('3 Clicked on Bert');
		// Alternativt sätt att använda fetch:
		// fetch(apiUrl).then(response => { })

		const response = await fetch(apiUrl);
		console.log('4 Got response from server', response);
		const data = await response.json();
		console.log('5 JSON data is: ', data);

		// kom ihåg att anropa createQuestionDOM för varje frågeobjekt
	})
});

function createQuestionDOM(question) {
	// { question, correct_answer, incorrect_answers }
	let questionElement = document.createElement('div');
	questionElement.className = 'question';
	// Alternativ: questionElement.classList

	let questionHeading = document.createElement('h2');
	questionHeading.innerText = question.question;


}







//
