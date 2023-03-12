function modifier(){
    
}

function nouv(){
    document.location.href="../Nouv_evaluation/Nouv_evaluation.html"
}


function creation(Nom,idEvaluation,idRH){

    var newtr = document.createElement("tr")//création d'une nouvelle ligne
    var td = document.createElement("td")//création de le première case
    var td2 = document.createElement("td")//création de la deuxième case
    var td3 = document.createElement("td")//création de la troisième case
    var td4 = document.createElement("td")//création de la quatrième case

    td.setAttribute("id","eval")
    td2.setAttribute("id","eval")
    td3.setAttribute("id","eval")
    td4.setAttribute("id","eval")


    var newbutton = document.createElement("input")//création du bouton
    newbutton.setAttribute("type", "button")//attribut le type bouton au input vierge crée
    newbutton.setAttribute("value", "+")

    var table = document.getElementById("tableau")//cherche la table sur le doc

    table.appendChild(newtr)//ajoute la ligne au tableau

    //ajoute les cases à la ligne
    newtr.appendChild(td)
    newtr.appendChild(td2)
    newtr.appendChild(td3)
    newtr.appendChild(td4)


    var text_td = document.createTextNode(Nom)//crée le texte du td...
    td.appendChild(text_td)//... et l'ajoute

    var text_td2 = document.createTextNode(idEvaluation)
    td2.appendChild(text_td2)

    var text_td3 = document.createTextNode(idRH)
    td3.appendChild(text_td3)


    td4.appendChild(newbutton)//ajoute le bouton au td
}



function lecture(resp){//lit la réponse

    resp.forEach(element => {

        var Nom =element.Nom
        var idEvaluation= element.idEvaluation
        var idRH= element.idRH

        creation(Nom,idEvaluation,idRH)

    });
}



function recuperation(){//récupère les informations de évaluation sous la forme d'un tableau

    var lien ="http://0.0.0.0:8055/items/Evaluation?access_token="+document.cookie //problème de récupération du cookie

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(lien, requestOptions)
        .then(response => response.text())
        .then(result => {


            resp = JSON.parse(result).data;

            lecture(resp);

        }
        )

        .catch(error => console.log('error', error));
}






// Executé au chargement de la page



recuperation()

