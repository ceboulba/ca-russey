'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')
const imageName = document.querySelector('.imageName')
console.log(imageName.innerHTML)

const imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1580795988/ca-jussey/axo-RDC-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580795982/ca-jussey/axo-RDC-01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580797168/ca-jussey/axo-Etage-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580796545/ca-jussey/axo-Etage-01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580765411/ca-jussey/cam01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580848044/ca-jussey/cam08.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580817863/ca-jussey/cam10.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580845510/ca-jussey/cam09.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580845677/ca-jussey/cam16.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580799098/ca-jussey/cam-07.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580846997/ca-jussey/cam05.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580773296/ca-jussey/cam18.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580777043/ca-jussey/cam11.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1580772537/ca-jussey/cam20.jpg',
]
const imgName= [
  'RDC vue axo 1',
  'RDC vue axo 2',
  'ETAGE vue axo 1',
  'ETAGE vue axo 2',
  'RDC entrée',
  'RDC carré / arbre',
  'RDC carré / attente',
  'RDC espace collaborateurs',
  'RDC espace collaborateurs',
  'couloir salle des coffres',
  'RDC tisanerie',
  'RDC accès étage',
  'ETAGE palier',
  'ETAGE attente',
]

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(   
    'Camera',
   9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 3 || num === 9 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num === 0 ? imgView.src = imgs[0] : null
  num === 1 ? imgView.src = imgs[1] : null
  num === 2 ? imgView.src = imgs[2] : null
  num === 3 ? imgView.src = imgs[3] : null
  num === 9 ? imgView.src = imgs[9] : null
}

check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
    imageName.innerHTML = imgName[num]
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
