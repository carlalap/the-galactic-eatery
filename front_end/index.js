/* this script is  event listener that triggers when the DOM content is fully loaded. 
It sets up functionality for the <- searchButton -> that fetches data from the back-end server based
on the selected planet and displays the fetched dishes on the front-end webpage. */
document.addEventListener('DOMContentLoaded', () => {
    const planetSelect = document.getElementById('planetSelect');
    const searchButton = document.getElementById('searchButton');
    const dishesContainer = document.getElementById('dishesContainer');

    searchButton.addEventListener('click', async () => {
        const planet = planetSelect.value;
        if (!planet) {
            alert('Please select a planet');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/dishes/${planet}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            displayDishes(data);
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching data');
        }
    });

    function displayDishes(dishes) {
        dishesContainer.innerHTML = '';
        if (dishes.length === 0) {
            dishesContainer.textContent = 'No dishes found for this planet';
            return;
        }

        dishes.forEach(dish => {
            const item = document.createElement('div');
            item.classList.add('item');
            
            const row = document.createElement('div');
            row.classList.add('row');
            
            const col1 = document.createElement('div');
            col1.classList.add('col-lg-3', 'col-sm-12');
            
            const image = document.createElement('div');
            image.classList.add('image');
            
            const img = document.createElement('img');
            img.src = dish.imageURL; // replace wiht ${dish._id}
            img.alt = '';            
            image.appendChild(img);
            col1.appendChild(image);
            
            const col2 = document.createElement('div');
            col2.classList.add('col-lg-6', 'align-self-center');
            
            const content = document.createElement('div');
            content.classList.add('content');
            
            const info = document.createElement('span');
            info.classList.add('info');
            info.textContent = '*Limited Offer Today';
            
            const h4 = document.createElement('h4');
            h4.textContent = dish.name;
            
            const row2 = document.createElement('div');
            row2.classList.add('row');
            
            const col3 = document.createElement('div');
            col3.classList.add('col-6');
            
            const i1 = document.createElement('i');
            i1.classList.add('fa', 'fa-globe');
            
            const planet_of_origi = document.createElement('span');
            planet_of_origi.classList.add('planet_of_origi');
            planet_of_origi.textContent = dish.planet_of_origin;
            
            col3.appendChild(i1);
            col3.appendChild(planet_of_origi);
            
            const col4 = document.createElement('div');
            col4.classList.add('col-6');
            
            const i2 = document.createElement('i');
            i2.classList.add('fa', 'fa-money');
            
            const price = document.createElement('span');
            price.classList.add('price');
            price.textContent = dish.price;
            
            col4.appendChild(i2);
            col4.appendChild(price);
            
            row2.appendChild(col3);
            row2.appendChild(col4);
            
            const description = document.createElement('span');
            description.classList.add('description');
            description.textContent = dish.description;
            description.style.marginBottom= '2px';
            
            const mainButton = document.createElement('div');
            mainButton.classList.add('main-button');
            mainButton.style.marginBottom = '2px';
            
            const reservationLink = document.createElement('a');
            reservationLink.href = '#';
            reservationLink.textContent = 'Make a Reservation';
            
            mainButton.appendChild(reservationLink);
            
            content.appendChild(info);
            content.appendChild(h4);
            content.appendChild(row2);
            content.appendChild(description);
            content.appendChild(mainButton);
            
            col2.appendChild(content);
            
            row.appendChild(col1);
            row.appendChild(col2);
            
            item.appendChild(row);
            
            dishesContainer.appendChild(item);
        });
    }
});
