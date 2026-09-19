const chapters = Array.from(document.querySelectorAll('.chapter'));
const desktopList = document.querySelector('#timelineDesktop ol');
const mobileNav = document.querySelector('#timelineMobile');

chapters.forEach(ch => {
  const year = ch.dataset.year;
  const place = ch.dataset.place;
  const id = ch.id;

  const li = document.createElement('li');
  li.innerHTML = `<a href="#${id}"><span class="year">${year}</span><span class="place">${place}</span></a>`;
  li.dataset.target = id;
  desktopList.appendChild(li);

  const a = document.createElement('a');
  a.href = `#${id}`;
  a.textContent = place;
  a.dataset.target = id;
  mobileNav.appendChild(a);
});

const desktopItems = Array.from(desktopList.querySelectorAll('li'));
const mobileLinks = Array.from(mobileNav.querySelectorAll('a'));

const setActive = (id) => {
  desktopItems.forEach(li => li.classList.toggle('active', li.dataset.target === id));
  mobileLinks.forEach(a => {
    const active = a.dataset.target === id;
    a.classList.toggle('active', active);
    if (active) a.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

chapters.forEach(ch => observer.observe(ch));
if (chapters.length) setActive(chapters[0].id);
