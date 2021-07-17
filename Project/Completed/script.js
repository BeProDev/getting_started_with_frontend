function updateDisplayText(value){
	const displayTextElem = document.getElementById('display-text');
	if(!value){
		displayTextElem.innerText = 'Please enter any text';
		displayTextElem.setAttribute('class', 'empty-text');
	}else{
		displayTextElem.innerText = value;
		displayTextElem.setAttribute('class', 'has-text');
	}
}

function clearInputBox(){
	const inputBox = document.getElementById("input-field");
	inputBox.value = '';

	updateDisplayText(null);
}

function onLoad(){
	const inputBox = document.getElementById("input-field");
	updateDisplayText(inputBox.value);
}