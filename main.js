// Function to load content from JSON files
async function loadContentFromJSON(jsonFilePath) {
  try {
    // First try to fetch the JSON using relative path
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(`Failed to load content from ${jsonFilePath}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON content:', error);
    
    // If running from file:// protocol, we can't use fetch due to CORS
    // Use the embedded fallback data instead
    if (window.location.protocol === 'file:') {
      console.log('Running from file:// protocol, using embedded fallback data');
      return getFallbackData(jsonFilePath);
    }
    return null;
  }
}

// Fallback data for when JSON can't be loaded due to CORS
function getFallbackData(jsonPath) {
  // Extract program name from the path
  const pathParts = jsonPath.split('/');
  const fileName = pathParts[pathParts.length - 1].replace('.json', '');
  
  // Return hardcoded data based on the file name
  if (fileName === 'dasara-play-date') {
    return {
      "pageTitle": "Dasara Play Date — Back to Roots",
      "siteTitle": "Back to Roots",
      "program": {
        "title": "Dasara Play Mela",
        "age": "Ages 6-15",
        "price": "Rs 399",
        "description": "Celebrate Dasara with a fun-filled play date at Back to Roots! Enjoy traditional games, craft activities, and festive treats in a vibrant courtyard setting. Perfect for kids aged 6-12 to experience the joy of Dasara through play and creativity.",
        "imagePath": "../assets/event-3/Dasara.png",
        "imageAlt": "Dasara Play Date"
      },
      "experience": {
        "title": "What You'll Experience",
        "items": [
          {
            "icon": "🪔",
            "title": "Dasara Circle Time",
            "description": "An engaging introduction to the Dasara festival, its history and cultural significance through interactive storytelling and visual aids."
          },
          {
            "icon": "💐",
            "title": "Garland Making",
            "description": "Learn the traditional art of tying flowers into garlands and decorations, a key element of Dasara celebrations that children can take home."
          },
          {
            "icon": "🎮",
            "title": "Kho Kho Playing Time",
            "description": "Experience the traditional game of Kho Kho, a popular outdoor activity during festivals that enhances coordination and social interaction."
          },
          {
            "icon": "🧘",
            "title": "Closing Circle",
            "description": "A calming wind-down session where children reflect on what they've learned, share experiences, and conclude with a simple traditional blessing ritual."
          }
        ]
      },
      "buttons": {
        "whatsapp": {
          "text": "Join / Enquire on WhatsApp",
          "url": "https://wa.me/918095803539?text=Hi%20Back%20To%20Roots%2C%20I%27m%20interested%20in%20the%20Dasara%20Play%20Mela.%20Please%20share%20details."
        },
        "programs": {
          "text": "Back to Programs",
          "url": "../index.html#programs"
        }
      },
      "practicalInfo": {
        "title": "Practical Info",
        "items": [
          {
            "label": "Age group",
            "value": "6 – 12 years"
          },
          {
            "label": "Timing",
            "value": "Festival special, 90 – 120 minutes"
          },
          {
            "label": "Fee",
            "value": "Rs 500 per child"
          },
          {
            "label": "What to bring",
            "value": "Comfortable clothes, water bottle, hat"
          }
        ]
      },
      "footer": {
        "copyright": "© Back to Roots"
      }
    };
  }
  
  if (fileName === 'grains-games-gratitude') {
    return {
      "pageTitle": "Grains, Games & Gratitude — Back to Roots",
      "siteTitle": "Back to Roots",
      "program": {
        "title": "Grains, Games & Gratitude",
        "age": "Ages 7-12",
        "price": "Rs 500",
        "description": "Create, learn, play, and give back! From crafting mandala art with millets to discovering their nutritional power, enjoying Lagori, and making a heartfelt gratitude card—this journey is all about creativity, tradition, and joy.",
        "imagePath": "../assets/event-2/program-2.jpeg",
        "imageAlt": "Children painting colourful mural"
      },
      "experience": {
        "title": "What You Will Experience",
        "items": [
          {
            "icon": "🌾",
            "title": "Millet Mandala Magic",
            "description": "Kids collect millets and create stunning mandala art."
          },
          {
            "icon": "🥗",
            "title": "Power of Millets",
            "description": "Learn about the nutritional value of millets and their benefits for each organ."
          },
          {
            "icon": "🏏",
            "title": "Lagori Fun Blast",
            "description": "Enjoy a traditional outdoor game that brings energy and teamwork."
          },
          {
            "icon": "💌",
            "title": "Gratitude from the Heart",
            "description": "Turn your mandala art into a gratitude card for loved ones."
          }
        ]
      },
      "buttons": {
        "whatsapp": {
          "text": "Join / Enquire on WhatsApp",
          "url": "https://wa.me/918095803539?text=Hi%20Back%20To%20Roots%2C%20I%27m%20interested%20in%20this%20playdate.%20Please%20share%20details."
        },
        "programs": {
          "text": "Back to Programs",
          "url": "../index.html#programs"
        }
      },
      "practicalInfo": {
        "title": "Practical Info",
        "items": [
          {
            "label": "Age groups",
            "value": "7 - 12 years"
          },
          {
            "label": "Timing",
            "value": "Morning sessions, 90 minutes"
          },
          {
            "label": "Fee",
            "value": "Rs 500 per child"
          },
          {
            "label": "What to bring",
            "value": "Comfortable clothes, water bottle, hat"
          }
        ]
      },
      "footer": {
        "copyright": "© Back to Roots"
      }
    };
  }
  
  if (fileName === 'ajjis-courtyard-adventures') {
    return {
      "pageTitle": "Ajji's Courtyard Adventures — Back to Roots",
      "siteTitle": "Back to Roots",
      "program": {
        "title": "Ajji's Courtyard Adventures",
        "age": "Ages 5-10",
        "price": "Rs 450",
        "description": "Step into Ajji's world of traditional wisdom and courtyard magic! Children will explore ancient practices, hear captivating stories, and experience the warmth of grandmother's love through hands-on activities and cultural immersion.",
        "imagePath": "../assets/event-1/Ajji_Courtyard.png",
        "imageAlt": "Ajji's Courtyard Adventures"
      },
      "experience": {
        "title": "What You'll Experience",
        "items": [
          {
            "icon": "👵",
            "title": "Ajji's Story Circle",
            "description": "Listen to enchanting traditional tales and folktales that have been passed down through generations."
          },
          {
            "icon": "🌿",
            "title": "Traditional Remedies",
            "description": "Learn about natural remedies and traditional healing practices from Ajji's treasure trove of wisdom."
          },
          {
            "icon": "🏡",
            "title": "Courtyard Exploration",
            "description": "Discover the magic of traditional courtyard life and its connection to nature and community."
          },
          {
            "icon": "🎨",
            "title": "Cultural Crafts",
            "description": "Create beautiful traditional crafts and take home a piece of cultural heritage."
          }
        ]
      },
      "buttons": {
        "whatsapp": {
          "text": "Join / Enquire on WhatsApp",
          "url": "https://wa.me/918095803539?text=Hi%20Back%20To%20Roots%2C%20I%27m%20interested%20in%20Ajji%27s%20Courtyard%20Adventures.%20Please%20share%20details."
        },
        "programs": {
          "text": "Back to Programs",
          "url": "../index.html#programs"
        }
      },
      "practicalInfo": {
        "title": "Practical Info",
        "items": [
          {
            "label": "Age group",
            "value": "5 – 10 years"
          },
          {
            "label": "Timing",
            "value": "Weekend sessions, 75 minutes"
          },
          {
            "label": "Fee",
            "value": "Rs 450 per child"
          },
          {
            "label": "What to bring",
            "value": "Comfortable clothes, water bottle, notebook"
          }
        ]
      },
      "footer": {
        "copyright": "© Back to Roots"
      }
    };
  }
  
  // Return empty data if no matching program found
  console.warn(`No fallback data for ${fileName}`);
  return null;
}

// Function to safely query elements and handle null cases
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Error querying selector "${selector}":`, error);
    return null;
  }
}

// Function to safely access child nodes
function safeGetTextNode(element) {
  if (!element || !element.childNodes || element.childNodes.length === 0) {
    return null;
  }
  
  // Find the first text node
  for (let i = 0; i < element.childNodes.length; i++) {
    if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
      return element.childNodes[i];
    }
  }
  
  return null;
}

// Function to populate program page from JSON
async function populateProgramPage(jsonFilePath) {
  try {
    const content = await loadContentFromJSON(jsonFilePath);
    if (!content) {
      console.warn('No content loaded from JSON, aborting page population');
      return;
    }
    
    console.log('Populating page with content:', content);
    
    // Set page title if content has pageTitle
    if (content.pageTitle) {
      document.title = content.pageTitle;
    }
    
    // Populate program header
    if (content.program) {
      const programTitle = safeQuerySelector('#program-title');
      if (programTitle) {
        // Set title text
        const titleText = safeGetTextNode(programTitle);
        if (titleText) {
          titleText.nodeValue = content.program.title;
        } else {
          // If no text node exists, prepend new one
          programTitle.prepend(document.createTextNode(content.program.title));
        }
        
        // Set age and price pills
        const agePill = programTitle.querySelector('.pill--age');
        const pricePill = programTitle.querySelector('.pill--price');
        if (agePill && content.program.age) agePill.textContent = content.program.age;
        if (pricePill && content.program.price) pricePill.textContent = content.program.price;
      } else {
        console.warn('Program title element not found');
      }
      
      // Set description
      const description = safeQuerySelector('#program-description');
      if (description && content.program.description) {
        description.textContent = content.program.description;
      }
      
      // Set image
      const programImg = safeQuerySelector('.program-img img');
      if (programImg) {
        if (content.program.imagePath) programImg.src = content.program.imagePath;
        if (content.program.imageAlt) programImg.alt = content.program.imageAlt;
      }
    }
    
    // Populate experience section
    if (content.experience) {
      const experienceTitle = safeQuerySelector('#data-framer-2 h2');
      if (experienceTitle && content.experience.title) {
        experienceTitle.textContent = content.experience.title;
      }
      
      const experienceContainer = safeQuerySelector('.program-experience');
      if (experienceContainer && content.experience.items && Array.isArray(content.experience.items)) {
        // Clear existing items
        experienceContainer.innerHTML = '';
        
        // Add items from JSON
        content.experience.items.forEach(item => {
          if (!item) return;
          
          const expItem = document.createElement('div');
          expItem.className = 'exp-item';
          
          const icon = item.icon || '';
          const title = item.title || '';
          const description = item.description || '';
          
          expItem.innerHTML = `
            <div class="exp-item__body">
              <strong>${icon} ${title}</strong>
              <p style="margin:6px 0 0;">${description}</p>
            </div>
          `;
          
          experienceContainer.appendChild(expItem);
        });
      }
    }
    
    // Populate buttons
    if (content.buttons) {
      const buttonsContainer = safeQuerySelector('#program-buttons');
      if (buttonsContainer) {
        // Clear existing buttons
        buttonsContainer.innerHTML = '';
        
        // WhatsApp button
        if (content.buttons.whatsapp) {
          const whatsappBtn = document.createElement('a');
          whatsappBtn.href = content.buttons.whatsapp.url || '#';
          whatsappBtn.target = '_blank';
          whatsappBtn.rel = 'noopener noreferrer';
          whatsappBtn.className = 'btn btn--filled';
          whatsappBtn.style.cssText = 'background:#7AA43A; padding:12px 20px; border-radius:30px; font-weight:600; margin-right:10px; text-decoration:none; color:#fff; display:inline-block;';
          whatsappBtn.textContent = content.buttons.whatsapp.text || 'WhatsApp';
          buttonsContainer.appendChild(whatsappBtn);
        }
        
        // Programs button
        if (content.buttons.programs) {
          const programsBtn = document.createElement('a');
          programsBtn.href = content.buttons.programs.url || '#';
          programsBtn.className = 'btn btn--outline';
          programsBtn.style.cssText = 'border:2px solid #B8C988; padding:12px 20px; border-radius:30px; font-weight:600; color:#7B8B47; text-decoration:none; display:inline-block;';
          programsBtn.textContent = content.buttons.programs.text || 'Programs';
          buttonsContainer.appendChild(programsBtn);
        }
      }
    }
    
    // Populate practical info section
    if (content.practicalInfo && 1 == 0) {
      const infoTitle = safeQuerySelector('#data-framer-3 h3');
      if (infoTitle && content.practicalInfo.title) {
        infoTitle.textContent = content.practicalInfo.title;
      }
      
      const infoList = safeQuerySelector('#data-framer-3 ul');
      if (infoList && content.practicalInfo.items && Array.isArray(content.practicalInfo.items)) {
        // Clear existing items
        infoList.innerHTML = '';
        
        // Add items from JSON
        content.practicalInfo.items.forEach(item => {
          if (!item) return;
          
          const li = document.createElement('li');
          const strong = document.createElement('strong');
          strong.textContent = `${item.label || ''}:`;
          li.appendChild(strong);
          li.appendChild(document.createTextNode(` ${item.value || ''}`));
          infoList.appendChild(li);
        });
      }
    }
    
    // Set footer copyright
    if (content.footer) {
      const footer = safeQuerySelector('footer');
      if (footer && content.footer.copyright) {
        footer.textContent = content.footer.copyright;
      }
    }
    
    console.log('Page populated successfully');
  } catch (error) {
    console.error('Error populating page:', error);
  }
}

// Navigation/menu logic
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize nav element
  const nav = document.querySelector('.nav');
  const menuButton = document.querySelector('.nav__menu-button');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  let lastScroll = 0;
  
  // Mobile menu toggle
  if (menuButton) {
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('menu-open');
      document.body.classList.toggle('menu-open');
      // Debug log
      console.log('Menu button clicked, menu-open class:', nav.classList.contains('menu-open'));
    });
  }

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      // Debug log
      console.log('Mobile link clicked, menu closed');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('menu-open') && 
        !e.target.closest('.nav__mobile-menu') && 
        !e.target.closest('.nav__menu-button')) {
      nav.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      // Debug log
      console.log('Clicked outside, menu closed');
    }
  });
  
  // Hide header on scroll down, show on scroll up
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('nav--hidden');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('nav--hidden')) {
      // Scroll Down
      nav.classList.add('nav--hidden');
    } else if (currentScroll < lastScroll && nav.classList.contains('nav--hidden')) {
      // Scroll Up
      nav.classList.remove('nav--hidden');
    }
    
    lastScroll = currentScroll;
  });
  
  // Debug log
  console.log('Navigation initialized');
});

// Photo strip marquee
(function() {
  const strip = document.getElementById('photoStrip');
  if (!strip) return;

  // Wrap existing items into a rail element for duplication
  const rail = document.createElement('div');
  rail.className = 'photo-strip__rail';

  // move children into rail
  while (strip.firstChild) {
    rail.appendChild(strip.firstChild);
  }

  // clone rail content to create seamless loop
  const railClone = rail.cloneNode(true);
  strip.appendChild(rail);
  strip.appendChild(railClone);

  let paused = false;
  let speed = 40; // pixels per second
  let pos = 0;
  let lastTime = null;

  function step(timestamp) {
    if (paused) { lastTime = timestamp; requestAnimationFrame(step); return; }
    if (lastTime == null) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000; // seconds
    lastTime = timestamp;
    pos += speed * delta;

    // When pos exceeds width of first rail, wrap
   /*  const railWidth = rail.scrollWidth;
    if (pos >= railWidth) {
      pos -= railWidth;
    } */

    strip.scrollLeft = Math.floor(pos);
    requestAnimationFrame(step);
  }

  strip.addEventListener('mouseenter', () => { paused = true; });
  strip.addEventListener('mouseleave', () => { paused = false; });

  // start animation
  requestAnimationFrame(step);
})();

// Testimonial carousel
(function() {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;
  const items = Array.from(carousel.querySelectorAll('.testimonial-item'));
  let current = 0;
  let timer = null;
  const interval = 1500;

  function show(index) {
    items.forEach((it, i) => it.classList.toggle('active', i === index));
    // update aria-live by moving focusable element if needed
  }

  function start() {
    if (timer) return;
    timer = setInterval(() => {
      current = (current + 1) % items.length;
      show(current);
    }, interval);
  }

  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // initialize
  show(0);
  start();
})();

// Auto-load program content from JSON if this is a program page
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Check if this is a program page by looking for program elements
    const programTitle = document.querySelector('#program-title');
    const isProgramPage = programTitle !== null;
    
    if (!isProgramPage) {
      console.log('Not a program page, skipping content loading');
      return;
    }
    
    console.log('Program page detected, loading content');
    
    // First check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const jsonParam = urlParams.get('prgm');
    if (jsonParam) {
      const jsonPath = `../data/${jsonParam}.json`;
      console.log(`Using JSON file from URL parameter: ${jsonPath}`);
      populateProgramPage(jsonPath);
      return;
    }
    
    // Second, check if there's a specific content source defined in meta tags
    const metaContentSource = document.querySelector('meta[name="content-source"]');
    if (metaContentSource && metaContentSource.getAttribute('content')) {
      const jsonPath = metaContentSource.getAttribute('content');
      console.log(`Using content source from meta tag: ${jsonPath}`);
      populateProgramPage(jsonPath);
      return;
    }
    
    // If no meta tag or URL parameter, extract program name from URL path
    const path = window.location.pathname;
    const programFileName = path.split('/').pop().replace('.html', '');
    
    // Load corresponding JSON file
    const jsonPath = `../data/${programFileName}.json`;
    console.log(`Using derived JSON path: ${jsonPath}`);
    populateProgramPage(jsonPath);
  } catch (error) {
    console.error('Error in auto-loading program content:', error);
  }
});
