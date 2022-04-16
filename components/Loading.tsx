import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
        style={{ color: "black", top: 0, left: 0, zIndex: 50}}>

            <p style={{ textAlign : "center" }}>Signing in...</p>
        </div>
    )
}

export default Loading