const queryString = window.location.search.replace( /^\D+/g, '');    // on récupère l'id de l'ours dans l'url de la page.

function afficherTeddy (teddy){                                       // fonction pour créer des éléments ou on y affiche les infos récupérés avec l'api.
  const teddyName = document.getElementById("presentation");
  
  function createlement (element, classe, secondeClasse, lastClasse, parent, text){          // on a une fonction générale pour créer des éléments sur la page.
    let info = document.createElement(element);
    info.classList.add(classe , secondeClasse, lastClasse);
    info.innerHTML = text;
    parent.appendChild(info);
  }
  let divPresentation = document.createElement("div");
  divPresentation.classList.add("col-12", "col-lg-6" );
  teddyName.appendChild(divPresentation);

  let photo = document.createElement("img");
  photo.setAttribute("src", teddy.imageUrl);
  photo.alt = "Photo d'ours en peluche mis en vente";
  photo.classList.add("photo","border","border-dark","border-bottom-0");
  divPresentation.appendChild(photo);

  createlement("h2",...["border", "border-dark","border-top-0",], divPresentation, teddy.name)

  let divInformation = document.createElement("div");
  divInformation.classList.add("col-12","col-xl-6");
  teddyName.appendChild(divInformation);

  let divBorder = document.createElement("div");
  divBorder.classList.add("col-12","col-xl-6","border","border-dark","text-left","p-5","couleurBg");
  divInformation.appendChild(divBorder);

  
  createlement("h3",...["p-3","text-center","titre"], divBorder,"Information :");
  createlement("p",...["p-3","m-3","text"], divBorder,`<span>Description :</span> ${teddy.description}`);
  createlement("p",...["p-3","m-3","text"], divBorder,`<span>Prix :</span> ${teddy.price/100}€`);
  createlement("p",...["p-3","m-3","text"], divBorder,`<span>Couleurs au choix :</span>`);

  let select = document.createElement("select");
  select.setAttribute("name","colors");
  select.classList.add("ml-5");
  divBorder.appendChild(select);

  Object.entries(teddy.colors).forEach(couleur => {             // on crée une liste déroulante avec pour option chaque couleurs du nounours.
  let option = document.createElement("option");
  option.text = couleur[1];
  option.value = couleur[0];
  select.appendChild(option);
})
  let btnPanier = document.createElement("button");
  btnPanier.classList.add("p-2","btn");
  btnPanier.setAttribute("id", "btnPanier");
  btnPanier.innerHTML = "Ajouter au panier";
  divBorder.appendChild(btnPanier);
  btnPanier.addEventListener( "click", () => {              // event au click sur le boutton pour exécuter la fonction ajouterAuPanier.
    ajouterAuPanier();
    alert("Vous avez ajouté un article à votre panier !");
  });
  function ajouterAuPanier (){                              //Fonction pour ajouter des éléments au local storage.
    let itemStorage = localStorage.getItem("ours");                     
    let id = teddy._id;
    let product = {id: id, quantity: 1};
    let cart = [product];
    if(itemStorage){                                        
    if(produitDejaCommande(id) == true){                                            // Condition : si produit dans local, on récupère le produit et on ajoute 1 à la quantité.
      let store = localStorage.getItem("ours");
      store = JSON.parse(store);
      for(let el of store){                                                                                                
        if(el.id == id){                                   
          el.quantity = el.quantity +1                                                                                       
        };  
      };
      localStorage.setItem("ours", JSON.stringify(store));                                                                
    }
    else {
      let store = JSON.parse(localStorage.getItem("ours"));                       // Sinon on ajoute le nouveau produit dans le tableau du local                    
      store.push(product);                                                                                                 
      localStorage.setItem("ours", JSON.stringify(store));                                                                           
    }}
    else{
    populateStorage(cart);                                                        // On ajoute un tableau d'objet au local storage.
  }}
  function populateStorage(cart){  
    localStorage.setItem("ours", JSON.stringify(cart)); 
  }
  function produitDejaCommande (id){
    let store = JSON.parse(localStorage.getItem("ours"));
    function findid(storage) {                                                    // On recherche en fonction de l'id si le produit à déjà été commandé.
      return storage.id == id;
    }
    let idd = store.find(findid);
    if(idd){ 
      return true;
    }
    else{
      return false;
    }}
  }
async function getProducts() {                                        // fonction fetch pour récupérer les infos du produit en fonction de son url.
  await fetch(`http://localhost:3000/api/teddies/${queryString}`) 
    .then((resp) => resp.json())
    .catch(alert)  
    .then((teddy) => afficherTeddy(teddy));
}
getProducts();


