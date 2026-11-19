/**
 * DentalVision 3D — Production-Quality Interactive 3D Dental Anatomy Viewer
 * Built for IVORY Dental Studio (Real Anatomical + Kintsugi Edition)
 */

(function () {
  'use strict';

  // --- ANATOMY MEDICAL KNOWLEDGE BASE ---
  const ANATOMY_DATA = {
    enamel: {
      name: 'Enamel (Anatomical Crown)',
      layer: 'Outer Protective Shell',
      metric: '96% Hydroxyapatite · 2.0–2.5 mm Thickness',
      description: 'The outermost and hardest biological tissue in the human body. Translucent crystalline structure that forms a wear-resistant shield over the crown.',
      function: 'Protects the vulnerable inner tooth from biting forces (up to 200 lbs), thermal shocks, and acidic dietary attacks. Enamel has no living cells and cannot regenerate once lost.',
      treatments: 'Fluoride remineralization, Micro-abrasion, Composite bonding, Porcelain veneers, Minimal-prep laminates.'
    },
    dentin: {
      name: 'Dentin Layer',
      layer: 'Intermediate Structural Core',
      metric: '70% Mineral, 20% Collagen · S-Shaped Tubules',
      description: 'A resilient, bone-like living tissue that makes up the bulk of the tooth. Contains millions of microscopic dentinal tubules radiating from the pulp outward to the enamel junction.',
      function: 'Provides mechanical elasticity to absorb masticatory shock and prevent enamel fracture. Its fluid-filled tubules transmit temperature and tactile sensations directly to the pulp nerve.',
      treatments: 'Desensitizing sealants, Biomimetic composite restoration, Glass ionomer bases, Indirect inlays/onlays.'
    },
    pulp: {
      name: 'Pulp Cavity (Neurovascular Core)',
      layer: 'Coronal Neurovascular Center',
      metric: 'Arterioles, Venules & Sensory A-Delta/C Nerves',
      description: 'The vital organ inside the crown containing a rich microvascular plexus (arteries & veins), sensory nerve fibers, and odontoblast cells that line the dentin wall.',
      function: 'Nourishes the tooth during development, generates secondary and reparative tertiary dentin in response to trauma, and signals pain alerts during bacterial invasion or thermal injury.',
      treatments: 'Vital pulp therapy, Direct pulp capping, Pulpotomy, Regenerative endodontics, Root canal therapy.'
    },
    canals: {
      name: 'Root Canals (Radicular Pathways)',
      layer: 'Radicular Pulp Pathways',
      metric: 'Apical Foramen Conduits · 12–22 mm length',
      description: 'Slender biological conduits extending from the pulp chamber floor down through the root apices, connecting internal tissues to systemic alveolar circulation.',
      function: 'Conducts vital blood supply and neural innervation from the alveolar bone into the tooth. Houses radicular pulp tissue.',
      treatments: 'Endodontic debridement, Rotary NiTi biomechanical shaping, Warm vertical gutta-percha obturation, Bioceramic sealer seals.'
    },
    gums: {
      name: 'Gums (Gingiva)',
      layer: 'Marginal Periodontal Seal',
      metric: 'Keratinized Stratified Squamous Epithelium',
      description: 'The specialized pink oral mucosal tissue that surrounds and firmly seals around the anatomical neck (cervical margin) of the tooth.',
      function: 'Provides an essential biological barrier against oral bacteria, debris, and enzymatic invasion, protecting underlying periodontal ligament and alveolar bone.',
      treatments: 'Ultrasonic hygiene prophylaxis, Laser gingival contouring, Soft tissue grafting, Periodontal maintenance.'
    },
    cementum: {
      name: 'Cementum',
      layer: 'Root Surface Mineral Coating',
      metric: '50% Hydroxyapatite · Collagenous Anchor',
      description: 'A specialized calcified avascular covering that envelopes the anatomical roots from the cementoenamel junction (CEJ) to the apices.',
      function: 'Anchors the terminal ends of Sharpey’s fibers from the periodontal ligament, securing the tooth into its alveolar bone socket.',
      treatments: 'Subgingival ultrasonic debridement, Root planing, Guided tissue regeneration (GTR), Enamel matrix derivative (Emdogain).'
    },
    periodontal: {
      name: 'Periodontal Ligament (PDL)',
      layer: 'Suspension & Proprioception Network',
      metric: 'Collagen Bundle Matrix · 0.2 mm width',
      description: 'A dense network of specialized collagenous connective tissue fibers connecting the root cementum to the surrounding alveolar bone.',
      function: 'Acts as a natural hydraulic shock absorber during chewing. Rich in proprioceptive mechanoreceptors that allow exact sensory feedback of bite pressure.',
      treatments: 'Periodontal therapy, Laser-assisted debridement (LANAP), Occlusal adjustment, Orthodontic repositioning.'
    }
  };

  const CONDITIONS_DATA = {
    healthy: {
      title: 'Healthy Tooth & Sound Enamel',
      badge: 'Physiological State',
      desc: 'Pristine, mineralized natural enamel with intact occlusal fissures, healthy dentin density, and vital, uninflamed neurovascular pulp tissue.',
      clinical: 'Routine preventative care, twice-yearly hygiene polish, and digital bitewing monitoring recommended.'
    },
    cavity: {
      title: 'Enamel Caries (Incipient Cavity)',
      badge: 'Localized Demineralization',
      desc: 'Acidogenic bacterial biofilm produces localized lactic acid, causing localized subsurface demineralization of the occlusal pit and groove.',
      clinical: 'Remineralization therapies (fluoride/CPP-ACP) or micro-invasive composite resin restoration.'
    },
    decay: {
      title: 'Advanced Dentinal Decay',
      badge: 'Bacterial Invasion',
      desc: 'Carious process has penetrated through the enamel-dentin junction (EDJ), rapidly progressing through porous dentinal tubules toward the pulp.',
      clinical: 'Biomimetic direct composite restoration, bonded ceramic inlay/onlay, or pulp protection base.'
    },
    cracked: {
      title: 'Cracked Tooth Syndrome',
      badge: 'Structural Enamel Fracture',
      desc: 'Micro-fracture plane extending from the occlusal marginal ridge vertically toward the cervical margin. Causes sharp pain on chewing release.',
      clinical: 'Full-coverage cuspal protection restoration (porcelain onlay or zirconia crown) to prevent split tooth.'
    },
    pulpitis: {
      title: 'Acute Pulp Inflammation (Pulpitis)',
      badge: 'Hyperemic Neurovascular State',
      desc: 'Severe vascular dilation and intrapulpal pressure inside the rigid dentin chamber due to bacterial toxins or thermal trauma.',
      clinical: 'Vital pulp capping if reversible; Root canal therapy if irreversible or accompanied by spontaneous throbbing.'
    },
    rootCanal: {
      title: 'Endodontically Treated & Sealed',
      badge: 'Obturated Root Canals',
      desc: 'Infected pulp tissue debrided, canals sanitized with antimicrobial irrigants, and sealed three-dimensionally with gutta-percha and bioceramic sealer.',
      clinical: 'Fiber post core buildup followed by full-coverage porcelain crown for long-term fracture resistance.'
    },
    crown: {
      title: 'Full Porcelain / Zirconia Crown',
      badge: 'Prosthetic Restoration',
      desc: 'Custom-milled high-translucency ceramic crown encasing the prepared tooth, restoring 100% anatomical function and pristine aesthetics.',
      clinical: 'Indicated for cracked teeth, extensive restorations, or after endodontic therapy. 15–20+ year longevity.'
    },
    implant: {
      title: 'Titanium Dental Implant Restoration',
      badge: 'Prosthetic Tooth Replacement',
      desc: 'Biocompatible titanium screw fixture surgically integrated into alveolar bone (osseointegration), coupled with a custom titanium/zirconia abutment and crown.',
      clinical: 'The gold standard for permanent single-tooth replacement without prepping adjacent healthy teeth.'
    }
  };

  const TREATMENTS_DATA = {
    rootCanal: {
      name: 'Root Canal Treatment',
      steps: [
        { title: 'Step 1: Clinical Diagnosis', desc: 'Identify necrotic pulp with 3D CBCT imaging and vitality testing.' },
        { title: 'Step 2: Microscopic Access', desc: 'Conservative access cavity prepared on the occlusal surface under high magnification.' },
        { title: 'Step 3: Biomechanical Shaping', desc: 'Rotary nickel-titanium instruments shape and debride root canals.' },
        { title: 'Step 4: 3D Bioceramic Obturation', desc: 'Canals hermetically sealed with warm gutta-percha and bioceramic sealer.' },
        { title: 'Step 5: Coronal Seal & Crown', desc: 'Final bonded porcelain crown protects the tooth from future occlusal fracture.' }
      ]
    },
    crown: {
      name: 'Porcelain Crown Placement',
      steps: [
        { title: 'Step 1: Evaluation & Shade Matching', desc: 'Custom shade mapping matching adjacent teeth under natural light.' },
        { title: 'Step 2: Conservative Preparation', desc: 'Minimal-prep circumferential reduction with smooth rounded margins.' },
        { title: 'Step 3: 3D Intraoral Digital Scan', desc: 'High-precision optical scanning replaces uncomfortable traditional putty impressions.' },
        { title: 'Step 4: Precision Ceramic Milling', desc: 'CEREC same-day or laboratory CAD/CAM milling of high-strength zirconia.' },
        { title: 'Step 5: Adhesive Cementation', desc: 'Resin-bonded permanent placement with microscopic margin check.' }
      ]
    },
    implant: {
      name: 'Dental Implant Restoration',
      steps: [
        { title: 'Step 1: 3D Guided Osteotomy', desc: 'Sub-millimeter CBCT surgical guide ensures exact 3D implant placement.' },
        { title: 'Step 2: Titanium Fixture Placement', desc: 'Grade-4/5 medical titanium root replacement placed securely into alveolar bone.' },
        { title: 'Step 3: Osseointegration', desc: 'Bone cells fuse directly to the hydrophilic implant surface over 8–12 weeks.' },
        { title: 'Step 4: Custom Abutment Connection', desc: 'Anatomical emergence profile shaped with custom titanium/zirconia abutment.' },
        { title: 'Step 5: Permanent Screw-Retained Crown', desc: 'Finished porcelain crown permanently secured, fully restoring natural chewing power.' }
      ]
    }
  };

  // --- 3D ENGINE STATE ---
  let scene, camera, renderer, controls;
  let toothGroup, crownMesh, dentinMesh, pulpMesh, canalMeshes = [];
  let rootMeshes = [], gumsMesh, faceDecalMesh;
  let cavityMesh, crackMesh, crownCapMesh, implantGroup, fillerMeshes = [];
  let clippingPlane;
  let currentMode = 'external'; // 'external' | 'transparent' | 'crossSection' | 'exploded'
  let toothAesthetic = 'cute'; // 'cute' (Mascot face) | 'natural' (Real tooth) | 'kintsugi' (Gold veins)
  let currentCondition = 'healthy';
  let currentTreatment = null;
  let treatmentStepIndex = 0;
  let isAutoRotating = true;
  let showGums = false; // Gums hidden by default for pure anatomical tooth inspection
  let raycaster, mouse;
  let containerEl;
  let animFrameId;

  // Textures
  let naturalTex, kintsugiTex, pulpTex, enamelTex, rootTex, dentinTex;

  function sendToToothViewer(action, data = {}) {
    const frame = document.getElementById('tooth-viewer-frame');
    if (!frame || !frame.contentWindow) return;
    try {
      if (action === 'setMode' && typeof frame.contentWindow.setToothMode === 'function') {
        frame.contentWindow.setToothMode(data.mode);
      } else if (action === 'toggleOrbit' && typeof frame.contentWindow.toggleToothOrbit === 'function') {
        frame.contentWindow.toggleToothOrbit();
      } else if (action === 'setYaw' && typeof frame.contentWindow.setToothYaw === 'function') {
        frame.contentWindow.setToothYaw(data.yaw);
      } else if (action === 'reset' && typeof frame.contentWindow.resetToothView === 'function') {
        frame.contentWindow.resetToothView();
      } else {
        frame.contentWindow.postMessage({ action, ...data }, '*');
      }
    } catch (e) {
      try {
        frame.contentWindow.postMessage({ action, ...data }, '*');
      } catch (err) {}
    }
  }

  function init() {
    containerEl = document.getElementById('dv3d-canvas-container');
    if (!containerEl) return;

    if (containerEl.querySelector('iframe#tooth-viewer-frame')) {
      // User-provided tooth-viewer.html is embedded!
      setHeroMode('real');
      return;
    }

    containerEl.querySelectorAll('canvas').forEach(c => c.remove());

    const width = containerEl.clientWidth || 640;
    const height = containerEl.clientHeight || 600;

    // Scene (transparent to blend with sunny warm light studio background)
    scene = new THREE.Scene();
    scene.background = null;

    // Camera (calibrated to frame entire tooth from crown to root tips)
    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 6.3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.opacity = '1';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    containerEl.appendChild(renderer.domElement);

    // Clipping plane for Cross-Section mode
    clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.05);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.0;
    controls.maxDistance = 9.0;
    controls.maxPolarAngle = Math.PI * 0.95;
    controls.minPolarAngle = 0.05;
    controls.target.set(0, 0.15, 0);

    // Load High-Fidelity Real Anatomical Textures from Reference Images
    const texLoader = new THREE.TextureLoader();
    enamelTex = texLoader.load('assets/images/new_enamel_texture.webp');
    enamelTex.wrapS = THREE.RepeatWrapping;
    enamelTex.wrapT = THREE.RepeatWrapping;

    rootTex = texLoader.load('assets/images/new_root_texture.webp');
    rootTex.wrapS = THREE.RepeatWrapping;
    rootTex.wrapT = THREE.RepeatWrapping;

    kintsugiTex = texLoader.load('assets/images/kintsugi_texture.webp');
    kintsugiTex.wrapS = THREE.RepeatWrapping;
    kintsugiTex.wrapT = THREE.RepeatWrapping;

    pulpTex = texLoader.load('assets/images/new_pulp_texture.webp');
    pulpTex.wrapS = THREE.RepeatWrapping;
    pulpTex.wrapT = THREE.RepeatWrapping;

    dentinTex = texLoader.load('assets/images/new_dentin_texture.webp');
    dentinTex.wrapS = THREE.RepeatWrapping;
    dentinTex.wrapT = THREE.RepeatWrapping;

    // Studio Lighting
    setupLighting();

    // Build 3D Models
    buildToothScene();

    // Raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Setup Listeners
    setupEventListeners();

    // Animation Loop
    animate();

    // UI Sync
    updateUIState();
  }

  function setupLighting() {
    // Soft balanced daylight ambient
    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.60);
    scene.add(ambient);

    // Key Light (directional from upper right for depth and specular highlights)
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 0.95);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Soft Fill Light with cool blue tone matching reference illustration
    const fillLight = new THREE.DirectionalLight(0xE2EEF8, 0.65);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Subtle Rim Light for pearlescent enamel contour definition
    const rimLight = new THREE.DirectionalLight(0xD6EFF0, 0.75);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Soft bottom shadow bounce
    const bounceLight = new THREE.DirectionalLight(0xFAF4EB, 0.35);
    bounceLight.position.set(0, -3, 1.5);
    scene.add(bounceLight);
  }

  // --- BUILD REAL ANATOMICAL TOOTH SCENE ---
  function buildToothScene() {
    if (toothGroup) scene.remove(toothGroup);

    toothGroup = new THREE.Group();
    toothGroup.name = 'toothRoot';

    const isKintsugi = (toothAesthetic === 'kintsugi');
    const activeCrownTex = isKintsugi ? kintsugiTex : null;
    const activeRootTex = isKintsugi ? kintsugiTex : null;

    // 1. ENAMEL CROWN MESH (Ceramic Volumetric PBR with Soft Blue-Grey Shading)
    const crownGeo = createMolarCrownGeometry();
    const enamelMat = new THREE.MeshPhysicalMaterial({
      color: isKintsugi ? 0xF8F5EE : 0xF2F6FA,
      map: activeCrownTex,
      roughness: 0.22,
      metalness: 0.0,
      clearcoat: 0.85,
      clearcoatRoughness: 0.06,
      transmission: 0.04,
      ior: 1.56,
      opacity: 1.0,
      transparent: false,
      side: THREE.DoubleSide
    });
    crownMesh = new THREE.Mesh(crownGeo, enamelMat);
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    crownMesh.userData = { structure: 'enamel' };
    toothGroup.add(crownMesh);

    // 1b. CUTE SMILING 3D FACE DECAL (Integrated into 3D Crown Mesh)
    const faceDecalGeo = createFaceDecalGeometry();
    const faceTex = new THREE.TextureLoader().load('assets/images/tooth_face_decal.png');
    const faceDecalMat = new THREE.MeshBasicMaterial({
      map: faceTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
      side: THREE.FrontSide
    });
    faceDecalMesh = new THREE.Mesh(faceDecalGeo, faceDecalMat);
    faceDecalMesh.name = 'faceDecal';
    faceDecalMesh.visible = (toothAesthetic === 'cute');
    toothGroup.add(faceDecalMesh);

    // Soft Ground Ambient Shadow Disc beneath the roots
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(10, 31, 41, 0.28)');
    sGrad.addColorStop(0.5, 'rgba(10, 31, 41, 0.10)');
    sGrad.addColorStop(1, 'rgba(10, 31, 41, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 2.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -2.15, 0);
    scene.add(shadowPlane);

    // 2. 2 ANATOMICAL TAPERING ROOTS (Matching Expanded Angle Sheet)
    rootMeshes = createFourMolarRoots(activeRootTex);
    rootMeshes.forEach(r => {
      r.userData = { structure: 'cementum' };
      toothGroup.add(r);
    });

    // 3. HEALTHY GUMS (GINGIVA) CUFF - Hidden by default
    gumsMesh = createGumsCuff();
    gumsMesh.userData = { structure: 'gums' };
    gumsMesh.visible = false;
    toothGroup.add(gumsMesh);

    // 4. INTERNAL DENTIN CORE (Golden radial dentinal tubules matching new-molar-cutaway.jpg)
    const dentinGeo = createMolarCrownGeometry(0.82);
    const dentinMat = new THREE.MeshStandardMaterial({
      color: 0xDEAD60,
      map: dentinTex,
      roughness: 0.35,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    dentinMesh = new THREE.Mesh(dentinGeo, dentinMat);
    dentinMesh.userData = { structure: 'dentin' };
    dentinMesh.visible = false;
    toothGroup.add(dentinMesh);

    // 5. NEUROVASCULAR PULP CAVITY & ROOT CANAL CONDUITS (Matching new-molar-cutaway.jpg)
    const { pulpChamber, canals } = createPulpAndCanals(pulpTex);
    pulpMesh = pulpChamber;
    canalMeshes = canals;
    pulpMesh.userData = { structure: 'pulp' };
    pulpMesh.visible = false;
    toothGroup.add(pulpMesh);
    canals.forEach(c => {
      c.userData = { structure: 'canals' };
      c.visible = false;
      toothGroup.add(c);
    });

    // 6. PATHOLOGY & CONDITIONS
    // Cavity lesion
    const cavityGeo = new THREE.SphereGeometry(0.24, 16, 16);
    cavityGeo.scale(1.2, 0.5, 0.9);
    const cavityMat = new THREE.MeshStandardMaterial({ color: 0x2A1A10, roughness: 0.9 });
    cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
    cavityMesh.position.set(0.18, 1.25, 0.15);
    cavityMesh.visible = false;
    toothGroup.add(cavityMesh);

    // Cracked tooth fissure
    const crackCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, 1.5, 0.45),
      new THREE.Vector3(-0.4, 1.1, 0.5),
      new THREE.Vector3(-0.35, 0.5, 0.6),
      new THREE.Vector3(-0.3, 0.0, 0.55)
    ]);
    const crackGeo = new THREE.TubeGeometry(crackCurve, 20, 0.03, 8, false);
    const crackMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B });
    crackMesh = new THREE.Mesh(crackGeo, crackMat);
    crackMesh.visible = false;
    toothGroup.add(crackMesh);

    // Porcelain Crown Cap
    const crownCapGeo = createMolarCrownGeometry(1.05);
    const crownCapMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });
    crownCapMesh = new THREE.Mesh(crownCapGeo, crownCapMat);
    crownCapMesh.visible = false;
    toothGroup.add(crownCapMesh);

    // Dental Implant
    implantGroup = createDentalImplantGroup();
    implantGroup.visible = false;
    toothGroup.add(implantGroup);

    // Gutta-percha root canal fillers
    fillerMeshes = createCanalFillers();
    fillerMeshes.forEach(f => {
      f.visible = false;
      toothGroup.add(f);
    });

    toothGroup.position.set(0, 0.2, 0);
    scene.add(toothGroup);
  }

  // Crown Geometry with 4 Distinct Anatomical Cusps & Natural Occlusal Fissures
  function createMolarCrownGeometry(scale = 1.0) {
    const radiusTop = 1.25 * scale;
    const radiusBottom = 0.98 * scale;
    const height = 1.65 * scale;
    const radialSegments = 64;
    const heightSegments = 40;

    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, false);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const angle = Math.atan2(v.z, v.x);
      const r = Math.sqrt(v.x * v.x + v.z * v.z);
      const yRel = (v.y + height / 2) / height; // 0 (bottom/neck) to 1 (top/occlusal)

      // Slight natural oval shape (mesiodistal / buccolingual proportions)
      v.z *= 0.92;

      // 1. Occlusal Table Sculpting (4 Cusps + Central Pit + Fissures)
      if (yRel > 0.68) {
        // 4 Cusp Heights: MB, DB, ML, DL
        // Peaks around angles: MB: ~45°, DB: ~135°, DL: ~-135°, ML: ~-45°
        const cuspElevation = (Math.sin(angle * 2) * 0.28 + Math.cos(angle * 4) * 0.08) * (r / radiusTop) * scale;
        
        // Central pit / developmental groove depression
        const centerDistance = r / (radiusTop * 0.9);
        const centerPit = Math.max(0, 1.0 - centerDistance) * 0.42 * scale;
        
        // Inter-cusp developmental grooves (buccal & lingual developmental fissures)
        const fissureGroove = Math.abs(Math.sin(angle * 2)) * 0.08 * (1.0 - centerDistance);

        v.y += (cuspElevation - centerPit - fissureGroove);
      }

      // 2. Crown Axial Contour (Natural convexity: height of contour at middle-cervical third)
      const contourBulge = Math.sin(Math.pow(yRel, 0.75) * Math.PI) * 0.18 * scale;
      v.x += Math.cos(angle) * contourBulge;
      v.z += Math.sin(angle) * contourBulge;

      // 3. Buccal Groove Cleft (Natural biological cleft between two buccal cusps)
      if (v.z > 0 && Math.abs(v.x) < 0.25 * scale && yRel > 0.4) {
        const cleftDepth = (1.0 - Math.abs(v.x) / (0.25 * scale)) * 0.08 * scale;
        v.z -= cleftDepth;
      }

      pos.setXYZ(i, v.x, v.y + 0.72 * scale, v.z);
    }

    geo.computeVertexNormals();
    return geo;
  }

  // Conformed 3D Facial Decal Geometry hugging the buccal surface with 0.016 offset
  function createFaceDecalGeometry() {
    const radialSegments = 64;
    const heightSegments = 32;
    const height = 0.95;
    const thetaStart = -Math.PI * 0.38;
    const thetaLength = Math.PI * 0.76;

    const geo = new THREE.CylinderGeometry(1.2, 1.2, height, radialSegments, heightSegments, true, thetaStart, thetaLength);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const angle = Math.atan2(v.x, v.z);

      const y_world = v.y + 0.78;
      const crownHeight = 1.65;
      const v_crown_y = y_world - 0.72;
      const yRel = Math.max(0, Math.min(1, (v_crown_y + crownHeight / 2) / crownHeight));

      const r_base = 0.98 + (1.25 - 0.98) * yRel;
      const contourBulge = Math.sin(Math.pow(yRel, 0.75) * Math.PI) * 0.18;

      let vx = Math.sin(angle) * r_base + Math.sin(angle) * contourBulge;
      let vz = Math.cos(angle) * r_base * 0.92 + Math.cos(angle) * contourBulge;

      if (vz > 0 && Math.abs(vx) < 0.25 && yRel > 0.4) {
        const cleftDepth = (1.0 - Math.abs(vx) / 0.25) * 0.08;
        vz -= cleftDepth;
      }

      const offset = 0.016;
      v.x = vx + Math.sin(angle) * offset;
      v.z = vz + Math.cos(angle) * offset;
      v.y = y_world;

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geo.computeVertexNormals();
    return geo;
  }

  // Anatomical Roots Matching Expanded Angle Sheet (Two-Root Bifurcation Form)
  function createFourMolarRoots(texture) {
    const rootMat = new THREE.MeshPhysicalMaterial({
      color: 0xFAF6EE,
      map: texture,
      roughness: 0.16,
      metalness: 0.01,
      clearcoat: 0.85,
      clearcoatRoughness: 0.03
    });

    // 1. Mesiobuccal Root
    const c1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.42, 0.0, 0.12),
      new THREE.Vector3(-0.56, -0.65, 0.12),
      new THREE.Vector3(-0.62, -1.35, 0.08),
      new THREE.Vector3(-0.48, -2.18, 0.04)
    ]);
    const g1 = new THREE.TubeGeometry(c1, 36, 0.32, 24, false);
    taperTube(g1, 0.32, 0.09);
    const r1 = new THREE.Mesh(g1, rootMat);

    // 2. Distobuccal Root
    const c2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.42, 0.0, 0.12),
      new THREE.Vector3(0.56, -0.65, 0.12),
      new THREE.Vector3(0.62, -1.35, 0.08),
      new THREE.Vector3(0.48, -2.12, 0.04)
    ]);
    const g2 = new THREE.TubeGeometry(c2, 36, 0.30, 24, false);
    taperTube(g2, 0.30, 0.085);
    const r2 = new THREE.Mesh(g2, rootMat);

    // 3. Mesiolingual Root
    const c3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.40, 0.0, -0.12),
      new THREE.Vector3(-0.54, -0.65, -0.12),
      new THREE.Vector3(-0.60, -1.35, -0.08),
      new THREE.Vector3(-0.46, -2.18, -0.04)
    ]);
    const g3 = new THREE.TubeGeometry(c3, 36, 0.32, 24, false);
    taperTube(g3, 0.32, 0.09);
    const r3 = new THREE.Mesh(g3, rootMat);

    // 4. Distolingual Root
    const c4 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.40, 0.0, -0.12),
      new THREE.Vector3(0.54, -0.65, -0.12),
      new THREE.Vector3(0.60, -1.35, -0.08),
      new THREE.Vector3(0.46, -2.12, -0.04)
    ]);
    const g4 = new THREE.TubeGeometry(c4, 36, 0.30, 24, false);
    taperTube(g4, 0.30, 0.085);
    const r4 = new THREE.Mesh(g4, rootMat);

    return [r1, r2, r3, r4];
  }

  function taperTube(geo, baseR, tipR) {
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    let minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
    }
    const h = maxY - minY;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = Math.max(0, Math.min(1, (maxY - v.y) / h));
      const factor = (1 - t) + t * (tipR / baseR);
      v.x *= factor;
      v.z *= factor;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
  }

  // Healthy Gums (Gingiva) Cuff
  function createGumsCuff() {
    const gumsGeo = new THREE.TorusGeometry(1.08, 0.24, 16, 48);
    gumsGeo.rotateX(Math.PI / 2);
    gumsGeo.scale(1.0, 0.55, 0.9);
    const gumsMat = new THREE.MeshStandardMaterial({
      color: 0xE87A90, // Healthy coral pink gingiva
      roughness: 0.55,
      metalness: 0.02
    });
    const cuff = new THREE.Mesh(gumsGeo, gumsMat);
    cuff.position.set(0, -0.05, 0);
    return cuff;
  }

  // Pulp Cavity & Blood Vessels (Image 1)
  function createPulpAndCanals(texture) {
    const pulpMat = new THREE.MeshStandardMaterial({
      color: 0xE0314B,
      map: texture,
      emissive: 0x881122,
      emissiveIntensity: 0.45,
      roughness: 0.3
    });

    const chamberGeo = new THREE.BoxGeometry(0.65, 0.58, 0.58, 8, 8, 8);
    const pos = chamberGeo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.normalize().multiplyScalar(0.42);
      pos.setXYZ(i, v.x, v.y + 0.7, v.z);
    }
    chamberGeo.computeVertexNormals();
    const pulpChamber = new THREE.Mesh(chamberGeo, pulpMat);

    const canalMat = new THREE.MeshStandardMaterial({
      color: 0xE0314B,
      map: texture,
      emissive: 0x661111,
      roughness: 0.3
    });

    const cLeftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.25, 0.5, 0.0),
      new THREE.Vector3(-0.55, -0.5, 0.02),
      new THREE.Vector3(-0.68, -1.2, 0.0),
      new THREE.Vector3(-0.58, -1.95, -0.06)
    ]);
    const cLeftGeo = new THREE.TubeGeometry(cLeftCurve, 20, 0.08, 12, false);
    const canalLeft = new THREE.Mesh(cLeftGeo, canalMat);

    const cRightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.25, 0.5, 0.0),
      new THREE.Vector3(0.55, -0.5, -0.02),
      new THREE.Vector3(0.65, -1.2, 0.0),
      new THREE.Vector3(0.52, -1.9, 0.05)
    ]);
    const cRightGeo = new THREE.TubeGeometry(cRightCurve, 20, 0.075, 12, false);
    const canalRight = new THREE.Mesh(cRightGeo, canalMat);

    return { pulpChamber, canals: [canalLeft, canalRight] };
  }

  // Dental Implant
  function createDentalImplantGroup() {
    const grp = new THREE.Group();
    const tiMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.85, roughness: 0.25 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, metalness: 0.9, roughness: 0.2 });

    const fixtureGeo = new THREE.CylinderGeometry(0.38, 0.22, 1.85, 32);
    const fixture = new THREE.Mesh(fixtureGeo, tiMat);
    fixture.position.set(0, -0.9, 0);
    grp.add(fixture);

    for (let y = -1.6; y < -0.1; y += 0.2) {
      const ringGeo = new THREE.TorusGeometry(0.38 + (y + 1.6) * 0.04, 0.035, 8, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, tiMat);
      ring.position.set(0, y, 0);
      grp.add(ring);
    }

    const abutmentGeo = new THREE.CylinderGeometry(0.58, 0.38, 0.5, 32);
    const abutment = new THREE.Mesh(abutmentGeo, goldMat);
    abutment.position.set(0, 0.2, 0);
    grp.add(abutment);

    return grp;
  }

  function createCanalFillers() {
    const fillerMat = new THREE.MeshStandardMaterial({ color: 0xF97316, roughness: 0.4 });
    const cLeftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.25, 0.5, 0.0),
      new THREE.Vector3(-0.55, -0.5, 0.02),
      new THREE.Vector3(-0.68, -1.2, 0.0),
      new THREE.Vector3(-0.58, -1.95, -0.06)
    ]);
    const geoL = new THREE.TubeGeometry(cLeftCurve, 20, 0.09, 12, false);
    const fillerL = new THREE.Mesh(geoL, fillerMat);

    const cRightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.25, 0.5, 0.0),
      new THREE.Vector3(0.55, -0.5, -0.02),
      new THREE.Vector3(0.65, -1.2, 0.0),
      new THREE.Vector3(0.52, -1.9, 0.05)
    ]);
    const geoR = new THREE.TubeGeometry(cRightCurve, 20, 0.085, 12, false);
    const fillerR = new THREE.Mesh(geoR, fillerMat);

    return [fillerL, fillerR];
  }

  // --- INTERACTION & VIEW MODES ---

  function setAesthetic(style) {
    toothAesthetic = style;
    const cTex = (style === 'kintsugi') ? kintsugiTex : null;
    const rTex = (style === 'kintsugi') ? kintsugiTex : null;
    
    if (crownMesh) {
      crownMesh.material.map = cTex;
      if (style === 'cute') {
        crownMesh.material.color.setHex(0xFFFFFF);
        crownMesh.material.roughness = 0.12;
        crownMesh.material.clearcoat = 1.0;
        crownMesh.material.clearcoatRoughness = 0.02;
        crownMesh.material.transmission = 0.04;
        crownMesh.material.ior = 1.55;
      } else if (style === 'natural') {
        crownMesh.material.color.setHex(0xFFFCF7);
        crownMesh.material.roughness = 0.15;
        crownMesh.material.clearcoat = 1.0;
        crownMesh.material.clearcoatRoughness = 0.02;
        crownMesh.material.transmission = 0.06;
        crownMesh.material.ior = 1.62;
      } else {
        crownMesh.material.color.setHex(0xF8F5EE);
        crownMesh.material.roughness = 0.14;
        crownMesh.material.clearcoat = 0.95;
        crownMesh.material.transmission = 0.05;
        crownMesh.material.ior = 1.52;
      }
      crownMesh.material.needsUpdate = true;
    }

    if (faceDecalMesh) {
      faceDecalMesh.visible = (style === 'cute' && currentMode === 'external');
    }

    rootMeshes.forEach(r => {
      r.material.map = rTex;
      if (style === 'cute') {
        r.material.color.setHex(0xFFFAF2);
        r.material.roughness = 0.14;
        r.material.clearcoat = 0.90;
      } else if (style === 'natural') {
        r.material.color.setHex(0xFAF6EE);
        r.material.roughness = 0.16;
        r.material.clearcoat = 0.85;
      } else {
        r.material.color.setHex(0xF0EAE0);
        r.material.roughness = 0.22;
        r.material.clearcoat = 0.70;
      }
      r.material.needsUpdate = true;
    });

    document.querySelectorAll('.dv3d-aesthetic-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.style === style);
    });

    updateUIState();
  }

  function setMode(mode) {
    currentMode = mode;

    crownMesh.position.set(0, 0, 0);
    dentinMesh.position.set(0, 0, 0);
    pulpMesh.position.set(0, 0, 0);
    canalMeshes.forEach(c => c.position.set(0, 0, 0));
    rootMeshes.forEach(r => r.position.set(0, 0, 0));
    if (gumsMesh) gumsMesh.position.set(0, -0.05, 0);

    crownMesh.material.clippingPlanes = [];
    rootMeshes.forEach(r => r.material.clippingPlanes = []);
    if (gumsMesh) gumsMesh.material.clippingPlanes = [];

    if (faceDecalMesh) {
      faceDecalMesh.visible = (mode === 'external' && toothAesthetic === 'cute');
    }

    if (mode === 'external') {
      crownMesh.visible = true;
      crownMesh.material.transmission = 0.0;
      crownMesh.material.opacity = 1.0;
      rootMeshes.forEach(r => {
        r.visible = true;
        r.material.transparent = false;
        r.material.opacity = 1.0;
      });
      if (gumsMesh) gumsMesh.visible = showGums;
      dentinMesh.visible = false;
      pulpMesh.visible = false;
      canalMeshes.forEach(c => c.visible = false);
    } else if (mode === 'transparent') {
      crownMesh.visible = true;
      crownMesh.material.transmission = 0.85;
      crownMesh.material.opacity = 0.32;
      rootMeshes.forEach(r => {
        r.visible = true;
        r.material.transparent = true;
        r.material.opacity = 0.35;
      });
      if (gumsMesh) gumsMesh.visible = false;
      dentinMesh.visible = true;
      pulpMesh.visible = true;
      canalMeshes.forEach(c => c.visible = true);
    } else if (mode === 'crossSection') {
      crownMesh.visible = true;
      crownMesh.material.transmission = 0.0;
      crownMesh.material.opacity = 1.0;
      crownMesh.material.clippingPlanes = [clippingPlane];
      rootMeshes.forEach(r => {
        r.visible = true;
        r.material.clippingPlanes = [clippingPlane];
      });
      if (gumsMesh) {
        gumsMesh.visible = showGums;
        gumsMesh.material.clippingPlanes = [clippingPlane];
      }
      dentinMesh.visible = true;
      pulpMesh.visible = true;
      canalMeshes.forEach(c => c.visible = true);
    } else if (mode === 'exploded') {
      crownMesh.visible = true;
      crownMesh.material.transmission = 0.0;
      crownMesh.material.opacity = 1.0;
      dentinMesh.visible = true;
      pulpMesh.visible = true;
      canalMeshes.forEach(c => c.visible = true);
      rootMeshes.forEach(r => r.visible = true);
      if (gumsMesh) gumsMesh.visible = false;

      if (window.gsap) {
        gsap.to(crownMesh.position, { y: 1.6, duration: 0.8, ease: 'power2.out' });
        gsap.to(dentinMesh.position, { y: 0.7, duration: 0.8, ease: 'power2.out' });
        rootMeshes.forEach(r => gsap.to(r.position, { y: -0.7, duration: 0.8, ease: 'power2.out' }));
      } else {
        crownMesh.position.y = 1.6;
        dentinMesh.position.y = 0.7;
        rootMeshes.forEach(r => r.position.y = -0.7);
      }
    }

    updateUIState();
  }

  function toggleGums() {
    showGums = !showGums;
    if (gumsMesh) gumsMesh.visible = showGums && (currentMode === 'external' || currentMode === 'crossSection');
    const gumsBtn = document.getElementById('dv3d-toggle-gums');
    if (gumsBtn) gumsBtn.classList.toggle('active', showGums);
  }

  function setCondition(condKey) {
    currentCondition = condKey;

    cavityMesh.visible = false;
    crackMesh.visible = false;
    crownCapMesh.visible = false;
    implantGroup.visible = false;
    fillerMeshes.forEach(f => f.visible = false);

    crownMesh.visible = true;
    rootMeshes.forEach(r => r.visible = true);
    if (gumsMesh) gumsMesh.visible = showGums;

    pulpMesh.material.color.setHex(0xE0314B);
    pulpMesh.material.emissive.setHex(0x881122);
    pulpMesh.material.emissiveIntensity = 0.4;

    if (condKey === 'cavity') {
      cavityMesh.visible = true;
      cavityMesh.scale.set(1.0, 0.4, 0.8);
      cavityMesh.material.color.setHex(0x3B2010);
    } else if (condKey === 'decay') {
      cavityMesh.visible = true;
      cavityMesh.scale.set(1.5, 0.9, 1.3);
      cavityMesh.material.color.setHex(0x1C110A);
      setMode('transparent');
    } else if (condKey === 'cracked') {
      crackMesh.visible = true;
    } else if (condKey === 'pulpitis') {
      setMode('transparent');
      pulpMesh.material.color.setHex(0xFF1133);
      pulpMesh.material.emissive.setHex(0xFF0033);
      pulpMesh.material.emissiveIntensity = 0.85;
    } else if (condKey === 'rootCanal') {
      setMode('transparent');
      fillerMeshes.forEach(f => f.visible = true);
      pulpMesh.visible = false;
    } else if (condKey === 'crown') {
      crownMesh.visible = false;
      crownCapMesh.visible = true;
    } else if (condKey === 'implant') {
      crownMesh.visible = false;
      rootMeshes.forEach(r => r.visible = false);
      dentinMesh.visible = false;
      pulpMesh.visible = false;
      canalMeshes.forEach(c => c.visible = false);
      if (gumsMesh) gumsMesh.visible = true;
      crownCapMesh.visible = true;
      implantGroup.visible = true;
    }

    updateUIState();
  }

  function setViewPreset(preset) {
    if (!controls || !camera) return;

    let normPreset = preset;
    if (preset === 'occlusal') normPreset = 'top';
    if (preset === 'furcation') normPreset = 'bottom';
    if (preset === 'cutaway') normPreset = 'cross';

    // 12 Angles Matching the Expanded Angle Sheet
    const targets = {
      front: { x: 0, y: 0.25, z: 6.0 },
      frontLeft45: { x: -4.2, y: 0.25, z: 4.2 },
      left: { x: -6.0, y: 0.25, z: 0 },
      backLeft45: { x: -4.2, y: 0.25, z: -4.2 },
      back: { x: 0, y: 0.25, z: -6.0 },
      backRight45: { x: 4.2, y: 0.25, z: -4.2 },
      right: { x: 6.0, y: 0.25, z: 0 },
      frontRight45: { x: 4.2, y: 0.25, z: 4.2 },
      top: { x: 0.01, y: 6.0, z: 0.01 },
      topFront45: { x: 0.01, y: 4.2, z: 4.2 },
      bottom: { x: 0.01, y: -6.0, z: 0.01 },
      bottomFront45: { x: 0.01, y: -4.2, z: 4.2 },
      iso: { x: 4.2, y: 3.2, z: 4.2 },
      cross: { x: 2.2, y: 1.0, z: 5.5 }
    };

    const targetPos = targets[normPreset] || targets.front;

    if (normPreset === 'cross') {
      setMode('crossSection');
    } else if (currentMode === 'crossSection') {
      setMode('external');
    }

    // Stop auto rotation when user selects a specific perspective
    isAutoRotating = false;
    const btnRotate = document.getElementById('dv3d-btn-autorotate');
    if (btnRotate) btnRotate.classList.remove('active');

    // Smoothly reset tooth root rotation to base alignment
    if (toothGroup) {
      if (window.gsap) {
        gsap.to(toothGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power2.inOut' });
      } else {
        toothGroup.rotation.set(0, 0, 0);
      }
    }

    if (window.gsap) {
      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 0.85,
        ease: 'power2.inOut',
        onUpdate: () => controls.update()
      });
      gsap.to(controls.target, {
        x: 0,
        y: 0.25,
        z: 0,
        duration: 0.85,
        ease: 'power2.inOut'
      });
    } else {
      camera.position.set(targetPos.x, targetPos.y, targetPos.z);
      controls.target.set(0, 0.25, 0);
      controls.update();
    }

    // 1. Highlight Top Preset Buttons
    document.querySelectorAll('.dv3d-view-btn').forEach(btn => {
      const v = btn.dataset.view;
      const isMatch = (v === normPreset ||
                       (normPreset === 'top' && (v === 'top' || v === 'occlusal')) ||
                       (normPreset === 'bottom' && (v === 'bottom' || v === 'furcation')) ||
                       (normPreset === 'cross' && (v === 'cross' || v === 'cutaway')));
      btn.classList.toggle('active', isMatch);
    });

    // 2. Highlight Angle Sheet Thumbnails below
    document.querySelectorAll('.dv3d-angle-thumb').forEach(btn => {
      const v = btn.dataset.view;
      const isMatch = (v === normPreset ||
                       (normPreset === 'top' && v === 'top') ||
                       (normPreset === 'bottom' && v === 'bottom') ||
                       (normPreset === 'cross' && v === 'cross'));
      btn.classList.toggle('active', isMatch);
    });

    // 3. Sync Turntable Slider & Badge
    const degMap = {
      front: 0,
      frontLeft45: 45,
      left: 90,
      backLeft45: 135,
      back: 180,
      backRight45: 225,
      right: 270,
      frontRight45: 315
    };
    const badge = document.getElementById('turntable-deg-badge');
    const slider = document.getElementById('turntable-slider');
    if (degMap[normPreset] !== undefined) {
      if (slider) slider.value = degMap[normPreset];
      if (badge) badge.textContent = `${degMap[normPreset]}° ${normPreset.toUpperCase()}`;
    } else if (normPreset === 'top') {
      if (badge) badge.textContent = `OCCLUSAL TOP`;
    } else if (normPreset === 'bottom') {
      if (badge) badge.textContent = `FURCATION ROOT`;
    } else if (normPreset === 'cross') {
      if (badge) badge.textContent = `CUTAWAY STRATA`;
    }
  }

  function setTurntableAngle(deg) {
    const degNum = parseFloat(deg) || 0;
    const rad = (degNum * Math.PI) / 180;
    sendToToothViewer('setYaw', { yaw: rad });

    if (!controls || !camera) return;
    isAutoRotating = false;
    const btnOrbit = document.getElementById('turntable-orbit-btn');
    if (btnOrbit) btnOrbit.classList.remove('active');

    const r = 6.0;
    const targetX = Math.sin(rad) * r;
    const targetZ = Math.cos(rad) * r;

    camera.position.set(targetX, 0.25, targetZ);
    controls.target.set(0, 0.25, 0);
    controls.update();

    const badge = document.getElementById('turntable-deg-badge');
    if (badge) badge.textContent = `${Math.round(degNum)}° ORBIT`;
  }

  function toggleAutoRotate() {
    isAutoRotating = !isAutoRotating;
    sendToToothViewer('toggleOrbit');
    const btnHeroOrbit = document.getElementById('btn-hero-orbit');
    if (btnHeroOrbit) btnHeroOrbit.classList.toggle('active', isAutoRotating);
    const btnTurntableOrbit = document.getElementById('turntable-orbit-btn');
    if (btnTurntableOrbit) btnTurntableOrbit.classList.toggle('active', isAutoRotating);
    const btnRotate = document.getElementById('dv3d-btn-autorotate');
    if (btnRotate) btnRotate.classList.toggle('active', isAutoRotating);
    const badge = document.getElementById('turntable-deg-badge');
    if (badge && isAutoRotating) badge.textContent = `360° AUTO ORBIT`;
  }

  function selectStructure(structKey) {
    const data = ANATOMY_DATA[structKey];
    if (!data) return;

    const titleEl = document.getElementById('dv3d-struct-title');
    const layerEl = document.getElementById('dv3d-struct-layer');
    const metricEl = document.getElementById('dv3d-struct-metric');
    const descEl = document.getElementById('dv3d-struct-desc');
    const funcEl = document.getElementById('dv3d-struct-func');
    const txEl = document.getElementById('dv3d-struct-tx');

    if (titleEl) titleEl.textContent = data.name;
    if (layerEl) layerEl.textContent = data.layer;
    if (metricEl) metricEl.textContent = data.metric;
    if (descEl) descEl.textContent = data.description;
    if (funcEl) funcEl.textContent = data.function;
    if (txEl) txEl.textContent = data.treatments;

    document.querySelectorAll('.dv3d-struct-item').forEach(el => {
      el.classList.toggle('active', el.dataset.struct === structKey);
    });

    if ((structKey === 'dentin' || structKey === 'pulp' || structKey === 'canals') && currentMode === 'external') {
      setMode('transparent');
    }

    openDrawer();
  }

  function openDrawer() {
    const drawer = document.getElementById('dv3d-drawer');
    const overlay = document.getElementById('dv3d-drawer-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  function closeDrawer() {
    const drawer = document.getElementById('dv3d-drawer');
    const overlay = document.getElementById('dv3d-drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  // Treatment Step Walkthrough
  function startTreatmentWalkthrough(txType) {
    currentTreatment = txType;
    treatmentStepIndex = 0;
    renderTreatmentStep();
    closeDrawer();
  }

  function nextTreatmentStep() {
    if (!currentTreatment) return;
    const steps = TREATMENTS_DATA[currentTreatment].steps;
    treatmentStepIndex = (treatmentStepIndex + 1) % steps.length;
    renderTreatmentStep();
  }

  function prevTreatmentStep() {
    if (!currentTreatment) return;
    const steps = TREATMENTS_DATA[currentTreatment].steps;
    treatmentStepIndex = (treatmentStepIndex - 1 + steps.length) % steps.length;
    renderTreatmentStep();
  }

  function renderTreatmentStep() {
    const data = TREATMENTS_DATA[currentTreatment];
    if (!data) return;
    const step = data.steps[treatmentStepIndex];

    const box = document.getElementById('dv3d-tx-player');
    if (box) {
      box.style.display = 'block';
      const nameEl = document.getElementById('dv3d-tx-name');
      const stepEl = document.getElementById('dv3d-tx-step');
      const descEl = document.getElementById('dv3d-tx-desc');
      const counterEl = document.getElementById('dv3d-tx-counter');

      if (nameEl) nameEl.textContent = data.name;
      if (stepEl) stepEl.textContent = step.title;
      if (descEl) descEl.textContent = step.desc;
      if (counterEl) counterEl.textContent = `Step ${treatmentStepIndex + 1} of ${data.steps.length}`;
    }

    if (currentTreatment === 'rootCanal') {
      if (treatmentStepIndex === 0) setCondition('pulpitis');
      else if (treatmentStepIndex === 1) setMode('transparent');
      else if (treatmentStepIndex === 2) setMode('transparent');
      else if (treatmentStepIndex === 3) setCondition('rootCanal');
      else if (treatmentStepIndex === 4) setCondition('crown');
    } else if (currentTreatment === 'crown') {
      if (treatmentStepIndex <= 1) setCondition('decay');
      else if (treatmentStepIndex === 2) setMode('transparent');
      else if (treatmentStepIndex >= 3) setCondition('crown');
    } else if (currentTreatment === 'implant') {
      if (treatmentStepIndex <= 2) {
        setCondition('implant');
        crownCapMesh.visible = false;
      } else {
        setCondition('implant');
        crownCapMesh.visible = true;
      }
    }
  }

  function updateUIState() {
    document.querySelectorAll('.dv3d-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });

    document.querySelectorAll('.dv3d-cond-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cond === currentCondition);
    });

    const condData = CONDITIONS_DATA[currentCondition];
    if (condData) {
      const cTitle = document.getElementById('dv3d-cond-title');
      const cBadge = document.getElementById('dv3d-cond-badge');
      const cDesc = document.getElementById('dv3d-cond-desc');
      const cClin = document.getElementById('dv3d-cond-clin');
      if (cTitle) cTitle.textContent = condData.title;
      if (cBadge) cBadge.textContent = condData.badge;
      if (cDesc) cDesc.textContent = condData.desc;
      if (cClin) cClin.textContent = condData.clinical;
    }

    const badge = document.getElementById('dv3d-mode-badge');
    if (badge) {
      const modeTitles = {
        external: (toothAesthetic === 'kintsugi') ? '✨ Kintsugi Gold Molar · 360° View' : '🦷 Real Human Molar · Anatomical Enamel',
        transparent: '🔍 Translucent Enamel · Vital Pulp Core',
        crossSection: '✂️ Longitudinal Cross-Cut · Anatomical Strata',
        exploded: '💥 Exploded Layers · Clinical Inspection'
      };
      badge.textContent = modeTitles[currentMode] || currentMode;
    }

    // 21st.dev Category Studio Feature Cards Highlighting
    document.querySelectorAll('#cat-strata .cat-feature-card').forEach(card => {
      const fn = card.getAttribute('onclick') || '';
      card.classList.toggle('active', fn.includes(`'${currentMode}'`));
    });

    document.querySelectorAll('#cat-pathology .cat-feature-card').forEach(card => {
      const fn = card.getAttribute('onclick') || '';
      card.classList.toggle('active', fn.includes(`'${currentCondition}'`));
    });

    document.querySelectorAll('#cat-restorations .cat-feature-card').forEach(card => {
      const fn = card.getAttribute('onclick') || '';
      const isAestheticMatch = (toothAesthetic === 'kintsugi' && fn.includes('kintsugi')) ||
                               (toothAesthetic === 'natural' && fn.includes('natural'));
      const isCondMatch = (currentCondition === 'crown' && fn.includes('crown')) ||
                          (currentCondition === 'implant' && fn.includes('implant'));
      card.classList.toggle('active', isAestheticMatch || isCondMatch);
    });
  }

  function setupEventListeners() {
    window.addEventListener('resize', onWindowResize);

    document.querySelectorAll('.dv3d-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });

    document.querySelectorAll('.dv3d-aesthetic-btn').forEach(btn => {
      btn.addEventListener('click', () => setAesthetic(btn.dataset.style));
    });

    const gumsToggleBtn = document.getElementById('dv3d-toggle-gums');
    if (gumsToggleBtn) {
      gumsToggleBtn.addEventListener('click', toggleGums);
    }

    document.querySelectorAll('.dv3d-view-btn').forEach(btn => {
      btn.addEventListener('click', () => setViewPreset(btn.dataset.view));
    });

    document.querySelectorAll('.dv3d-cond-btn').forEach(btn => {
      btn.addEventListener('click', () => setCondition(btn.dataset.cond));
    });

    document.querySelectorAll('.dv3d-struct-item').forEach(item => {
      item.addEventListener('click', () => selectStructure(item.dataset.struct));
    });

    document.querySelectorAll('.dv3d-tx-trigger').forEach(btn => {
      btn.addEventListener('click', () => startTreatmentWalkthrough(btn.dataset.tx));
    });

    const txNext = document.getElementById('dv3d-tx-next');
    if (txNext) txNext.addEventListener('click', nextTreatmentStep);
    const txPrev = document.getElementById('dv3d-tx-prev');
    if (txPrev) txPrev.addEventListener('click', prevTreatmentStep);
    const txClose = document.getElementById('dv3d-tx-close');
    if (txClose) txClose.addEventListener('click', () => {
      const box = document.getElementById('dv3d-tx-player');
      if (box) box.style.display = 'none';
      currentTreatment = null;
      setCondition('healthy');
      setMode('external');
    });

    // Drawer events
    const openDrawerBtn = document.getElementById('dv3d-open-drawer');
    if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
    const closeDrawerBtn = document.getElementById('dv3d-close-drawer');
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    const drawerOverlay = document.getElementById('dv3d-drawer-overlay');
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Toolbar
    const btnRotate = document.getElementById('dv3d-btn-rotate');
    if (btnRotate) {
      btnRotate.classList.toggle('active', isAutoRotating);
      btnRotate.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        btnRotate.classList.toggle('active', isAutoRotating);
      });
    }

    const btnZoomIn = document.getElementById('dv3d-btn-zoomin');
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        gsap.to(camera.position, {
          x: camera.position.x * 0.85,
          y: camera.position.y * 0.85,
          z: camera.position.z * 0.85,
          duration: 0.35,
          onUpdate: () => controls.update()
        });
      });
    }

    const btnZoomOut = document.getElementById('dv3d-btn-zoomout');
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        gsap.to(camera.position, {
          x: camera.position.x * 1.15,
          y: camera.position.y * 1.15,
          z: camera.position.z * 1.15,
          duration: 0.35,
          onUpdate: () => controls.update()
        });
      });
    }

    const btnReset = document.getElementById('dv3d-btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        setViewPreset('front');
        setMode('external');
        setCondition('healthy');
        isAutoRotating = true;
        if (btnRotate) btnRotate.classList.add('active');
      });
    }

    const btnFullscreen = document.getElementById('dv3d-btn-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        const stage = document.querySelector('.th-3d-stage');
        if (!stage) return;
        if (!document.fullscreenElement) {
          stage.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }

    if (containerEl) {
      containerEl.addEventListener('click', onCanvasClick);
    }
  }

  function onCanvasClick(event) {
    if (!renderer || !camera) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(toothGroup.children, true);

    if (intersects.length > 0) {
      for (let hit of intersects) {
        const obj = hit.object;
        if (obj.userData && obj.userData.structure) {
          selectStructure(obj.userData.structure);
          break;
        }
      }
    }
  }

  function onWindowResize() {
    if (!containerEl || !renderer || !camera) return;
    const width = containerEl.clientWidth;
    const height = containerEl.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    animFrameId = requestAnimationFrame(animate);

    if (controls) controls.update();

    if (isAutoRotating && toothGroup) {
      toothGroup.rotation.y += 0.006;
    }

    if (toothGroup && currentMode !== 'exploded') {
      const time = performance.now() * 0.0015;
      toothGroup.position.y = 0.2 + Math.sin(time) * 0.045;
    }

    if (currentCondition === 'pulpitis' && pulpMesh) {
      const pulse = 0.5 + Math.sin(performance.now() * 0.006) * 0.5;
      pulpMesh.material.emissiveIntensity = 0.4 + pulse * 0.7;
    }

    renderer.render(scene, camera);
  }

  let currentHeroMode = 'real';

  function setHeroMode(mode) {
    currentHeroMode = mode;
    document.querySelectorAll('.dv3d-hero-btn').forEach(btn => {
      if (btn.id !== 'btn-hero-orbit') btn.classList.remove('active');
    });
    const label = document.getElementById('dv3d-hero-view-label');

    if (mode === 'real' || mode === 'natural' || mode === 1) {
      sendToToothViewer('setMode', { mode: 1 });
      setAesthetic('natural');
      setMode('external');
      if (faceDecalMesh) faceDecalMesh.visible = false;
      const b = document.getElementById('btn-hero-real');
      if (b) b.classList.add('active');
      if (label) label.textContent = '💎 Real Anatomical Molar · Master Ceramist Shading & Enamel Sheen';
      if (window.gsap && toothGroup) {
        gsap.to(toothGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' });
        gsap.to(camera.position, { x: 0, y: 0.15, z: 6.3, duration: 0.8, ease: 'power2.inOut' });
      }
    } else if (mode === 'cutaway' || mode === 'strata' || mode === 2) {
      sendToToothViewer('setMode', { mode: 2 });
      setAesthetic('natural');
      setMode('crossSection');
      if (faceDecalMesh) faceDecalMesh.visible = false;
      const b = document.getElementById('btn-hero-cutaway');
      if (b) b.classList.add('active');
      if (label) label.textContent = '🔬 Biological Strata Cutaway · Pulp Chamber & Radicular Canals';
    } else if (mode === 'kintsugi' || mode === 'gold' || mode === 3) {
      sendToToothViewer('setMode', { mode: 3 });
      setAesthetic('kintsugi');
      setMode('external');
      if (faceDecalMesh) faceDecalMesh.visible = false;
      const b = document.getElementById('btn-hero-kintsugi');
      if (b) b.classList.add('active');
      if (label) label.textContent = '✨ Kintsugi 24K Biomimetic Gold · Aesthetic Restoration';
    } else if (mode === 'cute' || mode === 'mascot' || mode === 0) {
      sendToToothViewer('setMode', { mode: 0 });
      setAesthetic('cute');
      setMode('external');
      if (faceDecalMesh) faceDecalMesh.visible = true;
      const b = document.getElementById('btn-hero-cute');
      if (b) b.classList.add('active');
      if (label) label.textContent = '😊 3D Smiling Tooth Mascot · Drag to Rotate 360°';
    }
  }

  function showHeroImage(mode) {
    if (mode === '3d') {
      toggleAutoRotate();
    } else {
      setHeroMode(mode);
    }
  }

  function showInteractive3D() {
    setHeroMode('cute');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.switchAnatomyCategory = function(catId) {
    document.querySelectorAll('.anatomy-cat-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === catId);
    });
    document.querySelectorAll('.anatomy-cat-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'cat-' + catId);
    });
  };

  window.DentalVision3D = {
    init,
    setHeroMode,
    showHeroImage,
    setMode: function(m) { showInteractive3D(); setMode(m); },
    setAesthetic: function(a) { showInteractive3D(); setAesthetic(a); },
    setCondition,
    setViewPreset: function(p) { showInteractive3D(); setViewPreset(p); },
    setCameraPreset: function(p) { showInteractive3D(); setViewPreset(p); },
    setTurntableAngle,
    toggleAutoRotate,
    selectStructure,
    startTreatmentWalkthrough,
    openDrawer,
    closeDrawer,
    toggleStudioHD
  };
})();
