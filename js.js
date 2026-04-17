const footerYear = () => {
  document.getElementById("year").innerText = new Date().getFullYear();
};

footerYear();

class Product {
  constructor(_productName, _description, _brand, _imageUrl, _price) {
    this.name = _productName;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById("productName").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = parseFloat(document.getElementById("price").value);

  const newProduct = new Product(
    productName,
    description,
    brand,
    imageUrl,
    price,
  );

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUyMDliNTczOWY4NzAwMTU3YWIxMTQiLCJpYXQiOjE3NzY0MjU3MzMsImV4cCI6MTc3NzYzNTMzM30.cJlqLuAPOMS7zBTU4pWm3sWoQ55fVyS-JADqsi3rapo",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error("Errore salvataggio prodotto");
      }
    })
    .then((data) => {
      console.log("Salvato", data);
      form.reset();
    })
    .catch((err) => {
      console.log("Oops c'è un errore", err);
    });
});
