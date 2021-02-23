function confirmation (){                                                                                                // Fonction pour récupérer les infos stockées précèdement dans le local
                                                                                                                // et les afficher en <p> sur la page.
    const divInfo = document.getElementById("order")                                                                
    let orderJson = localStorage.getItem("order")
    let order = JSON.parse(orderJson)
    
    let info = document.createElement("p")
      info.classList.add("p-1","m-1")
      info.innerHTML = `Nous vous remercions d'avoir commandé sur notre site. </br>
                        Le montant total de votre commande est de ${order.total}. </br>
                        Voici votre numéro de commande à garder précieusement :</br> ${order.orderId}`
      divInfo.appendChild(info)
    }
  confirmation()

function reset (){                                                                                               // Fonction pour clear le local storage et éviter un bug sur la page
                                                                                                                 // panier si le local contient autre chose que les teddys la requète renvoie une erreur 500.
    const reset = document.getElementById("reset")
        
    let resetInfo = document.createElement("p")
    resetInfo.classList.add("p-1","m-1")
    resetInfo.innerHTML = `Si vous souhaitez repasser une commande veuillez appuyer</br> sur le boutton ci-dessous pour annuler les informations sur </br>la commande en cours, merci.`
    reset.appendChild(resetInfo)
        
    let resetBtn = document.createElement("button")
    resetBtn.classList.add("btn","p-1","m-1")
    resetBtn.setAttribute("id", "resetBtn")
    resetBtn.innerHTML = "Nouvelle commande"
    reset.appendChild(resetBtn)
    resetBtn.addEventListener("click", () =>{
      localStorage.clear()                                                                                        // on clear le local storage.
      window.location.href = 'index.html'                                                                         // redirige vers la page d'accueil pour une nouvelle commande.
      })
    }
  reset ()