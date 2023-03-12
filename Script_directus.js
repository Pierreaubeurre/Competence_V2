// Script pour remettre en place le projet diretus rapidement et de manière précise. A lancer après la création du projet directus à partir du SQL


//Création des utilisateurs
function utilisateur()
{
    var tokenAdmin="hTC68ROOBNITP4sD3CyS_YzM9UIEnM4j"

    var idBastien="206046e9-42aa-4bc4-89ac-bbcc00da5a92"
    var idGaetan="3d238e91-4774-47aa-86ba-ff745d401400"
    var idTibo="92ce0479-178d-4def-8cbe-97a28f363f26"
    var idFitz="3aca1622-3cc3-4e4d-a44e-6f4576206257"
    var idFlament="e0ed1fb7-c31b-42b1-8eea-ecac7628b4b6"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify([
      {
        "first_name": "Bastien",
        "id": idBastien,
        "email": "Bastien@test.fr",
        "password": "Bastien",
        "status": "active"
      },
      {
        "first_name": "Gaëtan",
        "id": idGaetan,
        "email": "Gaetan@test.fr",
        "password": "Gaetan",
        "status": "active"
      },
      {
        "first_name": "Tibo",
        "id": idTibo,
        "email": "Tibo@test.fr",
        "password": "Tibo",
        "status": "active"
      },
      {
        "first_name": "Fitz",
        "id": idFitz,
        "email": "Fitz@test.fr",
        "password": "Fitz",
        "status": "active"
      },
      {
        "first_name": "Flament",
        "id": idFlament,
        "email": "Flament@test.fr",
        "password": "Flament",
        "status": "active"
      }
    ]);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://0.0.0.0:8055/users?access_token="+tokenAdmin, requestOptions)
      .then(response => response.text())
      .then(result => {

        console.log(result);
        role(tokenAdmin,idGaetan,idBastien,idTibo,idFitz,idFlament);

    })
      .catch(error => console.log('error', error));

}


//Création des rôles
function role(tokenAdmin,idGaetan,idBastien,idTibo,idFitz,idFlament)
{
    var idCollaborateur="30596a0d-25e2-4de6-b461-4c6d1748b9f2"
    var idRh="bdacbb31-bd6c-4911-b01b-9027d931c7b7"


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify([
      {
        "id": idCollaborateur,
        "name": "Collaborateur",
        "users": [
          idGaetan,
          idBastien,
          idTibo
        ]
      },
      {
        "id": idRh,
        "name": "Rh",
        "users": [
          idFitz,
          idFlament
        ]
      }
    ]);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://0.0.0.0:8055/roles?access_token="+tokenAdmin, requestOptions)
      .then(response => response.text())
      .then(result => {

        console.log(result);
        permission(tokenAdmin,idCollaborateur,idRh);

    })
      .catch(error => console.log('error', error));
}


//Création des permissions des rôles
function permission(tokenAdmin,idCollaborateur,idRh)
{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
  {
    //Partie collaborateur


    ////"id": 25,
    "role": idCollaborateur,
    "collection": "RH",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 26,
    "role": idCollaborateur,
    "collection": "Passer",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 27,
    "role": idCollaborateur,
    "collection": "Groupe_Competence",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 28,
    "role": idCollaborateur,
    "collection": "Evaluation",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 29,
    "role": idCollaborateur,
    "collection": "Critere",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 30,
    "role": idCollaborateur,
    "collection": "Competence",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 31,
    "role": idCollaborateur,
    "collection": "Collaborateur",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    ////"id": 32,
    "role": idCollaborateur,
    "collection": "Bloc",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 33,
    "role": idCollaborateur,
    "collection": "Associer",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },

    //Partie RH


  {
    //"id": 58,
    "role": idRh,
    "collection": "Associer",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 59,
    "role": idRh,
    "collection": "Bloc",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 60,
    "role": idRh,
    "collection": "Bloc",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 61,
    "role": idRh,
    "collection": "Associer",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 62,
    "role": idRh,
    "collection": "Associer",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 63,
    "role": idRh,
    "collection": "Bloc",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 64,
    "role": idRh,
    "collection": "Collaborateur",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 65,
    "role": idRh,
    "collection": "Competence",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 66,
    "role": idRh,
    "collection": "Collaborateur",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 67,
    "role": idRh,
    "collection": "Competence",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 68,
    "role": idRh,
    "collection": "Competence",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 69,
    "role": idRh,
    "collection": "Collaborateur",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 70,
    "role": idRh,
    "collection": "Critere",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 71,
    "role": idRh,
    "collection": "Evaluation",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 72,
    "role": idRh,
    "collection": "Evaluation",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 73,
    "role": idRh,
    "collection": "Evaluation",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 74,
    "role": idRh,
    "collection": "Critere",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 75,
    "role": idRh,
    "collection": "Critere",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 76,
    "role": idRh,
    "collection": "Groupe_Competence",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 77,
    "role": idRh,
    "collection": "Groupe_Competence",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 78,
    "role": idRh,
    "collection": "Passer",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 79,
    "role": idRh,
    "collection": "Passer",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 80,
    "role": idRh,
    "collection": "Passer",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 81,
    "role": idRh,
    "collection": "RH",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 82,
    "role": idRh,
    "collection": "Groupe_Competence",
    "action": "update",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 83,
    "role": idRh,
    "collection": "RH",
    "action": "read",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  },
  {
    //"id": 84,
    "role": idRh,
    "collection": "RH",
    "action": "create",
    "permissions": {},
    "validation": {},
    "presets": null,
    "fields": [
      "*"
    ]
  }
]);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://0.0.0.0:8055/permissions?access_token="+tokenAdmin, requestOptions)
  .then(response => response.text())
  .then(result => console.log("ça marche"))
  .catch(error => console.log('error', error));
}



utilisateur()