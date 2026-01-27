/**
 * Datos de todas las cartas del juego Stakeholder Influence
 * Compatible con GitHub Pages (sin base de datos)
 */

const CARDS_DATA = {
    // Imagen del reverso común para todas las cartas (fallback CSS si no existe)
    cardBack: null,

    // ===== STAKEHOLDERS (3 cartas) - Solo Staff =====
    stakeholders: [
        {
            id: "cliente-interno",
            name: "El Cliente Interno",
            traits: "Dominante, considera que no tienes conocimiento del negocio. No quiere perder tiempo explicando razonamientos. Entra en el 'cómo' en lugar del 'qué'.",
            weakness: "Tiende a 'definir desde la torre de cristal'. El dato cuantitativo o cualitativo le hace cambiar de idea. Incluirle en investigación funciona muy bien.",
            icon: "👔",
            image: "images/cards/stakeholders/Tipo 1 1.png"
        },
        {
            id: "miembro-comite",
            name: "El Miembro del Comité",
            traits: "Rango alto, tiempo muy limitado. No quiere detalles técnicos ni datos complejos. Maneja situaciones de alto impacto en paralelo.",
            weakness: "No revisa el dato ni la información, la asume correcta. Mensajes concisos y bien estructurados le influencian. Confía en cargos intermedios.",
            icon: "📊",
            image: "images/cards/stakeholders/2.png"
        },
        {
            id: "figura-palanca",
            name: "La Figura con Palanca",
            traits: "Cargo intermedio con buena posición política. Infravalorado pero influyente por carisma, logros técnicos o relación personal con altos cargos.",
            weakness: "Puede ejercer gran influencia en las decisiones de los Stakeholders tipo 1 y 2.",
            icon: "🎯",
            image: "images/cards/stakeholders/3.png"
        }
    ],

    // ===== COMPORTAMIENTOS (9 cartas) - Solo Staff =====
    // Organizados por stakeholder (3 por cada uno) - SIN IMÁGENES
    behaviors: {
        "cliente-interno": [
            {
                id: "no-lo-entendeis",
                name: "¡Es que no lo entendéis!",
                description: "El stakeholder expresa frustración porque siente que el equipo no comprende su problema o las necesidades de su área.",
                icon: "😤"
            },
            {
                id: "yo-solo-necesito",
                name: "Yo solo necesito que...",
                description: "Simplifica en exceso su petición, ocultando la complejidad real del problema que hay detrás.",
                icon: "🎯"
            },
            {
                id: "silencio-correo",
                name: "Silencio por correo",
                description: "No responde a los emails. El silencio genera incertidumbre y bloquea el avance del proyecto.",
                icon: "📧"
            }
        ],
        "miembro-comite": [
            {
                id: "tengo-5-minutos",
                name: "Tengo 5 minutos",
                description: "Muestra que su tiempo es extremadamente limitado. Necesitas ir al grano ya.",
                icon: "⏱️"
            },
            {
                id: "muy-tecnico",
                name: "Esto es muy técnico",
                description: "Se desconecta cuando la conversación entra en detalles técnicos. Necesita traducción a impacto de negocio.",
                icon: "🔧"
            },
            {
                id: "accionable-claro",
                name: "Pide un Accionable Claro",
                description: "Quiere saber exactamente qué tiene que hacer o decidir. Sin accionables claros, no avanza.",
                icon: "✅"
            }
        ],
        "figura-palanca": [
            {
                id: "comentario-pasillo",
                name: "Comentario de Pasillo",
                description: "\"He oído por ahí que [otro equipo] no está muy convencido con vuestra propuesta...\" Usa información informal para testear tu reacción.",
                icon: "👂"
            },
            {
                id: "comparacion-pasado",
                name: "Comparación con el Pasado",
                description: "\"Esto me recuerda al proyecto 'Fénix' de 2019. Cuidado, porque el dato histórico dice que acabó mal.\" Usa precedentes como advertencia.",
                icon: "📜"
            },
            {
                id: "freno-oculto",
                name: "Descubre un Freno Oculto",
                description: "\"Un momento. Si hacéis eso, ¿habéis pensado en cómo impacta al proceso de [otro departamento]? Os lo van a parar.\" Revela obstáculos políticos.",
                icon: "🚧"
            }
        ]
    },

    // ===== ESTRATEGIAS (15 cartas) - Solo Squad =====
    strategies: [
        {
            id: "incluir-investigacion",
            name: "Incluir en Investigación",
            description: "\"Entendemos tu punto. ¿Qué te parece si te unes a la próxima sesión con usuarios para que veas de primera mano lo que descubrimos?\"",
            idealFor: ["cliente-interno"],
            icon: "🔬",
            image: "images/cards/strategies/image_1769342441423593 1.png"
        },
        {
            id: "foco-impacto-global",
            name: "Foco en Impacto Global",
            description: "\"Tu área es clave, pero queremos asegurar que la solución beneficie a toda la organización. ¿Cómo podemos alinearlo?\"",
            idealFor: ["cliente-interno"],
            icon: "🌍",
            image: "images/cards/strategies/Impacto global 1.png"
        },
        {
            id: "separar-que-como",
            name: "Separar el Qué del Cómo",
            description: "\"Entiendo perfectamente QUÉ necesitas lograr. Déjanos explorar el CÓMO, que es donde podemos aportar más valor.\"",
            idealFor: ["cliente-interno"],
            icon: "🎯",
            image: "images/cards/strategies/que vs como 1.png"
        },
        {
            id: "cinco-porques",
            name: "Los 5 Porqués",
            description: "\"¿Por qué es importante esto? ¿Y por qué eso es importante?\" Profundiza hasta llegar a la raíz real de la necesidad.",
            idealFor: ["cliente-interno", "miembro-comite"],
            icon: "❓",
            image: "images/cards/strategies/5 por ques 1.png"
        },
        {
            id: "golden-circle",
            name: "Golden Circle (Qué-Cómo-Por qué)",
            description: "Estructura tu mensaje: QUÉ propones, CÓMO lo harás, y POR QUÉ es la mejor opción. Claridad ante todo.",
            idealFor: ["miembro-comite"],
            icon: "📋",
            image: "images/cards/strategies/golden circle 1.png"
        },
        {
            id: "evitar-lenguaje-tecnico",
            name: "Evitar Lenguaje Técnico",
            description: "Traduce la jerga técnica a impacto de negocio. En lugar de 'refactoring', habla de 'reducir errores y acelerar entregas'.",
            idealFor: ["miembro-comite", "figura-palanca"],
            icon: "💬",
            image: "images/cards/strategies/no lenguaje tecnico 1.png"
        },
        {
            id: "elevator-pitch",
            name: "Elevator Pitch",
            description: "Resume tu propuesta en 30 segundos: problema, solución, beneficio. Si no puedes explicarlo brevemente, no lo entiendes bien.",
            idealFor: ["miembro-comite"],
            icon: "🛗",
            image: "images/cards/strategies/elevator pitch 1.png"
        },
        {
            id: "crear-simil-metafora",
            name: "Crear Símil o Metáfora",
            description: "\"Es como cuando...\" Conecta conceptos complejos con situaciones cotidianas que el stakeholder pueda visualizar fácilmente.",
            idealFor: ["miembro-comite", "cliente-interno"],
            icon: "🎭",
            image: "images/cards/strategies/simil 1.png"
        },
        {
            id: "dar-credito",
            name: "Dar Crédito",
            description: "\"Esta idea surgió de tu sugerencia sobre...\" Reconoce públicamente las aportaciones del stakeholder. Todos quieren sentirse valorados.",
            idealFor: ["figura-palanca", "cliente-interno"],
            icon: "🏆",
            image: "images/cards/strategies/dar credito 1.png"
        },
        {
            id: "pedir-opinion",
            name: "Pedir su Opinión",
            description: "\"¿Qué opinas de este enfoque?\" Involucra al stakeholder en la decisión. La gente apoya lo que ayuda a crear.",
            idealFor: ["figura-palanca", "cliente-interno"],
            icon: "💭",
            image: "images/cards/strategies/Pedir opinion 1.png"
        },
        {
            id: "pedir-ayuda-temprana",
            name: "Pedir Ayuda Temprana",
            description: "\"Antes de avanzar, necesitamos tu experiencia en...\" Involúcralo pronto para que se sienta parte del éxito.",
            idealFor: ["figura-palanca"],
            icon: "🆘",
            image: "images/cards/strategies/Ayuda informar al principio 1.png"
        },
        {
            id: "encuadrar-conversacion",
            name: "Encuadrar la Conversación",
            description: "\"Antes de empezar, quiero asegurarme de que hablamos de lo mismo...\" Establece el contexto y las expectativas.",
            idealFor: ["cliente-interno", "miembro-comite"],
            icon: "🖼️",
            image: "images/cards/strategies/encuadrar conversa 1.png"
        },
        {
            id: "mapear-consecuencias",
            name: "Mapear Consecuencias",
            description: "\"Si hacemos esto, entonces...\" Muestra la cadena de efectos para que el stakeholder visualice el impacto completo.",
            idealFor: ["miembro-comite"],
            icon: "🗺️",
            image: "images/cards/strategies/Plan A B 1.png"
        },
        {
            id: "construir-sobre-idea",
            name: "Sí, y... (Construir sobre su Idea)",
            description: "\"Me gusta tu idea de X, y si además añadimos Y...\" Parte de algo que el stakeholder propuso para construir tu propuesta.",
            idealFor: ["cliente-interno", "figura-palanca"],
            icon: "🧱",
            image: "images/cards/strategies/sí y... 1.png"
        }
    ],

    // ===== GIROS INESPERADOS (8 cartas) - Solo Staff =====
    twists: [
        {
            id: "test-ab-exitoso",
            name: "Test A/B Exitoso",
            description: "Los datos de un experimento reciente respaldan tu propuesta.",
            effect: "El dato consolida tus argumentos.",
            points: 2,
            icon: "✅",
            image: "images/cards/twists/test ab exitoso 1.png"
        },
        {
            id: "reviews-negativas",
            name: "Reviews Negativas de Usuario",
            description: "Una oleada de malas reviews debilita la posición del Squad.",
            effect: "Una oleada de malas reviews debilita la posición del Squad.",
            points: -1,
            icon: "👎",
            image: "images/cards/twists/Reviews negativas 1.png"
        },
        {
            id: "rollback-produccion",
            name: "Roll Back en Producción",
            description: "Un despliegue sin feature flag sale mal.",
            effect: "La confianza se resiente.",
            points: -2,
            icon: "🔥",
            image: "images/cards/twists/feature flag 1.png"
        },
        {
            id: "hilo-correo-apocaliptico",
            name: "Hilo de Correo Apocalíptico",
            description: "Alguien pone a todo el mundo en copia.",
            effect: "Generando ruido y desconfianza.",
            points: -2,
            icon: "📧",
            image: "images/cards/twists/Hilo de correo apocalíptico 1.png"
        },
        {
            id: "magia-disenador",
            name: "Magia del Diseñador",
            description: "Un prototipo con 'efecto WOW' impresiona al stakeholder.",
            effect: "Un prototipo con 'efecto WOW' impresiona al stakeholder.",
            points: 2,
            icon: "✨",
            image: "images/cards/twists/efecto wow 1.png"
        },
        {
            id: "decreto-legal",
            name: "Decreto Legal Inesperado",
            description: "Una nueva ley (GDPR, accesibilidad) impacta en el proyecto.",
            effect: "Una nueva ley (GDPR, accesibilidad) impacta en el proyecto.",
            points: -2,
            icon: "⚖️",
            image: "images/cards/twists/Tiro legal 1.png"
        },
        {
            id: "pm-convence",
            name: "El PM Convence",
            description: "Una buena planificación justifica ampliar fechas.",
            effect: "Una buena planificación justifica ampliar fechas.",
            points: 1,
            icon: "🤝",
            image: "images/cards/twists/PM convence 1.png"
        },
        {
            id: "competencia-ataca",
            name: "La Competencia Ataca",
            description: "Un competidor lanza una funcionalidad similar primero.",
            effect: "Un competidor lanza una funcionalidad similar primero.",
            points: -1,
            icon: "🏃",
            image: "images/cards/twists/feature tarde 1.png"
        }
    ]
};

// Mapeo de IDs de stakeholder a nombres legibles
const STAKEHOLDER_NAMES = {
    "cliente-interno": "Cliente Interno",
    "miembro-comite": "Miembro del Comité",
    "figura-palanca": "Figura con Palanca"
};

// Función helper para obtener el nombre legible de un stakeholder
function getStakeholderDisplayName(id) {
    return STAKEHOLDER_NAMES[id] || id;
}

// Función helper para obtener los nombres de stakeholders ideales
function getIdealForText(idealFor) {
    if (!idealFor || idealFor.length === 0) return "Todos";
    return idealFor.map(id => getStakeholderDisplayName(id)).join(", ");
}
