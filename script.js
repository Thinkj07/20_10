// ============= HỆ THỐNG HOA RƠI =============
const flowersContainer = document.getElementById('flowersContainer');
const flowerTypes = ['🌸', '🌺', '🌹', '🌷', '🌻', '💐', '🏵️', '🌼'];

function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.fontSize = (Math.random() * 2 + 1) + 'em';
    flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
    flower.style.animationDelay = Math.random() * 2 + 's';
    
    flowersContainer.appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, 7000);
}

// Tạo hoa rơi liên tục
setInterval(createFlower, 300);

// Tạo hoa ban đầu
for (let i = 0; i < 15; i++) {
    setTimeout(createFlower, i * 200);
}

// ============= HỆ THỐNG TRÁI TIM BAY =============
const heartsContainer = document.getElementById('heartsContainer');
const heartTypes = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Tạo trái tim bay liên tục
setInterval(createHeart, 800);

// ============= HỆ THỐNG ÁNH SÁNG LẤP LÁNH =============
const sparklesContainer = document.getElementById('sparklesContainer');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
    
    // Màu sắc ngẫu nhiên
    const colors = ['#fff', '#ffd700', '#ff69b4', '#87ceeb', '#ffb6c1'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Tạo ánh sáng lấp lánh liên tục
setInterval(createSparkle, 100);

// ============= HỆ THỐNG PHÁO HOA =============
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.98;
        this.gravity = 0.1;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

let particles = [];
let isFireworksActive = false;

function createFirework(x, y) {
    const particleCount = 100;
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff6bcf', '#fff'];
    
    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    if (!isFireworksActive) return;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });
    
    requestAnimationFrame(animateFireworks);
}

// Sự kiện nút bắn pháo hoa
const fireworkBtn = document.querySelector('.firework-btn');
let fireworkInterval;

fireworkBtn.addEventListener('click', () => {
    if (isFireworksActive) {
        // Tắt pháo hoa
        isFireworksActive = false;
        clearInterval(fireworkInterval);
        fireworkBtn.textContent = '🎆 Bắn Pháo Hoa 🎆';
        
        // Xóa canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = [];
    } else {
        // Bật pháo hoa
        isFireworksActive = true;
        fireworkBtn.textContent = '🎆 Dừng Pháo Hoa 🎆';
        
        animateFireworks();
        
        // Tạo pháo hoa ngẫu nhiên
        fireworkInterval = setInterval(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.7;
            createFirework(x, y);
        }, 500);
    }
});

// ============= HIỆU ỨNG MỞ THIỆP =============
const greetingCard = document.getElementById('greetingCard');
let isCardOpened = false;

greetingCard.addEventListener('click', () => {
    if (!isCardOpened) {
        greetingCard.classList.add('opened');
        isCardOpened = true;
        
        // Tạo hiệu ứng trái tim khi mở thiệp
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 50);
        }
        
        // Tạo hiệu ứng lấp lánh
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 30);
        }
        
        // Tạo hiệu ứng hoa rơi
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFlower();
            }, i * 100);
        }
    } else {
        greetingCard.classList.remove('opened');
        isCardOpened = false;
    }
});

// ============= HIỆU ỨNG CLICK CHUỘT =============
document.addEventListener('click', (e) => {
    // Tạo trái tim tại vị trí click
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'heartPopUp 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// Thêm keyframe animation cho heart pop up
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPopUp {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -80px) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -120px) scale(0.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============= HIỆU ỨNG DI CHUỘT =============
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Tạo hiệu ứng lấp lánh theo chuột
    if (Math.random() > 0.8) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = mouseX + 'px';
        sparkle.style.top = mouseY + 'px';
        sparkle.style.animationDuration = '0.8s';
        
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
});

// ============= THÔNG BÁO CHÀO MỪNG =============
window.addEventListener('load', () => {
    // Hiệu ứng chào mừng khi tải trang
    setTimeout(() => {
        // Tạo burst trái tim
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
        
        // Tạo burst hoa
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFlower();
            }, i * 100);
        }
        
        // Tạo burst lấp lánh
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 50);
        }
    }, 500);
});

// ============= MUSIC BACKGROUND (OPTIONAL) =============
// Bạn có thể thêm nhạc nền nếu muốn
// const audio = new Audio('path/to/your/music.mp3');
// audio.loop = true;
// audio.volume = 0.3;
// document.body.addEventListener('click', () => {
//     audio.play();
// }, { once: true });

console.log('🌸 Chúc mừng ngày Phụ nữ Việt Nam 20/10! 🌸');
console.log('💖 Website được tạo với tất cả tình yêu thương! 💖');

