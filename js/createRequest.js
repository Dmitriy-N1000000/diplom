function createRequest(body, callback) {

	fetch('https://jscp-diplom.netoserver.ru/', {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Произошла ошибка!')
			}
			return response.json()
		})

		.then((data) => {
			callback(data);
		})

		.catch((error) => {
			console.log(error)
		});

}