function saveData() {
  localStorage.setItem("udhaarProducts", JSON.stringify(products));
  localStorage.setItem("udhaarOrders", JSON.stringify(orders));
  localStorage.setItem("udhaarUsers", JSON.stringify(users));
}

function loadData() {
  const savedProducts = localStorage.getItem("udhaarProducts");
  const savedOrders = localStorage.getItem("udhaarOrders");
  const savedUsers = localStorage.getItem("udhaarUsers");

  if (savedProducts) products = JSON.parse(savedProducts);
  if (savedOrders) orders = JSON.parse(savedOrders);
  if (savedUsers) {
    users = JSON.parse(savedUsers);
  } else {
    users = [
      {
        email: "admin@gmail.com",
        password: "admin",
      },
    ];
    saveData();
  }
}

function editProduct(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  }

  const newName = prompt("Enter new name:", product.name);
  if (newName === null) return; // User clicked Cancel

  const newPrice = prompt("Enter new price:", product.price);
  if (newPrice === null) return;

  const newStock = prompt("Enter new stock:", product.stock);
  if (newStock === null) return;

  // Update product
  product.name = newName;
  product.price = parseFloat(newPrice) || product.price;
  product.stock = parseInt(newStock) || product.stock;

  // Save to localStorage
  saveData();

  // Refresh the display
  displayProducts();
  alert("Product updated successfully!");
}

function updateStock(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  }

  const newStock = prompt("Enter new stock quantity:", product.stock);
  if (newStock === null) return; // User clicked Cancel

  const stockNum = parseInt(newStock);
  if (isNaN(stockNum) || stockNum < 0) {
    alert("Please enter a valid stock quantity!");
    return;
  }

  // Update stock
  product.stock = stockNum;

  // Save to localStorage
  saveData();

  // Refresh the display
  displayProducts();
  alert("Stock updated successfully!");
}

function displayProducts() {
  const productTable = document.querySelector("#productTable tbody");
  if (!productTable) return;

  productTable.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>PKR ${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${product.id})" class="edit-btn">Edit</button>
        <button onclick="updateStock(${product.id})" class="stock-btn">Update Stock</button>
      </td>
    `;
    productTable.appendChild(row);
  });
}

// Initialize data
loadData();
// Display products initially
displayProducts();
