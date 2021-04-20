'use strict';
const axios = require("axios");

module.exports.getUpdates = async (event) => {
    if(event.currentIntent.name === 'VaccineInfo')
    {
        const url = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/0";

        try {
            const response = await axios.get(url,{headers: {"x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
                    "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                    "useQueryString" : true}});
            const data = response.data;
            console.log(data);

            const answer = "News 1 : " + data.news[0].title + "   Link to news :  "  +  data.news[0].link +
                "  News 2: " + data.news[1].title + "   Link to news  :  "  +  data.news[1].link +
                "  News 3: " + data.news[2].title + "   Link to news  :  "  +  data.news[2].link +
                "  News 4: " + data.news[3].title + "   Link to news  :  "  +  data.news[3].link ;


            return {
                "sessionAttributes": {},
                "dialogAction": {
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": answer
                    }
                }
            };
        } catch (error) {
            console.log(error);
        }
    }
    else if (event.currentIntent.name === 'LatestNews')
    {
        const url = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world";

        try {
            const response = await axios.get(url,{headers: {"x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
                    "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                    "useQueryString" : true}});
            const data = response.data;
            console.log(data);

            const answer = "Sure!!!! Here is the latest statistics on COVID "+" Total New Confirmed cases are  " + data[0].NewCases +
                " Total Confirmed cases are " + data[0].TotalCases +
                " Total Active cases are " + data[0].ActiveCases +
                " New Deaths are  " + data[0].NewDeaths +
                " Total Deaths are " + data[0].TotalDeaths +
                " New Recovered Cases are " + data[0].NewRecovered +
                " Total Recovered cases are " + data[0].TotalRecovered +
                " Recovery Proportion is " + data[0].Recovery_Proporation +
                " Case Fatality Rate is " + data[0].Case_Fatality_Rate;

            return {
                "sessionAttributes": {},
                "dialogAction": {
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": answer
                    }
                }
            };
        } catch (error) {
            console.log(error);
        }
    }
    else if (event.currentIntent.name === 'Introduction')
    {
        var country = event.currentIntent.slots["country"];
        var answer;
        const countryCapitalized = country.charAt(0).toUpperCase() + country.slice(1)
        //var iso;
        const url = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered";
        try
        {
            const response = await axios.get(url,{headers: {"x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
                    "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                    "useQueryString" : true}});
            const data = response.data;

            for( var a in data)
            {    if ( data[a].Country === countryCapitalized)
            {
                var iso = data[a].ThreeLetterSymbol;
                const urlcountry = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/"+ countryCapitalized + "/" + iso;
                const responseCountry = await axios.get(urlcountry,{headers: {"x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
                        "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                        "useQueryString" : true}});
                const Countrydata = responseCountry.data;
                answer = "Sure!!!! Here is the latest statistics on COVID for "+ countryCapitalized +" Total Covid cases are  " + Countrydata[0].TotalCases +
                    " Total Confirmed cases are " + Countrydata[0].ActiveCases +
                    " New Deaths are  " + Countrydata[0].NewDeaths +
                    " Total Deaths are " + Countrydata[0].TotalDeaths +
                    " New Recovered Cases are " + Countrydata[0].NewRecovered +
                    " Total Recovered cases are " + Countrydata[0].TotalRecovered +
                    " Total tests " + Countrydata[0].TotalTests +
                    " Infection Risk " + Countrydata[0].Infection_Risk +
                    " Recovery Proportion " + Countrydata[0].Recovery_Proporation;

                break;
            }
            else
            {
                answer = "Please enter valid country name";
            }
            }

            return {
                "sessionAttributes": {},
                "dialogAction": {
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": answer
                    }
                }
            };
        } catch (error) {
            console.log(error);
        }
    }
};
