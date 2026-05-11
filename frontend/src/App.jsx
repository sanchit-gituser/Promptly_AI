import './App.css'
import ChatWindow from './components/ChatWindow.jsx'
import Sidebar from './components/Sidebar.jsx'
import { useContext } from 'react'
import { MyContext } from './context/MyContext.jsx'


function App() {

  const contextState=useContext(MyContext);
  

  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <ChatWindow/>
    </div>
    
  )
}

export default App
