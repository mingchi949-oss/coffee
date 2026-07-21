// ============================================
// MING COFFEE - Order Page Enhanced
// ============================================

// Array to hold the items added to the cart
let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];

// ============================================
// Particle Animation for Order Page
// ============================================

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// ============================================
// Cart Management Functions
// ============================================

// Function to add items to the cart array
function addToCart(itemName, price, inputId) {
  const quantity = parseInt(document.getElementById(inputId).value);

  if (quantity <= 0 || isNaN(quantity)) return;

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    // If it exists, just add to the quantity
    existingItem.qty += quantity;
  } else {
    // Otherwise, add a new item object to the array
    cart.push({ name: itemName, price: price, qty: quantity });
  }

  // Reset the input field back to 1
  document.getElementById(inputId).value = 1;

  // Refresh the display
  updateCartUI();
  
  // Show success notification
  showSuccessNotification(`${quantity}x ${itemName} added to cart!`);
}

// Function to remove an item from the cart and update local storage
function removeFromCart(index) {
  const itemName = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem("coffeeCart", JSON.stringify(cart));
  updateCartUI();
  
  showSuccessNotification(`${itemName} removed from cart`);
}

// Function to display the cart items on the screen
function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `;
    cartTotal.innerText = "$0.00";
    return;
  }

  cartList.innerHTML = "";
  let totalCost = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalCost += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item-row';
    cartItem.style.animation = `slideInLeft 0.3s ease ${index * 0.1}s both`;
    
    cartItem.innerHTML = `
      <div style="flex-grow: 1; text-align: left;">
        <p style="margin: 0; font-weight: 600; color: #fff; font-size: 0.95rem;">
          ${item.qty}x ${item.name}
        </p>
        <small style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">
          <i class="fas fa-cube" style="color: var(--accent);"></i> Sugar: ${item.sugar || "100%"}
        </small>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="color: var(--accent); font-weight: 700; font-size: 1rem; text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);">
          $${itemTotal.toFixed(2)}
        </span>
        <button class="remove-item-btn" onclick="removeFromCart(${index})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    
    cartList.appendChild(cartItem);
  });

  // Animate total
  cartTotal.style.transform = 'scale(1.2)';
  cartTotal.style.transition = 'transform 0.3s ease';
  cartTotal.innerText = `$${totalCost.toFixed(2)}`;
  
  setTimeout(() => {
    cartTotal.style.transform = 'scale(1)';
  }, 300);
}

// Load the cart display automatically when the order page opens
updateCartUI();

// ============================================
// Form Auto-save & Restore
// ============================================

// Load saved values from localStorage on page load
const phoneInput = document.getElementById("customerPhone");
const locationInput = document.getElementById("customerLocation");
const commentInput = document.getElementById("customerComment");

if (phoneInput) phoneInput.value = localStorage.getItem("savedPhone") || "";
if (locationInput) locationInput.value = localStorage.getItem("savedLocation") || "";
if (commentInput) commentInput.value = localStorage.getItem("savedComment") || "";

// Add listeners to save values to localStorage whenever they change
phoneInput?.addEventListener("input", () =>
  localStorage.setItem("savedPhone", phoneInput.value),
);
locationInput?.addEventListener("change", () =>
  localStorage.setItem("savedLocation", locationInput.value),
);
commentInput?.addEventListener("input", () =>
  localStorage.setItem("savedComment", commentInput.value),
);

// ============================================
// Success Notification System
// ============================================

function showSuccessNotification(message) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.success-notification');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, var(--accent), #00ccff);
    color: #000;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(0, 255, 204, 0.4);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
  `;
  
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes slideInLeft {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(notificationStyle);

// ============================================
// Checkout Form Handler
// ============================================

// Handle the checkout submit
document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    // Get values directly from the input elements for validation and message construction
    const phone = document.getElementById("customerPhone").value;
    const location = document.getElementById("customerLocation").value;
    const comment = document.getElementById("customerComment").value;

    // Validation
    if (cart.length === 0) {
      showSuccessNotification('Your cart is empty!');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Confirm Order</span> <i class="fas fa-arrow-right"></i>';
      }
      return;
    }

    if (!phone || !location) {
      showSuccessNotification('Please fill in all required fields');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Confirm Order</span> <i class="fas fa-arrow-right"></i>';
      }
      return;
    }

    // Build the list text for Telegram
    let itemsText = "";
    let totalCost = 0;

    cart.forEach((item) => {
      const cost = item.price * item.qty;
      totalCost += cost;
      itemsText += `☕ ${item.qty}x ${item.name} (${item.sugar || "100%"}) - $${cost.toFixed(2)}\n`;
    });

    const orderSummary = cart
      .map((item) => `${item.qty}x ${item.name}`)
      .join(", ");

    // YOUR TELEGRAM CONFIGURATION
    const botToken = "8749837452:AAF_TCGDTvgK4bLXBIoM4eQLjxv27Rxcksw";
    const chatId = "-5249856765";

    // Create the Telegram text string - SUPER COOL STYLE
    const message =
      `*📱 CUSTOMER INFORMATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Location:* ${location}\n` +
      `💬 *Comment:* ${comment || "None"}\n\n` +
      `*🛍️ ORDER ITEMS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `${itemsText}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *TOTAL BILL:* $${totalCost.toFixed(2)}\n` +
      `⏰ *STATUS:* Preparing...`;

    // Send the order to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    };

    fetch(telegramUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Clear cart and saved form data
          localStorage.removeItem("coffeeCart");
          localStorage.removeItem("savedPhone");
          localStorage.removeItem("savedLocation");
          localStorage.removeItem("savedComment");

          // Show success modal
          showSuccessModal();
        } else {
          showSuccessNotification('Something went wrong. Please try again.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Confirm Order</span> <i class="fas fa-arrow-right"></i>';
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showSuccessNotification('Network error. Please try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Confirm Order</span> <i class="fas fa-arrow-right"></i>';
        }
      });
  });

// ============================================
// Success Modal
// ============================================

function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.style.display = 'flex';
    
    // Add animation
    modal.style.animation = 'fadeIn 0.5s ease';
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('success-modal');
  if (event.target === modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      modal.style.display = 'none';
      window.location.href = 'web.html';
    }, 300);
  }
};

// ============================================
// Input Animations
// ============================================

// Add focus animations to form inputs
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.parentElement.style.transition = 'transform 0.3s ease';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// ============================================
// Button Ripple Effect
// ============================================

document.querySelectorAll('.submit-btn, .buy-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ============================================
// Console Branding
// ============================================

console.log('%c☕ MING COFFEE %cOrder Page', 
  'color: #00ffcc; font-size: 20px; font-weight: bold;', 
  'color: #fff; font-size: 14px;'
);