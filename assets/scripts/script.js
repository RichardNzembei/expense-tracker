document.addEventListener('DOMContentLoaded', function() {
  const expenses = [];

  // Function to add expense to the list
  function addExpense(description, amount, category) {
      if (!description || isNaN(amount) || amount <= 0 || !category) {
          alert('Please enter a valid expense description, amount, and category.');
          return;
      }

      const expense = { description, amount, category };
      expenses.push(expense);
      updateExpensesList();
      updateExpensesTab();
  }

  // Function to update the displayed expenses list
  function updateExpensesList() {
      const expensesList = document.getElementById('expensesList');
      if (!expensesList) {
          console.error('Expenses list element not found.');
          return;
      }

      expensesList.innerHTML = ''; // Clear existing list items
      for (const expense of expenses) {
          const listItem = document.createElement('li');
          listItem.textContent = `${expense.description} - ${expense.amount} (${expense.category})`;
          expensesList.appendChild(listItem);
      }
  }

  // Function to update the expenses tab content
  function updateExpensesTab() {
      const expensesTabContent = document.getElementById('expenses-tab-content');
      if (!expensesTabContent) {
          console.error('Expenses tab content element not found.');
          return;
      }

      expensesTabContent.innerHTML = ''; // Clear existing content

      const expensesListTab = document.createElement('ul');
      for (const expense of expenses) {
          const listItem = document.createElement('li');
          listItem.textContent = `${expense.description} - ${expense.amount} (${expense.category})`;
          expensesListTab.appendChild(listItem);
      }

      expensesTabContent.appendChild(expensesListTab);
  }

  // Event listener for the Add Expense button
  const addExpenseBtn = document.getElementById('addExpenseBtn');
  if (addExpenseBtn) {
      addExpenseBtn.addEventListener('click', function() {
          const description = document.getElementById('expenseInput').value.trim();
          const amount = parseFloat(document.getElementById('amountInput').value);
          const category = document.getElementById('categoryInput').value;

          addExpense(description, amount, category);

          document.getElementById('expenseInput').value = '';
          document.getElementById('amountInput').value = '';
      });
  } else {
      console.error('Add Expense button element not found.');
  }
});

function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
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