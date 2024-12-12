let scene, camera, renderer, model;

function init() {
    // 检查必要的组件是否加载
    if (typeof THREE === 'undefined') {
        console.error('Three.js 未加载');
        return;
    }
    if (typeof THREE.OrbitControls === 'undefined') {
        console.error('OrbitControls 未加载');
        return;
    }
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.error('GLTFLoader 未加载');
        return;
    }
    console.log('所有组件加载成功');

    // 创建场景
    scene = new THREE.Scene();
    scene.background = null;  // 移除灰色背景，使场景透明

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1, 12);
    camera.lookAt(0, 0, 0);

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;  // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // 使用柔和阴影
    renderer.outputEncoding = THREE.sRGBEncoding;  // 设置正确的颜色空间
    document.getElementById('3d-model').appendChild(renderer.domElement);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // 加载模型
    if (THREE.GLTFLoader) {
        const loader = new THREE.GLTFLoader();
        console.log('开始加载模型...');
        
        // 使用正确的路径
        const modelPath = 'images/models/tripo_pbr_model_031097cc-b0fb-4c09-b168-60460075348f.glb';

        loader.load(
            modelPath,
            function (gltf) {
                console.log('模型加载成功', gltf);
                model = gltf.scene;
                
                // 调整模型大小和位置
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                
                console.log('模型尺寸:', size);
                console.log('模型中心点:', center);
                
                // 计算合适的缩放比例
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 10.0 / maxDim;  // 增加缩放比例到 10.0
                model.scale.set(scale, scale, scale);
                
                // 调整模型位置
                model.position.set(0, 0, 0);
                
                // 添加材质并设置阴影
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.needsUpdate = true;
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.material) {
                            child.material.metalness = 0.5;
                            child.material.roughness = 0.5;
                            child.material.needsUpdate = true;
                        }
                    }
                });
                
                scene.add(model);
                console.log('模型已添加到场景');
            },
            function (xhr) {
                const progress = (xhr.loaded / xhr.total * 100).toFixed(2);
                console.log('加载进度:', progress + '%');
            },
            function (error) {
                console.error('模型加载失败:', error);
                console.error('错误详情:', error.message);
            }
        );
    }

    // 添加轨道控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.enableZoom = true;  // 确保启用缩放
    controls.enableRotate = true;  // 确保启用旋转
    console.log('控制器已添加');

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        if (model) {
            model.rotation.y += 0.01;  // 只旋转恐龙模型
        }
        renderer.render(scene, camera);
    }
    animate();
}

// 等待页面加载完成
window.addEventListener('load', init);
