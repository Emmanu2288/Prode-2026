# 🏆 PRODE - Mundial Canadá / Estados Unidos / México 2026

Este proyecto es un simulador de pronósticos deportivos (PRODE) para el Mundial de Fútbol 2026. Permite al usuario ingresar sus predicciones de goles para cada partido, calcular cuántos resultados acertó exactamente y visualizar un resumen interactivo.

---

## 🚀 Características

- Formulario dinámico con banderas reales de cada país (vía FlagCDN)
- Validación en vivo de los inputs (sin negativos, con feedback visual)
- Auto-guardado de pronósticos en `localStorage`
- Contador dinámico de partidos completados
- Resaltado visual de aciertos y fallos en el formulario
- Popup con resumen de resultados usando SweetAlert2
- Botón para limpiar el formulario y reiniciar los pronósticos
- Estilos visuales con Bootstrap 5 y animaciones personalizadas

---

## 📁 Estructura de archivos
```
📦 prode-2026
📁js
- app.js             -> Lógica del simulador y funciones interactivas
📁styles
- styles.css         -> Estilos del HTML 
📁assets             
  📂icon
  - logo mundial.jpg          
📄index.html        -> Página principal.
📄partidos.json     -> Api propia.
📋README.md         -> Documentacion (este archivo)
```

---

## 🧠 Cómo usar

1. Cloná el repositorio o descargá los archivos.
```bash
git clone https://github.com/Emmanu2288/Prode-2026
```
2. npm install.
```bash
npm install
```
3. Abrí `index.html` en tu navegador.
4. Completá tus pronósticos de goles para cada partido.
5. Presioná **"Calcular Aciertos"** para ver tu rendimiento.
6. Usá **"Limpiar Formulario"** para reiniciar.

---

## 🖼️ Banderas

Las banderas se cargan desde [FlagCDN](https://flagcdn.com) usando los códigos ISO de cada país.  
Ejemplo: `https://flagcdn.com/24x18/ar.png` para Argentina.

---

## 🛠️ Tecnologías utilizadas

- HTML5 + CSS3
- JavaScript (ES6)
- Bootstrap 5
- SweetAlert2
- FlagCDN

---

## 📌 Autor

**Manu** — Creativo, detallista y apasionado por el diseño de interfaces educativas y deportivas.  
Este simulador fue desarrollado con foco en accesibilidad, estética y experiencia de usuario.

---

## 📬 Contacto

¿Querés colaborar, sugerir mejoras o expandir el simulador para fases eliminatorias?  
Abrí un issue o escribí directamente.

---

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y recreativos.
