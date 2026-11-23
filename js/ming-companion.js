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
  const mint = new THREE.MeshStandardMaterial({ color: 0xb8e9ca, roughness: .8 });
  const purple = new THREE.MeshStandardMaterial({ color: 0xc7a2dc, roughness: .72 });
  const purpleDark = new THREE.MeshStandardMaterial({ color: 0xa785bb, roughness: .8 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffdc72, roughness: .5, emissive: 0xf7bf40, emissiveIntensity: .12 });
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
    const width = 1 - .18 * y;
    points.setXYZ(i, points.getX(i) * 1.01 * width, y * 1.15, points.getZ(i) * .69 * width);
  }
  bodyGeometry.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeometry, mint); body.position.y = 1.3; root.add(body);
  ellipsoid(root, purple, [0,.93,.61], [.52,.49,.12]);
  ellipsoid(root, mint, [-.37,.22,.12], [.24,.23,.32]);
  ellipsoid(root, mint, [.37,.22,.12], [.24,.23,.32]);
  const face = new THREE.Group(); face.position.set(0,1.82,0); root.add(face);
  const eyes = [];
  [-1,1].forEach(side => {
    const eye = new THREE.Group(); eye.position.set(side*.29,.04,.615); face.add(eye); eyes.push(eye);
    ellipsoid(eye,ink,[0,0,0],[.105,.132,.055]);
    ellipsoid(eye,white,[-.026,.049,.05],[.033,.036,.016]);
    ellipsoid(eye,purple, [.023,-.065,.043],[.04,.028,.012]);
    ellipsoid(face,blush,[side*.46,-.13,.53],[.14,.075,.025]);
    ellipsoid(face,white,[side*.46-.025,-.115,.556],[.013,.018,.008]);
  });
  const mouthCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.11,-.1,.687),new THREE.Vector3(-.07,-.155,.695),
    new THREE.Vector3(0,-.13,.701),new THREE.Vector3(.07,-.155,.695),new THREE.Vector3(.11,-.1,.687)
  ]);
  face.add(new THREE.Mesh(new THREE.TubeGeometry(mouthCurve,24,.014,8,false),ink));
  // Swept, gently curved lavender horns, with subtle transverse bands.
  [-1,1].forEach(side => {
    const horn = new THREE.Group(); horn.position.set(side*.61,2.17,0); root.add(horn);
    const ringCount = 22, segments = 20, vertices = [], indices = [];
    for(let i=0;i<=ringCount;i++) {
      const t=i/ringCount, radius=.17*Math.pow(1-t,.7)+.006;
      const cx=side*(.25*t-.12*t*t), cy=.62*t, cz=-.08*t;
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
    [.23,.46,.68].forEach(t=>{
      const radius=.17*Math.pow(1-t,.7)+.008;
      const band=new THREE.Mesh(new THREE.TorusGeometry(radius,.009,6,32),purpleDark);
      band.rotation.x=Math.PI/2; band.position.set(side*(.25*t-.12*t*t),.62*t,-.08*t);horn.add(band);
    });
  });
  const arms=[];
  [-1,1].forEach(side=>{
    const pivot=new THREE.Group();pivot.position.set(side*.77,1.37,0);root.add(pivot);arms.push(pivot);
    ellipsoid(pivot,mint,[side*.19,0,.03],[.29,.14,.19]);
    for(let n=0;n<3;n++) ellipsoid(pivot,mint,[side*(.35+(n===1?.035:0)),.075-n*.07,.045],[.09,.065,.11]);
  });
  const tail=new THREE.Group();tail.position.set(.57,.54,-.29);root.add(tail);
  const tailCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(.38,-.02,-.1),new THREE.Vector3(.72,.05,-.07),new THREE.Vector3(.85,.27,0)]);
  // Tapered tail assembled from overlapping smooth ellipsoids.
  for(let i=0;i<12;i++) {
    const t=i/11,p=tailCurve.getPoint(t),r=.2*(1-t)+.035;
    ellipsoid(tail,mint,[p.x,p.y,p.z],[r,r*.85,r]);
  }
  [.4,.65,.85].forEach(t=>{const p=tailCurve.getPoint(t);ellipsoid(tail,purple,[p.x,p.y+.13,p.z],[.09,.14,.085]);});
  const starPivot=new THREE.Group();starPivot.position.set(0,2.8,0);root.add(starPivot);
  const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.27,12),gold);stalk.position.y=-.19;starPivot.add(stalk);
  const shape=new THREE.Shape();
  for(let i=0;i<10;i++) {
    const a=Math.PI/2+i*Math.PI/5,r=i%2===0?.235:.112,x=Math.cos(a)*r,y=Math.sin(a)*r;
    if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);
  }
  shape.closePath();
  const star=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.075,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.035,bevelThickness:.035}),gold);
  star.position.z=-.04;starPivot.add(star);

  let hovered=false,targetX=0,targetY=0,raf=0,last=0,elapsed=0,visible=true,disposed=false;
  let nextBlink=2.2,blinkStart=-10,greetingUntil=2.3;
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
    const t=elapsed,thinking=trigger.dataset.mood==='thinking',happy=trigger.dataset.mood==='happy';
    root.position.y=Math.sin(t*1.9)*.045;
    root.scale.y=.96+Math.sin(t*1.9)*.012;
    root.rotation.y=THREE.MathUtils.lerp(root.rotation.y,-.16+targetX*.32+Math.sin(t*.65)*.06,.06);
    root.rotation.x=THREE.MathUtils.lerp(root.rotation.x,targetY*.08,.06);
    root.rotation.z=thinking?Math.sin(t*2)*.04:Math.sin(t*1.1)*.018;
    face.rotation.z=thinking?-.1:0;
    if(t>nextBlink){blinkStart=t;nextBlink=t+3+Math.random()*3;}
    const blinkAge=t-blinkStart;
    const blink=blinkAge<.19?Math.max(.08,Math.abs(blinkAge-.095)/.095):1;
    eyes.forEach(eye=>{eye.scale.y=blink;});
    arms[0].rotation.z=Math.sin(t*1.7)*.08;
    const waving=hovered || t<greetingUntil;
    arms[1].rotation.z=thinking?1.65:waving?.65+Math.sin(t*9)*.35:Math.sin(t*1.7+.7)*.08;
    arms[1].rotation.y=thinking?-.7:0;
    tail.rotation.y=Math.sin(t*2)*.16;
    starPivot.rotation.z=Math.sin(t*1.6)*.08;
    gold.emissiveIntensity=thinking?.25+Math.sin(t*4)*.2:.12;
    if(happy)root.rotation.x+=Math.sin(t*4)*.035;
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
  root.scale.set(1.16,.96,1.06);root.rotation.y=-.16;resize();host.classList.add('is-rendered');start();
  function dispose(event){if(event.persisted)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();document.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',start);scene.traverse(object=>{if(object.geometry)object.geometry.dispose();});[mint,purple,purpleDark,gold,ink,white,blush].forEach(material=>material.dispose());sphere.dispose();renderer.dispose();}
  window.addEventListener('pagehide',dispose,{once:true});
}
