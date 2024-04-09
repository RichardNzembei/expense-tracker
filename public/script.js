document.addEventListener('DOMContentLoaded', function() {
    const MAX_RECENT_EXPENSES = 3;

    // Event listener for the Add Expense button
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Call the function to add expense and store it in local storage
            addExpenseAndStore();
        });
    } else {
        console.error('Add Expense button element not found.');
    }

    
  // Function to add expense to local storage and update the expenses list
  function addExpenseAndStore() {
    // Get expense details
    var expenseName = document.getElementById("expenseInput").value;
    var expenseAmount = document.getElementById("amountInput").value;
    var expenseDate = document.getElementById("dateInput").value;
    var expenseCategory = document.getElementById("categoryInput").value;

    // Construct an object representing the expense
    var newExpense = {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
        category: expenseCategory
    };

    // Get existing expenses from local storage or initialize an empty array
    var expensesList = localStorage.getItem("expensesList");
    expensesList = expensesList ? JSON.parse(expensesList) : [];

    // Add the new expense to the expenses list
    expensesList.push(newExpense);

    // Store the updated expenses list in local storage
    localStorage.setItem("expensesList", JSON.stringify(expensesList));

    // Update the display with the new expense
    updateExpensesList(expensesList);
}

function updateExpensesList(expensesList) {
    const recentExpensesListElement = document.getElementById('recentExpenses');
    if (!recentExpensesListElement) {
        console.error('Recent expenses list element not found.');
        return;
    }

    // Clear existing list items
    recentExpensesListElement.innerHTML = '';

    // Determine the number of recent expenses to display
    const numExpensesToShow = Math.min(expensesList.length, MAX_RECENT_EXPENSES);

    // Create and append new list items for each recent expense
    for (let i = 0; i < numExpensesToShow; i++) {
        const expense = expensesList[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name}: KSH${expense.amount} (${expense.date}) - ${expense.category}`;
        recentExpensesListElement.appendChild(listItem);
    }

    // Show "View All" link if there are more than MAX_RECENT_EXPENSES expenses
    if (expensesList.length > MAX_RECENT_EXPENSES) {
        const viewAllLink = document.createElement('a');
        viewAllLink.textContent = 'View All';
        viewAllLink.href = '#'; // Add the appropriate link to view all expenses
        viewAllLink.onclick = function() {
            // Display all expenses
            displayAllExpenses(expensesList);
            return false; // Prevent default link behavior
        };
        recentExpensesListElement.appendChild(viewAllLink);
    }
}



    // Function to display all expenses
    function displayAllExpenses(expensesList) {
        // Display all expenses as needed, for example, in a modal or a separate page
        console.log('All expenses:', expensesList);
        // You can implement your own logic to display all expenses here
        alert('All expenses displayed in console.');
    }

    // Retrieve and display expenses list from local storage on page load
    const storedExpenses = localStorage.getItem("expensesList");
    if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        updateExpensesList(parsedExpenses);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Function to handle form submission for registration
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        if (validateRegisterForm()) {
            // If form is valid, send data to backend using AJAX
            const formData = new FormData(registerForm);
            fetch('/register', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert('Registration successful!'); // Show success message
                    registerForm.reset(); // Reset form after successful registration
                } else {
                    alert('Registration failed. Please try again.'); // Show error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.'); // Show error message
            });
        }
    });

    // Function to handle form submission for login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        if (validateLoginForm()) {
            // If form is valid, send data to backend using AJAX
            const formData = new FormData(loginForm);
            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert('Login successful!'); // Show success message
                    loginForm.reset(); // Reset form after successful login
                } else {
                    alert('Login failed. Please check your credentials and try again.'); // Show error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.'); // Show error message
            });
        }
    });

    // Function to validate registration form fields
    function validateRegisterForm() {
        const username = registerForm.username.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value.trim();

        // Basic validation: check if fields are not empty
        if (username === '' || email === '' || password === '') {
            alert('Please fill in all fields.');
            return false; // Form is invalid
        }
        return true; // Form is valid
    }

    // Function to validate login form fields
    function validateLoginForm() {
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        // Basic validation: check if fields are not empty
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return false; // Form is invalid
        }
        return true; // Form is valid
    }
});
function registerUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // You can replace '/register' with the actual endpoint for registration
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
            document.getElementById('registerForm').reset();
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}

function loginUser() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // You can replace '/login' with the actual endpoint for login
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Login successful!');
            document.getElementById('loginForm').reset();
        } else {
            alert('Login failed. Please check your credentials and try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}






    // Function to update the displayed expenses list
    function updateExpensesList() {
        const expensesList = document.getElementById('expensesList');
        if (!expensesList) {
            console.error('Expenses list element not found.');
            return;
        }

        // Sort expenses by date and category
        expenses.sort((a, b) => {
            if (a.date !== b.date) {
                return new Date(a.date) - new Date(b.date);
            } else {
                return a.category.localeCompare(b.category);
            }
        });

        expensesList.innerHTML = ''; // Clear existing list items
        for (const expense of expenses) {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.description} - ${expense.amount} (${expense.category}) - ${expense.date}`;
            expensesList.appendChild(listItem);
        }
    }



    function toggleDropdown() {
        var dropdown = document.getElementById("myDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    }



window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const typed = new Typed('.multiples', {
      strings: ['Expense Tracker', 'Money Manager', 'Financial Planner'],
      typeSpeed: 100,
      loop: true,
      showCursor: false
  });
});


function addExpense(description, amount, category) {
  // Your existing code for adding expense to the list
  // ...

  // Send POST request to server to add expense to database
  fetch('/addExpense', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          description: description,
          amount: amount,
          category: category
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to add expense.');
      }
      return response.json();
  })
  .then(data => {
      console.log('Expense added successfully:', data);
      // Optionally, you can update the UI to reflect the newly added expense
  })
  .catch(error => {
      console.error('Error adding expense:', error);
  });
}
// JavaScript to toggle between images
window.addEventListener('load', function() {
    setInterval(toggleImages, 8000); // Change image every 8 seconds
});

function toggleImages() {
    const images = document.querySelectorAll('.multiple img');
    images.forEach(image => {
        image.classList.toggle('hidden');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savings = []; // Array to store savings

    // Function to add savings to the list
    function addSavings(method, date, amount) {
        if (!method || !date || isNaN(amount) || amount <= 0) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const saving = { method, date, amount };
        savings.push(saving);
        updateSavingsList();
    }

    // Function to update the displayed savings list
    function updateSavingsList() {
        const savingsList = document.getElementById('savingsList');
        if (!savingsList) {
            console.error('Savings list element not found.');
            return;
        }

        savingsList.innerHTML = ''; // Clear existing list items
        for (const saving of savings) {
            const listItem = document.createElement('div');
            listItem.textContent = `${saving.method} - ${saving.date}: $${saving.amount}`;
            savingsList.appendChild(listItem);
        }
    }

    // Event listener for the Add Savings form submission
    const addSavingsForm = document.getElementById('savingsForm');
    if (addSavingsForm) {
        addSavingsForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const method = document.getElementById('savingsMethod').value;
            const date = document.getElementById('savingsDate').value;
            const amount = parseFloat(document.getElementById('savingsAmount').value);

            addSavings(method, date, amount);

            // Clear the form fields after adding savings
            document.getElementById('savingsMethod').value = 'M-Shwari'; // Reset savings method
            document.getElementById('savingsDate').value = ''; // Reset date
            document.getElementById('savingsAmount').value = ''; // Reset amount
        });
    } else {
        console.error('Add Savings form element not found.');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const targets = []; // Array to store targets

    // Function to add target to the list
    function addTarget(description, amount, deadline, reminder) {
        if (!description || isNaN(amount) || amount <= 0 || !deadline || !reminder) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const target = { description, amount, deadline, reminder };
        targets.push(target);
        updateTargetsList();
    }

    // Function to update the displayed targets list
    function updateTargetsList() {
        const targetsList = document.getElementById('targetsList');
        if (!targetsList) {
            console.error('Targets list element not found.');
            return;
        }

        targetsList.innerHTML = ''; // Clear existing list items
        for (const target of targets) {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <strong>Description:</strong> ${target.description}<br>
                <strong>Target Amount:</strong> $${target.amount}<br>
                <strong>Deadline:</strong> ${target.deadline}<br>
                <strong>Reminder Date:</strong> ${target.reminder}<br>
                <hr>
            `;
            targetsList.appendChild(listItem);
        }
    }

    // Event listener for the Set Target form submission
    const addTargetForm = document.getElementById('targetsForm');
    if (addTargetForm) {
        addTargetForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const description = document.getElementById('targetDescription').value.trim();
            const amount = parseFloat(document.getElementById('targetAmount').value);
            const deadline = document.getElementById('targetDeadline').value;
            const reminder = document.getElementById('targetReminder').value;

            addTarget(description, amount, deadline, reminder);

            // Clear the form fields after adding target
            document.getElementById('targetDescription').value = '';
            document.getElementById('targetAmount').value = '';
            document.getElementById('targetDeadline').value = '';
            document.getElementById('targetReminder').value = '';
        });
    } else {
        console.error('Set Target form element not found.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve expenses list from local storage on page load
    let expensesList = JSON.parse(localStorage.getItem("expensesList")) || [];

    // Function to update the displayed expenses list based on filters
    function updateFilteredExpenses(categoryFilter, dateFilter) {
        // Filter expenses based on selected category and date
        let filteredExpenses = expensesList;
        if (categoryFilter) {
            filteredExpenses = filteredExpenses.filter(expense => expense.category === categoryFilter);
        }
        if (dateFilter) {
            filteredExpenses = filteredExpenses.filter(expense => expense.date === dateFilter);
        }

        // Display only the last five spendings
        const lastFiveExpenses = filteredExpenses.slice(-3);

        // Display filtered expenses in the "spendings" div
        const spendingsDiv = document.getElementById('spendings');
        if (!spendingsDiv) {
            console.error('Spendings div element not found.');
            return;
        }

        // Clear existing content
        spendingsDiv.innerHTML = '';

        // Display filtered expenses
        if (lastFiveExpenses.length > 0) {
            lastFiveExpenses.forEach(expense => {
                const expenseElement = document.createElement('div');
                expenseElement.textContent = `${expense.name}: KSH${expense.amount} (${expense.date}) - ${expense.category}`;
                spendingsDiv.appendChild(expenseElement);
            });
        } else {
            const noExpensesMessage = document.createElement('p');
            noExpensesMessage.textContent = 'No expenses found matching the selected filters.';
            spendingsDiv.appendChild(noExpensesMessage);
        }

        // Add a "Show All" button
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'Show All';
        showAllButton.addEventListener('click', function() {
            // Clear spendings div
            spendingsDiv.innerHTML = '';

            // Display all filtered expenses
            filteredExpenses.forEach(expense => {
                const expenseElement = document.createElement('div');
                expenseElement.textContent = `${expense.name}: KSH${expense.amount} (${expense.date}) - ${expense.category}`;
                spendingsDiv.appendChild(expenseElement);
            });

            // Add a "Hide" button
            const hideButton = document.createElement('button');
            hideButton.textContent = 'Hide';
            hideButton.addEventListener('click', function() {
                // Clear spendings div and display only the last five spendings
                updateFilteredExpenses(categoryFilter, dateFilter);
            });
            spendingsDiv.appendChild(hideButton);
        });
        spendingsDiv.appendChild(showAllButton);
    }

    // Event listener for the expense filter form submission
    const expenseFilterForm = document.getElementById('expenseFilterForm');
    if (expenseFilterForm) {
        expenseFilterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get selected filter values
            const categoryFilter = document.getElementById('categoryFilter').value;
            const dateFilter = document.getElementById('dateFilter').value;

            // Update the displayed expenses list based on filters
            updateFilteredExpenses(categoryFilter, dateFilter);
        });
    } else {
        console.error('Expense filter form element not found.');
    }

    // Update the initial display of expenses on page load
    updateFilteredExpenses(null, null);
});
