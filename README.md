# Portafolio — Kevin Hernández

Sitio estático (HTML + CSS + JS, sin build). 

## Editar datos de contacto
Abre `script.js` y cambia el objeto `CONTACT` al inicio (teléfono, WhatsApp, LinkedIn, GitHub).

## Ver en local
```bash
python -m http.server 5173   # y abre http://localhost:5173
```

## Deploy en Vercel
Opción A (CLI):
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # producción
```
Opción B (GitHub): sube esta carpeta a un repo → vercel.com/new → Import → Framework: "Other" → Deploy.
Cada `git push` a `main` redepliega automáticamente.
