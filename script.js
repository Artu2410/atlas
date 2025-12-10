// Variables globales
let currentSlide = 1;
let breathingInterval = null;
const breathingTime = 2500; // 2.5s para inhalar/exhalar

// --- FUNCIONES DE NAVEGACIÓN ---

/** Navega a una página diferente */
function goToPage(page) {
    window.location.href = page;
}

/** Muestra una diapositiva específica */
function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        currentSlide = slideNumber;
        
        // Lógica específica al entrar en ciertas diapositivas
        if (slideNumber === 5) {
            startBreathingExercise();
        } else {
            stopBreathingExercise();
        }
    }
}

/** Navega a la siguiente diapositiva */
function nextSlide() {
    showSlide(currentSlide + 1);
}

// --- MÓDULO 1: RESPIRACIÓN ---

/** Inicia la animación del círculo de respiración */
function startBreathingExercise() {
    const circle = document.getElementById('breathing-circle');
    if (!circle) return;

    // Evita crear más de un intervalo si ya está corriendo
    if (breathingInterval) return;

    let isGrowing = true;

    const animateBreathing = () => {
        if (isGrowing) {
            circle.style.transform = 'scale(1.5)';
            const instruction = document.getElementById('breathing-instruction');
            if (instruction) instruction.textContent = "INHALÁ (Crece)";
        } else {
            circle.style.transform = 'scale(1.0)';
            const instruction = document.getElementById('breathing-instruction');
            if (instruction) instruction.textContent = "EXHALÁ (Disminuye)";
        }
        isGrowing = !isGrowing;
    };

    // Ejecuta la animación por primera vez y luego establece el intervalo
    animateBreathing();
    breathingInterval = setInterval(animateBreathing, breathingTime);
}

/** Detiene la animación del círculo de respiración */
function stopBreathingExercise() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }
}

// --- MÓDULO 2: TONO MUSCULAR ---

/** Abre la mini ventanita de registro corporal */
function openBodyModal(zone) {
    const modal = document.getElementById('body-modal');
    const modalTitle = document.getElementById('modal-title');
    
    if (modalTitle) {
        modalTitle.textContent = `¿Qué sentiste en ${zone}?`;
    }
    if (modal) {
        modal.classList.add('active');
    }
}

/** Cierra la mini ventanita */
function closeModal() {
    const modal = document.getElementById('body-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// --- POP-UPS DE FISIOLOGÍA ---

/** Abre el pop-up con información fisiológica */
function openFysiologyModal(moduleType) {
    const modal = document.getElementById('body-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    let title = '';
    let content = '';

    if (moduleType === 'breathing') {
        title = '🟦 Fisiología: Respiración';
        content = `
            <div class="text-left">
                <p class="mb-4 font-semibold text-lg">La respiración modula tu sistema nervioso autónomo:</p>
                <ul class="space-y-3 mb-6 text-gray-700">
                    <li><strong>Inhalar →</strong> activa el sistema simpático (alerta).</li>
                    <li><strong>Exhalar →</strong> activa el parasimpático (calma).</li>
                    <li><strong>Respirar diferente</strong> produce estados distintos.</li>
                </ul>
                <button onclick="closeModal()" class="w-full btn-primary" style="background-color: var(--color-celeste);">Entendido</button>
            </div>
        `;
    } else if (moduleType === 'muscle-tone') {
        title = '🟧 Fisiología: Tono Muscular';
        content = `
            <div class="text-left">
                <p class="mb-4 font-semibold text-lg">El tono muscular se reorganiza con tus emociones:</p>
                <ul class="space-y-3 mb-6 text-gray-700">
                    <li><strong>Contracción sostenida</strong> aumenta la respuesta al estrés.</li>
                    <li><strong>Liberarlo</strong> disminuye la carga del sistema nervioso.</li>
                    <li><strong>El reconocimiento</strong> es el primer paso hacia el cambio.</li>
                </ul>
                <button onclick="closeModal()" class="w-full btn-primary" style="background-color: var(--color-lila);">Entendido</button>
            </div>
        `;
    } else if (moduleType === 'proprioception') {
        title = '🟪 Fisiología: Propiocepción';
        content = `
            <div class="text-left">
                <p class="mb-4 font-semibold text-lg">La propiocepción regula tu eje corporal y disminuye la ansiedad:</p>
                <ul class="space-y-3 mb-6 text-gray-700">
                    <li><strong>Darle señales claras</strong> al sistema nervioso mejora la estabilidad interna.</li>
                    <li><strong>Conocer tu posición</strong> en el espacio es poder.</li>
                    <li><strong>Aumenta el sentido de seguridad</strong> y presencia.</li>
                </ul>
                <button onclick="closeModal()" class="w-full btn-primary" style="background-color: var(--color-ocre);">Entendido</button>
            </div>
        `;
    }

    if (modalTitle) modalTitle.innerHTML = title;
    if (modalContent) modalContent.innerHTML = content;
    if (modal) modal.classList.add('active');
}

// --- PROPIOCEPCIÓN ---

/** Muestra la devolución kinésica del minijuego */
function showProprioceptionFeedback(choice) {
    let feedback = '';
    let emoji = '';
    
    if (choice === 'Derecho') {
        feedback = '¡Atención plena! Sentiste la tensión, la temperatura y la posición de tu brazo derecho sin necesidad de verlo. Esa es tu propiocepción en acción.';
        emoji = '✨';
    } else if (choice === 'Izquierdo') {
        feedback = 'Interesante. Tu sensación corporal puede estar influenciada por tu lado dominante o la posición actual. ¡Es solo un registro!';
        emoji = '🧠';
    } else {
        feedback = '¡Perfecto! Reconocer la duda es parte de la percepción corporal. La propiocepción no es un GPS, es una sensación en constante ajuste.';
        emoji = '🔍';
    }

    const modal = document.getElementById('body-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (modalTitle) modalTitle.innerHTML = `${emoji} Devolución Kinésica`;
    if (modalContent) modalContent.innerHTML = `<p class="text-lg">${feedback}</p><button onclick="closeModal(); goToPage('modulo3-reflexion.html')" class="mt-4 btn-primary">Continuar</button>`;
    
    if (modal) modal.classList.add('active');
}

// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la primera diapositiva
    const firstSlide = document.querySelector('.slide');
    if (firstSlide) {
        showSlide(1);
    }

    // Configurar manejadores de eventos para botones con data-slide
    document.querySelectorAll('[data-slide]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slideTarget = e.target.getAttribute('data-slide');
            if (slideTarget) {
                showSlide(parseInt(slideTarget, 10));
            }
        });
    });

    // Cerrar modal al hacer clic fuera
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Si la página actual contiene el círculo de respiración, iniciamos el ejercicio automáticamente
    if (document.getElementById('breathing-circle')) {
        // pequeña demora para asegurar que elementos estén renderizados
        setTimeout(() => {
            startBreathingExercise();
        }, 100);
    }
});
