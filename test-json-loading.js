// Test script to verify JSON content loading
console.log('Testing JSON content loading...');

// Check if the required DOM elements exist
function checkElements() {
  const elements = {
    programTitle: document.querySelector('#program-title'),
    programDescription: document.querySelector('#program-description'),
    programImage: document.querySelector('.program-img img'),
    experienceContainer: document.querySelector('.program-experience'),
    buttonsContainer: document.querySelector('#program-buttons'),
    practicalInfoList: document.querySelector('#data-framer-3 ul'),
    footer: document.querySelector('footer')
  };
  
  let allElementsExist = true;
  
  for (const [name, element] of Object.entries(elements)) {
    if (!element) {
      console.error(`Missing element: ${name}`);
      allElementsExist = false;
    } else {
      console.log(`Found element: ${name}`);
    }
  }
  
  return allElementsExist;
}

// Test JSON loading
async function testJsonLoading() {
  try {
    const jsonPath = '../data/dasara-play-date.json';
    console.log(`Loading JSON from ${jsonPath}`);
    
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('JSON loaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
}

// Run tests when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, running tests...');
  
  // Test 1: Check if all required elements exist
  const elementsExist = checkElements();
  console.log('All elements exist:', elementsExist);
  
  // Test 2: Try loading the JSON file
  const jsonData = await testJsonLoading();
  console.log('JSON data loaded:', !!jsonData);
  
  // Test 3: Check if content is populated correctly
  setTimeout(() => {
    console.log('Checking if content is populated...');
    
    // Check program title
    const programTitle = document.querySelector('#program-title');
    if (programTitle && programTitle.textContent.includes(jsonData.program.title)) {
      console.log('Program title is correctly populated');
    } else {
      console.error('Program title is not correctly populated');
    }
    
    // Check experience items
    const experienceItems = document.querySelectorAll('.exp-item');
    if (experienceItems.length === jsonData.experience.items.length) {
      console.log('Experience items are correctly populated');
    } else {
      console.error('Experience items are not correctly populated');
    }
    
    // Check buttons
    const buttons = document.querySelectorAll('#program-buttons a');
    if (buttons.length === Object.keys(jsonData.buttons).length) {
      console.log('Buttons are correctly populated');
    } else {
      console.error('Buttons are not correctly populated');
    }
    
    // Check practical info
    const infoItems = document.querySelectorAll('#data-framer-3 ul li');
    if (infoItems.length === jsonData.practicalInfo.items.length) {
      console.log('Practical info items are correctly populated');
    } else {
      console.error('Practical info items are not correctly populated');
    }
    
    console.log('Test complete!');
  }, 1000); // Wait a second for the content to be populated
});