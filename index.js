// Get references to the DOM elements
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Add event listener to the button for setting the total amount
totalAmountButton.addEventListener("click", () => {
    // Get the value from the total amount input field
    tempAmount = totalAmount.value;
    // Check if the value is empty or negative
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide"); // Show error message if invalid
    } else {
        errorMessage.classList.add("hide"); // Hide error message if valid
        amount.innerHTML = tempAmount; // Display the total amount
        balanceValue.innerText = tempAmount - expenditureValue.innerText; // Calculate and display the balance
        totalAmount.value = ""; // Clear the input field
    }
});

// Function to enable or disable edit buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Function to modify an element in the list
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement; // Get the parent div of the clicked element
    let currentBalance = balanceValue.innerText; // Get the current balance
    let currentExpense = expenditureValue.innerText; // Get the current expenditure
    let parentAmount = parentDiv.querySelector(".amount").innerText; // Get the amount of the parent element

    // If editing, populate input fields with current values
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true); // Disable all edit buttons
    }

    // Update balance and expenditure values
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove(); // Remove the element from the list
};

// Function to create and add an expense item to the list
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;

    // Create and add edit button
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    // Create and add delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

// Add event listener to the button for adding a new expense
checkAmountButton.addEventListener("click", () => {
    // Check if input fields are empty
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide"); // Show error message if inputs are empty
        return false;
    }
    productTitleError.classList.add("hide");
    disableButtons(false); // Enable edit buttons

    let expenditure = parseInt(userAmount.value); // Get the expense amount
    let sum = parseInt(expenditureValue.innerText) + expenditure; // Calculate new total expenditure
    expenditureValue.innerText = sum; // Display the total expenditure

    const totalBalance = tempAmount - sum; // Calculate the new balance
    balanceValue.innerText = totalBalance; // Display the new balance

    // Create and add the new expense item to the list
    listCreator(productTitle.value, userAmount.value);

    // Clear the input fields
    productTitle.value = "";
    userAmount.value = "";
});
