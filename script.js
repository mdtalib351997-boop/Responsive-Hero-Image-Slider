const slides = document.querySelectorAll('.slide');
const pills = document.querySelectorAll('.pill');
const cur = document.getElementById('cur');
const D = 5000;
let idx = 0, timer;

function goTo(n) {
    [slides[idx], pills[idx]].forEach(el => el.classList.remove('active'));
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    const p = pills[idx];
    p.style.setProperty('--pill-duration', D + 'ms');
    p.classList.remove('active');
    void p.offsetWidth;
    p.classList.add('active');
    cur.textContent = String(idx + 1).padStart(2, '0');
}

function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(idx + 1), D);
}

document.getElementById('next').onclick = () => {
    goTo(idx + 1);
    startAuto();
};
document.getElementById('prev').onclick = () => {
    goTo(idx - 1);
    startAuto();
};
pills.forEach(p => p.onclick = () => {
    goTo(+p.dataset.i);
    startAuto();
});

document.onkeydown = e => {
    if (e.key === 'ArrowRight') {
        goTo(idx + 1);
        startAuto();
    }
    if (e.key === 'ArrowLeft') {
        goTo(idx - 1);
        startAuto();
    }
};

goTo(0);
startAuto();