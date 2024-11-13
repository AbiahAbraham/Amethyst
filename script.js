document.addEventListener('DOMContentLoaded', () => {
    // Select all the plus icons
    const plusIcons = document.querySelectorAll('.plus-icon');
    
    // Add click event listener to each plus icon
    plusIcons.forEach((plusIcon) => {
        plusIcon.addEventListener('click', () => {
            const card = plusIcon.closest('.card'); // Get the card where the plus icon was clicked
            const ul = card.querySelector('ul');    // Get the ul element in that card

            // Prompt the user for the task text
            const taskText = prompt('Enter the new task:');
            
            if (taskText) {
                // Create a new list item for the task
                const newLi = document.createElement('li');
                newLi.innerHTML = `
                    <span>${taskText}</span> 
                    <button class="icon-btn"><span class="icon">🗑️</span></button>
                `;

                // Append the new task to the ul
                ul.appendChild(newLi);

                // Add functionality to the new trash icon to delete the task
                const trashIcon = newLi.querySelector('.icon-btn');
                trashIcon.addEventListener('click', () => {
                    newLi.remove(); // Remove the list item when trash icon is clicked
                });
            }
        });
    });

    // Add event listener to existing trash icons for initial tasks
    const trashIcons = document.querySelectorAll('.icon-btn');

    trashIcons.forEach((trashIcon) => {
        trashIcon.addEventListener('click', (event) => {
            const li = event.target.closest('li'); // Find the closest li to the trash icon clicked
            li.remove(); // Remove the list item
        });
    });
});
