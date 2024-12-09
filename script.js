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
    
    plusIcons.forEach((plusIcon) => {
        plusIcon.addEventListener('click', () => {
            const card = plusIcon.closest('.card');
            const ul = card.querySelector('ul');
            const taskText = prompt('Enter the new task:');
    
            if (taskText) {
                const newLi = document.createElement('li');
                newLi.classList.add('task-item');
                newLi.innerHTML = `
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text">${taskText}</span>
                    <button class="icon-btn"><span class="icon">🗑️</span></button>
                `;
    
                ul.appendChild(newLi);
    
                // Add checkbox event listener
                const checkbox = newLi.querySelector('.task-checkbox');
                checkbox.addEventListener('change', (event) => {
                    const taskText = event.target.nextElementSibling;
                    taskText.classList.toggle('completed', event.target.checked);
    
                    if (event.target.checked) {
                        showModal(`Congratulations! You completed: "${taskText.textContent}"`);
                    }
                });
    
                // Add trash icon event listener
                const trashIcon = newLi.querySelector('.icon-btn');
                trashIcon.addEventListener('click', () => {
                    newLi.remove(); // Removes the task item
                });
            }
        });
    });

    // Add event listener to task checkboxes for toggling 'completed' class
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const taskText = event.target.nextElementSibling;
            taskText.classList.toggle('completed', event.target.checked);

            // Show a pop-up message if the checkbox is checked
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
            const newName = listName.textContent.trim();
            if (newName === '') {
                listName.textContent = listName.dataset.previousValue; // Revert to previous value if empty
                alert('List name cannot be empty.');
            } else {
                console.log(`List name updated to: ${newName}`);
            }
        });
    });
});
