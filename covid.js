let covid19data;


(function onload(){
    setButtonFunctions();

    getCovidData();
})();

function setButtonFunctions(){
    document.getElementById("selectCountries").onchange = function(){
        const selectedValue = document.getElementById("selectCountries").value;
        const countryData = covid19data.filter(c => c.country === selectedValue)[0];

        const newConfirmed = document.getElementById('newConfirmed');
        const totalConfirmed = document.getElementById('totalConfirmed');
        const covidNewDeaths = document.getElementById('newDeaths');
        const covidTotalDeaths = document.getElementById('totalDeaths');
        const lastUpdated = document.getElementById('lastUpdated');

        (countryData.cases.new) ? newConfirmed.innerHTML = 'New confirmed cases: ' + countryData.cases.new: newConfirmed.innerHTML = 'New confirmed cases: 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = 'Total confirmed cases: ' + countryData.cases.total : totalConfirmed.innerHTML = 'Total confirmed cases: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = 'New deaths: ' + countryData.deaths.new : covidNewDeaths.innerHTML = 'New deaths: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = 'Total deaths: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = 'Total deaths: 0';
        lastUpdated.innerHTML = 'Last updated: ' + countryData.day;
    };
}

// COVID 19 Data
async function getCovidData() {
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "1f6aba5149msha00241a4cbf041fp12ab4ajsn0544aef4b5de"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log("COVID 19 API object:");
            console.log(response);
            console.log("\n");

            // add all countries to select element
            response.response.forEach(c => {
                const option = document.createElement('option');
                option.innerHTML = c.country;
                document.getElementById('selectCountries').appendChild(option);
            })

            // save covid data to global variable
            covid19data = response.response;
        })
        .catch(err => {
            console.log(err);
        });
}
