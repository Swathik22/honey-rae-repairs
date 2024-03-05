export const TicketFilteredBar=({setShowEmergency,setSearchTerm})=>{
    return (<div className='filter-bar'>
    <button 
    className='filter-btn btn-primary' 
    onClick={()=>{setShowEmergency(true)}}
    >Emergency</button>        
    <button 
    className='filter-btn btn-info' 
    onClick={()=>{setShowEmergency(false)}}
    >Show All</button>
    <input 
        onChange={(event)=>{
            setSearchTerm(event.target.value)
            console.log(event.target.value)
        }}
        type='text'
        placeholder='Search Ticket'
        className='ticket-search'
    />
    </div>)
}