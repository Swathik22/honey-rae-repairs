import { useEffect, useState } from "react"
import { getStaffUser } from "../../services/customerService"
import { User } from "../../users/User"
import "./employee.css"
import { Link } from "react-router-dom"

export const EmployeeList=()=>{
    const[employees,setEmployee]=useState([])

    useEffect(()=>{
        getStaffUser().then(employeeArray=>{
            setEmployee(employeeArray)
        })
    },[])

    return(
        <div className="customers">
        {employees.map(employeesObj=>{
         return <Link to={`/employees/${employeesObj.id}`}>
         <User user={employeesObj}/>       
         </Link> 
    })}
    </div>
    )
}