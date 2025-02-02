let editingProductId = null;

function openAddProductModal() {
  document.getElementById('addProductModal').style.display = 'block';
}

function closeAddProductModal() {
  document.getElementById('addProductModal').style.display = 'none';
}

function openEditProductModal(productId) {
    editingProductId = productId;
    fetch(`/product/${productId}`)
        .then(response => {
            if (!response.ok) throw new Error("Product fetch failed");
            return response.json();
        })
        .then(product => {
            if (!product || !product._id) {
                alert("Error: Product data not found.");
                return;
            }

            document.getElementById("editProductId").value = product._id || "";
            document.getElementById("editProductName").value = product.name || "Unnamed Product";
            document.getElementById("editProductPrice").value = product.price ?? 0;
            document.getElementById("editProductStock").value = product.stock ?? 0;
            document.getElementById("editProductImage").value = "";

            document.getElementById("editProductModal").style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
            alert("Error loading product details. Please try again.");
        });
}

function closeEditProductModal() {
  document.getElementById('editProductModal').style.display = 'none';
  document.getElementById('editProductForm').reset();
}

async function submitProduct(event) {
  event.preventDefault();
  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);

  try {
    const response = await fetch("/add-new-product", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const newProduct = await response.json();
    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${newProduct.name}</td>
      <td>$${newProduct.price.toFixed(2)}</td>
      <td>${newProduct.stock}</td>
      <td><img src="${newProduct.imageUrl}" alt="${newProduct.name}" class="product-image"></td>
      <td class="actions">
        <button class="edit" onclick="openEditProductModal('${newProduct._id}')">Edit</button>
        <button class="delete" onclick="deleteProduct('${newProduct._id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(newRow);
    closeAddProductModal();
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Error adding product.");
  }
}

async function submitEditProduct(event) {
    event.preventDefault();
  
    const form = document.getElementById("editProductForm");
    const formData = new FormData(form);
  
    const row = document.querySelector(`tr[data-id="${editingProductId}"]`);
    const originalName = row.children[1].textContent.trim();
    const originalPrice = parseFloat(row.children[2].textContent.replace("$", "").trim());
    const originalStock = parseInt(row.children[3].textContent.trim());
  
    const newName = document.getElementById("editProductName").value.trim();
    const newPrice = parseFloat(document.getElementById("editProductPrice").value.trim());
    const newStock = parseInt(document.getElementById("editProductStock").value.trim());
    const newImage = document.getElementById("editProductImage").files[0];
  
    if (newName !== originalName) formData.append("name", newName);
    if (newPrice !== originalPrice) formData.append("price", newPrice);
    if (newStock !== originalStock) formData.append("stock", newStock);
    if (newImage) formData.append("productImage", newImage);
  
    if (!formData.entries().next().value) {
      alert("No changes detected.");
      return;
    }
  
    try {
      const response = await fetch(`/product/edit/${editingProductId}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to edit product");
      }
  
      const updatedProduct = await response.json();
  

      if (updatedProduct.name) row.children[1].textContent = updatedProduct.name;
      if (updatedProduct.price) row.children[2].textContent = `$${updatedProduct.price.toFixed(2)}`;
      if (updatedProduct.stock) row.children[3].textContent = updatedProduct.stock;
      if (updatedProduct.imageUrl) row.children[4].querySelector("img").src = updatedProduct.imageUrl;
  
      closeEditProductModal();
    } catch (error) {
      console.error("Error:", error);
      alert("Error editing product.");
    }
  }
  

async function deleteProduct(productId) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/product/delete/${productId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const row = document.querySelector(`tr[data-id="${productId}"]`);
    if (row) {
      row.remove();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error deleting product.");
  }
}