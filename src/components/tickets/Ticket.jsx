import { useEffect, useState } from "react"
import "./Tickets.css"
import { getAllEmployees } from "../../services/employeeService"
import { assignTicket, updateTicket } from "../../services/ticketService"

export const Ticket=({ticket,currentUser,getAndSetTickets})=>{
    const [employees,setEmployees]=useState([])
    const [assigneeEmployee,setAssigneeEmployee]=useState([])

    useEffect(()=>{
        getAllEmployees().then(employeesArray=>{
            setEmployees(employeesArray)
        })
    },[])

    useEffect(()=>{
        const foundEmployee=employees.find((employee)=>employee.id===ticket.employeeTickets[0]?.employeeId)
        setAssigneeEmployee(foundEmployee)

    },[employees,ticket])

    const handleClaim=()=>{
      const currentEmployee=employees.find((employee)=>employee.userId===currentUser.id)

      const newEmployeeTicket={
        employeeId:currentEmployee.id,
        serviceTicketId:ticket.id
      }

      assignTicket(newEmployeeTicket).then(()=>{console.log("Need to do something")})
      getAndSetTickets()
      
    }

    const handleClose=()=>{
      const closedTicket={
        id:ticket.id,
        userId:ticket.userId,
        description:ticket.description,
        emergency:ticket.emergency,
        dateCompleted:new Date()
      }
      updateTicket(closedTicket).then(()=>{
        getAndSetTickets()
      })

    }

    return (<section className='ticket' >
    <header className='ticket-info'>#{ticket.id}</header>
    <div>
    {ticket.description}
    </div>
    <footer>
        <div className="ticket-info">Assignee</div>
        <div>{assigneeEmployee?assigneeEmployee.user?.fullName:"None"}</div>
      <div className='ticket-info'>emergency</div>
      <div>{ticket.emergency?"Yes":"No"}</div>
      <div className="btn-container"></div>
      {/* If the logged in user is an employee and there's no employee ticket associated with the service ticket
      then a button to claim the ticket should display */}
      {currentUser.isStaff&&!assigneeEmployee?(
        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
      ):("")}
      {/* If the logged in user is the assigned employee for the ticket and there is not dateCompleted,
      then a button to close the ticket should display  */}
      {assigneeEmployee?.userId===currentUser.id&&!ticket.dataCompleted?(
        <button className="btn btn-warning" onClick={handleClose}>Close</button>
      ):("")}
    </footer>
  </section>)
}