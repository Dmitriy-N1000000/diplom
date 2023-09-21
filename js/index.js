let dayNumbers = document.querySelectorAll('.page-nav__day-number');
let daysWeek = document.querySelectorAll('.page-nav__day-week');
let dayWeekList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let today = new Date();
let todayStartDay = today.setHours(0, 0, 0, 0);

for (let i = 0; i < dayNumbers.length; i++) {
	let dayNow = new Date(todayStartDay + (i * (24 * 60 * 60 * 1000)));
	dayNumbers[i].textContent = `${dayNow.getDate()}`
	dayNumbers[i].parentNode.dataset.timestamp = todayStartDay + (i * (24 * 60 * 60 * 1000));
	daysWeek[i].textContent = `${dayWeekList[dayNow.getDay()]}`

	if ((daysWeek[i].textContent === 'Вс') || (daysWeek[i].textContent === 'Сб')) {
		dayNumbers[i].parentNode.classList.add('page-nav__day_weekend');
	} else {
		dayNumbers[i].parentNode.classList.remove('page-nav__day_weekend');
	}
}

let navBtns = document.querySelectorAll('.page-nav__day');
navBtns.forEach(el => {
	el.addEventListener('click', () => {
		navBtns.forEach(e => {
			e.classList.remove('page-nav__day_chosen');
		})
		el.classList.add('page-nav__day_chosen');
		createRequest(updateRequest, hallConfig);
	})
})

let main = document.querySelector("main");
let updateRequest = 'event=update';
createRequest(updateRequest, hallConfig);


function hallConfig(response) {
	main.innerHTML = '';
	let arr = {};
	arr.seances = response.seances.result;
	arr.films = response.films.result;
	arr.halls = response.halls.result;
	arr.halls = arr.halls.filter((hall) => hall.hall_open == 1);

	arr.films.forEach(film => {
		let addHtml =
			`<section class="movie">
				<div class="movie__info">
					<div class="movie__poster">
						<img class="movie__poster-image" src="${film.film_poster}">
					</div>
					  <div class="movie__description">
						<h2 class="movie__title">${film.film_name}</h2>
						<p class="movie__synopsis">${film.film_description}</p>
						<p class="movie__data">
						  <span class="movie__data-duration">${film.film_duration} мин</span>
						  <span class="movie__data-origin">${film.film_origin}</span>
						</p>
					  </div>
					</div>`;

		arr.halls.forEach((hall) => {
			let seances = arr.seances.filter(seance => ((seance.seance_hallid === hall.hall_id) && (seance.seance_filmid === film.film_id)));
			if (seances.length > 0) {
				addHtml +=
					`<div class="movie-seances__hall">
					  <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
						<ul class="movie-seances__list">`;
				seances.forEach(seance =>

					addHtml +=
					`<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html"
					data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}"
					data-hall-name="${hall.hall_name}" data-price-standart="${hall.hall_price_standart}" 
					data-price-vip="${hall.hall_price_vip}" data-seance-id="${seance.seance_id}"
					data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">
					${seance.seance_time}</a></li>`
				);

				addHtml +=
					`</ul>
					</div>`
			};
		});
		addHtml +=
			`</section>`;
		main.insertAdjacentHTML("beforeend", addHtml);
	})

	let chosenSeances = document.querySelectorAll('.movie-seances__time');
	let chosenDay = document.querySelector('.page-nav__day_chosen');
	let chosenDayTimestamp = chosenDay.dataset.timestamp;

	chosenSeances.forEach(el => {
		let seanseTimestamp = +chosenDayTimestamp + (+el.dataset.seanceStart * 60 * 1000);
		let now = new Date().getTime();

		if (seanseTimestamp < now) {
			el.style.background = 'grey';
		}
		el.addEventListener('click', (event) => {

			let target = event.target;
			if (seanseTimestamp < now) {
				event.preventDefault();
			} else {
				let selectedSeance = target.dataset;
				selectedSeance.timestamp = Math.floor(seanseTimestamp / 1000);

				selectedSeance.hallConfig = arr.halls.find(hall => hall.hall_id == selectedSeance.hallId).hall_config;
				sessionStorage.setItem('session', JSON.stringify(selectedSeance));
			}
		})
	})
}