const serverApi = 'https://smart-mirror2.000webhostapp.com/sendMail.php';

class OrdeApi {
    static sendMail(data, basket) {
        console.log("DATA", data);
        console.log("BASKET", basket);

        return fetch(serverApi, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "content-type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(Object.assign(data, {"basket": basket}))
        });
    }

}

export default OrdeApi;