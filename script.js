
const books = [
  {
    id: 1,
    title: "The Power of Habits",
    author: "James Clear",
    category: "Personal Growth",
    price: 15000,
    color: "#345b4b",
    preview: "Small habits can create remarkable results. Start with one small improvement today and build from there."
  },
  {
    id: 2,
    title: "Business Success",
    author: "Daniel Morgan",
    category: "Business",
    price: 18000,
    color: "#a66c42",
    preview: "Every successful business begins with a problem worth solving. Understand your customers before building your solution."
  },
  {
    id: 3,
    title: "The Lost Kingdom",
    author: "Sarah James",
    category: "Fiction",
    price: 12000,
    color: "#455a80",
    preview: "Beyond the mountains, a forgotten kingdom waited. Nobody had returned from its gates for a hundred years."
  },
  {
    id: 4,
    title: "Think Bigger",
    author: "Michael Stone",
    category: "Personal Growth",
    price: 16000,
    color: "#8c5c62",
    preview: "Your goals define your direction. Give yourself permission to imagine a future bigger than your fears."
  },
  {
    id: 5,
    title: "Smart Investments",
    author: "Peter Adams",
    category: "Business",
    price: 22000,
    color: "#555b43",
    preview: "Financial knowledge begins with understanding your income, expenses, risk and long-term goals."
  },
  {
    id: 6,
    title: "Midnight Stories",
    author: "Anna Rose",
    category: "Fiction",
    price: 10000,
    color: "#55456f",
    preview: "The rain had stopped when the mysterious letter arrived. Its message would change everything."
  },
  {
    id: 7,
    title: "The New You",
    author: "Grace Wilson",
    category: "Personal Growth",
    price: 14000,
    color: "#9a7650",
    preview: "Growth is a journey. Be patient with yourself, celebrate progress and keep moving forward."
  },
  {
    id: 8,
    title: "Build Your Brand",
    author: "John Carter",
    category: "Business",
    price: 20000,
    color: "#38616a",
    preview: "A memorable brand starts with a clear promise and a consistent experience for every customer."
  }
];

let cart = [];
let activeCategory = "All";

function money(amount) {
  return "TZS " + amount.toLocaleString("en-TZ");
}

function renderBooks() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = books.filter(book => {
    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;

    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const grid = document.getElementById("book-grid");

  grid.innerHTML = filtered.map(book => `
    <article class="book-card">
      <div class="book-cover" style="background:${book.color}">
        ${book.title}
      </div>
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="price">${money(book.price)}</p>
      <div class="card-actions">
        <button class="preview-button" onclick="openReader(${book.id})">
          Preview
        </button>
        <button class="add-button" onclick="addToCart(${book.id})">
          Add to cart
        </button>
      </div>
    </article>
  `).join("");

  if (!filtered.length) {
    grid.innerHTML = "<p>No books found. Try another search.</p>";
  }
}

function filterBooks(category, button) {
  activeCategory = category;
  document.querySelectorAll(".filter").forEach(el => {
    el.classList.remove("active");
  });
  button.classList.add("active");
  renderBooks();
}

function addToCart(id) {
  const book = books.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  updateCart();
  document.getElementById("cart-panel").classList.add("open");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = money(total);

  document.getElementById("cart-items").innerHTML =
    cart.length ? cart.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.title}</strong>
          <p class="author">${item.quantity} × ${money(item.price)}</p>
        </div>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `).join("") : "<p>Your cart is empty.</p>";
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

function openReader(id) {
  const book = books.find(item => item.id === id);
  document.getElementById("reader-title").textContent = book.title;
  document.getElementById("reader-text").textContent = book.preview;
  document.getElementById("reader-modal").classList.add("show");
}

function closeReader() {
  document.getElementById("reader-modal").classList.remove("show");
}

function checkout() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  alert(
    "Demo checkout\n\n" +
    "Your total is " + money(total) +
    "\n\nNo payment has been collected. Connect a payment provider to accept real payments."
  );
}

renderBooks();
updateCart();
