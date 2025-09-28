// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize 3D Graphics
    initHeroCanvas();
    initGeometricShapes();
    initBrainVisualization();
    
    // GSAP Animations
    initScrollAnimations();
    
    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            const formData = new FormData(contactForm);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent Successfully!';
            submitBtn.style.background = '#4CAF50';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Footer CTA
    const footerCta = document.querySelector('.footer-cta');
    if (footerCta) {
        footerCta.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Hero CTA
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact-form');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Three.js Hero Background
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create floating particles
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;
        
        // Orange to blue gradient colors
        const mixFactor = Math.random();
        colors[i] = 1.0 * mixFactor + 0.4 * (1 - mixFactor); // R
        colors[i + 1] = 0.42 * mixFactor + 0.5 * (1 - mixFactor); // G
        colors[i + 2] = 0.21 * mixFactor + 0.92 * (1 - mixFactor); // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 20;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        
        // Mouse interaction
        particles.rotation.x += mouseY * 0.00005;
        particles.rotation.y += mouseX * 0.00005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Three.js Geometric Shapes
function initGeometricShapes() {
    const canvas = document.getElementById('geometric-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create floating geometric shapes
    const shapes = [];
    
    // Translucent Cube
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-3, 2, 0);
    shapes.push(cube);
    scene.add(cube);
    
    // Pyramid
    const pyramidGeometry = new THREE.ConeGeometry(2, 4, 4);
    const pyramidMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff6b35,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    pyramid.position.set(3, -1, 0);
    shapes.push(pyramid);
    scene.add(pyramid);
    
    // Dodecahedron
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(2);
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xf093fb,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedron.position.set(0, 0, -2);
    shapes.push(dodecahedron);
    scene.add(dodecahedron);
    
    camera.position.z = 10;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.003 * (i + 1) * 0.5;
            shape.rotation.y += 0.005 * (i + 1) * 0.5;
            shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.015;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Three.js Brain Visualization
function initBrainVisualization() {
    const canvas = document.getElementById('brain-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create brain-like structure with connected nodes
    const nodes = [];
    const connections = [];
    const nodeCount = 60;
    
    // Create nodes in brain shape
    for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.15, 12, 12);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(`hsl(${240 + Math.random() * 60}, 70%, 60%)`),
            transparent: true,
            opacity: 0.9
        });
        
        const node = new THREE.Mesh(geometry, material);
        
        // Position nodes in brain-like shape
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 2.5 + Math.random() * 1.5;
        
        node.position.x = radius * Math.sin(phi) * Math.cos(theta);
        node.position.y = radius * Math.sin(phi) * Math.sin(theta) * 0.7; // Flatten Y
        node.position.z = radius * Math.cos(phi);
        
        nodes.push(node);
        scene.add(node);
    }
    
    // Create connections
    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            const distance = nodes[i].position.distanceTo(nodes[j].position);
            if (distance < 2 && Math.random() > 0.8) {
                const material = new THREE.LineBasicMaterial({
                    color: 0x667eea,
                    transparent: true,
                    opacity: 0.3
                });
                
                const points = [];
                points.push(nodes[i].position);
                points.push(nodes[j].position);
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const connection = new THREE.Line(geometry, material);
                connections.push({ line: connection, opacity: 0.3 });
                scene.add(connection);
            }
        }
    }
    
    camera.position.z = 10;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire brain
        scene.rotation.y += 0.002;
        
        // Pulse nodes
        nodes.forEach((node, i) => {
            const scale = 1 + Math.sin(Date.now() * 0.002 + i * 0.2) * 0.3;
            node.scale.set(scale, scale, scale);
            node.material.opacity = 0.7 + Math.sin(Date.now() * 0.003 + i * 0.2) * 0.3;
        });
        
        // Animate connection opacity
        connections.forEach((connection, i) => {
            connection.line.material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + i * 0.1) * 0.2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// GSAP Scroll Animations
function initScrollAnimations() {
    // Hero section animation
    gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-cta', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        delay: 1,
        ease: 'back.out(1.7)'
    });
    
    // Why cards animation
    gsap.utils.toArray('.why-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Vision text animation
    gsap.from('.vision-text', {
        scrollTrigger: {
            trigger: '.vision-text',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    // Capability cards animation
    gsap.utils.toArray('.capability-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Service cards animation with stagger
    ScrollTrigger.batch('.service-card', {
        onEnter: batch => gsap.from(batch, {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out'
        }),
        start: 'top 85%'
    });
    
    // Testimonial cards animation
    ScrollTrigger.batch('.testimonial-card', {
        onEnter: batch => gsap.from(batch, {
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        }),
        start: 'top 85%'
    });
    
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
    }
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .why-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.03,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});