'use client'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Mesh, SkinnedMesh } from 'three' // Import Mesh and SkinnedMesh types

export function Model(props :any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('earth__terra_-_downloadable_model.glb') // Correct the path here
  const { actions } = useAnimations(animations, group)

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <group name="EARTH">
              <mesh
                name="EARTH_0"
                castShadow
                receiveShadow
                geometry={(nodes.EARTH_0 as Mesh).geometry} // Cast nodes.EARTH_0 to Mesh
                material={materials['Material.001']}
              />
            </group>
            <group name="Armature">
              <primitive object={nodes.Armature_rootJoint} />
              <skinnedMesh
                name="ATM_0"
                geometry={(nodes.ATM_0 as SkinnedMesh).geometry} // Cast nodes.ATM_0 to SkinnedMesh
                material={materials['Material.002']}
                skeleton={(nodes.ATM_0 as SkinnedMesh).skeleton} // Cast nodes.ATM_0 to SkinnedMesh
              />
              <group name="ATM" scale={1.007} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('earth__terra_-_downloadable_model.glb') // Correct the path here
