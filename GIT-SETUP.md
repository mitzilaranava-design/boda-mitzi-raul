# 📤 Cómo subir el proyecto a Git

## Paso 1: Inicializar Git (si no está inicializado)

```bash
cd c:\git\boda-repo\boda-mitzi-raul
git init
```

## Paso 2: Agregar archivos

```bash
git add .
```

## Paso 3: Primer commit

```bash
git commit -m "Initial commit: Boda Mitzi & Raúl"
```

## Paso 4: Crear repositorio en GitHub/GitLab

1. Ve a GitHub/GitLab
2. Crea un nuevo repositorio (público o privado)
3. **NO** inicialices con README, .gitignore o licencia (ya los tienes)

## Paso 5: Conectar y subir

```bash
# Reemplaza USERNAME y REPO con tus valores
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

## ⚠️ Importante

- ✅ `.env` está en `.gitignore` (no se subirá)
- ✅ `node_modules` está en `.gitignore`
- ✅ Solo se subirá el código fuente

## Si ya tienes un repo remoto

Si el proyecto `save-date-react` venía de otro repo y quieres mantenerlo separado:

```bash
# Verificar remotos actuales
git remote -v

# Si hay un remoto, puedes cambiarlo:
git remote set-url origin https://github.com/USERNAME/NUEVO-REPO.git

# O agregar uno nuevo:
git remote add nuevo-origin https://github.com/USERNAME/NUEVO-REPO.git
```
