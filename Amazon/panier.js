function fillPanier(nounours){                                                                        // Fonction pour remplir les infos du panier.

    const article = document.getElementById("article")
    const endForm = document.getElementById("formEnd")
    let total = 0
    for(let el of nounours){
      
      let local = localStorage.getItem(el._id)                                                        // on récupère chaque éléments du local.
      if(local ){
      let locale = JSON.parse(local)
    
      for(let elem of locale) {                                                                       // boucle for, pour chaque éléments (clé) on va créer un <p> avec les valeurs de la clé.
        let articles = document.createElement("p")
        articles.innerHTML = `Vous avez commandé ${el.name} en ${elem.color} ${elem.quantity} fois au total ce qui reviendra à <span>${el.price/100*elem.quantity}</span>€ pour cet article.`
        article.appendChild(articles)
        let finalTotal = el.price/100*elem.quantity
        total = total + finalTotal   
    }}}
      let totalPrice = document.createElement("p")
      totalPrice.setAttribute("id", "total")
      totalPrice.innerHTML = `Le total de votre commande s'élève à ${total}€`
      article.appendChild(totalPrice)
    
      let btnAchat = document.createElement("button")
      btnAchat.classList.add("btn")
      btnAchat.setAttribute("id", "submit", "type", "submit")
      btnAchat.innerHTML = "Envoyer"
      endForm.appendChild(btnAchat)
      btnAchat.addEventListener("click", () =>                                                          // ajout d'un event au boutton pour envoyé les infos au serveur.
      send()  
    )}
    
      function send(){                                                                                  // fonction pour envoyer les infos au serveur.
      let keys = Object.keys(localStorage)                                                              // on récupère toutes les clés du local.
      console.log(keys);
    
      let firstName = document.getElementById("name").value                                             // on récupère toute les valeurs du form entrées par l'utilisateur.
      let lastName = document.getElementById("surname").value
      let address = document.getElementById("adresse").value
      let city = document.getElementById("city").value
      let email = document.getElementById("mail").value
      let products = keys
      let contact = {firstName, lastName, address, city,email}
      let request = {"contact": contact , "products": products}                                          
      
    
      const command = {                                                                                 // on crée la requète Post à envoyer (body, headers)
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }                                                                                                   // on crée une dernière vérification des informations rentrées dans le form par l'utilisateur pour éviter tout "problème".
      if(firstName.match(/^([a-zA-Z -]{3,30})$/) && lastName.match(/^([a-zA-Z -]{3,30})$/) && address.match(/^([0-9a-zA-Z -]{3,40})$/) && city.match(/^([a-zA-Z -]{3,30})$/) && email.match(/^[\Wa-zA-Z0-9_-]{2,40}[@][a-zA-Z0-9-]{2,20}[.][a-zA-Z]{2,3}$/)){
        fetch('http://localhost:3000/api/teddies/order', command)                                       
        .then(res => res.json())                                                                        // on fait la requète avec fetch qui envoie nos infos au serveur.
        .then(res => pageAchat(res))                                                                    // on passe la réponse du serveur dans une fonction.  
    }
      else {
        alert("Rentrez des informations correct SVP")
      }
    }
    function pageAchat(res){                                                                            // on réucpère le prix total sur la page.
      let total = document.getElementById("total").textContent
      let totalnumber = total.replace( /^\D+/g, '')
      let command = {"orderId": res.orderId, "total": totalnumber}                                      
      localStorage.setItem("order", JSON.stringify(command))                                            // on stocke la réponse du seveur et notre prix dans le local.
      window.location.href = 'achats.html'                                                              // on redirige l'utilisateur vers la page de confirmation.
    }
    async function addPanier() {                                                                         //  Fonction pour récupéré les infos des teddy du serveur.
      await fetch('http://localhost:3000/api/teddies') 
        .then((response) => response.json()) 
        .then((nounours) => fillPanier(nounours))
    }
    addPanier()