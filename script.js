// Function to fetch coffee data
async function fetchData(endpoint) {
    try 
	{
        const response = await fetch(`https://api.sampleapis.com/coffee/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data.`);
        }
        const data = await response.json();
        return data;
    } catch (error) 
	{
        console.error('Error fetching data:', error);
    }
}

// Function to display data on the page
function displayData(data) {
    const contentDiv = document.getElementById("content");
    
    // Clear previous content
    contentDiv.innerHTML = '';

    // Loop through the data and create elements for each coffee item
    data.forEach(item => 
	{
        // Create a container for each coffee item
        const coffeeContainer = document.createElement('div');
        coffeeContainer.classList.add('coffee-item');

        // Create an image element and set its source
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        coffeeContainer.appendChild(image);

        // Create a heading element for the title
        const title = document.createElement('h2');
        title.textContent = item.title;
        coffeeContainer.appendChild(title);

        // Create a paragraph element for the description
        const description = document.createElement('p');
        description.textContent = item.description;
        coffeeContainer.appendChild(description);

        // Create an unordered list element for the ingredients
        const ingredientsList = document.createElement('ul');
        // Loop through the ingredients and create list items
        item.ingredients.forEach(ingredient => 
		{
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = ingredient;
            ingredientsList.appendChild(ingredientItem);
        });
        coffeeContainer.appendChild(ingredientsList);

        // Append the coffee container to the content div
        contentDiv.appendChild(coffeeContainer);
    });
}

// Event listeners for navigation links
document.getElementById('hot-coffee-link').addEventListener('click', async () => 
{
    const hotCoffeeData = await fetchData('hot');
    displayData(hotCoffeeData);
});

document.getElementById('ice-coffee-link').addEventListener('click', async () => 
{
    const iceCoffeeData = await fetchData('iced');
    displayData(iceCoffeeData);
});
