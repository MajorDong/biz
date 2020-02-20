
window.addEventListener('scroll',()=>{
  const wrapTop = document.querySelector('.contentWrap').offsetTop
  const scrollToTop = document.querySelector('.scrollToTop')
  if(window.scrollY > wrapTop){
    document.querySelector('header').classList.add('sticky')
  }else{
    document.querySelector('header').classList.remove('sticky')
  }

  if(window.scrollY > 1700){
    scrollToTop.style.display = 'block'
  }else{
    scrollToTop.style.display = 'none'
  }
})

document.querySelector('.scrollToTop').onclick = ()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


const glide = new Glide('.glide')
const captionEles = document.querySelectorAll('.slide-caption')

glide.on('run.before',()=>{
  const childOfCaption = document.querySelectorAll('.slide-caption > *')
  childOfCaption.forEach(ele =>{
    ele.style.opacity = 0
  })
})
glide.on(['mount.after','run.after'], ()=>{
  const caption = captionEles[glide.index]
  anime({
    targets: caption.children,
    duration: 300,
    opacity: [0,1],
    easing: 'linear',
    delay: anime.stagger(400,{start:300}),
    translateY: [anime.stagger([20,10]),0],
  })
})
glide.mount()

const isotope = new Isotope('.cases',{
  layoutMode: 'fitRows',
  itemSelector: '.case-item'
})
const filterBtns = document.querySelectorAll('.filter-btns') //[]
filterBtns.forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    let { target } = e
    let btnOptions = target.getAttribute('data-filter')
    if(btnOptions){
      document.querySelectorAll('.filter-btn.active').forEach( btn =>{
        btn.classList.remove('active')
      })
      target.classList.add('active')
      isotope.arrange({filter: btnOptions})
    }
  })
})


const staggeringOption = {
  delay: 300,
  distance: '50px',
  easing: 'ease-in-out',
  origin: 'bottom',
}
ScrollReveal().reveal('.feature',{...staggeringOption, interval: 350})
ScrollReveal().reveal('.service-item',{...staggeringOption, interval: 350})

const dataEl = document.querySelector('.data')
function bgPositionContr(bottom){
  let bottomDi = bottom / 7
  dataEl.style.backgroundPosition = `center calc(50% - ${bottomDi}px)`
}
ScrollReveal().reveal('.data',{
  beforeReveal: () => {
    anime({
      targets: '.data-piece .num',
      innerHTML: (el) => {
        return [0, el.innerHTML]
      },
      duration: 1000,
      round: 1,
      easing: 'easeInExpo'
    })
    let { bottom } = dataEl.getBoundingClientRect()
    bgPositionContr(bottom)
  }
})

window.addEventListener('scroll',()=>{
  let { top, bottom } = dataEl.getBoundingClientRect()
  //判断是否在可见区域
  if(bottom > 0 && top < window.innerHeight){
    bgPositionContr(bottom)
  }
})

const theScroll = new SmoothScroll('nav a',{
  header: "header",
  offset: -10,
})
const glideBtnEl = document.querySelectorAll('.glide .btn')
glideBtnEl.forEach( el =>{
  el.addEventListener('click',()=>{
    const targetTo = document.querySelector('#about')
    theScroll.animateScroll(targetTo)
  })
} )

//根据页面高亮nav
const disEls = document.querySelectorAll('[data-d]')
let minIndex = 0
window.addEventListener('scroll',()=>{
  disEls.forEach((el,index)=>{
    if(Math.abs(disEls[index].getBoundingClientRect().top) < Math.abs(disEls[minIndex].getBoundingClientRect().top)){
      //console.log(disEls[index].id)
      const aTags = document.querySelectorAll('.nav a')
      aTags.forEach(el =>{
        el.classList.remove('active')
      })
      aTags[index].classList.add('active')
      minIndex = index
    }
  })
})