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
/*
**  ITA PLAYOFF & REGULAR in tournament IDS !==
**  
*/
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
export {linkGenerator}