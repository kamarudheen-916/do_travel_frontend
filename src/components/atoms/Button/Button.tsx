
import './Button.css'
type Props={
  name:string
  bgcolor?:string
  width?:string
  height?:string
  font_size?:string
  margin_top?:string
  font_color?:string
  onSubmit?: (e:any)=>void;
}
function Button(props:Props) { 
  return (
    <button className='button' 
    onClick={props.onSubmit}
    style={{backgroundColor:props.bgcolor,
    width:props.width,
    height:props.height,
    fontSize:props.font_size,
    marginTop:props.margin_top,  
    color:props.font_color
    }}>
        {props.name}
    </button>
  )
}

export default Button
