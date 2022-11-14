import axios from "axios";


export default function linkGenerator(url){
    let Element = (url).replaceAll('-', '')
    Element = Element.charAt(0).toUpperCase() + Element.slice(1)
    return Element
}
export function withoutHyphen(string,game){
    let Element = (string).replaceAll('-', ' ')
    Element= (Element).replace(game,'')
    Element = Element.charAt(1).toUpperCase() + Element.slice(2)
    console.log(Element);
    return Element
}

export function rawToEmbeddedUrl(string){
    if(string.includes('twitch')){
        string = string.slice(22)
        string = 'https://player.twitch.tv/?channel=' + string + '&parent=localhost&muted=true'
    }else{
        string = string.slice(24)
        string = 'https://www.youtube.com/embed/live_stream?channel=' + string
    }
    return string

}
export function matchingGame(title){
    let matchedArray = {
        "starcraft-brood-war" : "starcraft-brood-war",
        "starcraft-2" : "starcraft-2",
        "lol-wild-riftt" : "lol-wild-rift",
        "kog" : "kog",
        "valorant" : "valorant",
        "fifa" : "fifa",
        "r6-siege" : "r6siege",
        "cod-mw" : "codmw",
        "rl" : "rl",
        "pubg" : "pubg",
        "ow" : "ow",
        "dota-2" : "dota2",
        "league-of-legends" : "lol",
        "cs-go" : "csgo",
    }
    for(const [key, value] of Object.entries(matchedArray))
    {
        if(key === title) title = value
    }
    return title
}
export function sortByTournament(data){
    let historicOfTournament = []
    console.log(data);
    for(let i in data)
    {
        if(!historicOfTournament.includes((data[i].tournament.slug || data[i].tournament.name) )){
            historicOfTournament.push((data[i].tournament.slug || data[i].tournament.name ))
        }
    }
    return historicOfTournament
}
export async function fetchData(options ,setter){
    await axios.request(options).then(function (response) {
          setter(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
export async function fetchDataByFour(options ,setter){
    await axios.request(options).then(function (response) {
        const dataByFour = (response.data).reduce(function (dataByFour, key, index) { 
            return (index % 4 === 0 ? dataByFour.push([key]) 
              : dataByFour[dataByFour.length-1].push(key)) && dataByFour;
          }, []);
          setter(dataByFour);
    }).catch(function (error) {
        console.error(error);
    });
}

export {linkGenerator}