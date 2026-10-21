import { useRef } from 'react'

// Every image on the site runs the same slow pan-and-zoom (.img-motion in
// index.css). This hands each one its own phase and direction so a grid of them
// never moves as one block.
let instances = 0

export function useImageMotion() {
  const seed = useRef(null)
  if (seed.current === null) seed.current = instances++
  const dir = seed.current % 2 ? 1 : -1
  return { '--i': seed.current % 5, '--pan-x': dir * 2, '--pan-y': dir * -1.4 }
}
