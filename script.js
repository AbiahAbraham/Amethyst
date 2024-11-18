document.addEventListener('DOMContentLoaded', () => {
    // Select all the plus icons
    const plusIcons = document.querySelectorAll('.plus-icon');

    // Add click event listener to each plus icon
    plusIcons.forEach((plusIcon) => {
        plusIcon.addEventListener('click', () => {
            const card = plusIcon.closest('.card'); // Get the card where the plus icon was clicked
            const ul = card.querySelector('ul'); // Get the ul element in that card

            // Prompt the user for the task text
            const taskText = prompt('Enter the new task:');

            if (taskText) {
                // Create a new list item for the task
                const newLi = document.createElement('li');
                newLi.classList.add('task-item'); // Add task-item class for consistent styling
                newLi.innerHTML = `
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text">${taskText}</span>
                    <button class="icon-btn"><span class="icon">🗑️</span></button>
                `;

                // Append the new task to the ul
                ul.appendChild(newLi);

                // Add event listener to the new checkbox for toggling 'completed'
                const checkbox = newLi.querySelector('.task-checkbox');
                checkbox.addEventListener('change', (event) => {
                    const taskText = event.target.nextElementSibling;
                    taskText.classList.toggle('completed', event.target.checked);
                });

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

    // Add event listener to task checkboxes for toggling 'completed' class
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const taskText = event.target.nextElementSibling; // Select the task text element
            taskText.classList.toggle('completed', event.target.checked); // Toggle 'completed' class
        });
    });

    // Select all list names for inline editing
    const listNames = document.querySelectorAll('.list-name');
    listNames.forEach((listName) => {
        listName.addEventListener('focus', () => {
            listName.dataset.previousValue = listName.textContent; // Store original value
        });

        listName.addEventListener('blur', () => {
            // Save the edited name
            const newName = listName.textContent.trim();
            if (newName === '') {
                // Revert to previous value if empty
                listName.textContent = listName.dataset.previousValue;
                alert('List name cannot be empty.');
            } else {
                console.log(`List name updated to: ${newName}`);
            }
        });
    });
});
