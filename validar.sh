#!/bin/bash

# Script de validación para Stakeholder Influence
# Verifica que todas las imágenes estén en su lugar

echo "🎯 Validando Stakeholder Influence..."
echo ""

errors=0
warnings=0

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1 ${RED}(FALTA)${NC}"
        ((errors++))
    fi
}

# Verificar archivos principales
echo "📄 Archivos principales:"
check_file "index.html"
check_file "css/styles.css"
check_file "js/app.js"
check_file "js/cards-data.js"
check_file "js/game-state.js"
check_file "README.md"
echo ""

# Verificar estructura de carpetas
echo "📁 Estructura de carpetas:"
for dir in "images/cards/stakeholders" "images/cards/strategies" "images/cards/twists"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir/"
    else
        echo -e "${RED}✗${NC} $dir/ ${RED}(FALTA)${NC}"
        ((errors++))
    fi
done
echo ""

# Verificar Stakeholders (3)
echo "👔 Stakeholders (3):"
check_file "images/cards/stakeholders/Tipo 1 1.png"
check_file "images/cards/stakeholders/2.png"
check_file "images/cards/stakeholders/3.png"
echo ""

# Verificar Estrategias (14)
echo "💡 Estrategias Squad (14):"
check_file "images/cards/strategies/image_1769342441423593 1.png"
check_file "images/cards/strategies/Impacto global 1.png"
check_file "images/cards/strategies/que vs como 1.png"
check_file "images/cards/strategies/5 por ques 1.png"
check_file "images/cards/strategies/golden circle 1.png"
check_file "images/cards/strategies/no lenguaje tecnico 1.png"
check_file "images/cards/strategies/elevator pitch 1.png"
check_file "images/cards/strategies/simil 1.png"
check_file "images/cards/strategies/dar credito 1.png"
check_file "images/cards/strategies/Pedir opinion 1.png"
check_file "images/cards/strategies/Ayuda informar al principio 1.png"
check_file "images/cards/strategies/encuadrar conversa 1.png"
check_file "images/cards/strategies/Plan A B 1.png"
check_file "images/cards/strategies/sí y... 1.png"
echo ""

# Verificar Giros (8)
echo "⚡ Giros Inesperados (8):"
check_file "images/cards/twists/test ab exitoso 1.png"
check_file "images/cards/twists/Reviews negativas 1.png"
check_file "images/cards/twists/feature flag 1.png"
check_file "images/cards/twists/Hilo de correo apocalíptico 1.png"
check_file "images/cards/twists/efecto wow 1.png"
check_file "images/cards/twists/Tiro legal 1.png"
check_file "images/cards/twists/PM convence 1.png"
check_file "images/cards/twists/feature tarde 1.png"
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ Validación exitosa${NC}"
    echo "  Todos los archivos están en su lugar"
    echo "  ¡El juego está listo para usar!"
else
    echo -e "${RED}✗ Validación fallida${NC}"
    echo "  $errors archivo(s) faltante(s)"
    echo "  Revisa INSTRUCCIONES.md para copiar las imágenes"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Para probar: abre index.html en tu navegador"
echo "Contraseña Staff: Birrito"
echo ""
