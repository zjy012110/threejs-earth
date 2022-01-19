/*
 * @Description: earth
 * @Autor: Espada
 * @Date: 2022-01-14 16:04:07
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-19 17:33:29
 * @FilePath: \earth\src\meshes\earth.js
 */
import * as THREE from 'three'
import {
  colorMix,
  generateRandomNumber,
  latLongToVector3
} from '@/util'
import consts from '@/util/consts'
const _geomerty = new THREE.SphereBufferGeometry(consts.globeRadius, 64, 64)

function innerEarth () {
  const _material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(colorMix(0.75)),
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    opacity: 1,
    fog: true,
    depthWrite: false,
    depthTest: false
  })
  return new THREE.Mesh(_geomerty, _material)
}

function earthMap (img) {
  let _texture, _material
  _texture = new THREE.TextureLoader().load(img.src)

  _texture.anisotropy = 16
  _material = new THREE.MeshBasicMaterial({
    map: _texture,
    color: new THREE.Color(colorMix(0.75)),
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    depthTest: false
  })
  _material.needsUpdate = true
  return new THREE.Mesh(_geomerty, _material)
}

function earthBuffer (img) {
  const globeCloudVerticesArray = []
  let globeCloud
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const curX = (i / 4) % canvas.width
    const curY = ((i / 4) - curX) / canvas.width
    if (((i / 4)) % 2 === 1 && curY % 2 === 1) {
      const color = imageData.data[i]
      if (color === 0) {
        const x = curX
        const y = curY
        const lat = (y / (canvas.height / 180) - 90) / -1
        const lng = x / (canvas.width / 360) - 180
        const position = latLongToVector3(lat, lng, consts.globeRadius, -0.1)
        globeCloudVerticesArray.push(position)
      }
    }
  }

  const globeCloudBufferGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(globeCloudVerticesArray.length * 3)
  for (let i = 0; i < globeCloudVerticesArray.length; i++) {
    positions[i * 3] = globeCloudVerticesArray[i].x
    positions[i * 3 + 1] = globeCloudVerticesArray[i].y
    positions[i * 3 + 2] = globeCloudVerticesArray[i].z
  }
  globeCloudBufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))

  // COLOR CHECKERED
  const globeCloudMaterial = new THREE.PointsMaterial({
    size: 0.75,
    fog: true,
    vertexColors: THREE.VertexColors,
    // transparent: true,
    // blending: THREE.AdditiveBlending,
    depthWrite: false //, depthTest: false
  })

  const colors = new Float32Array(globeCloudVerticesArray.length * 3)
  const globeCloudColors = []
  for (let i = 0; i < globeCloudVerticesArray.length; i++) {
    const tempPercentage = generateRandomNumber(80, 90) * 0.01
    const shadedColor = colorMix(tempPercentage, consts.colorPrimary, consts.colorDarken)
    globeCloudColors[i] = new THREE.Color(shadedColor)
  }
  for (let i = 0; i < globeCloudVerticesArray.length; i++) {
    colors[i * 3] = globeCloudColors[i].r
    colors[i * 3 + 1] = globeCloudColors[i].g
    colors[i * 3 + 2] = globeCloudColors[i].b
  }
  globeCloudBufferGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3))
  globeCloudBufferGeometry.colorsNeedUpdate = true

  globeCloud = new THREE.Points(globeCloudBufferGeometry, globeCloudMaterial)
  globeCloud.sortParticles = true
  globeCloud.name = 'globeCloud'
  return globeCloud
}

function outerEarth (img) {
  let globeGlowSize, globeGlowTexture, globeGlowBufferGeometry, globeGlowMaterial, globeGlowMesh

  globeGlowSize = 200
  globeGlowTexture = new THREE.TextureLoader().load(img.src)
  globeGlowTexture.anisotropy = 2

  globeGlowTexture.wrapS = globeGlowTexture.wrapT = THREE.RepeatWrapping
  globeGlowTexture.magFilter = THREE.NearestFilter
  globeGlowTexture.minFilter = THREE.NearestMipMapNearestFilter

  globeGlowBufferGeometry = new THREE.PlaneBufferGeometry(globeGlowSize, globeGlowSize, 1, 1)
  globeGlowMaterial = new THREE.MeshBasicMaterial({
    map: globeGlowTexture,
    color: consts.colorPrimary,
    transparent: true,
    opacity: 1,
    fog: false,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  })
  globeGlowMesh = new THREE.Mesh(globeGlowBufferGeometry, globeGlowMaterial)
  globeGlowMesh.name = 'globeGlowMesh'

  return globeGlowMesh
}

function spike () {
  let spikesObject; const spikesVerticesArray = []
  let spikesMaterial; let spikesBufferGeometry; let spikesMesh
  const spikeRadius = consts.globeRadius + 30
  const sphereSpikeRadius = consts.globeRadius + 40

  spikesObject = new THREE.Group()
  spikesObject.name = 'spikesObject'

  // FLAT SPIKE RING
  const spikeTotal = 400
  const spikeAngle = 2 * Math.PI / spikeTotal
  for (let i = 0; i < spikeTotal; i++) {
    const vertex1 = new THREE.Vector3()
    vertex1.x = spikeRadius * Math.cos(spikeAngle * i)
    vertex1.y = 0
    vertex1.z = spikeRadius * Math.sin(spikeAngle * i)
    vertex1.normalize()
    vertex1.multiplyScalar(spikeRadius)
    const vertex2 = vertex1.clone()
    if (i % 10 === 1) {
      vertex2.multiplyScalar(1.02)
    } else {
      vertex2.multiplyScalar(1.01)
    }
    spikesVerticesArray.push(vertex1)
    spikesVerticesArray.push(vertex2)
  }

  const positions = new Float32Array(spikesVerticesArray.length * 3)
  for (let i = 0; i < spikesVerticesArray.length; i++) {
    positions[i * 3] = spikesVerticesArray[i].x
    positions[i * 3 + 1] = spikesVerticesArray[i].y
    positions[i * 3 + 2] = spikesVerticesArray[i].z
  }

  spikesMaterial = new THREE.LineBasicMaterial({
    linewidth: 1,
    color: new THREE.Color(colorMix(0.5)),
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    depthTest: false
  })

  spikesBufferGeometry = new THREE.BufferGeometry()
  spikesBufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
  spikesMesh = new THREE.LineSegments(spikesBufferGeometry, spikesMaterial)
  spikesObject.add(spikesMesh)

  return spikesObject
}

export {
  innerEarth,
  earthMap,
  earthBuffer,
  outerEarth,
  spike
}
