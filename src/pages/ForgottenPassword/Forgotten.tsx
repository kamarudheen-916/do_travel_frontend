import ForgottenForm from "../../components/ForgottenForm"
function Forgotten() {
  return (
    <div>
         <div className='Parant'>
        <div className='sideBar'></div>
        <div className='centerBar     bg-gray-200 w-full '>
            <div className='text-6xl text-white  text-center mt-11 font-bold items-start'>
              <h1>do Travel</h1>
            </div>
            <ForgottenForm/>
        </div>
        <div className='sideBar'></div>
    </div>
    </div>
  )
}

export default Forgotten
