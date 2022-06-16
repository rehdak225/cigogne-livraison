const mainRoute = "http://127.0.0.1:8000";



export function getAgence(id){
    const url =  mainRoute+ '/rest/get-agence/'+ id;

    return fetch(url).then((response) => response.json()).catch((error)=>
    console.error(error)
    )
}
