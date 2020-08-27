export const getCity = async (inputCity) => {
    try {
        // GET Request, ktory vrati zadaneho mesta (ak existuje)
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
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getRestaurants = async (cityId, start) => {
    try {
        // GET Request, ktory vrati 20 restauracii v danom meste od hodnoty cisla ulozeneho v start
        const response = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&start=${start}&count=100`, {
            method: 'get',
            headers: new Headers({
                "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
                "content-type": "application/json"
            }),
        });

        const data = await response.json()
        // prefiltruje vyhladane restauracie a vrati len tie, ktore maju featured_image
        return data.restaurants.filter((res) => res.restaurant.featured_image !== "");
    } catch (error){
        console.log(error);
        return null; // ak sa nenajdu restauracie, tak vrati null
    }
}

export const getRestaurantDetail = async (restaurantId) => {
    try {
        // GET Request vrati podrobne informacie o restauracii, ktoru vyhlada podla jej id
        const response = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantId}`, {
            method: 'get',
            headers: new Headers({
                "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
                "content-type": "application/json"
            }),
        });

        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}
