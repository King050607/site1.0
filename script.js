// Variables globales
const carrito = [];
let totalPrecio = 0;

// Simuler les données des producteurs et des produits
const productores = [
  {
    nombre: "Granja El Olivo",
    descripcion: "Productos frescos y orgánicos de nuestra granja familiar.",
    productos: [
      { nombre: "Tomates", precio: 2 },
      { nombre: "Huevos", precio: 3 },
      { nombre: "Aceitunas", precio: 4 },
    ],
    ubicacion: [37.3886, -5.9823],
  },
  {
    nombre: "Viñedos Andalusía",
    descripcion: "Vinos locales de alta calidad producidos con amor.",
    productos: [
      { nombre: "Vino Tinto", precio: 15 },
      { nombre: "Vino Blanco", precio: 12 },
    ],
    ubicacion: [37.7749, -3.7881],
  },
  {
    nombre: "Huerta de la Vega",
    descripcion: "Verduras frescas cultivadas de manera sostenible.",
    productos: [
      { nombre: "Zanahorias", precio: 1.5 },
      { nombre: "Lechuga", precio: 1 },
      { nombre: "Calabacines", precio: 2 },
    ],
    ubicacion: [36.7213, -4.4214],
  },
  {
    nombre: "Apicultura Serrana",
    descripcion: "Miel pura de las montañas andaluzas.",
    productos: [
      { nombre: "Miel de Romero", precio: 10 },
      { nombre: "Miel de Azahar", precio: 8 },
    ],
    ubicacion: [36.7602, -3.9063],
  },
  {
    nombre: "Panadería Artesanal",
    descripcion: "Pan y repostería elaborados a mano con ingredientes locales.",
    productos: [
      { nombre: "Pan Integral", precio: 3 },
      { nombre: "Magdalenas", precio: 4 },
      { nombre: "Tartas Caseras", precio: 15 },
    ],
    ubicacion: [37.1882, -3.6067],
  },
];


// Initialisation de la carte Leaflet
const map = L.map("map").setView([37.5, -4.5], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Ajout des marqueurs pour chaque producteur
productores.forEach((productor, index) => {
  const marker = L.marker(productor.ubicacion).addTo(map);
  marker.bindPopup(productor.nombre);
  marker.on("click", () => mostrarDetallesProductor(index));
});

// Afficher les détails du producteur sélectionné
function mostrarDetallesProductor(index) {
  const productor = productores[index];
  document.getElementById("productor-nombre").innerText = productor.nombre;
  document.getElementById("productor-descripcion").innerText =
    productor.descripcion;

  const listaProductos = document.getElementById("productor-productos");
  listaProductos.innerHTML = "";

  productor.productos.forEach((producto, productoIndex) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - ${producto.precio}€`;
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.onclick = () => agregarAlCarrito(productor, productoIndex);
    li.appendChild(botonAgregar);
    listaProductos.appendChild(li);
  });

  document.getElementById("add-to-cart").style.display = "block";
}

// Ajouter un produit au panier
function agregarAlCarrito(productor, productoIndex) {
  const producto = productor.productos[productoIndex];
  carrito.push(producto);
  totalPrecio += producto.precio;

  actualizarCarrito();
}

// Mettre à jour la section panier
function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  carritoItems.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - ${producto.precio}€`;
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = () => eliminarDelCarrito(index);
    li.appendChild(botonEliminar);
    carritoItems.appendChild(li);
  });

  document.getElementById("total-precio").innerText = `Total: ${totalPrecio}€`;
}

// Supprimer un produit du panier
function eliminarDelCarrito(index) {
  const producto = carrito[index];
  totalPrecio -= producto.precio;
  carrito.splice(index, 1);

  actualizarCarrito();
}

// Chat fictif
const chatHistory = document.getElementById("chat-history");
document.getElementById("send-chat").onclick = () => {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (message) {
    agregarMensajeAlChat("Usuario", message);
    setTimeout(() => {
      agregarMensajeAlChat("Productor", "Gracias por tu mensaje. ¿En qué puedo ayudarte?");
    }, 1000);
    input.value = "";
  }
};

function agregarMensajeAlChat(remitente, mensaje) {
  const div = document.createElement("div");
  div.className = `chat-message ${remitente.toLowerCase()}`;
  div.textContent = `${remitente}: ${mensaje}`;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
