/*
 * @Description: rings.js
 * @Autor: Espada
 * @Date: 2022-01-14 16:05:59
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-19 17:33:11
 * @FilePath: \earth\src\meshes\rings.js
 */
import * as THREE from 'three'
import {
  colorMix
} from '../util'
import consts from '@/util/consts'

const { toRAD } = consts

export default function createRings () {
  let ringsObject,
    ringsOuterMaterial,
    ringsInnerMaterial

  ringsObject = new THREE.Group()
  ringsObject.name = 'ringsObject'

  var ringLargeGeometry = new THREE.RingGeometry(200, 195, 128)
  var ringMediumGeometry = new THREE.RingGeometry(100, 98, 128)

  ringsOuterMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorMix(0.75)),
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false //, depthTest: false
  })
  ringsInnerMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorMix(0.5)),
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false //, depthTest: false
  })

  var ringLargeMesh1 = new THREE.Mesh(ringLargeGeometry, ringsOuterMaterial)
  ringLargeMesh1.rotation.x = 90 * toRAD
  var ringLargeMesh2 = ringLargeMesh1.clone()
  ringLargeMesh1.position.y = 90
  ringLargeMesh2.position.y = -90
  ringsObject.add(ringLargeMesh1)
  ringsObject.add(ringLargeMesh2)

  var ringMediumMesh1 = new THREE.Mesh(ringMediumGeometry, ringsInnerMaterial)
  ringMediumMesh1.rotation.x = 90 * toRAD
  var ringMediumMesh2 = ringMediumMesh1.clone()
  ringMediumMesh1.position.y = 100
  ringMediumMesh2.position.y = -100
  ringsObject.add(ringMediumMesh1)
  ringsObject.add(ringMediumMesh2)

  return ringsObject
}
