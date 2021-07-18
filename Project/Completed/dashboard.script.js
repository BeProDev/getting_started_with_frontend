function logout(){
	localStorage.removeItem('loggedInUser');
	window.location = 'file:///C:/Users/adnan/OneDrive/Desktop/getting_started_with_frontend/Project/Practice/index.html';
}

document.getElementById('user-display-name').innerText = loggedInUser.name;

const userData = JSON.parse(localStorage.getItem('userData'));
const memberListTableElem = document.getElementById('member-list-table');
if(userData){
	userData.forEach(data=> {
		memberListTableElem.append(createMemberTrElem(data))
	});
}

function createMemberTrElem(userData){
	const trElem = document.createElement('tr');
	trElem.innerHTML = `
			<td>${userData.name}</td>
			<td>${userData.username}</td>
			<td>${userData.email}</td>
	`
	return trElem;
}

const navElem = document.getElementById('nav');
window.onscroll = function scrolled(){
	if(window.pageYOffset>0){
		navElem.setAttribute('class', 'dark-nav-bg');
	}else{
		navElem.setAttribute('class', 'no-nav-bg');
	}
}