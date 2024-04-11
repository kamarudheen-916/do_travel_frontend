import React, { useState } from "react"
import Input from "../Input/Input"
interface Props{
    title?:string;
    type:string;
    value?:string;
    name:string;
    id?:string;
    width?:string
    placeholder?:string;
    height?:string;
    multiple?:boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>; 
}
const DynamicInput:React.FC<Props> =(props)=> {
    const [typeOfStays,setTypeOfStays] = useState<string[]>([''])
  const handleAddStay = ()=>{
    setTypeOfStays(previous => [...previous,''])
  }
  const handleRemoveStay =(index:number)=>{
    setTypeOfStays(PrevState =>PrevState.filter((_,i)=>i!==index))
  }
  const handleAddStayChange =(index:number,value:string)=>{
      const updatedStay = [...typeOfStays]
      updatedStay[index] = value
      setTypeOfStays(updatedStay)
  }
  return (
    <div>
      {
              typeOfStays.map((stay,index)=>(
                <div className="flex items-center">
                  <div className='flex-1 w-80'>
                  <Input 
                    type={'text'}
                    title={`Type of stay ${index +1}`}
                    name={`TypeOfStay${index}`}
                    id={`TypeOfStay${index}`}
                    placeholder={`Enter Type of Stay ${index + 1}`}
                    value={stay}
                    onChange={(e)=>handleAddStayChange(index,e.target.value)}
                  />
                  </div>
                 { index === typeOfStays.length-1 && (<i
                      key={`plus-${index}`}
                      className="fa-solid fa-circle-plus flex-initial"
                      style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                      onClick={handleAddStay} // Call function to add another input field
                  ></i>)}
                  {index !== typeOfStays.length - 1 && ( // Render plus icon only for the last input field
                      <i
                          key={`xmark-${index}`}
                          className="fa-solid fa-circle-xmark"
                          style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                          onClick={()=>handleRemoveStay(index)} // Call function to add another input field
                      ></i>
                  )}
                </div>
              ))
            
            }
    </div>
  )
}

export default DynamicInput
