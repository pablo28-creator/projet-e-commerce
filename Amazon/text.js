function afficherDivAvecNomEtPrixNounours(nounours) {        // fonction pour afficher les infos des nounours sur la homepage.
  const names =  document.getElementById("cards");

  for (let elem of nounours) {                                // boucle pour chaque nounours on crée des élément ou on rentre les infos récupéré.
    let division = document.createElement("div");
    division.classList.add("col-12","col-lg-4", "col-md-6", "product");
    names.appendChild(division);

    let pic = document.createElement("img");
    pic.setAttribute("src", elem.imageUrl);
    pic.alt = `Photo de ${elem.name} un ours en peluche mis en vente`;
    pic.classList.add("border","border-dark","border-bottom-0");
    division.appendChild(pic);

    let para = document.createElement("p");
    para.classList.add("py-3","border","border-dark","border-top-0", "couleurBg");
    para.innerHTML = `Nom : ${elem.name} </br> </br> Prix : ${elem.price/100}€ </br></br>`;
    division.appendChild(para);

    let link = document.createElement("a");
    link.classList.add("btn" ,"px-5", "py-1", "my-2");
    link.href = `produits.html?id=${elem._id}`;                    // on crée des url on fonction de l'id du nounours.
    link.innerHTML = "Voir plus";
    para.appendChild(link);
  }
}
async function fillProducts() {                                   // fonction fetch pour  récupérer  les infos sur les nounours sur le serveur.
  await fetch('http://localhost:3000/api/teddies') 
    .then((response) => response.json())
    .catch(alert)  
    .then((nounours) => afficherDivAvecNomEtPrixNounours(nounours));   
};
fillProducts();













