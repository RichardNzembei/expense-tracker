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
// Function to update the text inside the .multiples span
function updateWelcomeText() {
    var welcomeSpan = document.querySelector('.multiples');
    var welcomeText = 'money tracker expenses manager and savings';

    welcomeSpan.textContent = welcomeText;
}

// Call the function when the page loads to update the welcome text
window.onload = function() {
    updateWelcomeText();
};
document.addEventListener("DOMContentLoaded", function() {
    // Load targets from local storage when the page loads
    loadTargets();

    // Add event listener to form submission
    document.getElementById("targetsForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        var description = document.getElementById("targetDescription").value;
        var amount = document.getElementById("targetAmount").value;
        var deadline = document.getElementById("targetDeadline").value;
        var email = document.getElementById("emailInput").value;

        // Validate form inputs (add your validation logic here)

        // Create target object
        var target = {
            description: description,
            amount: amount,
            deadline: deadline,
            achieved: false // Initialize achieved status to false
        };

        // Save target to local storage
        saveTarget(target);

        // Clear form fields
        document.getElementById("targetDescription").value = "";
        document.getElementById("targetAmount").value = "";
        document.getElementById("targetDeadline").value = "";
    });
});

function saveTarget(target) {
    // Get existing targets from local storage or initialize an empty array
    var targets = JSON.parse(localStorage.getItem("targets")) || [];

    // Add the new target to the array
    targets.push(target);

    // Save the updated array back to local storage
    localStorage.setItem("targets", JSON.stringify(targets));

    // Display the updated list of targets
    displayTargets();
}

function loadTargets() {
    // Get targets from local storage
    var targets = JSON.parse(localStorage.getItem("targets")) || [];

    // Display targets
    displayTargets();
}

function displayTargets() {
    // Get targets from local storage
    var targets = JSON.parse(localStorage.getItem("targets")) || [];

    // Get the containers for displaying targets
    var undoneTargetsList = document.getElementById("undoneTargetsList");
    var doneTargetsList = document.getElementById("doneTargetsList");

    // Clear the containers
    undoneTargetsList.innerHTML = "";
    doneTargetsList.innerHTML = "";

    // Display each target
    targets.forEach(function(target, index) {
        // Create a div for the target
        var targetDiv = document.createElement("div");
        targetDiv.classList.add("target");

        // Display target details
        targetDiv.innerHTML = `
            <input type="checkbox" id="target${index}" ${target.achieved ? "checked" : ""}>
            <label for="target${index}">${target.description} - ${target.amount} by ${target.deadline}</label>
        `;

        // Add event listener to the checkbox to update achieved status
        targetDiv.querySelector("input[type='checkbox']").addEventListener("change", function() {
            // Update achieved status of the target
            targets[index].achieved = this.checked;

            // Save updated targets to local storage
            localStorage.setItem("targets", JSON.stringify(targets));

            // Re-display targets
            displayTargets();
        });

        // Append the target div to the appropriate container
        if (target.achieved) {
            doneTargetsList.appendChild(targetDiv);
        } else {
            undoneTargetsList.appendChild(targetDiv);
        }
    });
}
// JavaScript for managing savings

// Variable to track whether all savings are shown
var allSavingsShown = false;

// Function to toggle the dropdown menu
function toggleDropdown() {
    document.querySelector(".dropdown-content").classList.toggle("show");
}
document.addEventListener('DOMContentLoaded', function() {
    const MAX_RECENT_SAVINGS = 3;

    // Event listener for the Add Savings button
    const addSavingsForm = document.getElementById('savingsForm');
    if (addSavingsForm) {
        addSavingsForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Call the function to add savings and store it in local storage
            addSavingsAndStore();
        });
    } else {
        console.error('Savings form element not found.');
    }

    // Load and display initial savings list on page load
    const savedSavings = localStorage.getItem('savingsList');
    let savingsList = savedSavings ? JSON.parse(savedSavings) : [];
    updateSavingsList(savingsList);

    // Function to add savings to local storage and update the savings list
    function addSavingsAndStore() {
        // Get savings details
        var savingsMethod = document.getElementById("savingsMethod").value;
        var savingsDate = document.getElementById("savingsDate").value;
        var savingsAmount = document.getElementById("savingsAmount").value;

        // Construct an object representing the savings
        var newSavings = {
            method: savingsMethod,
            date: savingsDate,
            amount: savingsAmount
        };

        // Add the new savings to the savings list
        savingsList.push(newSavings);

        // Store the updated savings list in local storage
        localStorage.setItem("savingsList", JSON.stringify(savingsList));

        // Clear the input fields
        document.getElementById("savingsMethod").value = "";
        document.getElementById("savingsDate").value = "";
        document.getElementById("savingsAmount").value = "";

        // Update the display with the new savings
        updateSavingsList(savingsList);
    }

    // Function to update the savings list
    function updateSavingsList(savingsList) {
        const recentSavingsListElement = document.getElementById('recentSavings');
        const showAllSavingsPlaceholder = document.getElementById('showAllSavingsPlaceholder');
        if (!recentSavingsListElement || !showAllSavingsPlaceholder) {
            console.error('Recent savings list or Show All Savings placeholder not found.');
            return;
        }

        // Clear existing list items
        recentSavingsListElement.innerHTML = '';
        showAllSavingsPlaceholder.innerHTML = '';

        // Determine the number of recent savings to display
        const numSavingsToShow = Math.min(savingsList.length, MAX_RECENT_SAVINGS);

        // Create and append new list items for each recent savings
        for (let i = 0; i < numSavingsToShow; i++) {
            const savings = savingsList[i];
            const listItem = document.createElement('div');
            listItem.textContent = `${savings.method} - ${savings.date}: ksh${savings.amount}`;
            recentSavingsListElement.appendChild(listItem);
        }

        // Show "Show All Savings" button if there are more than MAX_RECENT_SAVINGS savings
        if (savingsList.length > MAX_RECENT_SAVINGS) {
            const showAllButton = document.createElement('button');
            showAllButton.textContent = 'Show All Savings';
            showAllButton.addEventListener('click', function() {
                displayAllSavings(savingsList);
            });
            showAllSavingsPlaceholder.appendChild(showAllButton);
        }
    }

    // Function to display all savings
    function displayAllSavings(savingsList) {
        // Clear existing list items
        const recentSavingsListElement = document.getElementById('recentSavings');
        recentSavingsListElement.innerHTML = '';

        // Create and append new list items for all savings
        savingsList.forEach(function(savings) {
            const listItem = document.createElement('div');
            listItem.textContent = `${savings.method} - ${savings.date}: ksh${savings.amount}`;
            recentSavingsListElement.appendChild(listItem);
        });

        // Clear the "Show All Savings" button
        const showAllSavingsPlaceholder = document.getElementById('showAllSavingsPlaceholder');
        showAllSavingsPlaceholder.innerHTML = '';

        // Create and append the "Hide Savings" button
        const hideSavingsButton = document.createElement('button');
        hideSavingsButton.textContent = 'Hide Savings';
        hideSavingsButton.addEventListener('click', function() {
            // Update the display with the last 3 savings
            updateSavingsList(savingsList.slice(-3));
        });
        showAllSavingsPlaceholder.appendChild(hideSavingsButton);
    }

    // Call the renderSavingsChart function with the savingsList data
    renderSavingsChart(savingsList);
});

// Function to generate savings data for the chart
function generateSavingsChartData(savingsList) {
    // Initialize an object to store total savings for each month
    const monthlySavings = {};

    // Loop through savingsList to calculate total savings for each month
    savingsList.forEach(function(savings) {
        const date = new Date(savings.date);
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        if (monthlySavings[monthYear]) {
            monthlySavings[monthYear] += parseFloat(savings.amount);
        } else {
            monthlySavings[monthYear] = parseFloat(savings.amount);
        }
    });

    // Convert monthlySavings object into arrays for Chart.js
    const labels = Object.keys(monthlySavings);
    const data = Object.values(monthlySavings);

    return { labels, data };
}

// Function to render the savings chart
function renderSavingsChart(savingsList) {
    const chartData = generateSavingsChartData(savingsList);

    // Get the canvas element
    const ctx = document.getElementById('savingsChart').getContext('2d');

    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Total Savings per Month',
                data: chartData.data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
// Call updateSavingsList function when the page loads to display existing savings
window.onload = updateSavingsList;