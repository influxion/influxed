'use client'
import { OrbitControls } from '@react-three/drei'
import {
  Canvas,
  extend,
  Object3DNode,
  useFrame,
  useThree,
} from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Mesh } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { AsciiEffect } from 'three-stdlib'

export default function AsciiObject() {
  return (
    <>
      <Canvas className="h-full w-full !absolute top-0">
        <color attach="background" args={['black']} />
        <spotLight position={[10, 10, 10]} angle={20} penumbra={0} />
        <pointLight position={[-10, -10, -10]} />
        <Knot />
        {/* <Model url="/path/to/your/model.gltf" /> */}
        <OrbitControls enableZoom={false} enablePan={false} />
        {/* @ts-expect-error */}
        <AsciiRenderer />
      </Canvas>
    </>
  )
}

function ProgressBar({ progress }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: 'white',
          height: '10px',
          width: `${progress}%`,
        }}
      ></div>
      <p style={{ color: 'white', marginTop: '5px' }}>{progress}%</p>
    </div>
  )
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}
extend({ TextGeometry })
function TextMesh(props) {
  const ref = useRef<Mesh>()
  const font = new FontLoader().parse('')

  return (
    <mesh {...props} ref={ref}>
      <textGeometry args={['fluxd', { font, size: 0.1, height: 0.5 }]} />
      <meshLambertMaterial />
    </mesh>
  )
}

function Knot(props) {
  const ref = useRef<Mesh>()

  useFrame((_, delta) =>
    ref.current
      ? (ref.current.rotation.x = ref.current.rotation.y += delta / 4)
      : undefined
  )
  return (
    <mesh {...props} ref={ref}>
      <torusKnotGeometry args={[1, 0.25, 128, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function AsciiRenderer({
  renderIndex = 1,
  bgColor = '#111',
  fgColor = '#ef4444',
  characters = ' .:-+*=%@#$&',
  invert = true,
  color = false,
  resolution = 0.175,
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution, gl])

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    effect.domElement.style.backgroundColor = bgColor
  }, [fgColor, bgColor, effect])

  // Append on mount, remove on unmount
  useEffect(() => {
    if (gl.domElement && gl.domElement.parentNode) {
      gl.domElement.style.opacity = '0'
      gl.domElement.parentNode.appendChild(effect.domElement)
    }
    return () => {
      if (gl.domElement && gl.domElement.parentNode) {
        gl.domElement.style.opacity = '1'
        gl.domElement.parentNode.removeChild(effect.domElement)
      }
    }
  }, [effect, gl])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame(() => {
    effect.render(scene, camera)
  }, renderIndex)

  // This component returns nothing, it is a purely logical
}
