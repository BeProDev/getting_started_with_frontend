const registerElem = document.getElementById('register');
const loginElem = document.getElementById('login');
const registerFormElem = document.getElementById('register-form');
const registerFormErrorElem = registerFormElem.getElementsByClassName('error-message')[0];
const loginFormErrorElem = loginElem.getElementsByClassName('error-message')[0];

function switchLoginAndRegister(){
	registerElem.classList.toggle('display-none');
	loginElem.classList.toggle('display-none');
}

registerFormElem.addEventListener('submit', validateForm);
function validateForm(event){
	event.preventDefault();
	const inputElements = registerElem.getElementsByTagName('input');
	let isValid = true;
	const data = {};

	for(let i = 0; i < inputElements.length; i++){
		const {name, value} = inputElements[i];
		const trimmedValue = value.trim();
		data[name] = value;
		
		if(!trimmedValue){
			isValid = false;
		}
	}

	if(!isValid) return;

	registerUser(data)
		.then((response)=> {
			login(data.username, data.password);
		})
		.then((response)=> {
			window.location = 'file:///C:/Users/adnan/OneDrive/Desktop/getting_started_with_frontend/Project/Practice/dashboard.html';
		})
		.catch((response)=> {
			registerFormErrorElem.innerText = response.message;
		});
}

function registerUser(newUserData){
	return new Promise((resolve, reject)=> {
		let userData = JSON.parse(localStorage.getItem('userData'));
		if(!userData){
			userData = [];
		}

		for(let user of userData){
			if(user.username === newUserData.username) reject({success: false, message: 'username already exist'});
			if(user.email === newUserData.email) reject({success: false, message: 'email already exist'});
			if(user.email === newUserData.email || user.username === newUserData.username) return;
		}

		userData.push(newUserData);
		localStorage.setItem('userData', JSON.stringify(userData));
		resolve({success: true});
	});
}

function login(username, pass){
	let userData = JSON.parse(localStorage.getItem('userData'));

	return new Promise((resolve, reject)=> {
		if(!userData) {
			reject({success: false, message: 'Invalid credentials'})
			return;
		}

		const user = userData.find(u => u.username === username);
		if(!user || user.password !== pass) {
			reject({success: false, message: 'Invalid credentials'})
			return;
		}

		localStorage.setItem('loggedInUser', JSON.stringify(user));
		resolve({success: true});
	});
}

function onLogin(event){
	event.preventDefault();
	const inputElements = loginElem.getElementsByTagName('input');
	const data = {};
	for(let i = 0; i < inputElements.length; i++){
		const {name, value} = inputElements[i];
		data[name] = value;
	}

	login(data.username, data.password)
		.then((response)=> {
			window.location = 'file:///C:/Users/adnan/OneDrive/Desktop/getting_started_with_frontend/Project/Practice/dashboard.html';
		})
		.catch((response)=> {
			loginFormErrorElem.innerText = response.message;
		});
	console.log(data);
}