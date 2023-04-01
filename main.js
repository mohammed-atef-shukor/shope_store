const productList = document.querySelector(".product-list");
const viewMoreButton = document.querySelector(".view-more-btn");

const productsPerLoad = 4;
let productsDisplayed = 0;

// Hide all products initially except for the first four
for (let i = productsPerLoad; i < productList.children.length; i++) {
  productList.children[i].style.display = "none";
}

// Display the first set of products on initial load
showNextProducts();

viewMoreButton.addEventListener("click", function() {
  // Hide the current set of products
  for (let i = productsDisplayed; i < productsDisplayed + productsPerLoad; i++) {
    if (productList.children[i]) {
      productList.children[i].style.display = "none";
    }
  }
  
  // Determine the starting index for the next set of products
  let nextProductsStartIndex = productsDisplayed + productsPerLoad;
  if (nextProductsStartIndex >= productList.children.length) {
    nextProductsStartIndex = 0;
  }
  
  // Check if the next set of products includes the fourth product from the current set
  let fourthProductIndex = productsDisplayed + 3;
  if (fourthProductIndex >= productList.children.length) {
    fourthProductIndex = fourthProductIndex - productList.children.length;
  }
  const includesFourthProduct = nextProductsStartIndex <= fourthProductIndex && fourthProductIndex < nextProductsStartIndex + productsPerLoad;
  
  // Display the next set of products
  productsDisplayed = nextProductsStartIndex;
  showNextProducts();
  
  // If the next set of products includes the fourth product from the current set, wait for the animation to complete and then display it
  if (includesFourthProduct) {
    setTimeout(function() {
      productList.children[fourthProductIndex].style.display = "block";
    }, 300);
  }
});

function showNextProducts() {
  // Display the next set of products
  for (let i = productsDisplayed; i < productsDisplayed + productsPerLoad; i++) {
    if (productList.children[i]) {
      productList.children[i].style.display = "block";
    }
  }
  
  // Add the "slide" class to animate the transition
  setTimeout(function() {
    productList.classList.add("slide");
  }, 0);
  
  // Remove the "slide" class after the animation is complete
  setTimeout(function() {
    productList.classList.remove("slide");
  }, 300);
}
