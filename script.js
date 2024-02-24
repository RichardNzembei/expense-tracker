document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

function addExpense() {
    const expenseInput = document.getElementById('expenseInput').value;
    const amountInput = document.getElementById('amountInput').value;
    const categoryInput = document.getElementById('categoryInput').value;

    if (expenseInput.trim() === '' || amountInput.trim() === '') {
        alert('Please enter both expense and amount.');
        return;
    }

    const expensesList = document.getElementById('expensesList');
    const expenseItem = document.createElement('div');
    expenseItem.textContent = `Expense: ${expenseInput}, Amount: ${amountInput}, Category: ${categoryInput}`;
    expensesList.appendChild(expenseItem);

    // Clear input fields after adding expense
    document.getElementById('expenseInput').value = '';
    document.getElementById('amountInput').value = '';
}
