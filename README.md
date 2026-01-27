# Stakeholder Influence - El Juego

Aplicación web de referencia para un juego de mesa presencial sobre gestión de stakeholders.

## Cómo jugar

### Squad (Jugadores)
1. Cada jugador abre la app en su móvil
2. Pulsa "Robar mi carta" para obtener una estrategia
3. Lee la carta y decide si la usa o pulsa "Cambiar carta"
4. El equipo delibera (presencialmente) qué estrategia usar
5. Un portavoz argumenta ante el Staff

### Staff (Game Master)
1. Accede pulsando "Staff" en el footer (contraseña: `Birrito`)
2. Selecciona qué Stakeholder interpretar
3. Roba cartas de Comportamiento para actuar
4. Escucha la respuesta del Squad y asigna puntos
5. Usa Giros Inesperados para añadir emoción

## Despliegue en GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. La app estará disponible en `https://tu-usuario.github.io/nombre-repo/`

## Estructura de archivos

```
stakeholder-game/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── cards-data.js
│   └── game-state.js
├── images/
│   └── cards/
│       ├── stakeholders/    (3 imágenes)
│       ├── strategies/      (14 imágenes)
│       └── twists/          (8 imágenes)
└── README.md
```

## Añadir imágenes de cartas

Las imágenes deben colocarse en las carpetas correspondientes con los nombres exactos definidos en `js/cards-data.js`.

**Formato recomendado:** PNG o JPG, 400x560px (ratio 5:7)

Si una imagen no existe, se mostrará un diseño CSS de fallback con el icono de la carta.

## Cartas del juego

### Stakeholders (3)
- El Cliente Interno
- El Miembro del Comité
- La Figura con Palanca

### Estrategias - Squad (14)
- Incluir en Investigación
- Foco en Impacto Global
- Separar el Qué del Cómo
- Los 5 Porqués
- Golden Circle
- Evitar Lenguaje Técnico
- Elevator Pitch
- Crear Símil o Metáfora
- Dar Crédito
- Pedir su Opinión
- Pedir Ayuda Temprana
- Encuadrar la Conversación
- Mapear Consecuencias
- Sí, y... (Construir sobre su Idea)

### Comportamientos (9, sin imagen)
**Cliente Interno:** ¡Es que no lo entendéis!, Yo solo necesito que..., Silencio por correo

**Miembro Comité:** Tengo 5 minutos, Esto es muy técnico, Pide un Accionable Claro

**Figura con Palanca:** Comentario de Pasillo, Comparación con el Pasado, Descubre un Freno Oculto

### Giros Inesperados (8)
| Giro | Puntos |
|------|--------|
| Test A/B Exitoso | +2 |
| Magia del Diseñador | +2 |
| El PM Convence | +1 |
| Reviews Negativas | -1 |
| La Competencia Ataca | -1 |
| Roll Back en Producción | -2 |
| Hilo de Correo Apocalíptico | -2 |
| Decreto Legal Inesperado | -2 |

## Tecnología

- HTML5 + CSS3 + Vanilla JavaScript
- Sin frameworks ni dependencias externas
- Sin base de datos (datos embebidos en JS)
- localStorage para persistencia de estado
- 100% compatible con GitHub Pages

## Licencia

Uso interno / educativo.
