let selectedSeance = JSON.parse(sessionStorage.session);

fetch("https://jscp-diplom.netoserver.ru/", {
	method: "POST",
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: `event=sale_add&timestamp=${selectedSeance.timestamp}&hallId=${selectedSeance.hallId}&seanceId=${selectedSeance.seanceId}&hallConfiguration=${selectedSeance.hallConfig}`
});

let ticketTitle = document.querySelector('.ticket__title')
let ticketChairs = document.querySelector('.ticket__chairs');
let ticketHall = document.querySelector('.ticket__hall');
let ticketStart = document.querySelector('.ticket__start');

let date = new Date(selectedSeance.timestamp * 1000);
let dateString = date.toLocaleString().slice(0, -3)

ticketTitle.innerHTML = selectedSeance.filmName;
let hallName = selectedSeance.hallName.split('Зал').join('');
ticketHall.innerHTML = hallName;
ticketStart.innerHTML = dateString;


let ticketChairsArr = [];
let cost = 0;
let arr = selectedSeance.selectedPlaces;
for (let i = 0; i < arr.length; i++) {
	ticketChairsArr.push(`${arr[i].row}/${arr[i].place}`);
}
ticketChairs.textContent = ticketChairsArr.join(', ')

let qrContent = `Билет в кино
На сеанс: "${selectedSeance.filmName}"
Начало сеанса: ${dateString}
Зал: ${hallName}
Ряд/Место: ${ticketChairs.textContent}
`;

let qr = document.getElementById('qrcode');
qr.append(QRCreator(qrContent).result);
qr.querySelector('canvas').style.display = 'block';
qr.querySelector('canvas').style.margin = '0 auto';