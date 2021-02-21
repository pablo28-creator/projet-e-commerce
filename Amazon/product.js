const queryString = window.location.search.replace( /^\D+/g, '');    // on récupère l'info voulu dans l'url de la page.

function afficherTeddy (teddy){                                       // fonction ou on crée des éléments pour afficherr les infos récupérés.
  const teddyName = document.getElementById("presentation")
  let divPresentation = document.createElement("div")
    divPresentation.classList.add("col-12", "col-lg-6" )
    teddyName.appendChild(divPresentation)

  let photo = document.createElement("img")
  photo.setAttribute("src", teddy.imageUrl)
  photo.alt = "Photo d'ours en peluche mis en vente"
  photo.classList.add("photo","border","border-dark","border-bottom-0")
  divPresentation.appendChild(photo)

  let title = document.createElement("h2")
  title.classList.add("p-4","border","border-dark","border-top-0","couleurBg")
  title.innerHTML = teddy.name
  divPresentation.appendChild(title)

  let divInformation = document.createElement("div")
  divInformation.classList.add("col-12","col-xl-6")
  teddyName.appendChild(divInformation)

  let divBorder = document.createElement("div")
  divBorder.classList.add("col-12","col-xl-6","border","border-dark","text-left","p-5","couleurBg")
  divInformation.appendChild(divBorder)

  let info = document.createElement("h3")
  info.classList.add("p-3","text-center")
  info.innerHTML = "Information :"
  divBorder.appendChild(info)

  let description = document.createElement("p")
  description.classList.add("p-3","m-3")
  description.innerHTML = `<span>Description :</span> ${teddy.description}`
  divBorder.appendChild(description)

  let price = document.createElement("p")
  price.classList.add("p-3","m-3")
  price.innerHTML = `<span>Prix :</span> ${teddy.price/100}€`
  divBorder.appendChild(price)

  let divcolors = document.createElement("div")
  divcolors.classList.add("p-3","m-3")
  divBorder.appendChild(divcolors)

  let colorTitle = document.createElement("p")
  colorTitle.innerHTML = `<span>Couleurs au choix :</span>`
  divcolors.appendChild(colorTitle)

  let select = document.createElement("select")
  select.setAttribute("name","colors")
  select.classList.add("ml-3")
  divcolors.appendChild(select)

  Object.entries(teddy.colors).forEach(couleur => {             // on crée une liste déroulante avec pour option chaque couleur du nounours.
  let option = document.createElement("option")
  option.text = couleur[1]
  option.value = couleur[0]
  select.appendChild(option)
})

  let btnDiv = document.createElement("div")
  btnDiv.classList.add("btnDiv","text-center")
  divBorder.appendChild(btnDiv)

  let btnPanier = document.createElement("button")
  btnPanier.classList.add("p-2","btn")
  btnPanier.setAttribute("id", "btnPanier")
  btnPanier.innerHTML = "Ajouter au panier"
  btnDiv.appendChild(btnPanier)
  btnPanier.addEventListener( "click", () => {              // event au click sur le boutton pour exécuter la fonction ajouterAuPanier
    ajouterAuPanier()
  })
  function ajouterAuPanier (){                              //  Fonction pour ajouter au local storage.  
    let storage = localStorage
    let id = teddy._id
    let quantities = 1
    let colorList = document.getElementsByName("colors")
    let colorValue = colorList[0]
    let colorSelec = colorValue.options[colorValue.selectedIndex].text          // on récupère la valeur du select qui est active.
    let product = {color : colorSelec  , quantity : quantities}
    let cart = [product]
    let colorArrayJson = storage.getItem(id)
    let colorArray = JSON.parse(colorArrayJson)                                 // on parse un tableau d'ojbet.
    if(produitDejaCommande(id) == true && couleurDejaCommande(colorSelec, colorArray) == true){                               // condition, si remplit on parse la valeur récupéré
      let lStorage = localStorage.getItem(id)
      lStorage = JSON.parse(lStorage)
      for(let el of lStorage){                                                                                                // on l'ajoute à une boucle avec condition
        if(el.color == colorSelec){                                   
          el.quantity = el.quantity +1                                                                                        // si remplit on Ajoute 1 à la quantité de l'objet
        }   
      } 
      storage.setItem(id, JSON.stringify(lStorage))                                                                       // on remplace l'objet du local storage.                                                               
    }
    else if(produitDejaCommande(id) == true && couleurDejaCommande(colorSelec, colorArray) == false ){                        // suite de la 1ère condition      
      let localStor = localStorage.getItem(id)
      localStor = JSON.parse(localStor)                                                                           
      localStor.push(product)                                                                                                 // on ajoute un nouvel objet dans le tableau, qu'on ajoute au local storage.
      storage.setItem(id, JSON.stringify(localStor))
    }
    else{
      populateStorage(id, cart)                                                                                               // si condition non remplit on aajoute un tableau avec comme clé l'id dans le locale storage.
    }
  }
  function populateStorage(id, cart){                                                                   
    localStorage.setItem(id, JSON.stringify(cart))                                                                            // fonction qui ajoute un tableau d'ojet au local storage avec comme clé l'id du nounours choisit.
  }
  function produitDejaCommande (id){
    let idStorage = localStorage.getItem(id)                                                                                  // on récupère le local S et on utilise une condition pour savoir si il est déjà remplit avec la clé id du nounours.    
    if(idStorage){
      return true
    }
    else{
      return false
    }
  }
function couleurDejaCommande (colorSelec, colorArray){                                                                        // Fonction pour savoir si le local S contient la valeur qu'on soit lui envoyer.
 for (let obj of colorArray){
   if(colorSelec == obj.color){
     return true
   }
  }
return false
}}
async function getProducts() {                                        // fonction fetch pour récupérer les info du produit en fonction de son url.
  await fetch(`http://localhost:3000/api/teddies/${queryString}`) 
    .then((resp) => resp.json()) 
    .then((teddy) => afficherTeddy(teddy))  
}
getProducts()



