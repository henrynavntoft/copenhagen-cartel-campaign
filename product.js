const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const url = `https://henrymedia.dk/copenhagen-cartel-backend/wp-json/wp/v2/${id}?_embed`;

fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);
  document.querySelector(".productName").textContent =
    product.productdisplayname;
  document.querySelector(".ID").textContent = product.id;
  document.querySelector(".section-brand").textContent = product.fashiontype;
  document.querySelector(
    "img.productImg"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
}
