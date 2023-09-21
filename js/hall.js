let selectedSeance = JSON.parse(sessionStorage.session);
let updateRequest = `event=get_hallConfig&timestamp=${selectedSeance.timestamp}&hallId=${selectedSeance.hallId}&seanceId=${selectedSeance.seanceId}`;

let buyingInfoTitle = document.querySelector('.buying__info-title');
let buyingInfoStart = document.querySelector('.buying__info-start');
let buyingInfoHall = document.querySelector('.buying__info-hall');
let priceStandart = document.querySelector('.price-standart');
let priceVip = document.querySelector('.price-vip');

buyingInfoTitle.innerHTML = selectedSeance.filmName;
buyingInfoStart.innerHTML = `Начало сеанса ${selectedSeance.seanceTime}`;
buyingInfoHall.innerHTML = selectedSeance.hallName.split('Зал').join('Зал ');
priceStandart.innerHTML = selectedSeance.priceStandart;
priceVip.innerHTML = selectedSeance.priceVip;

let configHall = document.querySelector('.conf-step__wrapper');
let buttonAcception = document.querySelector('.acceptin-button');
buttonAcception.setAttribute('disabled', true)

createRequest(updateRequest, (response) => {
	if (response) {
		selectedSeance.hallConfig = response;
	}
	configHall.innerHTML = selectedSeance.hallConfig;


	let chairs = document.querySelectorAll('.conf-step__chair');
	chairs.forEach(el => {
		el.addEventListener('click', (event) => {
			// event.preventDefault();
			let target = event.target;
			// console.log(target)
			if (target.closest('.conf-step__legend-price') || target.classList.contains('conf-step__chair_taken') || target.classList.contains('conf-step__chair_disabled')) {
				return
			} else {
				target.classList.toggle('conf-step__chair_selected');
				checkButton();
			}
		})
	})

	function checkButton() {
		let selectedChairs = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
		if (selectedChairs.length > 0) {
			buttonAcception.removeAttribute('disabled')
		} else {
			buttonAcception.setAttribute('disabled', true)
		}
	}

	buttonAcception.addEventListener('click', () => {
		let selectedChairs = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
		let selectedFeature = [];
		selectedChairs.forEach((chair) => {
			let row = chair.closest('.conf-step__row');
			let rowIndex = Array.from(row.parentNode.children).indexOf(row) + 1;
			let chairIndex = Array.from(row.children).indexOf(chair) + 1;
			let chairType = (chair.classList.contains('conf-step__chair_standart')) ? 'standart' : 'vip';
			selectedFeature.push({
				row: rowIndex,
				place: chairIndex,
				type: chairType
			});
		});

		selectedSeance.hallConfig = configHall.innerHTML;
		selectedSeance.selectedPlaces = selectedFeature;
		sessionStorage.setItem('session', JSON.stringify(selectedSeance));
		window.location.href = 'payment.html';
	});
})
let zoomBuying = document.querySelector('.buying');
zoomBuying.addEventListener('dblclick', ()=>{
	zoomBuying.classList.toggle('zooming');
	if (zoomBuying.classList.contains('zooming')){
		zoomBuying.style.transform = "scale(1.5) translate(0%, 10%)"
	} else{
		zoomBuying.style.transform = "scale(1)"
	}
})