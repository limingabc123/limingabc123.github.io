import * as THREE from './vendor/three.module.min.js';

// Procedural model based on Bot.png: all features are real scene geometry.
export function mountCompanion(host, trigger) {
  if (!host || host.dataset.mounted) return;
  host.dataset.mounted = 'true';
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (_) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 30);
  camera.position.set(0, 1.65, 7.8);
  camera.lookAt(0, 1.45, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8d789f, 2.5));
  const key = new THREE.DirectionalLight(0xfff6e4, 3.2);
  key.position.set(-3, 5, 5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xc6eaff, 1.3);
  fill.position.set(4, 2, -2); scene.add(fill);
  const mint = new THREE.MeshPhysicalMaterial({ color: 0xb8e9ca, roughness: .88, sheen: .55, sheenColor: 0xe0f5e6, sheenRoughness: .9 });
  const purple = new THREE.MeshPhysicalMaterial({ color: 0xc7a2dc, roughness: .85, sheen: .4, sheenColor: 0xe8d7f2, sheenRoughness: .85 });
  const purpleDark = new THREE.MeshStandardMaterial({ color: 0xa785bb, roughness: .8 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffdc72, roughness: .5, emissive: 0xf7bf40, emissiveIntensity: .65 });
  const ink = new THREE.MeshStandardMaterial({ color: 0x382139, roughness: .22 });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const blush = new THREE.MeshStandardMaterial({ color: 0xf3adb7, roughness: 1 });
  const sphere = new THREE.SphereGeometry(1, 32, 24);
  const root = new THREE.Group(); scene.add(root);
  function ellipsoid(parent, material, position, scale) {
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(...position); mesh.scale.set(...scale); parent.add(mesh); return mesh;
  }
  const bodyGeometry = sphere.clone();
  const points = bodyGeometry.attributes.position;
  for (let i = 0; i < points.count; i++) {
    const y = points.getY(i);
    const width = 1 - .10 * y;
    const x = points.getX(i);
    const roundedX = Math.sign(x) * Math.pow(Math.abs(x), .82);
    points.setXYZ(i, roundedX * .92 * width, y * 1.10, points.getZ(i) * .69 * width);
  }
  bodyGeometry.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeometry, mint); body.position.y = 1.3; root.add(body);
  // Follow the torso surface instead of placing a bulging sphere over the stomach.
  const bellyVertices=[], bellyIndices=[], bellyRings=18, bellySegments=48;
  for(let ring=0;ring<=bellyRings;ring++) {
    const r=ring/bellyRings;
    for(let j=0;j<=bellySegments;j++) {
      const a=j/bellySegments*Math.PI*2;
      const x=Math.cos(a)*r*.49, y=.93+Math.sin(a)*r*.46;
      const normalizedY=(y-1.3)/1.10, width=1-.10*normalizedY;
      const sphereX=Math.pow(Math.abs(x/(.92*width)),1/.82);
      const z=Math.sqrt(Math.max(0,1-normalizedY*normalizedY-sphereX*sphereX))*.69*width+.009;
      bellyVertices.push(x,y,z);
      if(ring<bellyRings && j<bellySegments){const a=ring*(bellySegments+1)+j,b=a+bellySegments+1;bellyIndices.push(a,b,a+1,b,b+1,a+1);}
    }
  }
  const bellyGeometry=new THREE.BufferGeometry();
  bellyGeometry.setAttribute('position',new THREE.Float32BufferAttribute(bellyVertices,3));
  // The patch faces the camera along +Z.
  bellyGeometry.setIndex(bellyIndices);
  bellyGeometry.computeVertexNormals();root.add(new THREE.Mesh(bellyGeometry,purple));
  ellipsoid(root, mint, [-.34,.27,.12], [.21,.22,.28]);
  ellipsoid(root, mint, [.34,.27,.12], [.21,.22,.28]);
  const face = new THREE.Group(); face.position.set(0,1.82,0); root.add(face);
  const eyes = [];
  [-1,1].forEach(side => {
    const eye = new THREE.Group(); eye.position.set(side*.29,.04,.615); face.add(eye); eyes.push(eye);
    ellipsoid(eye,ink,[0,0,0],[.115,.145,.06]);
    ellipsoid(eye,white,[-.026,.049,.05],[.033,.036,.016]);
    ellipsoid(eye,purple, [.023,-.065,.043],[.04,.028,.012]);
    ellipsoid(face,blush,[side*.43,-.13,.57],[.13,.075,.025]);
    ellipsoid(face,white,[side*.43-.025,-.115,.598],[.014,.02,.008]);
    ellipsoid(face,white,[side*.43+.025,-.12,.598],[.011,.016,.008]);
  });
  const mouthCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.11,-.1,.687),new THREE.Vector3(-.07,-.155,.695),
    new THREE.Vector3(0,-.13,.701),new THREE.Vector3(.07,-.155,.695),new THREE.Vector3(.11,-.1,.687)
  ]);
  const mouth = new THREE.Mesh(new THREE.TubeGeometry(mouthCurve,24,.014,8,false),ink);
  face.add(mouth);
  const happyMouth = ellipsoid(face, ink, [0,-.13,.704], [.12,.08,.016]);
  const tongue = ellipsoid(face, blush, [0,-.167,.722], [.065,.027,.009]);
  happyMouth.visible = tongue.visible = false;
  // Faithful concept details: soft lavender belly, glossy eyes and rounded swept horns.
  // Swept, gently curved lavender horns, with subtle transverse bands.
  [-1,1].forEach(side => {
    const horn = new THREE.Group(); horn.position.set(side*.68,2.14,0); root.add(horn);
    const ringCount = 22, segments = 20, vertices = [], indices = [];
    for(let i=0;i<=ringCount;i++) {
      const t=i/ringCount, radius=.205*Math.pow(1-t,.65)+.018;
      const cx=side*(.38*t-.25*t*t), cy=.54*t, cz=-.06*t;
      for(let j=0;j<=segments;j++) {
        const angle=j/segments*Math.PI*2;
        vertices.push(cx+Math.cos(angle)*radius,cy,cz+Math.sin(angle)*radius);
        if(i<ringCount && j<segments) {
          const a=i*(segments+1)+j,b=a+segments+1;
          indices.push(a,b,a+1,b,b+1,a+1);
        }
      }
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    horn.add(new THREE.Mesh(geometry,purple));
    ellipsoid(horn,purple,[side*.13,.54,-.06],[.019,.022,.019]);
    [.23,.46,.68].forEach(t=>{
      const radius=.205*Math.pow(1-t,.65)+.020;
      const band=new THREE.Mesh(new THREE.TorusGeometry(radius,.009,6,32),purpleDark);
      band.rotation.x=Math.PI/2; band.position.set(side*(.38*t-.25*t*t),.54*t,-.06*t);horn.add(band);
    });
  });
  const arms=[];
  [-1,1].forEach(side=>{
    const pivot=new THREE.Group();pivot.position.set(side*.74,1.37,0);root.add(pivot);arms.push(pivot);
    ellipsoid(pivot,mint,[side*.16,0,.06],[.24,.18,.20]);
    for(let n=0;n<3;n++) ellipsoid(pivot,mint,[side*(.29+(n===1?.025:0)),.075-n*.07,.045],[.09,.065,.11]);
  });
  const tail=new THREE.Group();tail.position.set(.57,.54,-.29);root.add(tail);
  const tailCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(.38,-.02,-.1),new THREE.Vector3(.72,.05,-.07),new THREE.Vector3(.85,.27,0)]);
  // Tapered tail assembled from overlapping smooth ellipsoids.
  for(let i=0;i<12;i++) {
    const t=i/11,p=tailCurve.getPoint(t),r=.2*(1-t)+.035;
    ellipsoid(tail,mint,[p.x,p.y,p.z],[r,r*.85,r]);
  }
  [.4,.65,.85].forEach(t=>{const p=tailCurve.getPoint(t);ellipsoid(tail,purple,[p.x,p.y+.13,p.z],[.09,.14,.085]);});
  const starPivot=new THREE.Group();starPivot.position.set(0,2.68,0);root.add(starPivot);
  const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.27,12),gold);stalk.position.y=-.19;starPivot.add(stalk);
  const shape=new THREE.Shape();
  for(let i=0;i<10;i++) {
    const a=Math.PI/2+i*Math.PI/5,r=i%2===0?.235:.112,x=Math.cos(a)*r,y=Math.sin(a)*r;
    if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);
  }
  shape.closePath();
  const star=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.075,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.035,bevelThickness:.035}),gold);
  star.position.z=-.04;starPivot.add(star);
  // A camera-facing, feathered halo makes emission visible without a full-screen bloom pass.
  const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;
  const glowContext=glowCanvas.getContext('2d');
  const gradient=glowContext.createRadialGradient(64,64,3,64,64,64);
  gradient.addColorStop(0,'rgba(255,246,186,0.85)');
  gradient.addColorStop(.24,'rgba(255,222,113,0.50)');
  gradient.addColorStop(.55,'rgba(255,197,65,0.16)');
  gradient.addColorStop(1,'rgba(255,183,46,0)');
  glowContext.fillStyle=gradient;glowContext.fillRect(0,0,128,128);
  const glowTexture=new THREE.CanvasTexture(glowCanvas);
  glowTexture.colorSpace=THREE.SRGBColorSpace;
  const glowMaterial=new THREE.SpriteMaterial({map:glowTexture,transparent:true,opacity:.72,depthWrite:false});
  const glow=new THREE.Sprite(glowMaterial);glow.position.z=-.15;glow.scale.set(1.05,1.05,1);starPivot.add(glow);
  const starLight=new THREE.PointLight(0xffdb82,.35,1.4,2);starLight.position.set(0,-.03,.28);starPivot.add(starLight);

  let hovered=false,targetX=0,targetY=0,raf=0,last=0,elapsed=0,visible=true,disposed=false;
  let nextBlink=2.2,blinkStart=-10,greetingUntil=2.3;
  let previousMood='idle', happyUntil=0, thinkingBlend=0;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function resize(){const box=host.getBoundingClientRect();if(!box.width || !box.height)return;renderer.setSize(box.width,box.height,false);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();renderStill();}
  function renderStill(){renderer.render(scene,camera);}
  function enter(){hovered=true;greetingUntil=elapsed+2;start();}
  function leave(){hovered=false;}
  function move(event){const r=host.getBoundingClientRect();targetX=THREE.MathUtils.clamp((event.clientX-r.left-r.width/2)/Math.max(r.width,1),-1,1);targetY=THREE.MathUtils.clamp((event.clientY-r.top-r.height/2)/Math.max(r.height,1),-1,1);}
  function greet(){greetingUntil=elapsed+1.8;start();}
  function frame(now){
    raf=0;if(disposed || document.hidden || !visible)return;
    if(reduced.matches){root.position.y=0;root.rotation.set(0,-.16,0);renderStill();return;}
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;
    const t=elapsed, mood=trigger.dataset.mood || 'idle', thinking=mood==='thinking';
    if(mood!==previousMood){if(mood==='happy')happyUntil=t+3.2;previousMood=mood;}
    const happy=mood==='happy' && t<happyUntil;
    const smoothing=1-Math.exp(-dt*7);
    thinkingBlend=THREE.MathUtils.lerp(thinkingBlend,thinking?1:0,smoothing);
    root.position.y=Math.sin(t*1.9)*.045;
    root.scale.y=1.04+Math.sin(t*1.9)*.012;
    root.rotation.y=THREE.MathUtils.lerp(root.rotation.y,-.16+targetX*.42+Math.sin(t*.65)*.06,smoothing);
    root.rotation.x=THREE.MathUtils.lerp(root.rotation.x,targetY*.08,smoothing);
    root.rotation.z=-.10*thinkingBlend+Math.sin(t*.8)*.012;
    face.rotation.z=-.08*thinkingBlend;
    mouth.visible=!happy;happyMouth.visible=tongue.visible=happy;
    if(t>nextBlink){blinkStart=t;nextBlink=t+3+Math.random()*3;}
    const blinkAge=t-blinkStart;
    const blink=blinkAge<.19?Math.max(.08,Math.abs(blinkAge-.095)/.095):1;
    eyes.forEach(eye=>{eye.scale.y=blink*(happy?.72:1);});
    arms[0].rotation.z=Math.sin(t*1.7)*.08;
    const waving=hovered || t<greetingUntil;
    const waveAngle=waving?.65+Math.sin(t*5.2)*.25:Math.sin(t*1.2+.7)*.06;
    arms[1].rotation.z=THREE.MathUtils.lerp(arms[1].rotation.z,THREE.MathUtils.lerp(waveAngle,2.35,thinkingBlend),smoothing);
    arms[1].rotation.y=THREE.MathUtils.lerp(arms[1].rotation.y,-1.05*thinkingBlend,smoothing);
    arms[1].position.z=.30*thinkingBlend;
    arms[1].position.y=1.37+.12*thinkingBlend;
    tail.rotation.y=Math.sin(t*.85)*.12;
    starPivot.rotation.z=Math.sin(t*1.6)*.08;
    const pulse=.5+.5*Math.sin(t*(thinking?2.4:1.55));
    gold.emissiveIntensity=.55+pulse*(thinking?.85:.55);
    glowMaterial.opacity=.48+pulse*(thinking?.42:.30);
    const haloSize=.92+pulse*.22;glow.scale.set(haloSize,haloSize,1);
    starLight.intensity=.22+pulse*(thinking?.65:.4);
    if(happy)root.rotation.x+=Math.sin((3.2-(happyUntil-t))*5)*.10;
    renderer.render(scene,camera);raf=requestAnimationFrame(frame);
  }
  function start(){if(!raf && !disposed && visible && !document.hidden){last=0;raf=requestAnimationFrame(frame);}}
  function visibility(){if(document.hidden){cancelAnimationFrame(raf);raf=0;}else start();}
  const observer=new ResizeObserver(resize);observer.observe(host);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0;}});intersection.observe(host);
  trigger.addEventListener('pointerenter',enter);trigger.addEventListener('pointerleave',leave);
  trigger.addEventListener('click',greet);document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',start);
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);raf=0;host.classList.remove('is-rendered');});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{host.classList.add('is-rendered');start();});
  root.scale.set(1.05,1.04,1.03);root.rotation.y=-.16;resize();host.classList.add('is-rendered');start();
  function dispose(event){if(event.persisted)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();document.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',start);scene.traverse(object=>{if(object.geometry)object.geometry.dispose();});[mint,purple,purpleDark,gold,ink,white,blush].forEach(material=>material.dispose());glowMaterial.dispose();glowTexture.dispose();sphere.dispose();renderer.dispose();}
  window.addEventListener('pagehide',dispose,{once:true});
}
