import React from 'react';

const Gradients = (props) => {
  return(
    <svg className="gradients-svg">
      <defs>
        <linearGradient x1="3.21080202%" y1="50%" x2="97.8298484%" y2="50%" id="gradient1">
            <stop stopColor="#9B35F0" offset="0%"></stop>
            <stop stopColor="#67CBEE" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="gradient2">
            <stop stopColor="#8F64EC" offset="0%"></stop>
            <stop stopColor="#A838F1" offset="100%"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Gradients
