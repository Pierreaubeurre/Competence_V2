

var crit=1
var comp=1
var array_id=[]
var grand_array=[]


function Liste_competence(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://0.0.0.0:8055/items/Competence?access_token="+document.cookie+"&fields=Nom,idCompetence", requestOptions)
        .then(response => response.text())
        .then(result =>{

            resp = JSON.parse(result).data;

            lecture(resp)

        }
            )
        .catch(error => console.log('error', error));
}


function lecture(resp){//lit la réponse

    resp.forEach(element => {

        var nom=element.Nom
        var id=element.idCompetence

        var petit_array=[]
        petit_array.push(nom)
        petit_array.push(id)

        grand_array.push(petit_array)

    });
}





/*
Arborescence des id:

tableau
{
    "crit"+crit{
        "table_comp"+crit{
            "comp"+comp{
                "text_comp"+comp
            }
        }
    }
}

*/

function critere(){
    
    /*

    Création des différents éléments:

    - Une ligne (newtr)
    - Trois cases (td,td2,td3)
    - Un boutons (buttonplus)
    - Deux zones de texte (zone,zone2)

    */

    var newtr = document.createElement("tr")
    var td = document.createElement("td")
    var td2 = document.createElement("td")
    var td3 = document.createElement("td")
    var buttonplus = document.createElement("input")
    var zone=document.createElement("input")
    var zone2=document.createElement("input")

    td.setAttribute("id","eval")
    td2.setAttribute("id","eval")
    td3.setAttribute("id","eval")

    var id=("crit"+crit)//id du tr correpondant au critère
    newtr.setAttribute("id",id)

    buttonplus.setAttribute("type","button")//attribut le type bouton au input vierge crée
    buttonplus.setAttribute("value","+")
    var idtable_comp= "table_comp"+crit
    buttonplus.setAttribute("onclick","plus_competence("+"'"+idtable_comp+"'"+",'"+crit+"')")

    var newbutton2 = document.createElement("input")//création du bouton
    
    newbutton2.setAttribute("type","button")//attribut le type bouton au input vierge crée
    newbutton2.setAttribute("value","-")
    newbutton2.setAttribute("onclick","delete_critere("+id+")")

    
    var table = document.getElementById("tableau")//cherche la table sur le doc

    table.appendChild(newtr)//ajoute la ligne au tableau

    //ajoute les cases à la ligne

    newtr.appendChild(td)
    newtr.appendChild(td2)
    newtr.appendChild(td3)


    var id_text_crit="text_crit"+crit
    var id_text_max="text_max"+crit
    zone.setAttribute("id",id_text_crit)
    zone2.setAttribute("id",id_text_max)

    zone.setAttribute("type","text")
    zone2.setAttribute("type","text")

    //ajoute les zone de texte aux td

    td.appendChild(zone)
    td.appendChild(newbutton2)
    td2.appendChild(zone2)

    //------crée le deuxième tableau--------

    var table_comp=document.createElement("table")
    table_comp.setAttribute("id",idtable_comp)
    var tr_comp=document.createElement("tr")
    var td_comp=document.createElement("td")
    var tr_comp2=document.createElement("tr")
    var td_comp2=document.createElement("td")

    //assemble le tableau, le met dans compétence

    td3.appendChild(table_comp)
    
    table_comp.appendChild(tr_comp)
    tr_comp.appendChild(td_comp)

    table_comp.appendChild(tr_comp2)
    tr_comp2.appendChild(td_comp2)

    var newarea =document.createElement("select")

    grand_array.forEach(competence => {

        var nom=competence[0]
        var id=competence[1]


        newarea[newarea.options.length] = new Option(nom,id)
        
    });


    var id_text_comp="id_text_comp"+comp
    newarea.setAttribute("id",id_text_comp)
    newarea.setAttribute("class",crit)//classe

    td_comp.appendChild(newarea)//ajoute la zone de texte
    td_comp2.appendChild(buttonplus)//ajoute le bouton au td_comp



    crit=crit+1
    comp=comp+1

}

function plus_competence(idtable_comp,classe){

    var newtr = document.createElement("tr")//création d'une ligne
    var id_tr_comp="tr_comp"+comp
    newtr.setAttribute("id",id_tr_comp)

    var newtd = document.createElement("td")//création d'une case

    var newarea =document.createElement("select")
    newarea.setAttribute("class",classe)//classe


    grand_array.forEach(competence => {

        var nom=competence[0]
        var id=competence[1]


        newarea[newarea.options.length] = new Option(nom,id)
        
    });

    var table_comp=document.getElementById(idtable_comp);

    table_comp.appendChild(newtr)//rajoute une ligne au tableau comp
    newtr.appendChild(newtd)//rajoute une case dans cette ligne

    newtd.appendChild(newarea)//ajoute la zone de texte


    //-----Ajout du bouton supprimer-----

    var buttonSupr= document.createElement("input")

    buttonSupr.setAttribute("type", "button")//attribut le type bouton au input vierge crée
    buttonSupr.setAttribute("value", "Supprimer")
    buttonSupr.setAttribute("onclick","delete_comp("+idtable_comp+","+id_tr_comp+")")

    newtd.appendChild(buttonSupr)

    var id_text_comp="id_text_comp"+comp
    newarea.setAttribute("id",id_text_comp)

    comp=comp+1

}


function delete_critere(delet)
{
    var tableau= document.getElementById("tableau");

    tableau.removeChild(delet);

}


function delete_comp(idtable_comp,tr_comp)
{
    idtable_comp.removeChild(tr_comp);
}





/*------------------- Partie confirmer---------------------*/


var idComp
var idCrit


function confirmer()
{

    var nom = document.getElementById("nom_eval").value//récupère le nom de l'évaluation

    recupIdRh(nom)

}

function recupIdRh(nom){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://0.0.0.0:8055/users/me?access_token=WBsjGc01lPopLDFcURmfzh_ZqN5g90vA&fields=id", requestOptions)
        .then(response => response.text())
        .then(result => {

            resp = JSON.parse(result);
            id = resp.data.id;

            ajoutEvaluation(nom,id)

        })
        .catch(error => console.log('error', error));
    
}




function ajoutEvaluation(nom,idRh){

    //-----fetch pour evaluation-----


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idRH": idRh,
        "Nom": nom
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://0.0.0.0:8055/items/Evaluation?access_token="+document.cookie, requestOptions)
        .then(response => response.text())
        .then(result =>{
                        resp = JSON.parse(result);
                        id = resp.data.idEvaluation;

                        recupCritComp(id)
                        }
                        )
        .catch(error => console.log('error', error));

}

var multiComp=[]

function recupCritComp(id){


    //Traitement permettant d'obtenir la forme demandé pour le body du fetch: un tableau remplie de JSON, un JSON par critère, contenant le nom et la note max

    var multiCrit//variable finale,elle est envoyée au fetch,version stringifier de array_Json
    var array_Json=[]//tableau contenent les JSON

    for (let pas =1 ; pas<crit; pas++){//récupère le nom du critère et la note maximale

        if (document.getElementById("crit"+pas)!=null){//vérifie si la ligne existe grâce à son id

            var critere=document.getElementById("text_crit"+pas).value
            var max=document.getElementById("text_max"+pas).value

            let petit_Json = {
                Nom: critere,
                Point_max: max,
                idEvaluation : id
            };

            array_Json.push(petit_Json)

            //récupère les id des compétences,les ranges pour utilisation avec un foreach 

            var HTMLcomp=document.getElementsByClassName(pas)

            var comp_table=[]

            for (let pas = 0 ; HTMLcomp[pas]!=null ; pas++)
                {
                    idc=HTMLcomp[pas].value

                    comp_table.push(idc)//met les ids dans un premier tableau
                }

                multiComp.push(comp_table)//les mets dans un deuxième

        }
    }
    multiCrit=JSON.stringify(array_Json)
    ajoutCritere(multiCrit,multiComp)
}



function ajoutCritere(multiCrit,multiComp){// Ajoute les critères
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = multiCrit;
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://0.0.0.0:8055/items/Critere?access_token="+document.cookie, requestOptions)
      .then(response => response.text())
      .then(result =>
        {
        resp = JSON.parse(result).data;

        JsonComp(resp,multiComp)

    })
       
      .catch(error => console.log('error', error));
      
}


function JsonComp(resp,multiComp){

    var array_Json=[]
    let pas=0

    resp.forEach(element =>{//lit la réponse pour obtenir l'id des critères ajoutés

        var id=element.idCritere;

        compsCrit=multiComp[pas]//met le tableau qui correspond à l'index "pas" dans compsCrit

        compsCrit.forEach(element=>{//lit le tableau des id des compétences qui correpondent aux critères en cours 

            let petit_Json = {//met l'id du critère et l'id de la compétence dans un JSON

                "idCritere": id,
                "idCompetence": element,
    
            };

            array_Json.push(petit_Json)

        })

        pas=pas+1
    })

    associer=JSON.stringify(array_Json)

    ajoutAssocier(associer)

}

function ajoutAssocier(associer){

    console.log(associer)

    var raw = associer;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = associer;
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://0.0.0.0:8055/items/Associer?access_token="+document.cookie, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


}


//----S'éxècute à la lecture

Liste_competence()


