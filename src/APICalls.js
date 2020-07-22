export const getCity = (inputCity) => {
    fetch(`https://developers.zomato.com/api/v2.1/cities?q=${inputCity}`, {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data.location_suggestions[0].id))
        .catch(error => console.log(error));
}

// export const getCategories = () => {
//     fetch('https://developers.zomato.com/api/v2.1/categories', {
//         method: 'get',
//         headers: new Headers({
//             "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
//             "content-type": "application/json"
//         }),
//     }).then(response => response.json())
//         .then(data => console.log(data));
// }
