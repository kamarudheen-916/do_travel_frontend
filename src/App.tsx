import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import ForgottenPassword from './components/ForgottenPassword/Forgotten'
import Otp from './components/Otp/Otp'
import Home from './components/Home/Home'
import { TypedUseSelectorHook,useSelector } from 'react-redux'
import { RootState } from './redux/store' 

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const token = useTypedSelector(state => state.auth.token);
  return (
    < >
    <Router>
      <Routes>
        
        <Route path='/' element={token?(<Home/>) : (<Navigate to={'/login'}/>)} />
        <Route path='/login' element={!token?(<Login/>):(<Navigate to={'/'}/>) } />
        <Route path='/forgottenPassword' element={!token?(<ForgottenPassword/>):(<Navigate to={'/'}/>) } />
        <Route path='/signup' element={!token?(<Signup/>) : (<Navigate to={'/'}/>)} />
        <Route path='/otp' element={!token?(<Otp/>) : (<Navigate to={'/'}/>)} />
      </Routes>
    </Router>
    </>
  )
}
export default App
