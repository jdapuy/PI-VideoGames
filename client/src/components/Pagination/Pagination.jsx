import React from 'react'


export const Pagination = ({page,setPage,perPage,setPerPage,max,input,setInput}) => {
   

    const handleNext =(e)=>{
        setInput(parseInt(page)+1);//se parsea a entero para no 
        setPage(parseInt(page)+1);//tener problemas de cohesion como 2+"1"
        
    }
    
    const handlePrev =(e)=>{
        setInput(parseInt(page)-1);
        setPage(parseInt(page)-1);
    }


    const onEnterDown = (e)=>{
        const numPagIns = parseInt(e.target.value) //number page inserted
        if(e.keyCode === 13){
            if(
                numPagIns < 1 ||
                numPagIns > Math.ceil(max)||
                isNaN(Number(e.target.value))
            ){
               e.className="danger"
               setInput(page) //me vuelve a colocar el input en la pag que esta
                alert(`Page number ${numPagIns} doesnt exist`)
               
            }else{
                setPage(numPagIns)
            }
        }
    }

    const onChange= (e)=>{
        setInput(e.target.value)
    }




  return (
    <div>
        <button disabled={page === 1 || page < 1} onClick={(e)=>handlePrev(e)}>prev</button>
        <input 
        
        onChange={e=>onChange(e)}
        onKeyDown={e=>onEnterDown(e)}
        name="page"
        autoComplete='off'
        value={input}
        />
        <p>{`de ${Math.ceil(max)} pages`}</p>
        <button disabled={page === Math.ceil(max) || page > Math.ceil(max)} onClick={(e)=>handleNext(e)}>next</button>
    </div>
  )
}
