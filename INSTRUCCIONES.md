# Instrucciones Finales - Stakeholder Influence

## ✅ Estado del Proyecto

El juego está **100% funcional** y listo para usar. Solo falta copiar las imágenes de las cartas.

## 📁 Estructura de archivos creada

```
stakeholder-game/
├── index.html              ✅ Listo
├── css/
│   └── styles.css          ✅ Listo
├── js/
│   ├── app.js              ✅ Listo
│   ├── cards-data.js       ✅ Listo (con tus nombres de archivo)
│   └── game-state.js       ✅ Listo
├── images/
│   └── cards/
│       ├── stakeholders/   📂 Vacía (copia 3 imágenes)
│       ├── strategies/     📂 Vacía (copia 14 imágenes)
│       └── twists/         📂 Vacía (copia 8 imágenes)
├── README.md               ✅ Listo
└── INSTRUCCIONES.md        ✅ Este archivo
```

## 📸 Copiar imágenes

### 1. Stakeholders (3 imágenes)

Copia estas 3 imágenes a `stakeholder-game/images/cards/stakeholders/`:

```
Tipo 1 1.png     → El Cliente Interno
2.png            → El Miembro del Comité
3.png            → La Figura con Palanca
```

### 2. Estrategias Squad (14 imágenes)

Copia estas 14 imágenes a `stakeholder-game/images/cards/strategies/`:

```
image_1769342441423593 1.png    → Incluir en Investigación
Impacto global 1.png            → Foco en Impacto Global
que vs como 1.png               → Separar el Qué del Cómo
5 por ques 1.png                → Los 5 Porqués
golden circle 1.png             → Golden Circle
no lenguaje tecnico 1.png       → Evitar Lenguaje Técnico
elevator pitch 1.png            → Elevator Pitch
simil 1.png                     → Crear Símil o Metáfora
dar credito 1.png               → Dar Crédito
Pedir opinion 1.png             → Pedir su Opinión
Ayuda informar al principio 1.png → Pedir Ayuda Temprana
encuadrar conversa 1.png        → Encuadrar la Conversación
Plan A B 1.png                  → Mapear Consecuencias
sí y... 1.png                   → Sí, y...
```

### 3. Giros Inesperados (8 imágenes)

Copia estas 8 imágenes a `stakeholder-game/images/cards/twists/`:

```
test ab exitoso 1.png               → Test A/B Exitoso (+2)
Reviews negativas 1.png             → Reviews Negativas (-1)
feature flag 1.png                  → Roll Back en Producción (-2)
Hilo de correo apocalíptico 1.png   → Hilo de Correo Apocalíptico (-2)
efecto wow 1.png                    → Magia del Diseñador (+2)
Tiro legal 1.png                    → Decreto Legal Inesperado (-2)
PM convence 1.png                   → El PM Convence (+1)
feature tarde 1.png                 → La Competencia Ataca (-1)
```

## 🚀 Probar localmente

1. Copia las imágenes según las instrucciones arriba
2. Abre `index.html` en tu navegador
3. Prueba ambas vistas:
   - **Squad**: Pulsa "Robar mi carta"
   - **Staff**: Pulsa "Staff" (contraseña: `Birrito`)

## 📦 Desplegar en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube toda la carpeta `stakeholder-game/`
3. Ve a Settings > Pages
4. Selecciona rama `main` y carpeta `/ (root)`
5. ¡Listo! Tu juego estará en `https://tu-usuario.github.io/nombre-repo/`

## 🎮 Cómo jugar

### Vista Squad (Jugadores)
- Cada jugador abre la app en su móvil
- Solo ve la **imagen de la carta** (sin textos)
- Lee la estrategia en la imagen
- Puede cambiar su carta si no le gusta
- El equipo delibera presencialmente y elige una estrategia

### Vista Staff (Game Master)
- Acceso con contraseña: `Birrito`
- Selecciona qué Stakeholder interpretar
- Roba Comportamientos para actuar
- Escucha la propuesta del Squad
- Asigna puntos: +2 (excelente), +1 (buena), 0 (mejorable)
- Usa Giros Inesperados para añadir emoción

## 🔧 Cambiar contraseña del Staff

Edita el archivo `js/app.js`, línea 8:

```javascript
const STAFF_PASSWORD = 'Birrito'; // Cambia esto
```

## 🎨 Diseño

- **Responsive**: Funciona en móvil, tablet y desktop
- **Fallback CSS**: Si falta una imagen, se muestra un diseño de fallback bonito
- **Animaciones**: Transiciones suaves y profesionales
- **Colores**: Inspirado en Product Beers

## ⚙️ Características técnicas

- ✅ Vanilla JS (sin frameworks)
- ✅ Sin base de datos
- ✅ localStorage para persistencia
- ✅ Compatible con GitHub Pages
- ✅ Sin dependencias externas
- ✅ Responsive design
- ✅ Modo oscuro (según preferencias del sistema)

## 📝 Notas importantes

1. **Sin comportamientos con imagen**: Los comportamientos se muestran solo como texto en un modal, no tienen imágenes.
2. **Sin reverso de carta**: Se usa un diseño CSS de fallback muy bonito.
3. **14 estrategias**: Se eliminó "Contar Historia de Usuario" porque no tenías imagen.
4. **Contraseña del Staff**: Por defecto es `Birrito`, cámbiala si quieres.

## 🐛 ¿Problemas?

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que las imágenes estén en las carpetas correctas
4. Comprueba que los nombres de archivo coincidan exactamente (mayúsculas, espacios, etc.)

## 📧 Créditos

Juego inspirado en [Product Beers](https://www.productbeers.es)

---

**¡Listo para jugar! 🎯**
