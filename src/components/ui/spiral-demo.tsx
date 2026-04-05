'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'

const SpiralDemo = () => {
  const [startVisible, setStartVisible] = useState(false)

  const navigateToPersonalSite = () => {
    window.location.href = "https://xubh.top/"
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-[1500ms] ease-out"
        style={{
          opacity: startVisible ? 1 : 0,
          transform: `translate(-50%, calc(-50% + ${startVisible ? '0px' : '16px'}))`,
        }}
      >
        <button
          onClick={navigateToPersonalSite}
          className="
            text-white text-2xl tracking-[0.2em] uppercase font-extralight
            transition-all duration-700
            hover:tracking-[0.3em] animate-pulse
          "
        >
          Enter
        </button>
      </div>
    </div>
  )
}

export { SpiralDemo }
