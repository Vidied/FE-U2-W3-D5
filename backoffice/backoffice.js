const footerYear = () => {
  document.getElementById("year").innerText = new Date().getFullYear();
};

footerYear();

const cardUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUyMDliNTczOWY4NzAwMTU3YWIxMTQiLCJpYXQiOjE3NzY0MzI1NTAsImV4cCI6MTc3NzY0MjE1MH0.GwvJTqEj-2alcz_OcknmDWAWZDooyWrbijillNT4yZI";
const form = document.getElementById("product-form");
const allTheParameters = new URLSearchParams(location.search);
const cardID = allTheParameters.get("id");

if (cardID) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.innerText = "Aggiorna prodotto";

  fetch(cardUrl + cardID, {
    method: "GET",
    headers: {
      Authorization: key,
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject("Errore caricamento")))
    .then((data) => {
      document.getElementById("productName").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("imageUrl").value = data.imageUrl;
      document.getElementById("price").value = data.price;
    })
    .catch((err) => console.log("Errore recupero dati", err));
}

class Product {
  constructor(_productName, _description, _brand, _imageUrl, _price) {
    this.name = _productName;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById("productName").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const urlToUse = cardID ? cardUrl + cardID : cardUrl;
  const methodToUse = cardID ? "PUT" : "POST";

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) console.log(res);
      return res.json();
      throw new Error("Errore nel server: " + res.status);
    })
    .then((data) => {
      alert(cardID ? "Modificato con successo!" : "Creato con successo!");
      console.log(cardID ? "Modificato con successo!" : "Creato con successo!");
      if (!cardID) form.reset();
    })
    .catch((err) => {
      console.error("Errore:", err);
      alert("Operazione fallita. Controlla la console.");
    });

  creaCards();
});

// DELETE

const deleteProduct = (id) => {
  if (confirm("Sicuro di voler eliminare il prodotto?")) {
    fetch(cardUrl + cardID, {
      method: "DELETE",
      headers: {
        Authorization: key,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Prodotto eliminato");
          location.reload();
        } else {
          throw new Error("Errore cancellazione prodotto");
        }
      })
      .catch((err) => {
        console.log("Errore", err);
      });
  }
};

// CARD

const creaCards = (cards) => {
  const container = document.getElementById("card-container");
  container.classList.add("row", "g-4", "p-4");
  cards.forEach((card) => {
    const col = document.createElement("div");
    col.classList.add("col-12", "col-md-4", "col-lg-3");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${card.imageUrl}" class="card-img-top p-3" alt="${card.name}" style="height: 250px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-uppercase fw-bold">${card.name}</h5>
          <p class="card-text text-secondary small flex-grow-1">${card.description}</p>
          <p class="fs-4 fw-bold text-success">${card.price}€</p>
          <div class="d-flex justify-content-between">
            <a href="../dettagli/dettagli.html?id=${card._id}" class="btn btn-outline-info btn-sm">Dettagli</a>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteCard('${card._id}')">Elimina</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
};
