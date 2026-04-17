const footerYear = () => {
  document.getElementById("year").innerText = new Date().getFullYear();
};

footerYear();

const cardUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUyMDliNTczOWY4NzAwMTU3YWIxMTQiLCJpYXQiOjE3NzY0MjU3MzMsImV4cCI6MTc3NzYzNTMzM30.cJlqLuAPOMS7zBTU4pWm3sWoQ55fVyS-JADqsi3rapo";

const fetchCard = () => {
  fetch(cardUrl, {
    headers: {
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error("Errore caricamento dati");
      }
    })
    .then((data) => {
      creaCards(data);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

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

const deleteCard = (id) => {
  if (confirm("Vuoi davvero eliminare questa PokèCard?")) {
    fetch(cardUrl + id, {
      method: "DELETE",
      headers: { Authorization: key },
    })
      .then((res) => {
        if (res.ok) {
          alert("Eliminata!");
          location.reload();
        }
      })
      .catch((err) => console.error(err));
  }
};

fetchCard();
