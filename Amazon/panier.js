
function fillPanier(nounours){ 
   const article = document.getElementById("article");                                           // Fonction pour remplir les infos du panier.
    const endForm = document.getElementById("formEnd");
    let total = 0;
    let local = localStorage.getItem("ours");                                                        // on récupère chaque éléments du local.
      if(local ){
      let locale = JSON.parse(local);
    for(let el of nounours){
      for(let elem of locale) {                                                                     // boucle for, pour chaque éléments (clé) on va créer un <p> avec les valeurs de la clé.
         if(el._id == elem.id) {                                                         
        let articles = document.createElement("p");
        articles.innerHTML = `Vous avez commandé ${el.name}  ${elem.quantity} fois au total ce qui reviendra à <span>${el.price/100*elem.quantity}</span>€ pour cet article.`;
        article.appendChild(articles);
        let finalTotal = el.price/100*elem.quantity;
        total = total + finalTotal;   
        }};
      }};
      let totalPrice = document.createElement("p");
      totalPrice.setAttribute("id", "total");
      totalPrice.innerHTML = `Le total de votre commande s'élève à ${total}€`;
      article.appendChild(totalPrice);
    
      let btnAchat = document.createElement("button");
      btnAchat.classList.add("btn");
      btnAchat.setAttribute("id", "submit", "type", "submit");
      btnAchat.innerHTML = "Envoyer";
      endForm.appendChild(btnAchat);
      btnAchat.addEventListener("click", (event) =>                                                          // ajout d'un event au boutton pour envoyé les infos au serveur. 
       send(event)                                                                                                             
    )}; 
      function send(event){     
        let products = [];                                                                                 // fonction pour envoyer les infos au serveur.                                                             // on récupère toutes les clés du local.
        let local = JSON.parse(localStorage.getItem("ours"));
        for(let el of local){
          products.push(el.id); 
        };
        if(myFunction("name") != true || myFunction("surname") != true || myFunction("adresse") != true || myFunction("city") != true || myFunction("mail") != true){
          return event.stopPropagation();
        };
      let firstName = document.getElementById("name").value;                                         // on récupère toute les valeurs du form entrées par l'utilisateur.
      let lastName = document.getElementById("surname").value;
      let address = document.getElementById("adresse").value;
      let city = document.getElementById("city").value;
      let email = document.getElementById("mail").value;
      let contact = {firstName, lastName, address, city,email};
      let request = {"contact": contact , "products": products};                                            
      const command = {                                                                                 // on crée la requète Post à envoyer (body, headers)
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }};                                                                               
        fetch('http://localhost:3000/api/teddies/order', command)                                       
        .then(res => res.json())
        .catch(alert)                                                                         // on fait la requète avec fetch qui envoie nos infos au serveur.
        .then(res => pageAchat(res));                                                                    // on passe la réponse du serveur dans une fonction.  
    };
    function validify(id) {
      if (document.getElementById(id).checkValidity()) {
        return true;
      }else {alert(`Le champs ${id} est mal rempli, vérifiez vos informations`)}; 
    };
    function pageAchat(res){   
      localStorage.clear()                                                                              // on clear le local storage.
      let total = document.getElementById("total").textContent;                                   
      let totalnumber = total.match(/\d+/)[0];                                                                
      window.location.href = `achats.html.?.${res.orderId}.${totalnumber}`;                               // on redirige l'utilisateur vers la page de confirmation.
    };
    async function addPanier() {                                                                         //  Fonction pour récupéré les infos des teddy du serveur.
      await fetch('http://localhost:3000/api/teddies') 
        .then((response) => response.json())
        .catch(alert) 
        .then((nounours) => fillPanier(nounours));
    };
    addPanier();