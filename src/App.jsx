/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ABHISHEK - CYBER-OS PORTFOLIO (OPERATING SYSTEM EDITION)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COPYRIGHT © 2025 ABHISHEK. ALL RIGHTS RESERVED.
 * 
 * ⚠️  LEGAL NOTICE - UNAUTHORIZED USE PROHIBITED ⚠️
 * 
 * This code is the exclusive intellectual property of Abhishek.
 * 
 * STRICTLY PROHIBITED WITHOUT WRITTEN PERMISSION:
 * ❌ Copying this code or any portion of it
 * ❌ Modifying or creating derivative works
 * ❌ Distributing or publishing this code
 * ❌ Using this code commercially
 * ❌ Claiming ownership or authorship
 * 
 * Any unauthorized use, reproduction, or distribution of this code
 * may result in severe civil and criminal penalties, and will be
 * prosecuted to the maximum extent possible under law.
 * 
 * For licensing inquiries: Contact Abhishek
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * Features: Window Manager, Draggable Apps, Terminal, System Stats, Kali-inspired UI
 * Dependencies: npm install three framer-motion lucide-react
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Code, Briefcase, GraduationCap, Github, Linkedin, Mail, 
  ExternalLink, Layers, Zap, Terminal as TerminalIcon, X, ChevronRight, 
  Wifi, Battery, Volume2, VolumeX, Minimize2, Maximize2, Monitor,
  HardDrive, Activity, Clock, Signal, User, Folder, Settings,
  ChevronDown, FileText, FolderOpen, Download, Trash2, Edit3, Copy
} from 'lucide-react';

// --- Types & Data ---

const RESUME_DATA = {
  hero: {
    name: "Abhishek Jha",
    title: "Electronics & VLSI Engineer",
    tagline: "Bridging Hardware, AI & Entrepreneurship"
  },
  about: {
    desc: "Founder of AJ Solution with 4500+ clients. Engineering student specializing in VLSI Design, Embedded Systems, and Cloud Computing. Passionate about building scalable tech solutions."
  },
  experience: [
    {
      role: "Founder & CEO",
      company: "AJ Solution",
      period: "Aug 2020 - Present",
      desc: "Scaled digital services brand to 4500+ global clients. Managed branding, automation, and product design."
    },
    {
      role: "Freelance Developer",
      company: "Upwork & Freelancer",
      period: "2022 - Present",
      desc: "UI/UX Design, Brand Identity, and Web Development for startups and small businesses."
    }
  ],
  projects: [
    {
      title: "Smart Krishi Sahayak",
      tech: "Python, ML, Firebase",
      desc: "AI-based farm assistant for crop suggestions and disease detection.",
      status: "Production",
      github: "https://github.com/ABHISHEK-DBZ/krishi",
      demo: "https://krishi-app.demo"
    },
    {
      title: "Laser Security Alarm",
      tech: "Electronics, Sensors",
      desc: "Laser-based intrusion alert system using basic circuits and sensors.",
      status: "Prototype",
      github: null,
      demo: null
    },
    {
      title: "VLSI Circuit Optimizer",
      tech: "Verilog, SystemVerilog, Python",
      desc: "Automated circuit optimization tool for reducing power consumption in digital designs.",
      status: "Development",
      github: "https://github.com/ABHISHEK-DBZ/vlsi-opt",
      demo: null
    },
    {
      title: "Cloud Infrastructure Monitor",
      tech: "AWS, Node.js, React",
      desc: "Real-time monitoring dashboard for cloud resource utilization and cost analysis.",
      status: "Beta",
      github: "https://github.com/ABHISHEK-DBZ/cloud-monitor",
      demo: "https://cloud-monitor.demo"
    }
  ],
  skills: [
    "VLSI Design", "PCB Design (KiCad)", "Python & C", "AWS & Oracle Cloud", "Digital Logic", "AI/LLM Systems",
    "React & Node.js", "Three.js", "Docker & Kubernetes", "Git & CI/CD", "Embedded Systems", "TensorFlow"
  ],
  education: {
    degree: "B.E. Electronics & VLSI",
    college: "Vidyavardhini's College of Eng.",
    year: "2024 - 2028"
  },
  social: {
    email: "abhibro936@gmail.com",
    linkedin: "https://linkedin.com/in/abhishek-jha-cse",
    github: "https://github.com/ABHISHEK-DBZ",
    resume: "/resume.pdf"
  }
};

// File System Structure
const FILE_SYSTEM = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'Desktop',
      type: 'folder',
      children: [
        { name: 'portfolio-3d.desktop', type: 'file', size: '2.1 KB', icon: Monitor },
        { name: 'notes.txt', type: 'file', size: '845 B', icon: Code }
      ]
    },
    {
      name: 'Documents',
      type: 'folder',
      children: [
        { name: 'Resume_Abhishek.pdf', type: 'file', size: '156 KB', icon: Briefcase },
        { name: 'Certificates', type: 'folder', children: [
          { name: 'AWS_Certified.pdf', type: 'file', size: '892 KB', icon: Briefcase },
          { name: 'VLSI_Course.pdf', type: 'file', size: '1.2 MB', icon: Briefcase }
        ]},
        { name: 'Projects_Documentation.md', type: 'file', size: '45 KB', icon: Code }
      ]
    },
    {
      name: 'Projects',
      type: 'folder',
      children: [
        { name: 'smart-krishi-sahayak', type: 'folder', children: [
          { name: 'src', type: 'folder', children: [] },
          { name: 'README.md', type: 'file', size: '12 KB', icon: Code },
          { name: 'package.json', type: 'file', size: '1.8 KB', icon: Code }
        ]},
        { name: 'vlsi-optimizer', type: 'folder', children: [
          { name: 'circuits', type: 'folder', children: [] },
          { name: 'optimizer.py', type: 'file', size: '34 KB', icon: Code }
        ]},
        { name: 'cloud-monitor', type: 'folder', children: [] }
      ]
    },
    {
      name: 'Downloads',
      type: 'folder',
      children: [
        { name: 'datasheets', type: 'folder', children: [] },
        { name: 'linux-installer.iso', type: 'file', size: '2.8 GB', icon: HardDrive }
      ]
    },
    {
      name: 'Pictures',
      type: 'folder',
      children: [
        { name: 'circuit-designs', type: 'folder', children: [] },
        { name: 'screenshots', type: 'folder', children: [] }
      ]
    }
  ]
};

// --- AUDIO SYSTEM (Web Audio API) ---
const useAudioSystem = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playTone = useCallback((freq, type, duration, vol = 0.1) => {
    if (isMuted || !audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + duration);
  }, [isMuted]);

  const playHover = useCallback(() => playTone(800, 'sine', 0.1, 0.05), [playTone]);
  const playClick = useCallback(() => {
    playTone(1200, 'square', 0.1, 0.05);
    setTimeout(() => playTone(600, 'sine', 0.2, 0.05), 50);
  }, [playTone]);
  const playBoot = useCallback(() => {
    if(!audioCtxRef.current) return;
    [220, 440, 880, 1760].forEach((f, i) => {
       setTimeout(() => playTone(f, 'triangle', 0.3, 0.1), i * 100);
    });
  }, [playTone]);

  return { isMuted, setIsMuted, initAudio, playHover, playClick, playBoot };
};

// --- Decryption Text Component ---
const DecryptText = ({ text, className = "" }) => {
  const [disp, setDisp] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisp(text.split("").map((letter, index) => {
        if (index < iter) return letter;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iter >= text.length) clearInterval(interval);
      iter += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{disp}</span>;
};

// --- Helper: Create Text Sprite ---
const createTextSprite = (text, color) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = 48;
  canvas.width = 512;
  canvas.height = 128;
  
  if (ctx) {
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.6 });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4, 1, 1);
  return sprite;
};

// --- Kernel Boot Sequence (Kali-style) ---
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const bootLines = [
      "[    0.000000] Linux version 6.8.0-cyber-os (abhishek@cyber-terminal)",
      "[    0.001234] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1",
      "[    0.012456] DMI: CYBER-OS Portfolio System v3.0",
      "[    0.034567] Memory: 16GB DDR5-6400",
      "[    0.056789] CPU: 8-Core Neural Processor @ 5.2GHz",
      "[    0.123456] PCIe: Initializing GPU [NVIDIA RTX 5090]",
      "[    0.234567] USB: Scanning for devices... 4 ports active",
      "[    0.345678] Network: eth0: Link up - 10Gbps Full Duplex",
      "[    0.456789] Mounting root filesystem... ext4 [OK]",
      "[    0.567890] Loading VLSI modules... [drm] [i915] [OK]",
      "[    0.678901] AI Engine: TensorFlow 3.0 initialized",
      "[    0.789012] Cloud Connector: AWS SDK loaded",
      "[    0.890123] Security: SELinux enabled, AppArmor active",
      "[    1.001234] Holographic Display Driver: three.js r160 [OK]",
      "[    1.112345] Audio System: Web Audio API initialized",
      "[    1.223456] Starting Window Manager... Cyber-WM v2.0",
      "[    1.334567] Loading desktop environment...",
      "[    1.445678] CYBER-OS Ready. Welcome, Abhishek.",
    ];

    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 80 + 40;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        setProgress(p => Math.min(((index + 1) / bootLines.length) * 100, 100));
      }, delay);
    });

    setTimeout(() => {
      setProgress(100);
      onComplete();
    }, delay + 500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-green-400 p-4 md:p-8">
      <div className="w-full max-w-3xl mb-6 max-h-[70vh] overflow-y-auto">
        <div className="mb-4 text-cyan-400 font-bold text-sm md:text-base">
          [ CYBER-OS KERNEL v6.8.0-abhishek ] Booting...
        </div>
        {lines.map((line, i) => (
          <div key={i} className="mb-1 text-[10px] md:text-xs opacity-90 font-light">
            {line}
          </div>
        ))}
        <div className="animate-pulse mt-2 text-green-500">█</div>
      </div>
      <div className="w-full max-w-3xl">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-green-900">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-600 via-cyan-500 to-blue-500 shadow-[0_0_15px_#22c55e]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-green-500 tracking-wider text-center">
          INITIALIZING SYSTEM... {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

// --- 3D Holograms Generators ---

const createChipHologram = (color) => {
  const group = new THREE.Group();
  const boardGeo = new THREE.BoxGeometry(1.2, 0.1, 1.2);
  const boardMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
  const board = new THREE.Mesh(boardGeo, boardMat);
  group.add(board);

  // Gold pins
  for(let i=0; i<4; i++) {
     const side = new THREE.Group();
     for(let j=0; j<8; j++) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.2), new THREE.MeshBasicMaterial({ color: color }));
        pin.position.set((j-3.5)*0.15, 0, 0.7);
        side.add(pin);
     }
     side.rotation.y = i * (Math.PI/2);
     group.add(side);
  }
  
  // Central Silicon
  const sil = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), new THREE.MeshBasicMaterial({ color: color, wireframe: true }));
  group.add(sil);
  return group;
};

const createGlobeHologram = (color) => {
    const group = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(0.8, 2);
    const mat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5 });
    const globe = new THREE.Mesh(geo, mat);
    group.add(globe);
    
    // Satellites
    for(let i=0; i<3; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2 + i*0.2, 0.01, 8, 50), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);
    }
    return group;
};

const createGraphHologram = (color) => {
    const group = new THREE.Group();
    for(let i=0; i<5; i++) {
        const height = 0.5 + Math.random();
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.2, height, 0.2), new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 }));
        bar.position.set((i-2)*0.3, height/2 - 0.5, 0);
        group.add(bar);
    }
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    base.position.y = -0.55;
    group.add(base);
    return group;
};

const createPyramidHologram = (color) => {
    const group = new THREE.Group();
    const geo = new THREE.ConeGeometry(0.8, 1.5, 4);
    const mat = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
    const pyr = new THREE.Mesh(geo, mat);
    group.add(pyr);
    
    // Floating rings
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.02, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.5;
    group.add(ring);
    return group;
};


// --- Vanilla Three.js Scene Component ---

const ThreeScene = ({ activeSection, setActiveSection, setHoveredLabel, isBooting, playHover, playClick, hasOpenWindows }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.02);
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const defaultCamPos = new THREE.Vector3(0, 2, 12);
    camera.position.copy(defaultCamPos);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const mainLight = new THREE.PointLight(0x00f3ff, 2, 40);
    mainLight.position.set(0, 5, 0);
    scene.add(mainLight);
    const secondaryLight = new THREE.PointLight(0xff0055, 2, 40);
    secondaryLight.position.set(-5, -5, 5);
    scene.add(secondaryLight);

    // --- Floating Syntax Debris ---
    const debrisGroup = new THREE.Group();
    const snippets = ["void main()", "import torch", "SystemVerilog", "<div />", "npm install", "git push", "0x1F4A", "PCB Layout"];
    snippets.forEach((text) => {
       const sprite = createTextSprite(text, "#00f3ff");
       sprite.position.set((Math.random()-0.5)*30, (Math.random()-0.5)*20, (Math.random()-0.5)*10 - 5);
       sprite.userData = { velocity: new THREE.Vector3((Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01, 0) };
       debrisGroup.add(sprite);
    });
    scene.add(debrisGroup);

    // --- Stars & Rain (Performance Optimized) ---
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 2000 : 4000;
    const rainCount = isMobile ? 200 : 400;
    
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) starPos[i] = (Math.random()-0.5)*200;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x88ccff, size: 0.15, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for(let i=0; i<rainCount*3; i++) rainPos[i] = (Math.random()-0.5)*40;
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rain = new THREE.Points(rainGeo, new THREE.PointsMaterial({ color: 0x00ff88, size: 0.1, transparent: true, opacity: 0.4 }));
    scene.add(rain);

    // --- Core System (The Swappable Hologram) ---
    const coreRoot = new THREE.Group();
    scene.add(coreRoot);
    
    // Default Core
    const defaultCore = new THREE.Group();
    const dGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const dMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, opacity: 0.5, transparent: true });
    defaultCore.add(new THREE.Mesh(dGeo, dMat));
    defaultCore.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.4), new THREE.MeshBasicMaterial({ color: 0xffffff })));
    // Rings
    [1.4, 1.8, 2.4].forEach((r, i) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 60), new THREE.MeshBasicMaterial({ color: i===1?0x00f3ff:0xffffff, transparent: true, opacity: 0.2 }));
        ring.rotation.x = Math.random();
        defaultCore.add(ring);
    });
    coreRoot.add(defaultCore);

    // --- Orbiting Nodes ---
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    const createNode = (pos, color, label, id) => {
      const g = new THREE.Group();
      g.position.set(...pos);
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6), new THREE.MeshPhongMaterial({ color: 0x111111, emissive: color, emissiveIntensity: 0.5 }));
      g.add(m);
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.8), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.2 })));
      // Connecting line
      const pts = [new THREE.Vector3(0,0,0), new THREE.Vector3(-pos[0], -pos[1], -pos[2])];
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 })));
      m.userData = { type: 'node', id, label, originalColor: color };
      nodesGroup.add(g);
      return { group: g, mesh: m, basePos: [...pos], color };
    };

    const nodeData = [
      { pos: [isMobile ? 2.5 : 6, 0, 0], color: 0xff0055, label: 'SKILLS', id: 'skills' },
      { pos: [isMobile ? -2.5 : -5, 3, 3], color: 0x00ff88, label: 'PROJECTS', id: 'projects' },
      { pos: [0, -3, isMobile ? 3.5 : 5], color: 0xffd700, label: 'EXPERIENCE', id: 'experience' },
      { pos: [0, 4, -3], color: 0x0099ff, label: 'EDUCATION', id: 'education' }
    ];
    const nodes = nodeData.map(n => createNode(n.pos, n.color, n.label, n.id));

    // --- Trail ---
    const trailGeo = new THREE.BufferGeometry();
    const trailPos = new Float32Array(60*3);
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trail = new THREE.Points(trailGeo, new THREE.PointsMaterial({ color: 0x00f3ff, size: 0.15, transparent: true, opacity: 0.6 }));
    scene.add(trail);
    const mouseTrailPositions = [];

    // --- Grid ---
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 40, 40), new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.03 }));
    grid.rotation.x = -Math.PI/2;
    grid.position.y = -5;
    scene.add(grid);

    // Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseX = 0, mouseY = 0, warpSpeed = 0;
    let lastMouseMove = 0;
    
    // Theme Colors
    const colors = { default: new THREE.Color(0x00f3ff), skills: new THREE.Color(0xff0055), projects: new THREE.Color(0x00ff88), experience: new THREE.Color(0xffd700), education: new THREE.Color(0x0099ff) };
    const targetColor = new THREE.Color(colors.default);
    
    // Camera Animation
    const targetCameraPos = new THREE.Vector3().copy(defaultCamPos);
    const targetCameraLookAt = new THREE.Vector3(0,0,0);
    const currentCameraLookAt = new THREE.Vector3(0,0,0);

    const onMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseMove < 16) return; // Throttle to ~60fps
      lastMouseMove = now;

      mouse.x = (e.clientX/window.innerWidth)*2-1;
      mouse.y = -(e.clientY/window.innerHeight)*2+1;
      mouseX = (e.clientX-window.innerWidth/2)/100;
      mouseY = (e.clientY-window.innerHeight/2)/100;

      const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z/dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(dist));
      mouseTrailPositions.push({x:pos.x, y:pos.y, z:pos.z*0.5});
    };

    let intersectedObject = null;
    const onClick = () => {
       if(intersectedObject?.userData.type === 'node') {
           setActiveSection(intersectedObject.userData.id);
           playClick();
           warpSpeed = 5.0;
       }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // --- Hologram Cache ---
    const holograms = {
        default: defaultCore,
        skills: createChipHologram(colors.skills),
        projects: createGlobeHologram(colors.projects),
        experience: createGraphHologram(colors.experience),
        education: createPyramidHologram(colors.education)
    };

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (isBooting) return;
      
      // Dynamic camera adjustment when windows are open
      if (hasOpenWindows) {
        targetCameraPos.lerp(new THREE.Vector3(3, 3, 15), 0.02);
      } else {
        targetCameraPos.lerp(defaultCamPos, 0.02);
      }
      
      // Theme Transition
      scene.fog.color.lerp(targetColor, 0.02);
      mainLight.color.lerp(targetColor, 0.05);
      grid.material.color.lerp(targetColor, 0.02);
      trail.material.color.lerp(targetColor, 0.05);

      // Warp Physics
      warpSpeed = THREE.MathUtils.lerp(warpSpeed, 0, 0.05);

      // Camera
      camera.position.lerp(targetCameraPos, 0.04);
      currentCameraLookAt.lerp(targetCameraLookAt, 0.04);
      camera.lookAt(currentCameraLookAt);
      if(!hasOpenWindows && targetCameraPos.distanceTo(defaultCamPos) < 0.1) {
         camera.position.x += (mouseX*0.5 - camera.position.x)*0.05;
         camera.position.y += ((2+mouseY*0.2) - camera.position.y)*0.05;
      }

      // Stars & Rain
      const starPosArr = stars.geometry.attributes.position.array;
      for(let i=2; i<starPosArr.length; i+=3) {
         starPosArr[i] += 0.1 + warpSpeed;
         if(starPosArr[i]>20) starPosArr[i] = -200;
      }
      stars.geometry.attributes.position.needsUpdate = true;
      
      const rainPosArr = rain.geometry.attributes.position.array;
      for(let i=1; i<rainPosArr.length; i+=3) {
         rainPosArr[i] += 0.05;
         if(rainPosArr[i]>20) rainPosArr[i] = -20;
      }
      rain.geometry.attributes.position.needsUpdate = true;

      // Debris
      debrisGroup.children.forEach(s => {
          s.position.add(s.userData.velocity);
          if(Math.abs(s.position.x)>15) s.userData.velocity.x *= -1;
          if(Math.abs(s.position.y)>10) s.userData.velocity.y *= -1;
          s.material.color.lerp(targetColor, 0.01);
      });

      // Core Animation (Rotate whatever is active)
      coreRoot.children.forEach(c => {
          c.rotation.y += 0.01;
          c.rotation.z += 0.005;
      });

      // Nodes
      const t = Date.now()*0.001;
      nodes.forEach((n, i) => {
          n.mesh.rotation.x = t*0.5;
          n.mesh.rotation.y = t*0.3;
          n.group.position.y = n.basePos[1] + Math.sin(t*1.5+i)*0.2;
      });
      grid.position.z = (t*1)%2;

      // Trail
      while(mouseTrailPositions.length > 60) mouseTrailPositions.shift();
      const tp = trail.geometry.attributes.position.array;
      for(let i=0; i<60; i++) {
         if(i < mouseTrailPositions.length) {
             const p = mouseTrailPositions[mouseTrailPositions.length-1-i];
             tp[i*3]=p.x; tp[i*3+1]=p.y; tp[i*3+2]=p.z;
         } else tp[i*3]=9999;
      }
      trail.geometry.attributes.position.needsUpdate = true;

      // Raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n=>n.mesh));
      if(intersects.length > 0) {
         const obj = intersects[0].object;
         if(intersectedObject !== obj) {
            intersectedObject = obj;
            setHoveredLabel(obj.userData.label);
            document.body.style.cursor = 'pointer';
            playHover();
            obj.scale.set(1.3,1.3,1.3);
         }
      } else {
         if(intersectedObject) {
            intersectedObject.scale.set(1,1,1);
            setHoveredLabel(null);
            document.body.style.cursor = 'auto';
            intersectedObject = null;
         }
      }

      renderer.render(scene, camera);
    };
    
    animate();

    // Save refs for effect update
    sceneRef.current = { 
        coreRoot, holograms, defaultCamPos, colors, targetColor, 
        targetCameraPos, targetCameraLookAt, nodes 
    };

    return () => {
       window.removeEventListener('mousemove', onMouseMove);
       window.removeEventListener('click', onClick);
       if (animationFrameRef.current) {
         cancelAnimationFrame(animationFrameRef.current);
       }
       
       // Dispose geometries and materials
       scene.traverse((obj) => {
         if (obj.geometry) obj.geometry.dispose();
         if (obj.material) {
           if (Array.isArray(obj.material)) {
             obj.material.forEach(mat => mat.dispose());
           } else {
             obj.material.dispose();
           }
         }
       });
       
       renderer.dispose();
       if(mountRef.current && renderer.domElement.parentNode === mountRef.current) {
         mountRef.current.removeChild(renderer.domElement);
       }
    };
  }, [isBooting, playHover, playClick, setActiveSection, setHoveredLabel, hasOpenWindows]);

  // Handle Active Section Changes (Camera + Hologram Swap)
  useEffect(() => {
     if(!sceneRef.current) return;
     const { coreRoot, holograms, nodes, targetCameraPos, targetCameraLookAt, defaultCamPos, colors, targetColor } = sceneRef.current;
     
     // 1. Swap Hologram
     coreRoot.clear();
     const hologram = activeSection ? holograms[activeSection] : holograms.default;
     coreRoot.add(hologram);

     // 2. Move Camera & Set Color
     if(activeSection) {
        const targetNode = nodes.find(n => n.mesh.userData.id === activeSection);
        if(targetNode) {
            const offset = new THREE.Vector3(0,0,6);
            const tPos = targetNode.group.position.clone().add(offset);
            tPos.x -= 2;
            targetCameraPos.copy(tPos);
            targetCameraLookAt.copy(targetNode.group.position);
            targetColor.copy(colors[activeSection]);
        }
     } else {
        targetCameraPos.copy(defaultCamPos);
        targetCameraLookAt.set(0,0,0);
        targetColor.copy(colors.default);
     }
  }, [activeSection]);

  return <div ref={mountRef} className="absolute inset-0 z-0 block" />;
};

// --- Draggable Window Component ---
const Window = ({ id, title, icon: Icon, children, onClose, onMinimize, zIndex, initialPosition, onFocus }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    onFocus(id);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: Math.max(0, e.clientY - dragStart.current.y)
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const windowStyle = isMaximized ? {
    position: 'fixed',
    top: 40,
    left: 0,
    right: 0,
    bottom: 50,
    width: '100%',
    height: 'calc(100vh - 90px)',
    zIndex
  } : {
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: Math.min(size.width, window.innerWidth - 20),
    height: Math.min(size.height, window.innerHeight - 100),
    zIndex
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      style={windowStyle}
      className="backdrop-blur-xl bg-black/80 border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden flex flex-col"
      onClick={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-b border-cyan-500/30 flex items-center justify-between px-3 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-cyan-400" />
          <span className="text-sm font-mono text-cyan-100">{title}</span>
        </div>
        <div className="flex items-center gap-2 window-controls">
          <button 
            onClick={onMinimize}
            className="w-6 h-6 rounded bg-yellow-500/20 hover:bg-yellow-500/40 flex items-center justify-center transition-colors"
          >
            <Minimize2 size={12} className="text-yellow-300" />
          </button>
          <button 
            onClick={toggleMaximize}
            className="w-6 h-6 rounded bg-green-500/20 hover:bg-green-500/40 flex items-center justify-center transition-colors"
          >
            <Maximize2 size={12} className="text-green-300" />
          </button>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
          >
            <X size={12} className="text-red-300" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};

// --- System Top Bar ---
const SystemTopBar = ({ isMuted, setIsMuted }) => {
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(23);
  const [memUsage, setMemUsage] = useState(45);
  const [networkSpeed, setNetworkSpeed] = useState(128);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuUsage(20 + Math.random() * 15);
      setMemUsage(40 + Math.random() * 20);
      setNetworkSpeed(100 + Math.random() * 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-black/90 backdrop-blur-md border-b border-cyan-500/30 z-50 flex items-center justify-between px-4">
      {/* Left: Logo & System Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Monitor size={16} className="text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-400">CYBER-OS</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-1">
            <Cpu size={12} className="text-green-400" />
            <span className="text-green-300">{cpuUsage.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive size={12} className="text-blue-400" />
            <span className="text-blue-300">{memUsage.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={12} className="text-purple-400" />
            <span className="text-purple-300">{networkSpeed.toFixed(0)} MB/s</span>
          </div>
        </div>
      </div>

      {/* Center: User */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <User size={12} className="text-cyan-400" />
        <span className="text-cyan-300">abhishek@cyber-terminal</span>
      </div>

      {/* Right: Status Icons & Time */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <Signal size={12} className="text-green-400" />
          <Wifi size={12} className="text-cyan-400" />
          <Battery size={12} className="text-yellow-400" />
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="hover:text-cyan-300 transition-colors"
          >
            {isMuted ? <VolumeX size={12} className="text-red-400" /> : <Volume2 size={12} className="text-cyan-400" />}
          </button>
        </div>
        <div className="text-xs font-mono text-cyan-100 font-semibold">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

// --- File Manager Component ---
const FileManager = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const getCurrentFolder = () => {
    let folder = FILE_SYSTEM;
    for (const pathPart of currentPath) {
      folder = folder.children?.find(child => child.name === pathPart);
      if (!folder) return FILE_SYSTEM;
    }
    return folder;
  };

  const navigateToFolder = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedFile(null);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const navigateToRoot = () => {
    setCurrentPath([]);
    setSelectedFile(null);
  };

  const currentFolder = getCurrentFolder();
  const breadcrumb = ['~', ...currentPath].join(' / ');

  return (
    <div className="h-full flex flex-col bg-black/20">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-cyan-500/30 bg-black/40">
        <button
          onClick={navigateUp}
          disabled={currentPath.length === 0}
          className="p-2 hover:bg-cyan-500/20 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90 text-cyan-300" />
        </button>
        <button
          onClick={navigateToRoot}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
        >
          <HardDrive className="w-4 h-4 text-cyan-400" />
        </button>
        <div className="flex-1 px-3 py-1.5 bg-black/50 rounded text-xs font-mono text-cyan-300">
          {breadcrumb}
        </div>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
        >
          <Settings className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'list' ? (
          <div className="space-y-1">
            {currentFolder.children?.map((item, idx) => {
              const Icon = item.icon || (item.type === 'folder' ? Folder : FileText);
              const isSelected = selectedFile?.name === item.name;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => item.type === 'folder' ? navigateToFolder(item.name) : setSelectedFile(item)}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all ${
                    isSelected ? 'bg-cyan-500/30 border border-cyan-400/50' : 'hover:bg-cyan-500/10'
                  }`}
                >
                  {item.type === 'folder' ? (
                    <FolderOpen className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Icon className="w-5 h-5 text-cyan-400" />
                  )}
                  <span className="flex-1 text-sm font-mono">{item.name}</span>
                  {item.size && <span className="text-xs text-gray-400">{item.size}</span>}
                  {item.type === 'folder' && <ChevronRight className="w-4 h-4 text-gray-500" />}
                </motion.div>
              );
            })}</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {currentFolder.children?.map((item, idx) => {
              const Icon = item.icon || (item.type === 'folder' ? Folder : FileText);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => item.type === 'folder' ? navigateToFolder(item.name) : setSelectedFile(item)}
                  className="flex flex-col items-center gap-2 p-3 rounded cursor-pointer hover:bg-cyan-500/10 transition-all"
                >
                  {item.type === 'folder' ? (
                    <FolderOpen className="w-12 h-12 text-yellow-400" />
                  ) : (
                    <Icon className="w-12 h-12 text-cyan-400" />
                  )}
                  <span className="text-xs text-center font-mono break-all">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-cyan-500/30 p-2 bg-black/40 text-xs font-mono text-gray-400">
        {currentFolder.children?.length || 0} items
        {selectedFile && ` • Selected: ${selectedFile.name}`}
      </div>
    </div>
  );
};

// --- App Dock ---
const Dock = ({ onOpenApp, openWindows, playClick }) => {
  const apps = [
    { id: 'skills', icon: Cpu, label: 'Skills', color: 'from-pink-500 to-red-500' },
    { id: 'projects', icon: Code, label: 'Projects', color: 'from-green-500 to-emerald-500' },
    { id: 'experience', icon: Briefcase, label: 'Experience', color: 'from-yellow-500 to-orange-500' },
    { id: 'education', icon: GraduationCap, label: 'Education', color: 'from-blue-500 to-indigo-500' },
    { id: 'terminal', icon: TerminalIcon, label: 'Terminal', color: 'from-gray-700 to-gray-900' },
    { id: 'files', icon: Folder, label: 'Files', color: 'from-purple-500 to-pink-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'from-slate-600 to-gray-800' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black/60 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl px-3 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          {apps.map((app) => (
            <motion.button
              key={app.id}
              onClick={() => { onOpenApp(app.id); playClick(); }}
              className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center transition-all hover:scale-110 group ${openWindows.includes(app.id) ? 'ring-2 ring-cyan-400' : ''}`}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <app.icon size={24} className="text-white" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {app.label}
              </div>
              {openWindows.includes(app.id) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Terminal Window Content ---
const TerminalContent = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'CYBER-OS Terminal v2.0.0' },
    { type: 'output', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  const commands = {
    help: () => 'Available commands:\n  help, whoami, skills, projects, experience, education, clear, neofetch\n  ls, pwd, cd, cat, tree, uname, uptime, date, echo, systeminfo, contact',
    whoami: () => 'abhishek - Electronics & VLSI Engineer | Founder of AJ Solution',
    skills: () => '─── Technical Skills ───\n' + RESUME_DATA.skills.join(' • '),
    projects: () => '─── Projects ───\n' + RESUME_DATA.projects.map(p => `\n📦 ${p.title}\n   Tech: ${p.tech}\n   Status: ${p.status}\n   ${p.desc}`).join('\n'),
    experience: () => '─── Work Experience ───\n' + RESUME_DATA.experience.map(e => `\n💼 ${e.role} @ ${e.company}\n   ${e.period}\n   ${e.desc}`).join('\n'),
    education: () => `─── Education ───\n🎓 ${RESUME_DATA.education.degree}\n   ${RESUME_DATA.education.college}\n   ${RESUME_DATA.education.year}`,
    contact: () => `─── Contact Information ───\n📧 Email: ${RESUME_DATA.social.email}\n🔗 GitHub: ${RESUME_DATA.social.github}\n🔗 LinkedIn: ${RESUME_DATA.social.linkedin}`,
    clear: () => { setHistory([]); return null; },
    neofetch: () => `
    ██████╗██╗   ██╗██████╗ ███████╗██████╗        ${RESUME_DATA.hero.name}
   ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗       ${'─'.repeat(RESUME_DATA.hero.name.length)}
   ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝       OS: CYBER-OS Linux x86_64
   ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗       Kernel: 6.8.0-cyber-os
   ╚██████╗   ██║   ██████╔╝███████╗██║  ██║       Shell: bash 5.2.0
    ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝       CPU: Intel i7-12700K @ 3.60GHz
                                                    GPU: NVIDIA RTX 4090 24GB
   abhishek@cyber-terminal                         RAM: 32GB DDR5
                                                    Renderer: WebGL 2.0
    `,
    ls: () => '📁 Desktop  📁 Documents  📁 Downloads  📁 Projects  📁 Pictures',
    pwd: () => '/home/abhishek',
    cd: () => 'Changed directory to /home/abhishek',
    cat: () => `# ${RESUME_DATA.hero.name} - Portfolio\n\nWelcome to my CYBER-OS portfolio system!\n\nFeatures:\n- 3D Interactive Scene\n- Window Manager\n- File System Browser\n- Terminal Emulator\n\n${RESUME_DATA.about.desc}`,
    tree: () => '📂 /home/abhishek\n├── 📁 Desktop\n├── 📁 Documents\n│   └── 📄 Resume_Abhishek.pdf\n├── 📁 Downloads\n├── 📁 Projects\n│   ├── 📂 smart-krishi-sahayak\n│   ├── 📂 vlsi-optimizer\n│   └── 📂 cloud-monitor\n└── 📁 Pictures',
    uname: () => 'CYBER-OS 6.8.0-cyber x86_64 GNU/Linux',
    uptime: () => `System uptime: ${Math.floor(Date.now() / 60000)} minutes`,
    date: () => new Date().toString(),
    echo: () => 'CYBER-OS Terminal v2.0.0 - Advanced portfolio system',
    systeminfo: () => `───  System Information ───\nHostname: cyber-portfolio\nOS: CYBER-OS Linux\nArchitecture: x64\nCPU: Intel i7-12700K @ 3.60GHz\nGPU: NVIDIA RTX 4090 24GB\nRAM: 32GB DDR5\nRenderer: WebGL 2.0\nBrowser: ${navigator.userAgent.split(' ').pop()}\nThree.js: v0.179.1\nReact: v19.1.1`
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === '') return;

    setHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}` }]);

    if (commands[trimmed]) {
      const output = commands[trimmed]();
      if (output) {
        setHistory(prev => [...prev, { type: 'output', text: output }]);
      }
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${cmd}` }]);
    }
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="h-full bg-black/90 text-green-400 font-mono text-sm flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((entry, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            entry.type === 'input' ? 'text-cyan-400' : 
            entry.type === 'error' ? 'text-red-400' : 
            'text-green-300'
          }`}>
            {entry.text}
          </div>
        ))}
      </div>
      <div className="border-t border-cyan-500/30 p-4 flex items-center gap-2">
        <span className="text-cyan-400">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeCommand(input)}
          className="flex-1 bg-transparent outline-none text-green-300"
          placeholder="Type command..."
          autoFocus
        />
      </div>
    </div>
  );
};

const SectionContent = ({ section, data }) => {
  if (section === 'terminal') {
    return <TerminalContent />;
  }

  if (section === 'files') {
    return <FileManager />;
  }

  if (section === 'settings') {
    return (
      <div className="space-y-4 text-sm">
        <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-gray-500/30 pb-2">
          <Settings className="text-gray-400" /> <DecryptText text="SYSTEM CONFIGURATION" />
        </h2>
        
        <div className="p-4 bg-gray-500/10 rounded border border-gray-500/30">
          <div className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Display Settings
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Theme:</span>
              <span className="text-cyan-300 font-mono">Cyberpunk Matrix</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Particles:</span>
              <span className="text-green-400 font-mono">Enabled (4000)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Effects:</span>
              <span className="text-purple-400 font-mono">High Quality</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Resolution:</span>
              <span className="text-blue-400 font-mono">{window.innerWidth} × {window.innerHeight}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-500/10 rounded border border-gray-500/30">
          <div className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            User Profile
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Username:</span>
              <span className="text-cyan-300 font-mono">abhishek@cyber-os</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-cyan-300 font-mono">{RESUME_DATA.social.email}</span>
            </div>
            <div className="flex gap-3 mt-3">
              <a href={RESUME_DATA.social.github} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                <Github className="w-3 h-3" /> GitHub
              </a>
              <a href={RESUME_DATA.social.linkedin} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <a href={`mailto:${RESUME_DATA.social.email}`}
                 className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                <Mail className="w-3 h-3" /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-500/10 rounded border border-gray-500/30">
          <div className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            System Info
          </div>
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <div>OS: CYBER-OS Linux 6.8.0</div>
            <div>Renderer: WebGL 2.0</div>
            <div>Framework: React {React.version}</div>
            <div>3D Engine: Three.js 0.179.1</div>
            <div>Build: Vite 5.4.11</div>
            <div>Browser: {navigator.userAgent.split(' ').pop()}</div>
          </div>
        </div>

        <div className="p-4 bg-gray-500/10 rounded border border-gray-500/30">
          <div className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            Performance
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-green-400 font-mono">23%</span>
              </div>
              <div className="h-2 bg-black/30 rounded overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{width: '23%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Memory</span>
                <span className="text-blue-400 font-mono">45%</span>
              </div>
              <div className="h-2 bg-black/30 rounded overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: '45%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Network</span>
                <span className="text-purple-400 font-mono">128 MB/s</span>
              </div>
              <div className="h-2 bg-black/30 rounded overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '64%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {section === 'skills' && (
        <>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-cyan-500/30 pb-2">
            <Cpu className="text-cyan-400" /> <DecryptText text="NEURAL NET" />
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 font-mono hover:bg-cyan-900/40 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
      {section === 'projects' && (
        <>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-green-500/30 pb-2">
            <Code className="text-green-400" /> <DecryptText text="PROTOCOLS" />
          </h2>
          {data.projects.map((p, i) => (
            <div key={i} className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg hover:bg-green-500/10 hover:border-green-500/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{p.title}</h3>
                <span className={`text-xs px-2 py-1 rounded font-mono ${
                  p.status === 'Production' ? 'bg-green-500/20 text-green-400' :
                  p.status === 'Beta' ? 'bg-blue-500/20 text-blue-400' :
                  p.status === 'Prototype' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {p.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">{p.desc}</p>
              <div className="text-xs font-mono text-green-400 mt-3 mb-2">{p.tech}</div>
              <div className="flex gap-2 mt-3">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors px-2 py-1 bg-purple-500/10 rounded border border-purple-500/30 hover:border-purple-500/50">
                    <Github className="w-3 h-3" />
                    <span>Source</span>
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/30 hover:border-cyan-500/50">
                    <ExternalLink className="w-3 h-3" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {section === 'experience' && (
        <>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-yellow-500/30 pb-2">
            <Briefcase className="text-yellow-400" /> <DecryptText text="RUNTIME LOGS" />
          </h2>
          {data.experience.map((e, i) => (
            <div key={i} className="relative pl-6 border-l border-white/10">
              <div className="absolute left-[-2px] top-2 w-1 h-1 bg-yellow-400" />
              <h3 className="font-bold text-white text-base">{e.role}</h3>
              <div className="text-yellow-400 text-sm font-mono">{e.company}</div>
              <p className="text-sm text-gray-400 mt-2">{e.desc}</p>
            </div>
          ))}
        </>
      )}
      {section === 'education' && (
        <>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-blue-500/30 pb-2">
            <GraduationCap className="text-blue-400" /> <DecryptText text="DATABASE" />
          </h2>
          <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white">{data.education.degree}</h3>
            <p className="text-blue-300">{data.education.college}</p>
            <div className="text-xs text-gray-500 font-mono mt-4">STATUS: ACTIVE ({data.education.year})</div>
          </div>
        </>
      )}
      {section === 'files' && (
        <>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 border-b border-purple-500/30 pb-2">
            <Folder className="text-purple-400" /> <DecryptText text="FILE SYSTEM" />
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-2 text-cyan-300 hover:bg-cyan-900/20 p-2 rounded cursor-pointer">
              <Folder size={16} /> Desktop
            </div>
            <div className="flex items-center gap-2 text-cyan-300 hover:bg-cyan-900/20 p-2 rounded cursor-pointer">
              <Folder size={16} /> Documents
            </div>
            <div className="flex items-center gap-2 text-cyan-300 hover:bg-cyan-900/20 p-2 rounded cursor-pointer">
              <Folder size={16} /> Projects
            </div>
            <div className="flex items-center gap-2 text-green-300 hover:bg-green-900/20 p-2 rounded cursor-pointer">
              <Code size={16} /> portfolio-3d
            </div>
            <div className="flex items-center gap-2 text-yellow-300 hover:bg-yellow-900/20 p-2 rounded cursor-pointer">
              <HardDrive size={16} /> scripts
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [isBooting, setIsBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState([]);
  const [windowZIndices, setWindowZIndices] = useState({});
  const [maxZIndex, setMaxZIndex] = useState(100);
  
  const { isMuted, setIsMuted, initAudio, playHover, playClick, playBoot } = useAudioSystem();

  useEffect(() => {
      const start = () => initAudio();
      window.addEventListener('click', start, { once: true });
      return () => window.removeEventListener('click', start);
  }, [initAudio]);

  const openApp = (appId) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows(prev => [...prev, appId]);
      setWindowZIndices(prev => ({ ...prev, [appId]: maxZIndex + 1 }));
      setMaxZIndex(prev => prev + 1);
    } else {
      focusWindow(appId);
    }
  };

  const closeWindow = (appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId));
    if (activeSection === appId) setActiveSection(null);
  };

  const minimizeWindow = (appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId));
  };

  const focusWindow = (appId) => {
    setWindowZIndices(prev => ({ ...prev, [appId]: maxZIndex + 1 }));
    setMaxZIndex(prev => prev + 1);
    setActiveSection(appId);
  };

  const getWindowPosition = (index) => {
    const offset = index * 30;
    return { x: 100 + offset, y: 80 + offset };
  };

  return (
    <div className="w-full h-screen bg-[#000510] text-white overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,243,255,0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,243,255,0.5); }
      `}</style>

      <AnimatePresence>
        {isBooting && (
          <motion.div initial={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-[100] bg-black">
            <BootSequence onComplete={() => { setIsBooting(false); playBoot(); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isBooting && <SystemTopBar isMuted={isMuted} setIsMuted={setIsMuted} />}

      <ThreeScene 
        activeSection={activeSection}
        setActiveSection={setActiveSection} 
        setHoveredLabel={setHoveredLabel} 
        isBooting={isBooting}
        playHover={playHover}
        playClick={playClick}
        hasOpenWindows={openWindows.length > 0}
      />

      {!isBooting && (
        <>
          <div className={`absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10 transition-all duration-1000 ${openWindows.length > 0 ? 'opacity-20 blur-sm scale-95' : 'opacity-100'}`}>
            <div className="pointer-events-auto text-center">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                {RESUME_DATA.hero.name.toUpperCase()}
              </h1>
              <div className="text-cyan-400 font-mono text-sm tracking-wide bg-black/40 inline-block px-6 py-2 rounded-full border border-cyan-500/30">
                <Zap size={14} className="inline mr-2 animate-pulse text-yellow-400" />
                <DecryptText text={RESUME_DATA.hero.title} />
              </div>
            </div>
          </div>

          <Dock onOpenApp={openApp} openWindows={openWindows} playClick={playClick} />

          <AnimatePresence>
            {openWindows.map((windowId, index) => (
              <Window
                key={windowId}
                id={windowId}
                title={
                  windowId === 'skills' ? 'Skills' :
                  windowId === 'projects' ? 'Projects' :
                  windowId === 'experience' ? 'Experience' :
                  windowId === 'education' ? 'Education' :
                  windowId === 'terminal' ? 'Terminal' :
                  windowId === 'files' ? 'File Manager' :
                  windowId === 'settings' ? 'Settings' : windowId
                }
                icon={
                  windowId === 'skills' ? Cpu :
                  windowId === 'projects' ? Code :
                  windowId === 'experience' ? Briefcase :
                  windowId === 'education' ? GraduationCap :
                  windowId === 'terminal' ? TerminalIcon :
                  windowId === 'files' ? Folder :
                  windowId === 'settings' ? Settings : Monitor
                }
                onClose={() => { closeWindow(windowId); playClick(); }}
                onMinimize={() => { minimizeWindow(windowId); playClick(); }}
                zIndex={windowZIndices[windowId] || 100}
                initialPosition={getWindowPosition(index)}
                onFocus={focusWindow}
              >
                <SectionContent section={windowId} data={RESUME_DATA} />
              </Window>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
