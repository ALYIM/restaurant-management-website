document.addEventListener('DOMContentLoaded', function() {
    // Gestion du panier
    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    // Ajouter un élément au panier
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const item = {
                id: Date.now(),
                name: menuItem.querySelector('.card-title').textContent,
                price: parseFloat(menuItem.querySelector('.price').textContent.replace('€', '')),
                image: menuItem.querySelector('img').src
            };
            
            cart.push(item);
            updateCart();
            
            // Animation de feedback
            const added = document.createElement('div');
            added.className = 'position-fixed bg-success text-white px-3 py-2 rounded';
            added.textContent = 'Ajouté au panier !';
            added.style.top = '20px';
            added.style.right = '20px';
            added.style.zIndex = '1100';
            document.body.appendChild(added);
            
            setTimeout(() => {
                added.remove();
            }, 2000);
        });
    });
    
    // Mettre à jour le panier
    function updateCart() {
        cartCount.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center py-3">Votre panier est vide</p>';
            cartTotal.textContent = '€0.00';
            return;
        }
        
        let total = 0;
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h6>${item.name}</h6>
                    <span>€${item.price.toFixed(2)}</span>
                </div>
                <span class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </span>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `€${total.toFixed(2)}`;
        
        // Gestion de la suppression d'éléments
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
    
    // Afficher/masquer le panier
    cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', function() {
        cartDropdown.style.display = 'none';
    });
    
    cartDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Gestion des formulaires
    document.getElementById('reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre réservation ! Nous vous contacterons pour confirmation.');
        this.reset();
    });
    
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons dès que possible.');
        this.reset();
    });
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.menu-item, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les éléments pour l'animation
    document.querySelectorAll('.menu-item, .team-member').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Fermer le menu mobile si ouvert
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
});