import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div>
        <div>HEADER</div>
        {children}
        <div>FOOTER</div>
    </div>
  )
}

export default MainLayout