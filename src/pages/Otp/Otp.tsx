import OtpForm from "../../components/OtpForm"
function Otp() {
  return (
    <div className='Parant'>
    <div className='sideBar'></div>
    <div className='centerBar     bg-gray-200 w-full '>
        <div className='text-6xl text-white  text-center mt-11 font-bold items-start'>
          <h1>do Travel</h1>
        </div>
        <OtpForm/>
    </div>
    <div className='sideBar'></div>
</div>
  )
}

export default Otp
