import './App.css'
import  CakeView  from './features/cake/CakeView.tsx'
import IcecreamView from './features/icecream/IcecreamView.tsx'
import {UserView}  from './features/user/UserView.tsx'

function App() {
  return (
    <div className='App'>
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  )
}

export default App