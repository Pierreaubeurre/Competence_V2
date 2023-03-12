function menu() {
  document.location.href = "../Choix_Eleve/choix_Eleve"
}

function idUt() {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://0.0.0.0:8055/users/me?access_token=" + document.cookie + "&fields=id", requestOptions)
    .then(response => response.text())
    .then(result => {

      resp = JSON.parse(result).data.id;

      //console.log(resp);

      passer(resp);
    }
    )
    .catch(error => console.log('error', error));

}

function passer(idUtilisateur) {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://0.0.0.0:8055/items/Passer?access_token=LgBBrR6ALrc623KbFD7n5vGwH9o1ala3&filter[idCollaborateur][_eq]=" + idUtilisateur + "&fields=idCritere,Note", requestOptions)
    .then(response => response.text())
    .then(result => {

      resp = JSON.parse(result).data;

      console.log(resp);

      recup(resp)

    })
    .catch(error => console.log('error', error));

}

function recup(Json) {

  let requete=""

  Json.forEach(element => {

    let idCritere = element.idCritere
    let Note = element.Note

    requete=requete+idCritere
    //console.log("idCritere= "+idCritere,"Note= "+Note)

  });

  console.log(requete)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://0.0.0.0:8055/items/Critere?access_token=LgBBrR6ALrc623KbFD7n5vGwH9o1ala3&fields=idEvaluation&filter[idCritere][_in]=1,3", requestOptions)
    .then(response => response.text())
    //.then(result => console.log(result))
    .catch(error => console.log('error', error));

}