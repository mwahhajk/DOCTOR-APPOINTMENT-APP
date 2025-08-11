import React from 'react'
import Hero from '../components/Hero'
import Biography from "../components/Biography"

function Home() {
  return (
    <div>
      <Hero title={"Welcome to Our Website"} imageUrl={"/hero.png"}/>
      {/* <Biography imageUrl={"/about.png"}/> */}
      {/* <Departments/>
      <MessageForm/> */}
    </div>
  )
}

export default Home