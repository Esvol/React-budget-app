
export const waait = () => new Promise(res => setTimeout(res, 230))

export const generateRandomColor = (userId) => {
    const existingBudgetsLength = getAllMatchingItems({category: 'budgets', key: 'userId', value: userId})?.length ?? 0;
    return `${existingBudgetsLength * 34}, 65%, 50%`
}

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteItemLocalStorage = (keys) => {
    keys.map(key => localStorage.removeItem(key))
}

export const createBudget = ({name, amount, userId}) => {

    const newItem = {
        id: crypto.randomUUID(),
        userId,
        name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(userId)
    }

    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({name, amount, budgetId, userId}) => {

    const newExpense = {
        id: crypto.randomUUID(),
        budgetId,
        userId,
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(userId),        
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

export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
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

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter(item => item[key] === value)
}

export const findUser = (name, password) => {
    const users = fetchData('users') ?? []
    const user = users.filter(user => {
        if (user.name === name && user.password === password){
            return user;
        }
        return null
    })

    return user[0];
}

export const deleteItemHandler = ({category, key, value}) => {
    const items = fetchData(category) ?? []
    localStorage.removeItem(category)

    const updatedItems = items.filter(item => item[key] !== value)
    return localStorage.setItem(category, JSON.stringify(updatedItems))
} 

export const editBudget = ({category, key, value, name, amount}) => {
    const budget = getAllMatchingItems({category, key, value})[0]

    budget.name = name
    budget.amount = Number(amount)
    deleteItemHandler({category, key, value})
    
    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, budget]))
}   

// History page

export const addToHistory = ({category, key, value}) => {
    const items = fetchData(category) ?? [];
    const historyItems = fetchData('history') ?? [];

    const deletedItem = items.filter(item => item[key] === value)[0];
    return localStorage.setItem("history", JSON.stringify([...historyItems, deletedItem]));
}

export const returnExpense = ({category, key, value}) => {
    const historyExpenses = fetchData(category) ?? [];
    const expenses = fetchData('expenses') ?? [];

    deleteItemLocalStorage(['expenses'])
    deleteItemHandler({category, key, value})

    const historyExpense = historyExpenses.filter(item => item[key] === value)[0];
    return localStorage.setItem("expenses", JSON.stringify([...expenses, historyExpense]));
}