const footerYear = () => {
  document.getElementById("year").innerText = new Date().getFullYear();
};

footerYear();

const cardUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUyMDliNTczOWY4NzAwMTU3YWIxMTQiLCJpYXQiOjE3NzY0MjU3MzMsImV4cCI6MTc3NzYzNTMzM30.cJlqLuAPOMS7zBTU4pWm3sWoQ55fVyS-JADqsi3rapo";

const params = new URLSearchParams(location.search);
const cardID = params.get("id");

const fetchOneCard = () => {
  fetch(cardUrl + cardID, {
    headers: {
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error("Errore recupero dati");
      }
    })
    .then((data) => {
      renderDetails(data);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

const renderDetails = (card) => {
  const container = document.getElementById("container-dettagli");
  container.innerHTML = `
        <div class="col-12 col-md-6 text-center">
            <img src="${card.imageUrl}" class="img-fluid shadow-lg rounded" alt="${card.name}" style="max-height: 500px">
        </div>
        <div class="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-column justify-content-center">
            <span class="badge bg-warning text-dark mb-2 w-25">${card.brand}</span>
            <h1 class="display-4 fw-bold text-uppercase">${card.name}</h1>
            <p class="lead text-secondary">${card.description}</p>
            <h2 class="text-success display-5 fw-bold mb-4">${card.price}€</h2>
            <div>
                <a href="#" class="btn btn-outline-info btn-lg">Compra</a>
            </div>
        </div>
    `;
};

fetchOneCard();
