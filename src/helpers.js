import { redirect } from "react-router-dom";

export const waait = () => new Promise(res => setTimeout(res, 230))

export const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34}, 65%, 50%`
}

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteItem = (keys) => {
    keys.map(key => localStorage.removeItem(key))
}

export const createBudget = ({name, amount}) => {

    const newItem = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    console.log(newItem);
    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({name, amount, budgetId}) => {

    const newExpense = {
        id: crypto.randomUUID(),
        budgetId,
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(),        
    }

    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newExpense]))
}


// BudgetItem
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    })
}

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}


export const calculateSpentByBudgets = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId === budgetId){
            return acc += expense.amount;
        }
        
        return acc;
    }, 0)

    return budgetSpent;
}


// ExpenseItem
export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter(item => item[key] === value)
}

export const deleteExpense = (id) => {
    const expenses = JSON.parse(localStorage.getItem('expenses'))
    localStorage.removeItem('expenses')
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    return localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
}

export const deleteBudget = (id) => {
    const budgets = fetchData("budgets")
    localStorage.removeItem('budgets')
    const updatedBudgets = budgets.filter(budget => budget.id !== id);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets))

    const expenses = JSON.parse(localStorage.getItem('expenses'))
    localStorage.removeItem('expenses')
    const updatedExpenses = expenses.filter(expense => expense.budgetId !== id)
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
}

