const mainRoute = "http://127.0.0.1:8000";



export function verifyNumber(numero){
    const url =  mainRoute+ '/rest/verify-number/'+ numero;

    return fetch(url).then((response) => response.json()).catch((error)=>
    console.error(error)
    )
}

export function verifyEmail(email){
    const url =  mainRoute+ '/rest/verify-email/'+ email;

    return fetch(url).then((response) => response.json()).catch((error)=>
    console.error(error)
    )
}

export function resetPass(email,code){
    const url =  mainRoute+ '/rest/reset-pass/'+ email+'/'+code;

    return fetch(url).then((response) => response.json()).catch((error)=>
    console.error(error)
    )
}


export function resetPassDone(email,code){
    const url =  mainRoute+ '/rest/reset-pass-done/'+ email+'/'+code;

    return fetch(url).then((response) => response.json()).catch((error)=>
    console.error(error)
    )
}

export function signUp(nom,email,numero,password){
    const url = mainRoute+ '/rest/sign-up';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, nom: nom, numero: numero })
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error)=>
       console.error(error));

}



export function signIn(email,password){
    const url = mainRoute+ '/rest/sign-in';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, mot_de_passe: password,})
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error)=>
       console.error(error));

}

