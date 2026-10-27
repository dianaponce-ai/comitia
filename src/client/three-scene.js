import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const FPS = 24, START_F = 0, END_F = 80, totalSeconds = (END_F - START_F) / FPS;
const MAT_LOGO = 'emission_gradient', MAT_SCREEN_BUE = 'emission_pantalla.001';
const SCREEN_I0 = 0.0, SCREEN_I1 = 2.0, LOGO_I0 = 0.0, LOGO_I1 = 1.0;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

export function mountScene(container, cfg, driver, onReady) {
  const base = (window.__SITE__ && window.__SITE__.base) || '';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  if (cfg.controlled) { renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);
  let dirtyRef = null;
  const resize = () => { const w = container.offsetWidth, h = container.offsetHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); if (dirtyRef) dirtyRef(); };
  new ResizeObserver(resize).observe(container); window.addEventListener('resize', resize);

  let mixer = null, screenMat = null, logoMat = null, bue = false; const actions = [];
  let visible = true;
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(container);

  new RGBELoader().setPath(base + '/assets/3d/').load('studio_1.hdr', (hdr) => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromEquirectangular(hdr).texture; hdr.dispose(); pmrem.dispose();
    scene.environment = envMap; scene.background = null;
    new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).setPath(base + '/assets/3d/').load(cfg.model, (gltf) => {
      const model = gltf.scene;
      model.traverse((o) => {
        if (o.isMesh && o.material) {
          o.material.envMap = envMap;
          if (o.material.name === cfg.matScreen) screenMat = o.material;
          if (o.material.name === MAT_LOGO) logoMat = o.material;
          if (o.material.name === MAT_SCREEN_BUE) { screenMat = o.material; bue = true; }
        }
      });
      if (screenMat) screenMat.emissiveIntensity = SCREEN_I0;
      if (logoMat) logoMat.emissiveIntensity = LOGO_I0;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();
      model.position.sub(center);
      const pivot = new THREE.Group(); pivot.rotation.y = Math.PI; pivot.add(model); scene.add(pivot);
      const isMobile = window.innerWidth < 600;
      if (cfg.controlled) {
        if (isMobile) { camera.position.set(0, 0, size * 0.8); model.scale.set(0.7, 0.7, 0.7); }
        else { camera.position.set(0, 0, size * 0.65); model.scale.set(1, 1, 1); }
        camera.lookAt(0, 0, 0); camera.zoom = 1.2;
      } else {
        if (isMobile) { camera.position.set(cfg.cam[0], cfg.cam[1], size * cfg.camMul[0]); model.scale.set(cfg.scaleMobile, cfg.scaleMobile, cfg.scaleMobile); }
        else { camera.position.set(cfg.cam[0], cfg.cam[1], size * cfg.camMul[1]); model.scale.set(1, 1, 1); }
        camera.lookAt(0, -4, 0);
      }
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => { const a = mixer.clipAction(clip); a.play(); if (cfg.controlled) { a.paused = true; actions.push(a); } });
      resize(); animate(); onReady && onReady();
    }, undefined, (e) => console.error(e));
  });

  // Render a demanda: solo se dibuja cuando cambia el progreso del scroll o el tamaño
  let lastP = -1, dirty = true; dirtyRef = () => { dirty = true; };
  window.addEventListener('resize', () => { dirty = true; });
  function animate() {
    requestAnimationFrame(animate);
    if (!visible || !mixer) return;
    if (!dirty && Math.abs(driver.p - lastP) < 1e-4) return;
    lastP = driver.p; dirty = false;
    const p = clamp01(driver.p);
    if (cfg.controlled) { const t = p * totalSeconds; actions.forEach((a) => { a.time = t; }); mixer.update(0); }
    else mixer.setTime(START_F / FPS + driver.p * totalSeconds);
    const s = clamp01(p / 0.9), l = clamp01((p - 0.9) / 0.1);
    if (bue) { const sAdj = s > 0.6 ? (s - 0.6) / 0.9 : 0; if (screenMat) screenMat.emissiveIntensity = SCREEN_I0 + (SCREEN_I1 - SCREEN_I0) * easeOut(sAdj); }
    else {
      if (screenMat) screenMat.emissiveIntensity = SCREEN_I0 + (SCREEN_I1 - SCREEN_I0) * easeOut(s);
      if (logoMat) logoMat.emissiveIntensity = LOGO_I0 + (LOGO_I1 - LOGO_I0) * easeOut(l);
    }
    renderer.render(scene, camera);
  }
  resize();
}
