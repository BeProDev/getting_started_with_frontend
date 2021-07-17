const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', validateForm);
const registerFormErrorField = registerForm.getElementsByClassName('error-message')[0];

function validateForm(){
	const inputElements = registerForm.getElementsByTagName('input');
	let valid = true;
	const data = {};

	for(let i = 0; i<inputElements.length; i++){
		const {name, value} = inputElements[i];
		const trimmedValue = value.trim();
		data[name] = value;

		if(!trimmedValue){
			valid = false;
		}
	}

	if(!valid) return;

	registerUser(data)
		.then(response=> {
			login(data.username, data.password);
		})
		.then(response=> {
			window.location = 'file:///C:/Users/adnan/OneDrive/Desktop/getting_started_with_frontend/Project/Completed/dashboard.html';
		})
		.catch(response=> {
			registerFormErrorField.innerText = response.message;
		});
}

function registerUser(newUserData){
	return new Promise((resolve, reject)=> {
		let userData = JSON.parse(localStorage.getItem('userData'));
		if(!userData)userData = [];

		for(let user of userData){
			if(user.username === newUserData.username) reject({success: false, message: 'username already exist'});
			if(user.email === newUserData.email) reject({success: false, message: 'email already exist'});
			return;
		}

		userData.push(newUserData);
		localStorage.setItem('userData', JSON.stringify(userData));
		resolve({success: true});
	});
}

function login(username, pass){
	const userData = JSON.parse(localStorage.getItem('userData'));
	return new Promise((resolve, reject)=> {
		if(!userData) reject({success: false, message: 'wrong credentials'});

		const user = userData.find(user => user.username === username);
		if(user.password === pass){
			localStorage.setItem('loggedInUser', JSON.stringify(user));
			resolve({success: true});
		}
		else reject({success: false, message: 'wrong credentials'});
	});
	
}