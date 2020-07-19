import React from "react";
import ReactDOM from 'react-dom';

const App = () => {
    fetch('https://developers.zomato.com/api/v2.1/categories', {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    }).then(response => response.json())
        .then(data => console.log(data));
    return (
        <div>
            Hello
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
