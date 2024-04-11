
import Naves from '../Naves/Naves'
function NavBarMobile() {
  return (
    <div className=' bg-stone-400 flex justify-evenly'>
        <Naves  icon={<i className="fa-solid fa-house text-xl "></i>} />
        <Naves  icon={<i className="fa-solid fa-envelope text-xl "></i>}  />
        <Naves  icon={<i className="fa-solid fa-square-plus text-xl"></i>} />
        <Naves  icon={<i className="fa-solid fa-paperclip text-xl"></i>}  />
        {/* <Naves  icon={<i className="fa-solid fa-sun text-xl"></i>}  /> */}
        <Naves  icon={<i className="fa-solid fa-user text-xl"></i>}  />
        
    </div>
  )
}

export default NavBarMobile
