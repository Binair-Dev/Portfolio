# Brian Van Bellinghen — Portfolio

Développeur Fullstack · Backend Specialist

## Tech
- HTML5 / CSS3 / JavaScript Vanilla
- nginx (Docker)
- Aucune dépendance, ultra-léger

## Run en local
```bash
# Simple : ouvrir index.html dans le navigateur

# Ou via Docker
docker compose up -d
# → http://localhost:8060
```

## Déploiement (Coolify)
1. Connecter le repo GitHub
2. Type: Docker Compose
3. Domaine: `portefolio.b-services.be`
4. Deploy 🚀

## Structure
```
Portfolio/
├── index.html       # Structure complète
├── css/style.css    # Dark theme + animations
├── js/main.js       # Typing, particles, scroll reveal
├── Dockerfile       # nginx:alpine
├── nginx.conf       # Config nginx optimisée
└── docker-compose.yml
```
