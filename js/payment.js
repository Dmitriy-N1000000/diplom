let selectedSeance = JSON.parse(sessionStorage.session);

let ticketTitle = document.querySelector('.ticket__title')
let ticketChairs = document.querySelector('.ticket__chairs');
let ticketHall = document.querySelector('.ticket__hall');
let ticketStart = document.querySelector('.ticket__start');
let ticketCost = document.querySelector('.ticket__cost');
let buttonAcception = document.querySelector('.acceptin-button');

let date = new Date(selectedSeance.timestamp * 1000);
let dateString = date.toLocaleString().slice(0, -3)

ticketTitle.innerHTML = selectedSeance.filmName;
ticketHall.innerHTML = selectedSeance.hallName.split('Зал').join('');
ticketStart.innerHTML = dateString;


let ticketChairsArr = [];
let cost = 0;
let arr = selectedSeance.selectedPlaces;
for (let i = 0; i < arr.length; i++) {
	ticketChairsArr.push(`${arr[i].row}/${arr[i].place}`);
	if (arr[i].type === 'standart') {
		cost += +selectedSeance.priceStandart;
	} else {
		cost += +selectedSeance.priceVip;
	}
}
ticketChairs.textContent = ticketChairsArr.join(', ')
ticketCost.textContent = cost;