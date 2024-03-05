import React, { useEffect, useState } from 'react';
// import { getAllTickets } from "./services/ticketService.jsx";
import "./Tickets.css"
import { getAllTickets } from '../../services/ticketService.jsx';
import { Ticket } from './Ticket.jsx';
import { TicketFilteredBar } from './TicketFilteredBar.jsx';

export const TicketList=({currentUser})=>{
    const[allTickets,setAllTickets]=useState([])
    const[showEmergency,setShowEmergency]=useState(false)
    const[filteredTickets,setFilteredTickets]=useState([])
    const[searchTerm,setSearchTerm]=useState("")

    const getAndSetTickets=()=>{
        getAllTickets().then(ticketsArray=>{
            setAllTickets(ticketsArray)
            console.log("Tickets set")
        })
    }
    useEffect(()=>{
        getAndSetTickets()
            },[])//[] means ONLY on initial render of component

    useEffect(()=>{
        if(showEmergency){
        const EmergencyTickets=allTickets.filter(ticket=>ticket.emergency===true)
        setFilteredTickets(EmergencyTickets)
        }
        else{
        setFilteredTickets(allTickets)
        }
    },[showEmergency,allTickets])

    useEffect(()=>{
        const foundTicket=allTickets.filter((ticket)=>
                ticket.description.toLowerCase().includes(searchTerm.toLowerCase())            
        )
        setFilteredTickets(foundTicket)
    },[searchTerm,allTickets])

    return <>
        <div className='tickets-container'>
        <h1>Tickets</h1>
        <TicketFilteredBar setShowEmergency={setShowEmergency} setSearchTerm={setSearchTerm}/>
        
        <article className="tickets">
        {filteredTickets.map(ticketObj => {
            return (
            <Ticket ticket={ticketObj} currentUser={currentUser} getAndSetTickets={getAndSetTickets} key={ticketObj.id}/>
            )// JSX for a ticket
        })}
        </article>
        </div>
    </>
}