import React from 'react'
import Hero from '../components/Hero'
import Biography from "../components/Biography"
import Department from '../components/Department'

function Home() {
  return (
    <div>
      <Hero title={"Welcome to Our Website"} imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"}/>
      <Department/>
      {/* // <MessageForm/>  */}
    </div>
  )
}

export default Home