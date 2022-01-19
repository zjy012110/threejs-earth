/*
 * @Description: universe.js
 * @Autor: Espada
 * @Date: 2022-01-14 16:05:12
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-19 17:34:02
 * @FilePath: \earth\src\meshes\universe.js
 */
import * as THREE from 'three'
import consts from '@/util/consts'

function universe (img) {
  let _texture, _geometry, _material, _mesh
  _texture = new THREE.TextureLoader().load(img.src)
  _texture.anisotropy = 16

  _geometry = new THREE.PlaneGeometry(1500, 750, 1, 1)
  _material = new THREE.MeshBasicMaterial({
    map: _texture,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color(consts.colorPrimary),
    transparent: true,
    opacity: 1,

    fog: false,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: false
  })

  _mesh = new THREE.Mesh(_geometry, _material)
  _mesh.position.z = -400
  _mesh.name = 'universeBgMesh'
  return _mesh
}

export default universe
