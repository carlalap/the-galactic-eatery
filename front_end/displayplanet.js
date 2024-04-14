function displayDishes(data) {
    // Obtener el contenedor donde se agregarán los platos
    var container = document.querySelector('.amazing-deals .container .row');

    // Recorrer los datos y generar el HTML para cada plato
    data.forEach(function(dish) {
        // Crear elementos HTML para el plato
        var item = document.createElement('div');
        item.classList.add('col-lg-6', 'col-sm-6');
        var html = `
            <div class="item">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="image">
                            <img src="assets/images/${dish._id}.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-6 align-self-center">
                        <div class="content">
                            <span class="info">*Limited Offer Today</span>
                            <h4>${dish.name}</h4>
                            <div class="row">
                                <div class="col-6">
                                    <i class="fa fa-clock"></i>
                                    <span class="planet_of_origi">${dish.planet_of_origin}</span>
                                </div>
                                <div class="col-6">
                                    <i class="fa fa-map"></i>
                                    <span class="price">${dish.price}</span>
                                </div>
                            </div>
                            <span class="description">${dish.description}</span>
                            <div class="main-button">
                                <a href="index.html">Make a Reservation</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        item.innerHTML = html;
        // Agregar el plato al contenedor
        container.appendChild(item);
    });
}
