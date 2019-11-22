import React from 'react'

export const Container = props => {
  return (
    <div className="container" >
      <div className="container-content" >
        { props.children }
      </div>
    </div>
  )
}