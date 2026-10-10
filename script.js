const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name') ? urlParams.get('name').trim() : "Alomoni";
const fromName = "Rafiul";

document.title = `Magical Birthday wish for ${userName}`;
document.getElementById('start-title').innerHTML = `A special gift for ${userName} 🎉`;
document.getElementById('start-from').innerText = `A magical gift from ${fromName} ✨`;
document.getElementById('msg-body').innerHTML = `Dear <strong>${userName}</strong>,<br><br>Happy Birthday! They say distance makes the heart grow fonder, and it’s true. Even with the miles, our friendship never skips a beat. Wishing you the best year ahead—you deserve the world!!🎂✨`;
document.getElementById('msg-from').innerText = `— From ${fromName} ❤️`;

const wishText = `Happy Birthday ${userName} 💕`;
const bgMusic = document.getElementById('bg-music');

const unlockDateStr = "2026-11-28T00:00:00";
const targetTime = new Date(unlockDateStr).getTime();
const isUnlockedParam = urlParams.get('unlock') === 'true';

function checkUnlockState() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0 || isUnlockedParam) {
        document.getElementById('lock-overlay').style.display = 'none';
        document.getElementById('start-overlay').style.display = 'flex';
        return true;
    } else {
        document.getElementById('lock-overlay').style.display = 'flex';
        document.getElementById('start-overlay').style.display = 'none';

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(d).padStart(2, '0');
        document.getElementById('hours').innerText = String(h).padStart(2, '0');
        document.getElementById('mins').innerText = String(m).padStart(2, '0');
        document.getElementById('secs').innerText = String(s).padStart(2, '0');
        return false;
    }
}

const timerInterval = setInterval(() => {
    if (checkUnlockState()) {
        clearInterval(timerInterval);
    }
}, 1000);

checkUnlockState();

function startSurprise() {
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    btn.innerText = "Opening... ⌛";
    bgMusic.load();
    
    document.getElementById('start-overlay').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('countdown-overlay').style.display = 'flex';
    
    startCountdown();
}

function nextStep(stepNumber) {
    document.querySelectorAll('.step-card').forEach(card => {
        card.classList.remove('active');
    });
    document.getElementById('step-' + stepNumber).classList.add('active');
}

function showToast(msg) {
    const toast = document.getElementById('toast-msg');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log(e));
        document.getElementById('music-btn').innerHTML = '🎵 Music On';
    } else {
        bgMusic.pause();
        document.getElementById('music-btn').innerHTML = '🔇 Music Off';
    }
}

const themes = [
    { bg: '#030108', fog: 0x030108, name: 'Aesthetic Night' },
    { bg: '#12001e', fog: 0x12001e, name: 'Royal Purple' },
    { bg: '#00131e', fog: 0x00131e, name: 'Ocean Cyan' },
    { bg: '#1c0e00', fog: 0x1c0e00, name: 'Golden Glow' }
];
let currentThemeIdx = 0;

function toggleTheme() {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    const theme = themes[currentThemeIdx];
    document.body.style.backgroundColor = theme.bg;
    if (scene) scene.fog.color.setHex(theme.fog);
    showToast("🎨 Theme: " + theme.name);
}

function sendLove() {
    const hearts = ['💖', '❤', '✨', '💕', '⭐', '🌸'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 90 + 5 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3500);
        }, i * 80);
    }
    showToast("💖 Sending Love! to Rafiul ✨");
}

function sendCustomMessage() {
    const msgInput = document.getElementById('user-custom-msg');
    const text = msgInput.value.trim();

    if (!text) {
        showToast("⚠ Please write something first!");
        return;
    }

    showToast("🚀 Sending message...");
    setTimeout(() => {
        showToast("✅ Message saved successfully!");
        msgInput.value = "";
        setTimeout(() => {
            endExperience();
        }, 1000);
    }, 500);
}

function endExperience() {
    document.getElementById('content-wrapper').style.display = 'none';
    document.getElementById('scroll-hint').style.display = 'none';
    document.getElementById('top-controls').style.display = 'flex'; 
    triggerFireworks();
    showToast("✨ Hope you enjoyed the surprise!");
}

function readAgain() {
    document.getElementById('content-wrapper').style.display = 'flex'; 
    document.getElementById('scroll-hint').style.display = 'block';
    document.getElementById('top-controls').style.display = 'flex'; 
    nextStep(1);
}

let scene, camera, renderer, controls;

scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030108, 0.0008);

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 450);

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enableZoom = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffd700, 2.0);
dirLight.position.set(100, 200, 150);
scene.add(dirLight);

function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 256;

    ctx.font = 'Bold 55px "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function createHeartTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;

    ctx.font = '80px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

const textTexture = createTextTexture(wishText);
const heartTexture = createHeartTexture();

const particles = [];
const particleCount = 850;

for (let i = 0; i < particleCount; i++) {
    const isText = Math.random() > 0.15;
    const texture = isText ? textTexture : heartTexture;
    
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: Math.random() * 0.7 + 0.3,
        color: new THREE.Color()
    });

    const sprite = new THREE.Sprite(material);
    
    sprite.position.x = (Math.random() - 0.5) * 1400;
    sprite.position.y = (Math.random() - 0.5) * 1400;
    sprite.position.z = (Math.random() - 0.5) * 1400;

    sprite.speedY = Math.random() * 0.7 + 0.3;

    const scaleRandom = Math.random() * 0.5 + 0.75;
    if (isText) {
        sprite.scale.set(160 * scaleRandom, 40 * scaleRandom, 1);
    } else {
        sprite.scale.set(40 * scaleRandom, 40 * scaleRandom, 1);
    }

    if (i % 2 === 0) {
        material.color.setHSL(0.12, 1.0, 0.65);
    } else {
        material.color.setHSL(0.92, 1.0, 0.65);
    }

    scene.add(sprite);
    particles.push(sprite);
}

function animate() {
    requestAnimationFrame(animate);

    particles.forEach((p) => {
        p.position.y -= p.speedY;

        if (p.position.y < -700) {
            p.position.y = 700;
            p.position.x = (Math.random() - 0.5) * 1400;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

function triggerFireworks() {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function startCountdown() {
    let timeLeft = 3;
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownText = document.getElementById('countdown-text');

    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownText.innerText = timeLeft;
        } else {
            clearInterval(timer);

            bgMusic.play().then(() => {
                document.getElementById('music-btn').innerHTML = '🎵 Music On';
            }).catch(err => console.log("Audio play error: ", err));

            countdownOverlay.style.opacity = '0';
            setTimeout(() => {
                countdownOverlay.style.display = 'none';
                document.getElementById('scroll-hint').style.display = 'block';
                document.getElementById('content-wrapper').style.display = 'flex';
                
                setTimeout(() => {
                    nextStep(1);
                }, 3000);

            }, 800);
            
            animate(); 
            triggerFireworks();
        }
    }, 1000);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
