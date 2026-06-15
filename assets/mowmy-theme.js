document.documentElement.classList.add('mt-js');

document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('[data-mt-menu-toggle]');
  var drawer = document.querySelector('[data-mt-mobile-drawer]');
  if(toggle && drawer){
    toggle.addEventListener('click', function(){
      var open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape'){
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  var revealItems = document.querySelectorAll('.mt-reveal');
  if(!('IntersectionObserver' in window)){
    revealItems.forEach(function(item){ item.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealItems.forEach(function(item){ observer.observe(item); });
});
