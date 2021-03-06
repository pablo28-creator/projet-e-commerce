function confirmation (){                                                                                                
  const divInfo = document.getElementById("order");
  const orderInfo = window.location.search.split(".");
  let orderTotal = orderInfo[2];
  let orderId = orderInfo[1];
                                                                  
  let info = document.createElement("p");
    info.classList.add("p-1","m-1");
    info.innerHTML = `Nous vous remercions d'avoir commandé sur notre site. </br>
                      Le montant total de votre commande est de ${orderTotal}€. </br>
                      Voici votre numéro de commande à garder précieusement :</br> ${orderId}`;
    divInfo.appendChild(info);
  }
confirmation();
