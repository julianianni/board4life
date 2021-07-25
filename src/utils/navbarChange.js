
export default function navbarChange(){   

  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
          nav.classList.remove('bg-trasparent')
          nav.classList.add('bg-dark', 'shadow');
        } else{
          nav.classList.remove('bg-dark', 'shadow');
          nav.classList.add('bg-trasparent')
        }
      });
}