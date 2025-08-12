import React from 'react'

function Biography({imageUrl}) {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="who we are" srcset="" />
      </div>
      <div className="banner bio-text">
        <p>Know About Us</p>
        <h1>We are a professional organization</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae soluta voluptas adipisci similique quae asperiores?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos facere sint mollitia laboriosam deserunt adipisci sequi numquam esse impedit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, dolor!</p>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis dolorem, enim consectetur doloribus ut magnam laboriosam modi magni cupiditate nesciunt repudiandae iure, ea neque.</p>

      </div>
    </div>
  )
}

export default Biography