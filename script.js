const body=document.body;
const intro=document.querySelector('.intro');
body.classList.add('intro-active');
window.addEventListener('load',()=>{
  setTimeout(()=>{
    intro?.classList.add('exiting');
    setTimeout(()=>{
      intro?.classList.add('hide');
      body.classList.remove('intro-active');
    },1200);
  },5000);
});

const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.site-nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40));
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('.counter');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.target);const suffix=el.dataset.suffix||'';const duration=1400;const start=performance.now();function tick(now){const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);el.textContent=Math.floor(target*eased)+suffix;if(progress<1)requestAnimationFrame(tick);else el.textContent=target+suffix;}requestAnimationFrame(tick);counterObserver.unobserve(el);}),{threshold:.6});
counters.forEach(el=>counterObserver.observe(el));

const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.image;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
document.getElementById('year').textContent=new Date().getFullYear();

// Kurumsal teklif formu: cihazdaki varsayılan e-posta uygulamasını açar.
const offerForm = document.getElementById('offerForm');
if (offerForm) {
  offerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(offerForm);
    const subject = `Web Sitesi Teklif Talebi - ${data.get('company') || ''}`;
    const body = [
      `Firma / Kurum: ${data.get('company') || ''}`,
      `Yetkili: ${data.get('name') || ''}`,
      `Telefon: ${data.get('phone') || ''}`,
      `E-posta: ${data.get('email') || ''}`,
      `Talep Konusu: ${data.get('service') || ''}`,
      '',
      `Mesaj:`,
      `${data.get('message') || ''}`
    ].join('\n');
    window.location.href = `mailto:mecitoglugrup.01@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Galeri filtreleri
const galleryFilters = document.querySelectorAll('.gallery-filters button');
const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
galleryFilters.forEach(button => button.addEventListener('click', () => {
  galleryFilters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.gallery-grid').forEach(grid => {
    grid.classList.remove('is-filtering');
    void grid.offsetWidth;
    grid.classList.add('is-filtering');
  });
  galleryItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
}));

// Masaüstünde çok hafif altın imleç parıltısı
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}
