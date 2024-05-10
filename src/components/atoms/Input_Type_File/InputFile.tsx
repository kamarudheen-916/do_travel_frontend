import './InputFile.css'
import React from 'react'
interface InputFileProps{
    handleFileURL:(e: React.ChangeEvent<HTMLInputElement>)=>void
}
const  InputFile:React.FC<InputFileProps>=(props)=> {
  return (
    <div>
         <div className='inputFileMain'>
                      <input type='file' onChange={props.handleFileURL} id='uploadFile' accept="image/*" />
                      <label  htmlFor='uploadFile' id='uploadUserFile_label'>Select from computer</label>
        </div>
    </div>
  )
}

export default InputFile
