document.addEventListener('DOMContentLoaded', function() {
    // 创建粒子效果
    createParticles();
    
    // 5秒后隐藏开场动画并显示主界面
    setTimeout(() => {
        const introAnimation = document.querySelector('.intro-animation');
        const app = document.getElementById('app');
        
        introAnimation.style.transition = 'opacity 1s ease-out';
        introAnimation.style.opacity = '0';
        
        app.style.display = 'flex';
        app.style.opacity = '0';
        app.style.transition = 'opacity 1s ease-in';
        
        setTimeout(() => {
            introAnimation.style.display = 'none';
            app.style.opacity = '1';
        }, 1000);
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    // 恐龙数据
    const dinosaurs = [
        {
            name: "腕龙",
            image: "./images/howe-quarry-restoration.jpg",
            description: "腕龙是最大的陆地动物之一，生活在侏罗纪晚期。它们可以长到25米，重达80吨。腕龙有着极长的脖子和尾巴，是典型的草食性恐龙。"
        },
        {
            name: "迷惑龙",
            image: "./images/WWDBook_Diplodocus.webp",
            description: "迷惑龙是一种大型蜥脚类恐龙，生活在侏罗纪晚期。它以极长的脖子和尾巴为特征，可以长达25米。它们是草食性恐龙，可能群居生活。"
        },
        {
            name: "剑龙",
            image: "./images/stegosaurus-stenops-conway.avif",
            description: "剑龙生活在侏罗纪晚期，背部有两排巨大的骨板，尾部有四根尖刺。它是草食性恐龙，可能用背板来调节体温和求偶展示。"
        },
        {
            name: "霸王龙",
            image: "./images/Meraxes-CREDIT-Carlos-Papolio.avif",
            description: "霸王龙生活在白垩纪晚期，约6800万年前。体长可达12米，体重可达7吨。它们是当时最强大的陆地掠食者，拥有巨大的头骨和锋利的牙齿。"
        },
        {
            name: "三角龙",
            image: "./images/企业微信截图_17339245439291.png",
            description: "三角龙生活在白垩纪末期，约6600万年前。它们有着独特的头饰，包括两个长角和一个鼻角，以及扇形的领骨。这些特征可能用于防御和求偶展示。"
        },
        {
            name: "棘龙",
            image: "./images/微信图片_20241203232435.png",
            description: "棘龙生活在白垩纪早期，约1.12亿年前。它是一种半水生的食肉恐龙，背部有一排高大的棘突。这些棘突可能形成了帆状结构，用于调节体温或求偶展示。"
        },
        {
            name: "甲龙",
            image: "./images/borealopelta.avif",
            description: "甲龙生活在白垩纪晚期，全身覆盖着骨质装甲和尖刺。它是草食性恐龙，尾部有巨大的骨质球棒，可以用来防御捕食者。"
        },
        {
            name: "蛮龙",
            image: "./images/1-230Z1162450243.jpg",
            description: "蛮龙是一种大型食肉恐龙，生活在侏罗纪晚期。它有着强壮的后肢和有力的下颌，是当时最强大的掠食者之一。"
        },
        {
            name: "梁龙",
            image: "./images/50-220Q3125R1600.jpg",
            description: "梁龙是一种大型蜥脚类恐龙，生活在侏罗纪晚期。它有着极长的脖子，可以够到很高的树叶。背部的骨骼形成了独特的'梁'状结构。"
        },
        {
            name: "异特龙",
            image: "./images/Allosaurus-hunting.jpg",
            description: "异特龙是一种中型食肉恐龙，生活在侏罗纪晚期。它的特点是后肢上有一个巨大的镰刀状爪子，可能用于捕猎和打斗。"
        },
        {
            name: "鸭嘴龙",
            image: "./images/08.avif",
            description: "鸭嘴龙生活在白垩纪晚期，因其扁平的喙部而得名。它是草食性恐龙，可以用喙部磨碎坚硬的植物。有些种类还有头冠，可能用于发出声音。"
        },
        {
            name: "肿头龙",
            image: "./images/t0139de030261f2226d.jpg",
            description: "肿头龙生活在白垩纪晚期，头顶有一个巨大的圆顶状骨质结构。它们是草食性恐龙，可能用头部进行种内竞争或求偶展示。"
        },
        {
            name: "镰刀龙",
            image: "./images/01dyj2fwvilkspbe0j3a1g3530.jpg",
            description: "镰刀龙是一种中型食肉恐龙，生活在白垩纪晚期。它以敏捷的身手和锋利的爪子著称，是一种高效的猎手。"
        },
        {
            name: "副栉龙",
            image: "./images/Yi.avif",
            description: "副栉龙是一种大型食肉恐龙，生活在白垩纪早期。它的背部有一个高大的帆状结构，可能用于调节体温或求偶展示。"
        },
        {
            name: "禽龙",
            image: "./images/1280.avif",
            description: "禽龙是一种小型恐龙，生活在侏罗纪晚期。它们体型小巧，有羽毛覆盖，被认为是鸟类的近亲。这种恐龙展示了恐龙向鸟类演化的重要证据。"
        },
        {
            name: "伶盗龙",
            image: "./images/01_chicken_hesperornithoides-illustration--c--gabriel-ugueto.avif",
            description: "伶盗龙是一种小型掠食性恐龙，生活在白垩纪晚期。它们体型轻盈，行动敏捷，是一种高效的猎手。伶盗龙的智商很高，可能具有群体狩猎的行为。"
        },
        {
            name: "重爪龙",
            image: "./images/155_therizinosaurus_damir.webp",
            description: "重爪龙是一种独特的食草性兽脚类恐龙，生活在白垩纪晚期。它最显著的特征是前肢上巨大的爪子，可以长达1米。这些爪子可能用于防御和获取食物。"
        },
        {
            name: "鹦鹉龙",
            image: "./images/oviraptor.avif",
            description: "鹦鹉龙是一种小型兽脚类恐龙，生活在白垩纪晚期。它有着独特的鸟喙状嘴部和头冠，可能以蛋、贝类和植物为食。它们是恐龙向鸟类演化过程中的重要一环。"
        },
        {
            name: "异齿龙",
            image: "./images/damir-g-martin-finalisms-insta-artst-2scaled2.jpg",
            description: "异齿龙是一种大型食肉恐龙，生活在白垩纪晚期。它的名字来源于其不规则的牙齿结构。这种恐龙是当时最强大的掠食者之一，可能以其他大型恐龙为食。"
        },
        {
            name: "小盗龙",
            image: "./images/microraptor-takeoff.jpg",
            description: "小盗龙是一种小型羽毛恐龙，生活在白垩纪早期。它是目前已知最小的恐龙之一，四肢都长有羽毛，可能具有滑翔能力。这种恐龙为研究鸟类起源提供了重要线索。"
        }
    ];

    let currentDinoIndex = 0;
    let isAnimating = false;
    let autoplayTimer = null;

    // 导航切换功能
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // 更新按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新section显示
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 轮播图功能
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const carouselImg = document.querySelector('.carousel-img');
    const dinoName = document.querySelector('.dino-name');
    const dinoDesc = document.querySelector('.dino-desc');
    const imgContainer = document.querySelector('.carousel-img-container');

    // 更新轮播图显示
    function updateCarousel(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        const dino = dinosaurs[currentDinoIndex];
        
        // 添加加载状态
        imgContainer.classList.add('loading');

        // 先更新文字内容
        dinoName.textContent = dino.name;
        dinoDesc.textContent = dino.description;

        // 创建新图片对象
        const newImg = new Image();
        newImg.onload = () => {
            carouselImg.src = dino.image;
            carouselImg.alt = dino.name;
            imgContainer.classList.remove('loading');
            carouselImg.style.opacity = '1';
            isAnimating = false;
        };
        newImg.onerror = () => {
            console.error('图片加载失败:', dino.image);
            imgContainer.classList.remove('loading');
            isAnimating = false;
        };

        // 开始加载新图片
        carouselImg.style.opacity = '0';
        newImg.src = dino.image;
    }

    // 自动播放功能
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            currentDinoIndex = (currentDinoIndex + 1) % dinosaurs.length;
            updateCarousel('next');
        }, 4000);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    // 按钮点击事件
    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        currentDinoIndex = (currentDinoIndex - 1 + dinosaurs.length) % dinosaurs.length;
        updateCarousel('prev');
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        currentDinoIndex = (currentDinoIndex + 1) % dinosaurs.length;
        updateCarousel('next');
        startAutoplay();
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    imgContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
        stopAutoplay();
    }, { passive: true });

    imgContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    imgContainer.addEventListener('touchend', () => {
        if (!isSwiping) return;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevBtn.click();
            } else {
                nextBtn.click();
            }
        }
        isSwiping = false;
        startAutoplay();
    });

    // 添加键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // 鼠标悬停暂停自动播放
    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoplay);

    // 音乐控制
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = true;

    // 页面加载完成后自动播放音乐
    bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
    }).catch(error => {
        console.log('自动播放失败:', error);
        isMusicPlaying = false;
    });

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 设置音量
    bgMusic.volume = 0.5;

    // 初始化
    updateCarousel();
    startAutoplay();

    // 添加在 DOMContentLoaded 事件处理函数中
    // 创建背景圆形
    function createBackgroundCircles() {
        const container = document.querySelector('.background-animation');
        const circleCount = 15; // 圆形数量
        const colors = ['blue', 'purple', 'cyan']; // 颜色类名数组

        for (let i = 0; i < circleCount; i++) {
            const circle = document.createElement('div');
            circle.className = `circle ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            // 随机大小
            const size = Math.random() * 300 + 100;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            
            // 随机位置
            circle.style.left = `${Math.random() * 100}%`;
            circle.style.top = `${Math.random() * 100}%`;
            
            // 随机动画延迟
            circle.style.animationDelay = `${Math.random() * 5}s`;
            
            // 随机动画时长
            circle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            // 随机旋转
            circle.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            container.appendChild(circle);
        }
    }

    createBackgroundCircles();
});

function createParticles() {
    const container = document.querySelector('.particles-container');
    const text = document.querySelector('.intro-text');
    const textRect = text.getBoundingClientRect();
    const centerX = textRect.left + textRect.width / 2;
    const centerY = textRect.top + textRect.height / 2;

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机起始位置（屏幕四周）
        const startPos = getRandomEdgePosition();
        const endX = centerX + (Math.random() - 0.5) * 100;
        const endY = centerY + (Math.random() - 0.5) * 100;
        
        particle.style.setProperty('--start-x', `${startPos.x}px`);
        particle.style.setProperty('--start-y', `${startPos.y}px`);
        particle.style.setProperty('--end-x', `${endX}px`);
        particle.style.setProperty('--end-y', `${endY}px`);
        
        // 随机大小和延迟
        const size = Math.random() * 20 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animation = `particleMove 2s ease-out forwards ${Math.random() * 2}s`;
        
        container.appendChild(particle);
    }
}

function getRandomEdgePosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const edge = Math.floor(Math.random() * 4);
    
    switch(edge) {
        case 0: // 上边
            return { x: Math.random() * width, y: -50 };
        case 1: // 右边
            return { x: width + 50, y: Math.random() * height };
        case 2: // 下边
            return { x: Math.random() * width, y: height + 50 };
        case 3: // 左边
            return { x: -50, y: Math.random() * height };
    }
} 
