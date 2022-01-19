<!--
 * @Description: 旋转地球
 * @Autor: Espada
 * @Date: 2022-01-14 15:51:47
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-19 17:35:42
 * @FilePath: \earth\src\views\Earth.vue
-->
<template>
  <div id="wrapper">
    <div id="interactive"></div>
  </div>
</template>
<script>

import * as fp from 'lodash/fp'
import * as THREE from 'three'
import consts from '@/util/consts'
import {
  innerEarth,
  earthMap,
  earthBuffer,
  outerEarth,
  universe,
  createRings,
  spike
} from '@/meshes'

import {
  deviceSettings,
  cacheImages,
  colorMix
} from '@/util'
import TrackballControls from '@/util/TrackballControls'

const {
  innerWidth: WIDTH,
  innerHeight: HEIGHT
} = window
let {
  scene,
  camera,
  cameraTarget,
  globeMaxZoom,
  globeMinZoom,
  targetCameraZ,

  renderer,

  rotationObject,
  earthObject,
  toRAD,

  mouse: {
    isMouseDown,
    mouseXOnMouseDown,
    mouseYOnMouseDown,
    targetRotationX,
    targetRotationY,
    targetRotationXOnMouseDown,
    targetRotationYOnMouseDown
  }

} = consts
const container = document.getElementById('interactive')
let trackballControls

// WEBPACK FOOTER //
// ./src/main.js
export default {
  data () {
    return {
      innerWidth: innerWidth,
      innerHeight: innerHeight,

      scene: scene,
      camera: camera,
      cameraTarget: cameraTarget,
      globeMaxZoom: globeMaxZoom,
      globeMinZoom: globeMinZoom,
      targetCameraZ: targetCameraZ,

      renderer: renderer,

      rotationObject: rotationObject,
      earthObject: rotationObject,
      toRAD: toRAD,

      mouse: {
        isMouseDown: consts.mouse.isMouseDown,
        mouseXOnMouseDown: consts.mouse.mouseXOnMouseDown,
        mouseYOnMouseDown: consts.mouse.mouseYOnMouseDown,
        targetRotationX: consts.mouse.targetRotationX,
        targetRotationY: consts.mouse.targetRotationY,
        targetRotationXOnMouseDown: consts.mouse.targetRotationXOnMouseDown,
        targetRotationYOnMouseDown: consts.mouse.targetRotationYOnMouseDown
      },

      container: container

    }
  },
  mounted () {
    this.container = this.container || document.getElementById('interactive')
    this.init()
    window.addEventListener('resize', this.onWindowResize, false)
    document.getElementById('interactive').addEventListener('mousewheel', this.onMouseWheel, false)
    document.getElementById('interactive').addEventListener('mousedown', this.onMouseDown, false)
    document.getElementById('interactive').addEventListener('mousemove', this.onMouseMove, false)
    document.getElementById('interactive').addEventListener('mouseup', this.onMouseUp, false)
    document.getElementById('interactive').addEventListener('mouseleave', this.onMouseLeave, false)
  },
  methods: {
    async init () {
      const cacheF = cacheImages()
      const imgs = await cacheF()

      // const _initStage = fp.flow(this.setScene, this.setCamera, this.setRender, this.setLights, this.animate, this.addAxis)
      const _initStage = fp.flow(this.setScene, this.setCamera, this.setRender, this.setLights, this.animate)

      _initStage()

      const earthRotation = this.setEarthObject()
      earthRotation.add(innerEarth(imgs))
      earthRotation.add(earthMap(imgs[3]))
      earthRotation.add(earthBuffer(imgs[2]))
      earthRotation.add(spike())

      await scene.add(universe(imgs[5]))
      await scene.add(createRings())

      await scene.add(earthRotation)
      await scene.add(outerEarth(imgs[1]))

      console.log(scene.children)
    },

    setScene () {
      scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x000000, 0, 500)
      console.log(scene)
    },

    setCamera () {
      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000)
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 1000
      camera.rotation.x = 0
      camera.rotation.y = 0
      camera.rotation.z = 0

      // trackballControls = new TrackballControls(camera)
    },

    setRender () {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
      })

      renderer.setSize(WIDTH, HEIGHT)
      renderer.setClearColor(0x000000, 1)
      console.log('container', this.container)
      this.container.appendChild(renderer.domElement)
    },

    setLights () {
      const colorBase = new THREE.Color(new THREE.Color(consts.colorPrimary))
      const {
        lights: {
          lightShieldIntensity,
          lightShieldDistance,
          lightShieldDecay
        }
      } = consts

      const lightShield1 = new THREE.PointLight(colorBase,
        lightShieldIntensity, lightShieldDistance, lightShieldDecay)
      lightShield1.position.x = -50
      lightShield1.position.y = 150
      lightShield1.position.z = 75
      lightShield1.name = 'lightShield1'
      scene.add(lightShield1)

      const lightShield2 = new THREE.PointLight(colorBase,
        lightShieldIntensity, lightShieldDistance, lightShieldDecay)
      lightShield2.position.x = 100
      lightShield2.position.y = 50
      lightShield2.position.z = 50
      lightShield2.name = 'lightShield2'
      scene.add(lightShield2)

      const lightShield3 = new THREE.PointLight(colorBase,
        lightShieldIntensity, lightShieldDistance, lightShieldDecay)
      lightShield3.position.x = 0
      lightShield3.position.y = -300
      lightShield3.position.z = 50
      lightShield3.name = 'lightShield3'
      scene.add(lightShield3)
    },

    setEarthObject () {
      rotationObject = new THREE.Group()
      rotationObject.name = 'rotationObject'
      rotationObject.rotation.x = targetRotationX
      rotationObject.rotation.y = targetRotationY

      earthObject = new THREE.Group()
      earthObject.name = 'earthObject'
      earthObject.rotation.y = -90 * toRAD

      rotationObject.add(earthObject)

      return rotationObject
    },

    addAxis () {
      scene.add(new THREE.AxesHelper(600))
    },

    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },

    render () {
      renderer.render(scene, camera)
      // trackballControls.update();

      if (targetCameraZ < globeMaxZoom) targetCameraZ = globeMaxZoom
      if (targetCameraZ > globeMinZoom) targetCameraZ = globeMinZoom
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05

      if (targetRotationX > 75 * toRAD) targetRotationX = 75 * toRAD
      if (targetRotationX < -75 * toRAD) targetRotationX = -75 * toRAD

      if (scene.getObjectByName('rotationObject')) {
        rotationObject.rotation.x = rotationObject.rotation.x += (targetRotationX - rotationObject.rotation.x) * 0.1
        rotationObject.rotation.y = rotationObject.rotation.y += (targetRotationY - rotationObject.rotation.y) * 0.1
      }

      if (isMouseDown) return

      targetRotationY += 0.002
    },

    onWindowResize () {
      const {
        innerWidth: width,
        innerHeight: height
      } = window

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    },

    onMouseWheel (event) {
      event.preventDefault()
      targetCameraZ -= event.wheelDeltaY * 0.05
    },

    onMouseDown (event) {
      event.preventDefault()
      isMouseDown = true

      mouseXOnMouseDown = event.clientX - WIDTH / 2
      mouseYOnMouseDown = event.clientY - HEIGHT / 2

      targetRotationXOnMouseDown = targetRotationX
      targetRotationYOnMouseDown = targetRotationY
    },

    onMouseMove (event) {
      if (!isMouseDown) return

      const mouseX = event.clientX - WIDTH / 2
      const mouseY = event.clientY - HEIGHT / 2

      targetRotationX = targetRotationXOnMouseDown + (mouseY - mouseYOnMouseDown) * 0.0025
      targetRotationY = targetRotationYOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.0025
    },

    onMouseUp (event) {
      event.preventDefault()
      isMouseDown = false
    },

    onMouseLeave (event) {
      event.preventDefault()
      if (isMouseDown) {
        isMouseDown = false
      }
    }
  }
}
</script>
