import { Route ,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserContext from './context/userContext';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import Start from './pages/Start';

function App() {
  
  return (
    <div className="App">
     
      <UserContext>
         <Routes>
            <Route path ="/" element = {<Start />}/>
            <Route path = "/login" element = {<UserLogin />}/>
            <Route path = "/signup" element = {<UserSignup />}/>
            <Route path = "/home" element = {
              <UserProtectedWrapper>
              <Home />
              </UserProtectedWrapper>
              }/>

           
           
         </Routes>
         </UserContext>
         
    </div>
  );
}

export default App;
