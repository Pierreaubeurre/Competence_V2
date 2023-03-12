function ident(){
    var email=document.getElementById("email").value //Récupération des valeurs 
    var mdp=document.getElementById("mdp").value

    //Requête
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "password": mdp,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var token = '';

    fetch("http://0.0.0.0:8055/auth/login", requestOptions)
        .then(response => response.text())
        .then(result => {

            resp = JSON.parse(result);

            token = resp.data.access_token;

            information(token);

        })
        .catch(error => alert ("Votre mail et/ou votre mot de passe n'existe pas"));

}

function information(token){//récupère le rôle de l'utilisateur ainsi que son nom

    document.cookie = token +"; path=/; ;max-age=1800; SameSite=Strict";//met le token dans un cookie pour l'utiliser dans les prochaines pages


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://0.0.0.0:8055/users/me?access_token="+token+"&fields=role,first_name", requestOptions)
        .then(response => response.text())
        .then(result => {

            resp = JSON.parse(result);

            role = resp.data.role;
            nom = resp.data.first_name;// à mettre en cookie pour plus tard

            accueil(role);

        })
        .catch(error => console.log('error', error));

}



function accueil(role){

    if (role == "bdacbb31-bd6c-4911-b01b-9027d931c7b7"){//RH
        
        document.location.href="../Rh/Choix_Rh/choix_RH";

    }
    else if (role == "30596a0d-25e2-4de6-b461-4c6d1748b9f2"){//Eleve


        document.location.href="../Collaborateur/Choix_Eleve/choix_Eleve";

    }
}




