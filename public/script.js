var firebaseConfig = {
    apiKey: "AIzaSyD51C570ce5JdyeuGBI0aayFKdKwlAiKes",
    authDomain: "expense-tracker-33e45.firebaseapp.com",
    databaseURL: "https://expense-tracker-33e45-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-33e45",
    storageBucket: "expense-tracker-33e45.appspot.com",
    messagingSenderId: "180308378313",
    appId: "1:180308378313:web:38ac7229537c376c0b4318",
    measurementId: "G-5TK8ZKVTHY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
    // Initialize Firebase
    
    const expenses = [];

    // Firebase initialization (assuming you've already included Firebase SDK scripts in the HTML)

    // Function to add expense to the list
    function addExpense(description, amount, date, category) {
        if (!description || isNaN(amount) || amount <= 0 || !category) {
            alert('Please enter a valid expense description, amount, and category.');
            return;
        }

        // Create a reference to the 'expenses' node in the database
        const expensesRef = firebase.database().ref('expenses');

        // Push the new expense data to the 'expenses' node
        expensesRef.push({
            description: description,
            amount: amount,
            date: date,
            category: category
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

    // Event listener for the Add Expense button
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission
            const description = document.getElementById('expenseInput').value.trim();
            const amount = parseFloat(document.getElementById('amountInput').value);
            const date = document.getElementById('dateInput').value;
            const category = document.getElementById('categoryInput').value;

            addExpense(description, amount, date, category);

            // Update the expenses list after adding the expense
            updateExpensesList();

            // Clear input fields after adding expense
            document.getElementById('expenseInput').value = '';
            document.getElementById('amountInput').value = '';
            document.getElementById('dateInput').value = '';
        });
    } else {
        console.error('Add Expense button element not found.');
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
