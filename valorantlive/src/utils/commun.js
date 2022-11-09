export default function linkGenerator(url){
    let Element = (url).replaceAll('-', '')
    Element = Element.charAt(0).toUpperCase() + Element.slice(1)
    console.log(Element);
    return Element
}
export {linkGenerator}