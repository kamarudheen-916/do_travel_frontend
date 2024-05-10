import React from "react";
import Input from "../atoms/Input/Input";



export const EditComment:React.FC<{
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    comment:string
    editSubmit:(editedComment:string)=>void
}>=(props)=>{
  const  [editedComment,setEditedComment] =React.useState<string>('')
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
        <div>
            <Input  type={'text'}  value={'smple'} />
        </div>
    </>
  )
}
