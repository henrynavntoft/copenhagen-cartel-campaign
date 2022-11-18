const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const url = `https://henrymedia.dk/copenhagen-cartel-backend/wp-json/wp/v2/product?_embed&include=${id}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

// Just checking
function handleProductList(data) {
  console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  //Selecting template and cloning
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  // Change stuff
  clone.querySelector("a.goto").href = `product.html?id=${product.id}`;
  clone.querySelector("h3").textContent = product.brand;
  clone.querySelector("h2").textContent = product.title.rendered;
  clone.querySelector("p.price").textContent = product.price;
  clone.querySelector("p.colors").textContent = product.colors;
  clone.querySelector("p.stock").textContent = product.stock;
  clone.querySelector("img").src =
    product._embedded[
      "wp:featuredmedia"
    ][0].media_details.sizes.medium_large.source_url;
  //Selection where i want the clone
  const parent = document.querySelector("main .product-feed");
  //Appending it
  parent.appendChild(clone);
}
