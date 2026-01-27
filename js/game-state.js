/**
 * Gestión del estado del juego Stakeholder Influence
 * Usa localStorage para persistencia entre recargas
 */

const STORAGE_KEY = 'stakeholder-game-state';

const gameState = {
    // Estado del juego
    influencePoints: 0,        // 0-10 puntos de influencia
    currentRound: 1,           // Ronda actual
    activeStakeholder: null,   // ID del stakeholder que interpreta el Staff

    // Historial de cartas robadas (para evitar repeticiones)
    drawnBehaviors: [],        // IDs de comportamientos ya usados
    drawnTwists: [],           // IDs de giros ya usados
    drawnStrategies: [],       // IDs de estrategias ya robadas por el Squad actual
    currentSquadCard: null,    // Carta actual del Squad

    // ===== MÉTODOS DE PUNTUACIÓN =====

    addPoints(n) {
        this.influencePoints = Math.min(10, Math.max(0, this.influencePoints + n));
        this.save();
        this.notifyChange();
        return this.influencePoints;
    },

    setPoints(n) {
        this.influencePoints = Math.min(10, Math.max(0, n));
        this.save();
        this.notifyChange();
        return this.influencePoints;
    },

    isVictory() {
        return this.influencePoints >= 10;
    },

    // ===== MÉTODOS DE RONDAS =====

    nextRound() {
        this.currentRound++;
        this.save();
        this.notifyChange();
        return this.currentRound;
    },

    prevRound() {
        this.currentRound = Math.max(1, this.currentRound - 1);
        this.save();
        this.notifyChange();
        return this.currentRound;
    },

    setRound(n) {
        this.currentRound = Math.max(1, n);
        this.save();
        this.notifyChange();
        return this.currentRound;
    },

    // ===== MÉTODOS DE STAKEHOLDER =====

    setActiveStakeholder(stakeholderId) {
        this.activeStakeholder = stakeholderId;
        // Limpiar comportamientos robados al cambiar de stakeholder
        this.drawnBehaviors = [];
        this.save();
        this.notifyChange();
    },

    clearActiveStakeholder() {
        this.activeStakeholder = null;
        this.drawnBehaviors = [];
        this.save();
        this.notifyChange();
    },

    // ===== MÉTODOS DE ROBO DE CARTAS =====

    /**
     * Roba una carta de comportamiento aleatoria del stakeholder activo
     * @returns {Object|null} La carta robada o null si no quedan cartas
     */
    drawBehavior() {
        if (!this.activeStakeholder) return null;

        const behaviors = CARDS_DATA.behaviors[this.activeStakeholder];
        if (!behaviors) return null;

        // Filtrar las que ya se han robado
        const available = behaviors.filter(b => !this.drawnBehaviors.includes(b.id));

        if (available.length === 0) {
            // Si no quedan, reiniciar el mazo
            this.drawnBehaviors = [];
            return this.drawBehavior();
        }

        // Seleccionar una aleatoria
        const card = available[Math.floor(Math.random() * available.length)];
        this.drawnBehaviors.push(card.id);
        this.save();

        return card;
    },

    /**
     * Roba una carta de giro inesperado aleatoria
     * @returns {Object|null} La carta robada o null si no quedan cartas
     */
    drawTwist() {
        const twists = CARDS_DATA.twists;

        // Filtrar las que ya se han robado
        const available = twists.filter(t => !this.drawnTwists.includes(t.id));

        if (available.length === 0) {
            // Si no quedan, reiniciar el mazo
            this.drawnTwists = [];
            return this.drawTwist();
        }

        // Seleccionar una aleatoria
        const card = available[Math.floor(Math.random() * available.length)];
        this.drawnTwists.push(card.id);
        this.save();

        return card;
    },

    /**
     * Roba una carta de estrategia aleatoria para el Squad
     * @returns {Object|null} La carta robada o null si no quedan cartas
     */
    drawStrategy() {
        const strategies = CARDS_DATA.strategies;

        // Filtrar las que ya tiene este jugador
        const available = strategies.filter(s => !this.drawnStrategies.includes(s.id));

        if (available.length === 0) {
            // Si no quedan, reiniciar (raro que pase con 20 cartas)
            this.drawnStrategies = [];
            return this.drawStrategy();
        }

        // Seleccionar una aleatoria
        const card = available[Math.floor(Math.random() * available.length)];
        this.drawnStrategies.push(card.id);
        this.currentSquadCard = card;
        this.save();

        return card;
    },

    /**
     * Cambia la carta actual del Squad por otra diferente
     * @returns {Object|null} La nueva carta robada
     */
    changeSquadCard() {
        // La carta actual ya está en drawnStrategies, así que simplemente robamos otra
        return this.drawStrategy();
    },

    /**
     * Reinicia las cartas del Squad para una nueva ronda
     */
    resetSquadCards() {
        this.drawnStrategies = [];
        this.currentSquadCard = null;
        this.save();
    },

    // ===== PERSISTENCIA =====

    save() {
        const data = {
            influencePoints: this.influencePoints,
            currentRound: this.currentRound,
            activeStakeholder: this.activeStakeholder,
            drawnBehaviors: this.drawnBehaviors,
            drawnTwists: this.drawnTwists,
            drawnStrategies: this.drawnStrategies,
            currentSquadCard: this.currentSquadCard
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('No se pudo guardar el estado del juego:', e);
        }
    },

    load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                this.influencePoints = data.influencePoints || 0;
                this.currentRound = data.currentRound || 1;
                this.activeStakeholder = data.activeStakeholder || null;
                this.drawnBehaviors = data.drawnBehaviors || [];
                this.drawnTwists = data.drawnTwists || [];
                this.drawnStrategies = data.drawnStrategies || [];
                this.currentSquadCard = data.currentSquadCard || null;
                return true;
            }
        } catch (e) {
            console.warn('No se pudo cargar el estado del juego:', e);
        }
        return false;
    },

    // ===== RESET =====

    reset() {
        this.influencePoints = 0;
        this.currentRound = 1;
        this.activeStakeholder = null;
        this.drawnBehaviors = [];
        this.drawnTwists = [];
        this.drawnStrategies = [];
        this.currentSquadCard = null;
        this.save();
        this.notifyChange();
    },

    // ===== SISTEMA DE NOTIFICACIÓN =====

    listeners: [],

    onChange(callback) {
        this.listeners.push(callback);
    },

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    },

    notifyChange() {
        this.listeners.forEach(callback => {
            try {
                callback(this);
            } catch (e) {
                console.error('Error en listener de gameState:', e);
            }
        });
    }
};

// Cargar estado al iniciar
gameState.load();
