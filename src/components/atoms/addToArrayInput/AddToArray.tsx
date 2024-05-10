import React from 'react'
import Input from '../Input/Input';

const  AddToArray:React.FC<{
    inputvalue:string;
    handleInputValue:React.Dispatch<React.SetStateAction<string>>;
    handleAddToArray:()=>void;
    arrayData:string[];
    removeFromArray:(index:number)=>void;
    title:string;
    name:string
    id:string;
    placeholder:string
}>=(props)=> {
  return (
    <div>
        <div className="flex"> 
        <Input
          value={props.inputvalue}
          errorLabelValue={"Must not be empty..!"}
          onChange={(e)=>props.handleInputValue(e.target.value)}
          type={"text"}
          title={props.title}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
        />
          <i
                  className="fa-solid fa-circle-plus flex-initial"
                  style={{
                    color: "balck",
                    marginLeft: "50px",
                    fontSize: "25px",
                    marginTop: "25px",
                  }}
                  onClick={props.handleAddToArray}
                ></i>
        </div>
        <div className="setOfFavorites rounded-md text-left p-2" style={{background:'rgba(0, 197, 76, 0.1)'}} id="setOfFavorites">
                 {props.arrayData.map((place,index)=>(
                  <div key={index} className="flex justify-between cursor-pointer ">
                     <h1 >{place}</h1>
                     <span onClick={()=>props.removeFromArray(index)}>{index ? `x` : ''}</span>
                  </div>
                 ))}
        </div>
    </div>
  )
}

export default AddToArray
