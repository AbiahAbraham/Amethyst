document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('completion-modal');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    const modalContent = modal.querySelector('.modal-message');
    const modalImage = modal.querySelector('img'); // Optional: Check if an image exists

    // Function to show the modal
    const showModal = (message) => {
        // Set the dynamic message
        modalContent.textContent = message;

        // Show the modal
        modal.style.display = 'flex';

        // Optional: Start the scaling animation if the image exists
        if (modalImage) {
            let scaleFactor = 1;
            const scaleImage = () => {
                scaleFactor = scaleFactor === 1 ? 0.8 : 1;
                modalImage.style.transform = `scale(${scaleFactor})`;
            };

            modalImage.style.transition = 'transform 0.5s ease';
            const intervalId = setInterval(scaleImage, 500);

            // Stop animation and hide modal after 4 seconds
            setTimeout(() => {
                clearInterval(intervalId);
                modal.style.display = 'none';
            }, 4000);
        } else {
            // Hide the modal without animation after 4 seconds
            setTimeout(() => {
                modal.style.display = 'none';
            }, 4000);
        }
    };

    // Event listener for close button
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Manually close the modal
    });

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

                    if (event.target.checked) {
                        showModal('Task completed!'); // Show modal when task is checked
                    }
                });

                // Add functionality to the new trash icon to delete the task
                const trashIcon = newLi.querySelector('.icon-btn');
                trashIcon.addEventListener('click', () => {
                    newLi.remove(); // Remove the list item when trash icon is clicked
                    showModal('Task deleted!'); // Show modal after task is deleted
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
            showModal('Task deleted!'); // Show modal after task is deleted
        });
    });

    // Add event listener to task checkboxes for toggling 'completed' class
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const taskText = event.target.nextElementSibling; // Select the task text element
            taskText.classList.toggle('completed', event.target.checked); // Toggle 'completed' class

            if (event.target.checked) {
                showModal(`Congratulations! Task completed: "${taskText.textContent}"`);
            }
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
