import React from 'react'
import vidSrc from '../assets/vid/volly.mp4'

function Hometwo() {
  return (
    <div>
      <video 
        src={vidSrc} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    </div>
  )
}

export default Hometwo
