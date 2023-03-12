function menu(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      
      fetch("http://0.0.0.0:8055/users/me?access_token="+document.cookie+"&fields=role", requestOptions)//Vérifie le rôle de l'utilisateur connecté
        .then(response => response.text())
        .then(result => {
            
            resp = JSON.parse(result);

            role = resp.data.role;

            accueil(role);

        })
        .catch(error => console.log('error', error));

}

function accueil(role){

    if (role == "bdacbb31-bd6c-4911-b01b-9027d931c7b7"){//RH
        
        document.location.href="../Choix_Rh/choix_RH";

    }
    else if (role == "30596a0d-25e2-4de6-b461-4c6d1748b9f2"){//Eleve

        document.location.href="../Choix_Eleve/choix_Eleve";

    }
}

function refresh(){
    
}