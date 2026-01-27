# Configuración del Video

## Opción 1: Video Local (public/videos/)

El video debe estar en: `public/videos/plabanfisa.mp4`

**Uso:**
```tsx
<VideoHero />
```

O especificar otra ruta:
```tsx
<VideoHero localVideoPath="/videos/otro-video.mp4" />
```

## Opción 2: Video desde Cloudinary

**Uso:**
```tsx
<VideoHero videoUrl="https://res.cloudinary.com/tu-cloud-name/video/upload/v1234567/plabanfisa.mp4" />
```

### Cómo subir a Cloudinary:

1. Ve a [cloudinary.com](https://cloudinary.com) y crea una cuenta
2. Sube tu video a Cloudinary
3. Copia la URL del video
4. Úsala en el componente

**Ejemplo completo:**
```tsx
// En app/page.tsx
<VideoHero videoUrl="https://res.cloudinary.com/demo/video/upload/v1234567/plabanfisa.mp4" />
```

## Debug

En modo desarrollo, verás información de debug en la esquina superior izquierda que muestra:
- La fuente del video
- Si está reproduciendo
- Cualquier error
- El estado del video

## Solución de Problemas

1. **El video no se reproduce:**
   - Verifica que el archivo existe en `public/videos/`
   - Verifica la consola del navegador para errores
   - Algunos navegadores bloquean autoplay - el video intentará reproducirse después de interacción del usuario

2. **Error 404:**
   - Verifica que la ruta sea correcta
   - En Next.js, los archivos en `public/` se sirven desde la raíz (`/videos/...`)

3. **Formato no soportado:**
   - Asegúrate de que el video sea MP4 (H.264)
   - Puedes convertir con: `ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4`
