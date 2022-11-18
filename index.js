const url =
  "https://henrymedia.dk/copenhagen-cartel-backend/wp-json/wp/v2/product?_embed";

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
  const colors = product._embedded["wp:term"][0];

  // Change stuff
  // clone.querySelector("h3").textContent = product.brand;
  clone.querySelector("h2").textContent = product.title.rendered;
  //displays price
  clone.querySelector(".price span").textContent = product.price;
  // displays colors
  colors.forEach((color) => {
    const liEl = document.createElement("li");
    liEl.style.backgroundColor = color.slug;
    console.log("testing", liEl);
    clone.querySelector(".colour ul").appendChild(liEl);
  });
  // displays stock
  clone.querySelector(".inStock span").textContent = product.stock;
  //display image
  clone.querySelector("img").src =
    product._embedded[
      "wp:featuredmedia"
    ][0].media_details.sizes.medium.source_url;
  //Selection where i want the clone
  const parent = document.querySelector("main");
  //Appending it
  parent.appendChild(clone);
}
