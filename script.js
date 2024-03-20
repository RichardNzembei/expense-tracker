const expenses = []; // Array to store expense objects

const expenseInput = document.getElementById('expenseInput');
const amountInput = document.getElementById('amountInput');
const categoryInput = document.getElementById('categoryInput');
const expensesList = document.getElementById('expensesList');
const addExpenseBtn = document.getElementById('addExpenseBtn');

addExpenseBtn.addEventListener('click', function() {
  const description = expenseInput.value.trim(); // Trim whitespaces
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!description || isNaN(amount)) {
    alert('Please enter a valid expense description and amount.');
    return;
  }

  const expense = { description, amount, category };
  expenses.push(expense);

  // Update displayed expenses (example using a simple loop and creating list items)
  expensesList.innerHTML = ''; // Clear existing list items
  for (const expense of expenses) {
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.description} - ${expense.amount} (${expense.category})`;
    expensesList.appendChild(listItem);
  }

  // Clear input fields
  expenseInput.value = '';
  amountInput.value = '';
});