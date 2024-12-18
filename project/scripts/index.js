const searchButton = document.getElementById('btnFind');
const inputField = document.getElementById('inputPlace');

const seoText = document.getElementById('seoText');
const mainPart = document.getElementById('mainPart');
const notFoundDialog = document.getElementById('notFoundDialog');

function hideAllSections() {
	seoText.style.display = 'none';
	mainPart.style.display = 'none';
	notFoundDialog.style.display = 'none';
}

function showSection(sectionId) {
	hideAllSections();
	const section = document.getElementById(sectionId);
	if (section) {
		section.style.display = 'flex';
	}
}

// Функция для поиска отелей по региону
async function searchHotels(region) {
	try {
	  	// Выполняем запрос на сервер для поиска отелей по введенному региону
	  	const response = await fetch(`http://localhost:3000/search?region=${encodeURIComponent(region)}`);
	  
	  	// Проверка успешности запроса
	  	if (!response.ok) {
			throw new Error('Ошибка при выполнении запроса');
	  	}
  
	  	const hotels = await response.json();
	  
	  	if (hotels.length > 0) {
			showSection('mainPart');
			renderHotels(hotels);
		} else {
			showSection('notFoundDialog')
		}
	} catch (error) {
		console.error('Ошибка при поиске отелей:', error);
		showSection('notFoundDialog');
	}
}

function renderHotels(hotels) {
	mainPart.innerHTML = '';

	const divHotelForYou = document.createElement('div');
	divHotelForYou.className = "hotels_for_you";
	mainPart.appendChild(divHotelForYou);

	const p1 = document.createElement('p');
	p1.textContent = "Отели для вас";
	divHotelForYou.appendChild(p1);

	hotels.forEach(hotel => {
		const foundHotelSection = document.createElement('section');
		foundHotelSection.className = "found_hotel_section";

		foundHotelSection.innerHTML = `
			<p class="hotel_name">${hotel.name}</p>
			<p class="hotel_addres">${hotel.adress}</p>
			<a href="${hotel.web}" target="_blank"><p>Ссылка на сайт</p></a>
			<p class="hotel_description">${hotel.description}</p>
		`;

		mainPart.appendChild(foundHotelSection);
	});
}

searchButton.addEventListener('click', () => {
	const region = inputField.value.trim(); // Получаем значение из поля ввода и удаляем лишние пробелы
  
	if (region) {
	  	searchHotels(region);
	} else {
	  	console.log('Введите регион для поиска');
	}
});

inputField.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		const region = inputField.value.trim();

        if (region) {
			searchHotels(region);
		} else {
			console.log('Введите регион для поиска');
		}
	}
});

showSection('seoText');