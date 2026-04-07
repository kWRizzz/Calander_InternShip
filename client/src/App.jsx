import React from 'react'
import SideBar from './Components/SideBar'

const App = () => {
  return (
    <div
      className='bodyFont flex min-h-screen'
    >
      {/* sidebar */}
      <div
        className='w-[15rem] bg-gray-500'
      >
        <SideBar />
      </div>

      {/* main */}
      <div>
          main
      </div>
    </div>
  )
}

export default App