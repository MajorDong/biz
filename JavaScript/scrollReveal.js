!function(){
  const staggeringOption = {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
  }
  ScrollReveal().reveal('.feature',{...staggeringOption, interval: 350})
  ScrollReveal().reveal('.service-item',{...staggeringOption, interval: 350})
}.call()