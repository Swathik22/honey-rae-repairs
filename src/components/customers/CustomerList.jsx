import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/customerService"
import "./customers.css"
import { User } from "../../users/User"
import { Link } from "react-router-dom"
export const CustomerList=()=>{
    const[customers,setCustomers]=useState([])

    useEffect(()=>{
        getNonStaffUsers().then(customersArray=>{
            setCustomers(customersArray)
        })
    },[])

    return (
        <div className="customers">
        {customers.map(customerObj=>{
         return <Link to={`/customers/${customerObj.id}`}>
         <User user={customerObj}/>  
         </Link>      
    })}
    </div>)
}