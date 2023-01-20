//local storage
let interval
(function setUpLocalStorage(){
    let mainColor = localStorage.getItem('main-color')
    let randBkgOpt = localStorage.getItem('randBkgOpt')
    let bulletsOpt = localStorage.getItem('bulletOpt')
    if(mainColor){
        document.documentElement.style.setProperty('--main-color', mainColor)
    }
    if(randBkgOpt == 'true'){
        setUpInterval()
    }
    if(bulletsOpt == 'false'){
        document.querySelector('.nav-bullets').style.display = 'none'
    }
})()

function setUpInterval() {
    interval = setInterval(function(){
        const land = document.querySelector('.landing')
        let rand = Math.floor(Math.random() * 4) + 1
        land.style.backgroundImage = `url("../images/land-${rand}.jpg")`
    }, 10000)
}

// setting box
const settingBox= document.querySelector('.setting-box .icon-container')
settingBox.addEventListener('click', function(){
    document.querySelector('.setting-box').classList.toggle('open')
})

const colorslist = document.querySelectorAll('.setting-box .setting .colors-list li')
let lastColor
colorslist.forEach(function (item) {
    item.addEventListener('click', function() {
        document.documentElement.style.setProperty('--main-color', this.dataset.color)
        localStorage.setItem('main-color', this.dataset.color)
        this.classList.add('active')
        lastColor?.classList.remove('active')
        lastColor = this
    })
})

const randBkgOpts = document.querySelectorAll('.setting-box .setting2 span')
let lastBkgOpt
randBkgOpts.forEach(function(item) {
    item.addEventListener('click', function() {
        if(this.classList.contains('no')){
            clearInterval(interval)
            localStorage.setItem('randBkgOpt', 'false')
        }else{
            setUpInterval()
            localStorage.setItem('randBkgOpt', 'true')
        }
        this.classList.add('active')
        lastBkgOpt?.classList.remove('active')
        lastBkgOpt = this
    })
})

const bulletsOpts = document.querySelectorAll('.setting-box .setting3 span')
let lastBulletOpt
bulletsOpts.forEach(function(item) {
    item.addEventListener('click', function() {
        let navBullets = document.querySelector('.nav-bullets')
        if(this.classList.contains('no')){
            navBullets.style.display = 'none'
            localStorage.setItem('bulletOpt', 'false')
        }else{ 
            navBullets.style.display = 'block'
            localStorage.setItem('bulletOpt', 'true')
        }

        this.classList.add('active')
        lastBulletOpt?.classList.remove('active')
        lastBulletOpt = this
    })
})

const resetBtn = document.querySelector('.reset-setting')
resetBtn.addEventListener('click', function () {
    localStorage.clear()
    window.location.reload()
})

//gallery
const gallery = document.querySelectorAll('.gallery .images img')
gallery.forEach(function (item) {
    item.addEventListener('click', function () {
        const overlay = createAndAppendOverlay()
        const popupBox = createAndAppendPopupBox(item)
        createAndAppendCloseBtn(popupBox, overlay)
    })
})

function createAndAppendOverlay() {
    const overlay = document.createElement('div')
    overlay.classList.add('popup-overlay')
    document.body.appendChild(overlay)
    return overlay
}

function createAndAppendPopupBox(item){
    const popupBox = document.createElement('div')
    popupBox.classList.add('popup-box')

    const img = document.createElement('img')
    img.src = item.src

    popupBox.appendChild(img)
    document.body.appendChild(popupBox)
    return popupBox
}

function createAndAppendCloseBtn(popupBox, overlay) {
    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = 'X'
    closeBtn.classList.add('close-btn')
    popupBox.appendChild(closeBtn)
    closeBtn.addEventListener('click', function() {
        this.parentNode.remove()
        overlay.remove()
    })
}

//navigation 
const navBullets = document.querySelectorAll('.nav-bullets .bullet')
navBullets.forEach(function(item) {
    item.addEventListener('click', function() {
        const target = document.querySelector(`.${item.id}`)
        window.scroll({left: 0, top: target.offsetTop, behavior: 'smooth'})
    })
})

//toggle menu
const tglBtn = document.querySelector('.landing .toggle-menu')
const tglLinks = document.querySelector('.landing .header .links')
tglBtn.addEventListener('click', function(e) {
    e.stopPropagation()
    this.classList.toggle('active')
    tglLinks.classList.toggle('open')
})

document.addEventListener('click', function(e) {
    if(e.target != tglBtn && e.target != tglLinks){
        if(tglLinks.classList.contains('open')){
            tglBtn.classList.toggle('active')
            tglLinks.classList.toggle('open')
        }
    }
})