  // Basic JavaScript for interactive elements
  document.addEventListener('DOMContentLoaded', function() {
    // Create floating spice elements dynamically
    const floatingSpices = document.querySelector('.floating-spices');
    const spiceEmojis = ['🌶️', '🌱', '🍚', '🥘', '🍲', '🥗', '🥔', '🍠'];
    
    for (let i = 0; i < 20; i++) {
        const spice = document.createElement('div');
        spice.className = 'spice';
        spice.textContent = spiceEmojis[Math.floor(Math.random() * spiceEmojis.length)];
        spice.style.left = `${Math.random() * 100}%`;
        spice.style.top = `${Math.random() * 100}%`;
        spice.style.animationDelay = `${Math.random() * 10}s`;
        spice.style.animationDuration = `${15 + Math.random() * 20}s`;
        spice.style.fontSize = `${Math.random() * 20 + 10}px`;
        floatingSpices.appendChild(spice);
    }
    
    // Thumbnail gallery interaction
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImg = document.querySelector('.recipe-main-img img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image source to clicked thumbnail
            const thumbSrc = this.querySelector('img').src;
            mainImg.src = thumbSrc;
        });
    });
    
    // Testimonials slider controls
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        // In a real implementation, this would also change the testimonial content
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + dots.length) % dots.length;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % dots.length;
        showSlide(currentSlide);
    });
});

// Add this to your existing script section
document.addEventListener('DOMContentLoaded', function() {
// Popular dishes carousel functionality
const dishCards = document.querySelectorAll('.dish-card');
const prevDishBtn = document.querySelector('.prev-dish-btn');
const nextDishBtn = document.querySelector('.next-dish-btn');
const dishIndicators = document.querySelector('.dish-indicators');
const modal = document.querySelector('.recipe-modal');
const modalClose = document.querySelector('.close-modal');
const modalBody = document.querySelector('.modal-body');

let currentDishIndex = 0;
const visibleDishes = 5; // Number of dishes visible at once (adjust based on your design)
let autoplayInterval; // For autoplay functionality

// Create indicator dots
dishCards.forEach((_, index) => {
const indicator = document.createElement('span');
indicator.className = 'dish-indicator';
if (index === 0) indicator.classList.add('active');
indicator.addEventListener('click', () => {
    navigateToDish(index);
    resetAutoplay();
});
dishIndicators.appendChild(indicator);
});

const indicators = document.querySelectorAll('.dish-indicator');

function navigateToDish(index) {
if (index < 0) index = dishCards.length - 1;
if (index >= dishCards.length) index = 0;

// Remove active class from all cards and indicators
dishCards.forEach(card => card.classList.remove('active'));
indicators.forEach(ind => ind.classList.remove('active'));

// Add active class to current card and indicator
dishCards[index].classList.add('active');
indicators[index].classList.add('active');

// Calculate the position to scroll to
const carousel = document.querySelector('.dishes-carousel');
const cardWidth = dishCards[0].offsetWidth;
const scrollPosition = index * cardWidth - (carousel.offsetWidth - cardWidth) / 2;

// Scroll smoothly to the position
carousel.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
});

currentDishIndex = index;
}

// Next and Previous button handlers
nextDishBtn.addEventListener('click', () => {
navigateToDish(currentDishIndex + 1);
resetAutoplay();
});

prevDishBtn.addEventListener('click', () => {
navigateToDish(currentDishIndex - 1);
resetAutoplay();
});

// Touch/swipe functionality
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.dishes-carousel');

carousel.addEventListener('touchstart', (e) => {
touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
if (touchEndX < touchStartX) {
    // Swipe left (next)
    navigateToDish(currentDishIndex + 1);
    resetAutoplay();
} else if (touchEndX > touchStartX) {
    // Swipe right (previous)
    navigateToDish(currentDishIndex - 1);
    resetAutoplay();
}
}

// Flip card functionality
dishCards.forEach((card, index) => {
card.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-full-recipe')) {
        // Open the full recipe modal
        const dishName = card.querySelector('h4').textContent;
        openRecipeModal(dishName);
    } else {
        // Flip the card
        card.classList.toggle('flipped');
        resetAutoplay();
    }
});
});

// Modal functionality
function openRecipeModal(dishName) {
// Object containing all recipe details
const recipes = {
"Chocolate Cake": {
    prepTime: "20 mins",
    cookTime: "55 mins",
    serves: "12 people",
    difficulty: "Intermediate",
    image: "chocolate cake.jpeg",
    ingredients: [
        "2 cups all-purpose flour",
        "2 cups granulated sugar",
        "¾ cup unsweetened cocoa powder",
        "2 teaspoons baking powder",
        "1½ teaspoons baking soda",
        "1 teaspoon salt",
        "2 large eggs",
        "1 cup whole milk",
        "½ cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup boiling water",
        "Chocolate frosting: 1 cup butter, 3½ cups powdered sugar, ¾ cup cocoa powder, 4-5 tbsp heavy cream, 2 tsp vanilla extract"
    ],
    instructions: [
        "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        "In a large bowl, whisk together flour, sugar, cocoa powder, baking powder, baking soda, and salt.",
        "Add eggs, milk, oil, and vanilla; beat on medium speed for 2 minutes.",
        "Stir in boiling water (batter will be thin). Pour into prepared pans.",
        "Bake for 30-35 minutes until a toothpick inserted comes out clean.",
        "Cool in pans for 10 minutes, then remove to wire racks to cool completely.",
        "For frosting: Beat butter until creamy, then gradually add powdered sugar, cocoa powder, cream, and vanilla until smooth and spreadable.",
        "Frost between layers, then top and sides of cake."
    ],
    tips: "For extra moisture, add a tablespoon of instant coffee to the boiling water. For a richer chocolate flavor, use Dutch-processed cocoa powder."
},

"Grilled Chicken": {
    prepTime: "15 mins",
    cookTime: "30 mins",
    serves: "4 people",
    difficulty: "Easy",
    image: "chicken.jpeg",
    ingredients: [
        "4 boneless, skinless chicken breasts",
        "3 tablespoons olive oil",
        "2 tablespoons lemon juice",
        "3 cloves garlic, minced",
        "1 teaspoon dried oregano",
        "1 teaspoon dried thyme",
        "1 teaspoon paprika",
        "½ teaspoon salt",
        "¼ teaspoon black pepper",
        "Fresh parsley for garnish"
    ],
    instructions: [
        "In a small bowl, combine olive oil, lemon juice, garlic, oregano, thyme, paprika, salt, and pepper.",
        "Place chicken breasts in a large resealable bag and pour marinade over them.",
        "Seal bag and massage to distribute marinade evenly. Refrigerate for at least 30 minutes, up to 4 hours.",
        "Preheat grill to medium-high heat (about 375-450°F).",
        "Remove chicken from marinade and discard the remaining liquid.",
        "Grill chicken for 5-7 minutes per side, or until internal temperature reaches 165°F.",
        "Let rest for 5 minutes before serving to allow juices to redistribute.",
        "Garnish with fresh parsley and serve with lemon wedges if desired."
    ],
    tips: "For juicier chicken, pound the breasts to an even thickness before marinating. Don't move the chicken too much while grilling to get those perfect grill marks."
},

"Butter Chicken": {
    prepTime: "20 mins",
    cookTime: "40 mins",
    serves: "6 people",
    difficulty: "Medium",
    image: "curry.jpeg",
    ingredients: [
        "2 lbs boneless chicken thighs, cut into 1-inch pieces",
        "For the marinade: 1 cup plain yogurt, 2 tbsp lemon juice, 2 tsp ground cumin, 2 tsp ground red chili powder, 2 tsp garam masala, 1 tbsp ginger paste, 1 tbsp garlic paste",
        "3 tbsp butter or ghee",
        "1 large onion, finely chopped",
        "3 garlic cloves, minced",
        "1 tbsp ginger, grated",
        "1 cinnamon stick",
        "2 tsp ground cumin",
        "2 tsp garam masala",
        "1 tsp ground coriander",
        "14 oz (400g) tomato puree",
        "1 cup heavy cream",
        "2 tbsp sugar",
        "Salt to taste",
        "Fresh cilantro for garnish"
    ],
    instructions: [
        "Mix all marinade ingredients together in a large bowl. Add chicken pieces and coat well. Cover and refrigerate for at least 1 hour, preferably overnight.",
        "In a large skillet or Dutch oven, melt butter over medium heat. Add onions and sauté until soft and translucent, about 5 minutes.",
        "Add garlic and ginger, cook for 1 minute until fragrant. Then add cinnamon stick, cumin, garam masala, and coriander. Stir for 30 seconds.",
        "Add the marinated chicken (with marinade) and cook for 5-8 minutes until the chicken starts to turn white on the outside.",
        "Add tomato puree and bring to a simmer. Cover and cook for 15 minutes, stirring occasionally.",
        "Stir in heavy cream and sugar. Simmer uncovered for 10-15 minutes until chicken is fully cooked and sauce has thickened.",
        "Season with salt to taste. Remove cinnamon stick before serving.",
        "Garnish with fresh cilantro and serve with naan bread and rice."
    ],
    tips: "For authentic flavor, use Kashmiri chili powder which gives a vibrant color without too much heat. If you want a smoother sauce, blend the sauce before adding the chicken back in."
},

"Pasta Carbonara": {
    prepTime: "10 mins",
    cookTime: "15 mins",
    serves: "4 people",
    difficulty: "Easy",
    image: "pasta.jpeg",
    ingredients: [
        "1 pound (450g) spaghetti",
        "3½ oz (100g) pancetta or guanciale, diced",
        "2 tablespoons olive oil",
        "4 large eggs, room temperature",
        "1 cup (100g) Pecorino Romano cheese, freshly grated",
        "½ cup (50g) Parmigiano Reggiano, freshly grated",
        "Freshly ground black pepper",
        "Salt for pasta water"
    ],
    instructions: [
        "Bring a large pot of heavily salted water to a boil. Add pasta and cook until al dente according to package directions.",
        "While pasta is cooking, heat olive oil in a large skillet over medium heat. Add pancetta and cook until crispy, about 5-7 minutes.",
        "In a bowl, whisk together eggs, both cheeses, and plenty of freshly ground black pepper.",
        "When pasta is done, reserve 1 cup of pasta water, then drain pasta.",
        "Working quickly, add hot pasta to the skillet with pancetta (off heat). Toss to coat in the rendered fat.",
        "Immediately add the egg and cheese mixture, stirring constantly. The residual heat will cook the eggs into a creamy sauce. If it's too thick, add a splash of reserved pasta water.",
        "Serve immediately with extra grated cheese and freshly ground black pepper on top."
    ],
    tips: "The key to perfect carbonara is timing. Add the egg mixture when the pasta is hot enough to cook the eggs but not so hot that they scramble. Never add cream - authentic carbonara gets its creaminess from the eggs and cheese."
},

"Fried Rice": {
    prepTime: "15 mins",
    cookTime: "15 mins",
    serves: "4 people",
    difficulty: "Easy",
    image: "fried rice.jpeg",
    ingredients: [
        "3 cups cooked long-grain rice, cold (preferably day-old)",
        "2 tablespoons vegetable oil",
        "2 eggs, beaten",
        "1 small onion, diced",
        "2 cloves garlic, minced",
        "1 cup mixed vegetables (peas, carrots, corn)",
        "½ cup green onions, chopped",
        "2 tablespoons soy sauce",
        "1 tablespoon oyster sauce (optional)",
        "1 teaspoon sesame oil",
        "¼ teaspoon white pepper",
        "Optional protein: 1 cup diced chicken, shrimp, or tofu"
    ],
    instructions: [
        "Heat 1 tablespoon oil in a large wok or skillet over medium-high heat. Add beaten eggs and scramble until just set, about 30 seconds. Remove and set aside.",
        "Add remaining oil to the wok. Add onions and cook until translucent, about 2 minutes.",
        "Add garlic and cook for 30 seconds until fragrant.",
        "If using protein, add now and cook until nearly done.",
        "Add mixed vegetables and stir-fry for 2-3 minutes until tender-crisp.",
        "Add cold rice, breaking up any clumps. Stir-fry for 3-4 minutes until rice is heated through.",
        "Add scrambled eggs back to the wok. Pour soy sauce, oyster sauce if using, and sesame oil over the rice. Toss everything together.",
        "Season with white pepper and fold in green onions. Cook for another minute.",
        "Taste and adjust seasonings as needed before serving."
    ],
    tips: "Using cold, day-old rice prevents the fried rice from becoming mushy. If you don't have leftover rice, cook fresh rice, spread it on a baking sheet, and refrigerate for at least 1 hour before using."
},

"Street Tacos": {
    prepTime: "15 mins",
    cookTime: "15 mins",
    serves: "4 people (8 tacos)",
    difficulty: "Easy",
    image: "tacos.jpeg",
    ingredients: [
        "1 pound (450g) skirt or flank steak",
        "8 small corn tortillas",
        "For the marinade: 3 tbsp lime juice, 2 cloves garlic (minced), 2 tbsp vegetable oil, 1 tsp ground cumin, ½ tsp dried oregano, ½ tsp chili powder, salt and pepper",
        "For the toppings: 1 small white onion (finely diced), ½ cup fresh cilantro (chopped), 2 limes (cut into wedges)",
        "Optional: sliced radishes, diced avocado, salsa verde"
    ],
    instructions: [
        "Mix all marinade ingredients in a bowl. Add steak and coat well. Marinate for at least 30 minutes, up to 4 hours.",
        "Heat a grill or cast-iron skillet over high heat until very hot. Remove steak from marinade and pat dry.",
        "Cook steak for 3-4 minutes per side for medium-rare (adjust time based on thickness and desired doneness).",
        "Let meat rest for 5-10 minutes, then slice thinly against the grain.",
        "While meat is resting, warm tortillas on a dry skillet or directly over a gas flame for about 30 seconds per side.",
        "Stack two tortillas together for each taco, top with sliced steak, diced onion, and chopped cilantro.",
        "Serve immediately with lime wedges and optional toppings."
    ],
    tips: "For authentic street tacos, use two corn tortillas per taco and keep the toppings simple - just onion, cilantro, and lime juice. The quality of the meat matters - choose a well-marbled cut and don't overcook it."
},

"Pizza": {
    prepTime: "30 mins + 1 hour rise",
    cookTime: "15 mins",
    serves: "4 people (1 large pizza)",
    difficulty: "Intermediate",
    image: "pizza.jpeg",
    ingredients: [
        "For the dough: 3½ cups (500g) bread flour, 1 tsp instant yeast, 2 tsp salt, 1½ cups (350ml) warm water, 2 tbsp olive oil",
        "For the sauce: 1 can (14oz/400g) crushed tomatoes, 2 cloves garlic (minced), 1 tbsp olive oil, 1 tsp dried oregano, ½ tsp salt",
        "For the toppings: 2 cups (200g) shredded mozzarella cheese, ¼ cup fresh basil leaves",
        "Optional toppings: pepperoni, mushrooms, bell peppers, olives, onions"
    ],
    instructions: [
        "For the dough: In a large bowl, combine flour, yeast, and salt. Add warm water and olive oil, mix until a shaggy dough forms.",
        "Turn onto a floured surface and knead for 8-10 minutes until smooth and elastic.",
        "Place dough in an oiled bowl, cover, and let rise in a warm place for about 1 hour or until doubled in size.",
        "Meanwhile, make the sauce: In a small saucepan, heat olive oil over medium heat. Add garlic and cook for 30 seconds until fragrant.",
        "Add crushed tomatoes, oregano, and salt. Simmer for 15 minutes, then cool.",
        "Preheat oven to highest setting (usually 500°F/260°C) with a pizza stone or inverted baking sheet inside.",
        "Punch down dough and stretch or roll into a 14-inch circle on parchment paper.",
        "Spread sauce over dough, leaving a ½-inch border. Top with cheese and desired toppings.",
        "Transfer pizza with parchment onto the preheated stone/sheet. Bake for 10-15 minutes until crust is golden and cheese is bubbly.",
        "Top with fresh basil leaves before serving."
    ],
    tips: "For the best crust, use high-protein bread flour and let your oven preheat for at least 30 minutes. Don't overload with toppings, as this can make the pizza soggy. If you have time, let the dough rise overnight in the refrigerator for better flavor development."
},

"Doughnuts": {
    prepTime: "30 mins + 1.5 hours rise",
    cookTime: "10 mins",
    serves: "12 doughnuts",
    difficulty: "Intermediate",
    image: "doughnuts.jpeg",
    ingredients: [
        "3½ cups (500g) all-purpose flour",
        "¼ cup (50g) granulated sugar",
        "2¼ tsp instant yeast (1 packet)",
        "½ tsp salt",
        "¾ cup (180ml) whole milk, warm",
        "¼ cup (60ml) water, warm",
        "¼ cup (60g) unsalted butter, melted",
        "2 large eggs, room temperature",
        "1 tsp vanilla extract",
        "Vegetable oil for frying",
        "For the glaze: 2 cups (240g) powdered sugar, ¼ cup milk, 1 tsp vanilla extract"
    ],
    instructions: [
        "In a large bowl, whisk together flour, sugar, yeast, and salt.",
        "In another bowl, combine warm milk, water, melted butter, eggs, and vanilla.",
        "Add wet ingredients to dry ingredients and mix until a soft dough forms.",
        "Knead for 5-7 minutes until smooth and elastic. Place in a greased bowl, cover, and let rise for 1 hour or until doubled.",
        "Punch down dough and turn onto a floured surface. Roll to ½-inch thickness.",
        "Cut out doughnuts using a 3-inch round cutter. Use a 1-inch cutter for centers. Re-roll scraps.",
        "Place doughnuts on parchment-lined baking sheets, cover, and let rise for 30 minutes.",
        "Meanwhile, prepare the glaze by whisking together powdered sugar, milk, and vanilla until smooth.",
        "Heat oil in a deep heavy pot to 350°F (175°C). Fry doughnuts 2-3 at a time, about 1-2 minutes per side until golden brown.",
        "Remove with a slotted spoon and drain on paper towels. While still warm, dip into glaze and place on a wire rack to set."
    ],
    tips: "Use a candy thermometer to maintain the oil temperature - too hot and they'll burn outside but be raw inside, too cool and they'll absorb too much oil. For variations, try cinnamon sugar coating or chocolate glaze, or fill them with jam or pastry cream."
}
};

// Get the specific recipe or use default text if recipe doesn't exist
const recipe = recipes[dishName] || {
prepTime: "30 mins",
cookTime: "45 mins",
serves: "4 people",
difficulty: "Medium", 
image: dishName.toLowerCase().replace(/ /g, '-') + ".jpeg",
ingredients: ["Main ingredient 1", "Main ingredient 2", "Main ingredient 3", "Main ingredient 4", "Main ingredient 5"],
instructions: ["Step 1 of the recipe preparation", "Step 2 of the recipe preparation", "Step 3 of the recipe preparation", "Step 4 of the recipe preparation"],
tips: "Special tips for making this dish perfect every time."
};

// Create ingredients list HTML
const ingredientsList = recipe.ingredients.map(item => `<li>${item}</li>`).join('');

// Create instructions list HTML
const instructionsList = recipe.instructions.map(item => `<li>${item}</li>`).join('');

// Populate modal with recipe content
modalBody.innerHTML = `
<h2>${dishName} Recipe</h2>
<div class="recipe-content">
    <div class="recipe-image">
        <img src="images/${recipe.image}" alt="${dishName}">
    </div>
    <div class="recipe-info">
        <div class="recipe-meta">
            <span><strong>Prep:</strong> ${recipe.prepTime}</span>
            <span><strong>Cook:</strong> ${recipe.cookTime}</span>
            <span><strong>Serves:</strong> ${recipe.serves}</span>
            <span><strong>Difficulty:</strong> ${recipe.difficulty}</span>
        </div>
        <h3>Ingredients</h3>
        <ul>${ingredientsList}</ul>
        <h3>Instructions</h3>
        <ol>${instructionsList}</ol>
        <div class="recipe-tips">
            <h4>Chef's Tips</h4>
            <p>${recipe.tips}</p>
        </div>
    </div>
</div>
`;
modal.classList.add('active');
document.body.style.overflow = 'hidden'; // Prevent scrolling
}

modalClose.addEventListener('click', () => {
modal.classList.remove('active');
document.body.style.overflow = ''; // Re-enable scrolling
});

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}
});

// Autoplay functionality
function startAutoplay() {
autoplayInterval = setInterval(() => {
    navigateToDish(currentDishIndex + 1);
}, 5000); // Change dish every 5 seconds
}

function resetAutoplay() {
clearInterval(autoplayInterval);
startAutoplay();
}

// Start autoplay when page loads
startAutoplay();

// Pause autoplay when user interacts with the section
const popularDishesSection = document.querySelector('.popular-dishes');
popularDishesSection.addEventListener('mouseenter', () => {
clearInterval(autoplayInterval);
});

popularDishesSection.addEventListener('mouseleave', () => {
startAutoplay();
});
});
  // Image upload preview functionality
  document.getElementById('image-upload').addEventListener('click', function() {
    document.getElementById('recipe-images').click();
});

document.getElementById('recipe-images').addEventListener('change', function(e) {
    const files = e.target.files;
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = '';

    for (let i = 0; i < Math.min(files.length, 3); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            previewContainer.appendChild(img);
        }
        
        reader.readAsDataURL(file);
    }
});

// Add ingredient functionality
document.getElementById('add-ingredient').addEventListener('click', function() {
    const container = document.getElementById('ingredients-container');
    const newRow = document.createElement('div');
    newRow.className = 'ingredient-row';
    newRow.innerHTML = `
        <input type="text" name="ingredient-quantity[]" class="form-control quantity-input" placeholder="Quantity" required>
        <input type="text" name="ingredient-name[]" class="form-control ingredient-input" placeholder="Ingredient" required>
    `;
    container.appendChild(newRow);
});

// Add instruction step functionality
document.getElementById('add-instruction').addEventListener('click', function() {
    const container = document.getElementById('instructions-container');
    const stepCount = container.children.length + 1;
    const newStep = document.createElement('div');
    newStep.className = 'instruction-item';
    newStep.innerHTML = `
        <div class="step-number">${stepCount}</div>
        <textarea name="instruction[]" class="form-control" placeholder="Describe this step..." required></textarea>
    `;
    container.appendChild(newStep);
});

// Form submission (placeholder for now)
document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for sharing your recipe! In a real implementation, this would be submitted to a server.');
    // In a real implementation, you would send the form data to a server
});
   // Image upload preview functionality
   document.getElementById('image-upload').addEventListener('click', function() {
    document.getElementById('tip-images').click();
});

document.getElementById('tip-images').addEventListener('change', function(e) {
    const files = e.target.files;
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = '';

    for (let i = 0; i < Math.min(files.length, 3); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            previewContainer.appendChild(img);
        }
        
        reader.readAsDataURL(file);
    }
});

// Form submission (placeholder for now)
document.getElementById('tip-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for sharing your cooking tip! In a real implementation, this would be submitted to a server.');
    // In a real implementation, you would send the form data to a server
});
  // Thumbnail upload preview functionality
  document.getElementById('thumbnail-upload').addEventListener('click', function() {
    document.getElementById('video-thumbnail').click();
});

document.getElementById('video-thumbnail').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewContainer = document.getElementById('thumbnail-preview');
        previewContainer.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.maxHeight = '200px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        previewContainer.appendChild(img);
    }
    
    reader.readAsDataURL(file);
});

// Form submission (placeholder for now)
document.getElementById('video-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for sharing your video! In a real implementation, this would be submitted to a server.');
    // In a real implementation, you would send the form data to a server
});
// Simple script for star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating .star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove('active');
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".newsletter-form");
    
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector("input[type='email']");
      const email = emailInput.value;
  
      try {
        const response = await fetch("https://culinary-map-api.onrender.com/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
  
        if (response.ok) {
          alert("Thank you for subscribing!");
          emailInput.value = "";
        } else {
          alert("Oops! Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error, please try again.");
      }
    });
  });
  