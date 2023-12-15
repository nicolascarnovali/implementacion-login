const socketClient = io();

const form = document.getElementById('formProduct');
const formelminar = document.getElementById('delete-btn');
const inputIdproduct = document.getElementById('id-product');
const inputName = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputCategory = document.getElementById('category');
const inputImage = document.getElementById('thumbnail');
const inputStock = document.getElementById('stock');
const productList = document.getElementById('products-list');
//declaro los inputs
form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputName.value
    const description = inputDescription.value
    const code = inputCode.value
    const price = inputPrice.value
    const category = inputCategory.value
    const thumbnail = inputImage.value
    const stock = inputStock.value
    const product = {title,description,code,price,category,thumbnail,stock}
    //creo el objeto con los datos del input
    console.log(product);
    socketClient.emit('newProduct', product);
    //emito la info al serveer
}
formelminar.onsubmit = (e) => {
    e.preventDefault();
    const idProduct = (inputIdproduct.value)
    const product = [idProduct]
    //creo el objeto con los datos del input
    socketClient.emit('deleteProduct', product);
    //emito la info al serveer
}
socketClient.on('getProducts', (data) => {
    //renderizo
      productList.innerHTML = ''; // Limpia el contenido actual de la lista
  
      data.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
          <h3>${product.title}</h3>
          <p>Description: ${product.description}</p>
          <p>ID: ${product._id}</p>
          <p>Price: $${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Category: ${product.category}</p>
          <img src="${product.thumbnail ? product.thumbnail : '../images/placeholder.jpg'}" alt="Product Image" width="50" height="50">
        `;
        
        productList.appendChild(productItem);
      });
  });