import React, { useEffect, useState } from 'react'

function Home() {

   const [backendData, setBackendData] = useState([{}])

   useEffect(() => {
    fetch("/")
    .then(
        response => response.json()
    )
    .then(
        data => {
            setBackendData(data)
        }
    )
   }, [])
    
  return (
    <div>Home</div>
  )
}

export default Home