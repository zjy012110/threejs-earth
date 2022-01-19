/*
 * @Description: consts.js
 * @Autor: Espada
 * @Date: 2022-01-14 16:02:31
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-19 17:34:19
 * @FilePath: \earth\src\util\consts.js
 */
const consts = {
  scene: null,

  camera: null,
  cameraTarget: 'auto',

  globeMaxZoom: 90,
  globeMinZoom: 300,
  targetCameraZ: 230,

  renderer: null,

  rotationObject: null,
  earthObject: null,

  colorPrimary: '#33CCFF',
  colorDarken: '#000000',
  globeRadius: 65,
  toRAD: Math.PI / 180,

  mouse: {
    isMouseDown: false,
    isMouseMoved: false,

    mouseXOnMouseDown: 0,
    mouseYOnMouseDown: 0,

    targetRotationX: 0.45,
    targetRotationY: 0,
    targetRotationXOnMouseDown: 0,
    targetRotationYOnMouseDown: 0
  },

  lights: {
    lightShieldIntensity: 1.25,
    lightShieldDistance: 400,
    lightShieldDecay: 2.0
  }
}
window.consts = {

  scene: null,

  camera: null,
  cameraTarget: 'auto',

  globeMaxZoom: 90,
  globeMinZoom: 300,
  targetCameraZ: 230,

  renderer: null,

  rotationObject: null,
  earthObject: null,

  colorPrimary: '#33CCFF',
  colorDarken: '#000000',
  globeRadius: 65,
  toRAD: Math.PI / 180,

  mouse: {
    isMouseDown: false,
    isMouseMoved: false,

    mouseXOnMouseDown: 0,
    mouseYOnMouseDown: 0,

    targetRotationX: 0.45,
    targetRotationY: 0,
    targetRotationXOnMouseDown: 0,
    targetRotationYOnMouseDown: 0
  },

  lights: {
    lightShieldIntensity: 1.25,
    lightShieldDistance: 400,
    lightShieldDecay: 2.0
  }
}

export default consts
