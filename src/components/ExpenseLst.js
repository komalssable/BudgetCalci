import React from 'react'
import Item from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
 const ExpenseLst = ({expenses,deleteHandler,editHandler,clearExpenses}) => {
     
    return (

        <>
            <ul className="list">
                {expenses.map(expense => {
                    return <Item key={expense.id} expense={expense} deleteHandler={deleteHandler} editHandler={editHandler}/>
                })}
            </ul>
            {expenses.length > 0 && (
                <button className="btn" onClick={clearExpenses}>
                    clear expenses
                    <MdDelete className="btn-icon" />
                </button>
            )}
        </>
    )
}

export default ExpenseLst