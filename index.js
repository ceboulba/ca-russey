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
  'https://res.cloudinary.com/archipicture/image/upload/v1582322511/cafc-russey/cafc-russey-07.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582322511/cafc-russey/cafc-russey-08.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582322511/cafc-russey/cafc-russey-09.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582320231/cafc-russey/cafc-russey-04.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582320234/cafc-russey/cafc-russey-03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582323566/cafc-russey/cafc-russey-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582306650/cafc-russey/cafc-russey-05.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582303656/cafc-russey/cafc-russey-06.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582382642/cafc-russey/cafc-russey-open.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582386387/cafc-russey/cafc-russey-close.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1582380935/cafc-russey/cafc-russey-tisanerie.jpg'
]
const imgName= [
  'Axo 1',
  'Axo 2',
  'Axo 3',
  'Espace libre service bancaire',
  'Espace carré 1',
  'Espace carré 2',
  'Espace collaborateurs 1',
  'Espace collaborateurs 2',
  'porte sortie collaborateurs coulissante ouverte',
  'porte sortie collaborateurs coulissante fermé',
  'Tisanerie'
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
  num <= 2 || num === 8 || num === 9 ?( () => {
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
  num <= 2 ? imgView.src = imgs[num] : null
  num === 8 ? imgView.src = imgs[8] : null
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
