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

// Three.js Hero Background - Minimalistic particles
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create subtle floating particles
    const geometry = new THREE.BufferGeometry();
    const count = 500; // Reduced for cleaner look
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;
        
        // Subtle purple-blue gradient
        colors[i] = 0.4 + Math.random() * 0.2; // R
        colors[i + 1] = 0.5 + Math.random() * 0.2; // G
        colors[i + 2] = 0.92 + Math.random() * 0.08; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.08, // Smaller, more elegant
        vertexColors: true,
        transparent: true,
        opacity: 0.3, // More subtle
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
        
        particles.rotation.x += 0.0002;
        particles.rotation.y += 0.0003;
        
        // Subtle mouse interaction
        particles.rotation.x += mouseY * 0.00002;
        particles.rotation.y += mouseX * 0.00002;
        
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

// Three.js Geometric Shapes - Minimalistic
function initGeometricShapes() {
    const canvas = document.getElementById('geometric-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create minimal geometric shapes
    const shapes = [];
    
    // Elegant wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(3, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    shapes.push(sphere);
    scene.add(sphere);
    
    // Subtle torus
    const torusGeometry = new THREE.TorusGeometry(2.5, 0.5, 8, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x764ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, 0);
    shapes.push(torus);
    scene.add(torus);
    
    camera.position.z = 10;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.001 * (i + 1);
            shape.rotation.y += 0.0015 * (i + 1);
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

// Three.js Brain Visualization - Elegant Network
function initBrainVisualization() {
    const canvas = document.getElementById('brain-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create minimal network structure
    const nodes = [];
    const connections = [];
    const nodeCount = 30; // Reduced for cleaner look
    
    // Create nodes in elegant pattern
    for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.08, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.4
        });
        
        const node = new THREE.Mesh(geometry, material);
        
        // Position nodes in spherical pattern
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 3;
        
        node.position.x = radius * Math.sin(phi) * Math.cos(theta);
        node.position.y = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
        node.position.z = radius * Math.cos(phi);
        
        nodes.push(node);
        scene.add(node);
    }
    
    // Create subtle connections
    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            const distance = nodes[i].position.distanceTo(nodes[j].position);
            if (distance < 2 && Math.random() > 0.85) {
                const material = new THREE.LineBasicMaterial({
                    color: 0x667eea,
                    transparent: true,
                    opacity: 0.08
                });
                
                const points = [];
                points.push(nodes[i].position);
                points.push(nodes[j].position);
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const connection = new THREE.Line(geometry, material);
                connections.push({ line: connection, opacity: 0.08 });
                scene.add(connection);
            }
        }
    }
    
    camera.position.z = 10;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle rotation
        scene.rotation.y += 0.001;
        
        // Subtle pulse
        nodes.forEach((node, i) => {
            const scale = 1 + Math.sin(Date.now() * 0.001 + i * 0.2) * 0.1;
            node.scale.set(scale, scale, scale);
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