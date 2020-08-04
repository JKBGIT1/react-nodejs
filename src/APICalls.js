export const getCity = async (inputCity) => {
    const response = await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${inputCity}`, {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    });

    const data = await response.json();

    if (data.location_suggestions.length !== 0) // ak sa najde mesto, ktore chcel pouzivatel vyhladat, tak funkcia vrati jeho id
        return data.location_suggestions[0].id; // vrati Id mesta, ktore som chcel vyhladat
    else // ked sa data o meste nenajdu, tak vrati null
        return null;
}

export const getRestaurants = async (cityId, start) => {
    const response = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&start=${start}&count=100`, {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    });

    const data = await response.json()
    return data.restaurants.filter((res) => res.restaurant.featured_image !== ""); // vrati len restauracie, ktore maju featured_image
}

export const getRestaurantDetail = async (restaurantId) => {
    const response = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantId}`, {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    });

    return response.json();
}
