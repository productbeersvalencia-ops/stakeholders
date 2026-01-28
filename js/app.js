/**
 * Aplicación principal del juego Stakeholder Influence
 * Gestiona la UI, navegación e interacciones
 */

// ===== CONFIGURACIÓN =====
const STAFF_PASSWORD = 'Birrito'; // Contraseña para acceder al panel Staff

// ===== SISTEMA DE PRECARGA DE IMÁGENES =====
const imageCache = new Map();
let nextCardToPreload = null;

function preloadImage(url) {
    if (!url || imageCache.has(url)) return Promise.resolve(imageCache.get(url));

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(url, img);
            resolve(img);
        };
        img.onerror = reject;
        img.src = url;
    });
}

function preloadNextCard() {
    const remainingCards = gameState.squadDeck;
    if (remainingCards.length > 0) {
        const nextCard = remainingCards[0];
        if (nextCard.image) {
            preloadImage(nextCard.image).catch(() => {
                // Si falla, no hacemos nada, usaremos el fallback
            });
        }
    }
}

// ===== ELEMENTOS DEL DOM =====
const elements = {
    // Pantallas
    homeScreen: document.getElementById('home-screen'),
    squadScreen: document.getElementById('squad-screen'),
    staffScreen: document.getElementById('staff-screen'),

    // Pantalla inicio
    btnDrawCard: document.getElementById('btn-draw-card'),
    btnStaffAccess: document.getElementById('btn-staff-access'),

    // Modal contraseña Staff
    staffPasswordModal: document.getElementById('staff-password-modal'),
    staffPassword: document.getElementById('staff-password'),
    passwordError: document.getElementById('password-error'),
    btnStaffLogin: document.getElementById('btn-staff-login'),

    // Vista Squad
    squadDrawState: document.getElementById('squad-draw-state'),
    squadCardState: document.getElementById('squad-card-state'),
    cardDeckSquad: document.getElementById('card-deck-squad'),
    squadCard: document.getElementById('squad-card'),
    squadCardImage: document.getElementById('squad-card-image'),
    squadCardFallback: document.getElementById('squad-card-fallback'),
    btnChangeCard: document.getElementById('btn-change-card'),
    btnBackHomeSquad: document.getElementById('btn-back-home-squad'),

    // Vista Staff
    btnBackHomeStaff: document.getElementById('btn-back-home-staff'),
    scoreNumber: document.getElementById('score-number'),
    scoreFill: document.getElementById('score-fill'),
    scoreMarkers: document.getElementById('score-markers'),
    victoryMessage: document.getElementById('victory-message'),
    roundNumber: document.getElementById('round-number'),
    btnRoundMinus: document.getElementById('btn-round-minus'),
    btnRoundPlus: document.getElementById('btn-round-plus'),
    btnResetGame: document.getElementById('btn-reset-game'),
    scorePanel: document.getElementById('score-panel'),
    roundPanel: document.getElementById('round-panel'),
    stakeholderCards: document.getElementById('stakeholder-cards'),
    activeStakeholderPanel: document.getElementById('active-stakeholder-panel'),
    activeStakeholderIcon: document.getElementById('active-stakeholder-icon'),
    activeStakeholderName: document.getElementById('active-stakeholder-name'),
    activeStakeholderDescription: document.getElementById('active-stakeholder-description'),
    activeStakeholderTraits: document.getElementById('active-stakeholder-traits'),
    btnChangeStakeholder: document.getElementById('btn-change-stakeholder'),
    quickActions: document.getElementById('quick-actions'),
    btnRandomBehavior: document.getElementById('btn-random-behavior'),
    btnRandomTwist: document.getElementById('btn-random-twist'),
    currentBehavior: document.getElementById('current-behavior'),
    currentBehaviorName: document.getElementById('current-behavior-name'),
    currentBehaviorDescription: document.getElementById('current-behavior-description'),

    // Modal de carta
    cardModal: document.getElementById('card-modal'),
    modalCard: document.getElementById('modal-card'),
    modalCardImage: document.getElementById('modal-card-image'),
    modalCardFallback: document.getElementById('modal-card-fallback'),
    modalCardContent: document.querySelector('#modal-card .card-content'),
    modalCardType: document.getElementById('modal-card-type'),
    modalCardName: document.getElementById('modal-card-name'),
    modalCardDescription: document.getElementById('modal-card-description'),
    modalCardTraits: document.getElementById('modal-card-traits'),
    modalCardEffect: document.getElementById('modal-card-effect'),
    modalCardEffectText: document.getElementById('modal-card-effect-text'),
    modalCardPoints: document.getElementById('modal-card-points'),
    modalCardIdeal: document.getElementById('modal-card-ideal'),
    modalCardIdealText: document.getElementById('modal-card-ideal-text'),
    btnCloseCardModal: document.getElementById('btn-close-card-modal'),

    // Modal reset
    resetModal: document.getElementById('reset-modal'),
    btnConfirmReset: document.getElementById('btn-confirm-reset'),
    btnCancelReset: document.getElementById('btn-cancel-reset')
};

// ===== NAVEGACIÓN ENTRE PANTALLAS =====

function showScreen(screenId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la pantalla solicitada
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function showHomeScreen() {
    showScreen('home-screen');
}

function showSquadScreen() {
    showScreen('squad-screen');
    showSquadDrawState();
}

function showStaffScreen() {
    showScreen('staff-screen');
    // Limpiar stakeholder al entrar para que siempre muestre el carrusel
    gameState.clearActiveStakeholder();
    updateStaffUI();
}

// ===== ESTADOS DE LA VISTA SQUAD =====

function showSquadDrawState() {
    elements.squadDrawState.classList.add('active');
    elements.squadCardState.classList.remove('active');
}

function showSquadCardState() {
    elements.squadDrawState.classList.remove('active');
    elements.squadCardState.classList.add('active');
}

// ===== MODALES =====

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ===== MODAL DE CARTA =====

function showCardModal(card, type) {
    // Configurar el tipo de carta
    elements.modalCard.className = 'card card-type-' + type;

    // Imagen
    if (card.image) {
        elements.modalCardImage.src = card.image;
        elements.modalCardImage.alt = card.name;
        elements.modalCardImage.style.display = 'block';
        elements.modalCardImage.onerror = () => {
            elements.modalCardImage.style.display = 'none';
            elements.modalCardFallback.style.display = 'flex';
            elements.modalCardFallback.querySelector('.fallback-icon').textContent = card.icon || '🃏';
        };
        elements.modalCardFallback.style.display = 'none';
    } else {
        elements.modalCardImage.style.display = 'none';
        elements.modalCardFallback.style.display = 'flex';
        elements.modalCardFallback.querySelector('.fallback-icon').textContent = card.icon || '🃏';
    }

    // Tipo badge
    const typeLabels = {
        'stakeholder': 'Stakeholder',
        'behavior': 'Comportamiento',
        'strategy': 'Estrategia',
        'twist': 'Giro'
    };
    elements.modalCardType.textContent = typeLabels[type] || type;

    // Nombre y descripción
    elements.modalCardName.textContent = card.name;
    elements.modalCardDescription.textContent = card.description || '';

    // Traits (solo stakeholders)
    if (card.traits) {
        elements.modalCardTraits.textContent = card.traits;
        elements.modalCardTraits.classList.remove('hidden');
    } else {
        elements.modalCardTraits.classList.add('hidden');
    }

    // Efecto y puntos (solo giros)
    if (card.effect !== undefined) {
        elements.modalCardEffectText.textContent = card.effect;
        elements.modalCardPoints.textContent = (card.points > 0 ? '+' : '') + card.points + ' pts';
        elements.modalCardPoints.className = 'effect-points ' + (card.points > 0 ? 'positive' : card.points < 0 ? 'negative' : '');
        elements.modalCardEffect.classList.remove('hidden');
    } else {
        elements.modalCardEffect.classList.add('hidden');
    }

    // Ideal para (solo estrategias)
    if (card.idealFor && card.idealFor.length > 0) {
        elements.modalCardIdealText.textContent = getIdealForText(card.idealFor);
        elements.modalCardIdeal.classList.remove('hidden');
    } else {
        elements.modalCardIdeal.classList.add('hidden');
    }

    showModal('card-modal');
}

// ===== ACCESO STAFF =====

function showStaffPasswordModal() {
    elements.staffPassword.value = '';
    elements.passwordError.classList.add('hidden');
    showModal('staff-password-modal');
    elements.staffPassword.focus();
}

function checkStaffPassword() {
    const password = elements.staffPassword.value;
    if (password === STAFF_PASSWORD) {
        hideModal('staff-password-modal');
        showStaffScreen();
    } else {
        elements.passwordError.classList.remove('hidden');
        elements.staffPassword.classList.add('shake');
        setTimeout(() => {
            elements.staffPassword.classList.remove('shake');
        }, 300);
    }
}

// ===== LÓGICA SQUAD =====

function drawSquadCard() {
    const card = gameState.drawStrategy();
    if (card) {
        // Asegurar que la carta empieza en reverso (sin flip)
        elements.squadCard.classList.remove('flipped');

        // Mostrar el estado de carta (con el reverso visible)
        showSquadCardState();

        // Cargar imagen y hacer flip cuando esté lista
        displaySquadCard(card, false);

        // Precargar la siguiente carta inmediatamente después de sacar esta
        preloadNextCard();
    }
}

function changeSquadCard() {
    const card = gameState.changeSquadCard();
    if (card) {
        // NO quitar flip aquí - displaySquadCard lo manejará con transición suave
        displaySquadCard(card, true);
    }
}

function displaySquadCard(card, keepFlipped = false) {
    const wasFlipped = elements.squadCard.classList.contains('flipped');

    // Función auxiliar para mostrar imagen y hacer flip
    const showImageAndFlip = () => {
        elements.squadCardFallback.classList.remove('skeleton-loading');
        elements.squadCardFallback.classList.add('hidden');
        elements.squadCardImage.classList.remove('hidden');

        // Esperar 100ms para asegurar que la imagen está pintada en TODOS los dispositivos
        setTimeout(() => {
            elements.squadCardImage.classList.add('loaded');
            elements.squadCard.classList.add('flipped');
        }, 100);

        // Precargar la siguiente carta
        preloadNextCard();
    };

    // Función auxiliar para mostrar fallback y hacer flip
    const showFallbackAndFlip = (iconText) => {
        elements.squadCardFallback.classList.remove('skeleton-loading');
        elements.squadCardFallback.classList.remove('hidden');
        elements.squadCardImage.classList.add('hidden');
        elements.squadCardImage.classList.remove('loaded');
        const fallbackIcon = elements.squadCardFallback.querySelector('.fallback-icon');
        if (fallbackIcon) fallbackIcon.textContent = iconText;

        // Hacer flip al frente con el fallback
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                elements.squadCard.classList.add('flipped');
            });
        });
    };

    // Si estamos cambiando de carta (keepFlipped=true desde changeSquadCard)
    if (keepFlipped && wasFlipped) {
        // Paso 1: Flip al reverso primero
        elements.squadCard.classList.remove('flipped');

        // Paso 2: Esperar 300ms (mitad de animación CSS 0.6s) y cargar nueva imagen
        setTimeout(() => {
            loadAndPrepareImage(card, showImageAndFlip, showFallbackAndFlip);
        }, 300);
    } else {
        // Primera vez mostrando carta o no hay flip previo
        if (!keepFlipped) {
            elements.squadCard.classList.remove('flipped');
        }
        loadAndPrepareImage(card, showImageAndFlip, showFallbackAndFlip);
    }
}

// Función auxiliar para cargar y preparar la imagen
function loadAndPrepareImage(card, onSuccess, onFallback) {
    if (!card.image) {
        // No hay imagen, mostrar fallback directamente
        onFallback(card.icon || '💡');
        return;
    }

    // Preparar skeleton mientras carga - mostrar cerveza SVG
    elements.squadCardImage.classList.add('hidden');
    elements.squadCardImage.classList.remove('loaded');
    elements.squadCardFallback.classList.remove('hidden');
    elements.squadCardFallback.classList.add('skeleton-loading');
    const icon = elements.squadCardFallback.querySelector('.fallback-icon');
    if (icon) {
        // Usar el mismo SVG de cerveza del reverso
        icon.innerHTML = '<img src="./img/jk.svg" alt="Cargando" style="width: 4rem; height: 4rem; filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.5));">';
    }

    // Verificar si la imagen está en cache
    if (imageCache.has(card.image)) {
        const cachedImg = imageCache.get(card.image);

        // Si la imagen está completa y lista, usarla directamente
        if (cachedImg.complete && cachedImg.naturalWidth > 0) {
            elements.squadCardImage.src = cachedImg.src;
            elements.squadCardImage.alt = 'Carta de estrategia';

            // Usar decode() para asegurar que la imagen está lista para pintar (fix iOS)
            if (elements.squadCardImage.decode) {
                elements.squadCardImage.decode()
                    .then(() => onSuccess())
                    .catch(() => onSuccess()); // Si falla decode, intentar mostrar igual
            } else {
                // Fallback para navegadores sin decode()
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => onSuccess());
                });
            }
        } else {
            // Por si acaso, esperar a que termine de cargar
            elements.squadCardImage.onload = () => decodeAndShow(onSuccess);
            elements.squadCardImage.onerror = () => {
                console.warn('Error cargando imagen desde cache:', card.image);
                onFallback(card.icon || '💡');
            };
            elements.squadCardImage.src = cachedImg.src;
            elements.squadCardImage.alt = 'Carta de estrategia';
        }
    } else {
        // Imagen no está en cache, cargar normalmente
        elements.squadCardImage.onload = () => decodeAndShow(onSuccess);
        elements.squadCardImage.onerror = () => {
            console.warn('Error cargando imagen:', card.image);
            onFallback(card.icon || '💡');
        };
        elements.squadCardImage.src = card.image;
        elements.squadCardImage.alt = 'Carta de estrategia';
    }
}

// Fix para iOS: usar decode() para asegurar que la imagen está lista para pintar
function decodeAndShow(callback) {
    if (elements.squadCardImage.decode) {
        elements.squadCardImage.decode()
            .then(() => callback())
            .catch(() => callback()); // Si falla decode, intentar mostrar igual
    } else {
        // Fallback para navegadores sin decode()
        requestAnimationFrame(() => {
            requestAnimationFrame(() => callback());
        });
    }
}

function newSquadRound() {
    gameState.resetSquadCards();
    showSquadDrawState();
}

// ===== LÓGICA STAFF =====

function updateStaffUI() {
    updateScoreUI();
    updateRoundUI();
    updateStakeholderUI();
}

function updateScoreUI() {
    const points = gameState.influencePoints;
    elements.scoreNumber.textContent = points;
    elements.scoreFill.style.width = (points * 10) + '%';

    if (gameState.isVictory()) {
        elements.victoryMessage.classList.remove('hidden');
    } else {
        elements.victoryMessage.classList.add('hidden');
    }
}

function updateRoundUI() {
    elements.roundNumber.textContent = gameState.currentRound;
}

function updateStakeholderUI() {
    const stakeholderSection = document.querySelector('.stakeholder-section');

    // Si hay un stakeholder activo, ocultar la sección de selección
    if (gameState.activeStakeholder) {
        stakeholderSection.classList.add('hidden');

        const stakeholder = CARDS_DATA.stakeholders.find(s => s.id === gameState.activeStakeholder);
        if (stakeholder) {
            elements.activeStakeholderIcon.textContent = stakeholder.icon;
            elements.activeStakeholderName.textContent = stakeholder.name;
            elements.activeStakeholderDescription.textContent = stakeholder.description;
            elements.activeStakeholderTraits.textContent = stakeholder.traits;

            // Mostrar todo el panel de juego
            elements.activeStakeholderPanel.classList.remove('hidden');
            elements.quickActions.classList.remove('hidden');
            elements.scorePanel.classList.remove('hidden');
            elements.roundPanel.classList.remove('hidden');
        }
    } else {
        // Mostrar la sección de selección cuando no hay stakeholder activo
        stakeholderSection.classList.remove('hidden');

        // Generar tarjetas de stakeholders
        elements.stakeholderCards.innerHTML = '';
        CARDS_DATA.stakeholders.forEach(stakeholder => {
            const card = document.createElement('div');
            card.className = 'stakeholder-card-mini';

            // Usar imagen si está disponible
            if (stakeholder.image) {
                card.innerHTML = `
                    <img src="${stakeholder.image}" alt="${stakeholder.name}" class="stakeholder-card-image">
                    <span class="mini-name">${stakeholder.name}</span>
                `;
            } else {
                card.innerHTML = `
                    <span class="mini-icon">${stakeholder.icon}</span>
                    <span class="mini-name">${stakeholder.name}</span>
                `;
            }

            card.addEventListener('click', () => selectStakeholder(stakeholder.id));
            elements.stakeholderCards.appendChild(card);
        });

        // Ocultar todo cuando no hay stakeholder seleccionado
        elements.activeStakeholderPanel.classList.add('hidden');
        elements.quickActions.classList.add('hidden');
        elements.currentBehavior.classList.add('hidden');
        elements.scorePanel.classList.add('hidden');
        elements.roundPanel.classList.add('hidden');
    }
}

function selectBehavior(behavior) {
    elements.currentBehaviorName.textContent = behavior.name;
    elements.currentBehaviorDescription.textContent = behavior.description;
    elements.currentBehavior.classList.remove('hidden');
}

function selectRandomBehavior() {
    if (!gameState.activeStakeholder) return;

    const behaviors = CARDS_DATA.behaviors[gameState.activeStakeholder];
    if (!behaviors || behaviors.length === 0) return;

    const randomIndex = Math.floor(Math.random() * behaviors.length);
    const randomBehavior = behaviors[randomIndex];
    selectBehavior(randomBehavior);
}

function applyRandomTwist() {
    const twists = CARDS_DATA.twists;
    if (!twists || twists.length === 0) return;

    const randomIndex = Math.floor(Math.random() * twists.length);
    const randomTwist = twists[randomIndex];
    applyTwist(randomTwist);
}


function applyTwist(twist) {
    // Aplicar puntos
    if (twist.points !== 0) {
        gameState.addPoints(twist.points);
        updateScoreUI();
    }

    // Mostrar notificación
    showTwistNotification(twist);
}

function showTwistNotification(twist) {
    // Usar el modal de carta para mostrar el giro inesperado
    showTwistModal(twist);
}

function showTwistModal(twist) {
    // Mostrar imagen si está disponible
    if (twist.image) {
        elements.modalCardImage.src = twist.image;
        elements.modalCardImage.alt = twist.name;
        elements.modalCardImage.classList.remove('hidden');
        elements.modalCardFallback.classList.add('hidden');
    } else {
        // Fallback al icono
        elements.modalCardImage.classList.add('hidden');
        elements.modalCardFallback.classList.remove('hidden');
        elements.modalCardFallback.querySelector('.fallback-icon').textContent = twist.icon;
    }

    // Ocultar todo el contenedor de contenido para que solo se vea la imagen
    if (elements.modalCardContent) {
        elements.modalCardContent.classList.add('hidden');
    }

    // Mostrar el modal
    elements.cardModal.classList.add('active');
}

function selectStakeholder(stakeholderId) {
    gameState.setActiveStakeholder(stakeholderId);
    updateStakeholderUI();
    // Ocultar comportamiento cuando se cambia de stakeholder
    elements.currentBehavior.classList.add('hidden');
}

function changeStakeholder() {
    gameState.clearActiveStakeholder();
    updateStakeholderUI();
    // Hacer scroll hacia arriba para ver los stakeholders
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function addScore(points) {
    gameState.addPoints(points);
    updateScoreUI();
}

function showResetModal() {
    showModal('reset-modal');
}

function confirmReset() {
    gameState.reset();
    hideModal('reset-modal');
    updateStaffUI();
}

// ===== MARCADORES DE PUNTUACIÓN =====

function createScoreMarkers() {
    elements.scoreMarkers.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const marker = document.createElement('div');
        marker.className = 'score-marker';
        elements.scoreMarkers.appendChild(marker);
    }
}

// ===== EVENT LISTENERS =====

function initEventListeners() {
    // Pantalla inicio
    elements.btnDrawCard.addEventListener('click', () => {
        showSquadScreen();
        // Pequeño delay para la animación
        setTimeout(drawSquadCard, 100);
    });

    elements.btnStaffAccess.addEventListener('click', showStaffPasswordModal);

    // Modal contraseña
    elements.btnStaffLogin.addEventListener('click', checkStaffPassword);
    elements.staffPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkStaffPassword();
    });

    // Vista Squad
    elements.cardDeckSquad.addEventListener('click', drawSquadCard);
    elements.btnChangeCard.addEventListener('click', changeSquadCard);
    elements.btnBackHomeSquad.addEventListener('click', showHomeScreen);

    // Flip de carta con click/tap - solo si la imagen está cargada
    elements.squadCard.addEventListener('click', () => {
        // Solo permitir flip si la imagen está visible (cargada correctamente)
        const imageVisible = !elements.squadCardImage.classList.contains('hidden');
        const fallbackVisible = !elements.squadCardFallback.classList.contains('hidden');
        const isLoading = elements.squadCardFallback.classList.contains('skeleton-loading');

        // No permitir flip si está cargando
        if (isLoading) return;

        // Permitir flip solo si hay contenido válido (imagen o fallback sin skeleton)
        if (imageVisible || (fallbackVisible && !isLoading)) {
            elements.squadCard.classList.toggle('flipped');
        }
    });

    // Vista Staff
    elements.btnBackHomeStaff.addEventListener('click', () => {
        // Limpiar stakeholder al salir del Staff
        gameState.clearActiveStakeholder();
        showHomeScreen();
    });
    elements.btnChangeStakeholder.addEventListener('click', changeStakeholder);
    elements.btnRandomBehavior.addEventListener('click', selectRandomBehavior);
    elements.btnRandomTwist.addEventListener('click', applyRandomTwist);

    // Botones de puntuación
    document.querySelectorAll('[data-points]').forEach(btn => {
        btn.addEventListener('click', () => {
            const points = parseInt(btn.dataset.points);
            addScore(points);
        });
    });

    // Rondas
    elements.btnRoundMinus.addEventListener('click', () => {
        gameState.prevRound();
        updateRoundUI();
    });

    elements.btnRoundPlus.addEventListener('click', () => {
        gameState.nextRound();
        updateRoundUI();
    });

    // Reset
    elements.btnResetGame.addEventListener('click', showResetModal);
    elements.btnConfirmReset.addEventListener('click', confirmReset);

    // Modal de carta
    elements.btnCloseCardModal.addEventListener('click', () => hideModal('card-modal'));

    // Cerrar modales con botón X o click fuera
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            hideAllModals();
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideAllModals();
            }
        });
    });

    // Cerrar modales con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });

    // Escuchar cambios en el estado del juego
    gameState.onChange(() => {
        updateStaffUI();
    });
}

// ===== INICIALIZACIÓN =====

function init() {
    createScoreMarkers();
    initEventListeners();
    updateStaffUI();

    // Mostrar pantalla inicial
    showHomeScreen();

    console.log('Stakeholder Influence iniciado correctamente');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
