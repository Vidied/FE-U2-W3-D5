const footerYear = () => {
  const span = document
    .getElementById("year")
    .innerText(new date().getFullYear());
};

const productName = document.getElementById("productName").value;
const description = document.getElementById("description").value;
const brand = document.getElementById("brand").value;
const imageUrl = document.getElementById("imageUrl").value;
const price = document.getElementById("price").value;

class product {
  constructor(_productName, _description, _brand, _imageUrl, _price) {
    this.name = _productName;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}
