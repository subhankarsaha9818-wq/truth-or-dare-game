# 🔥 Interactive Truth or Dare Web Game

A sleek, user-friendly, and modern web application to play **Truth or Dare** with your friends. Features a dynamic spinning wheel with physical needle physics, fully responsive design, and automatic slice-geometry calculation supporting any number of players ($2+$).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- **🚀 Dynamic Player Management:** Start with a minimum of 2 players and add as many as you want! Form validation includes dynamic text reindexing if a middle player row is removed.
- **🎯 Precision Canvas Spinner:** Built utilizing an HTML5 Canvas element that dynamically computes mathematical slice dimensions ($ArcSize = 2\pi / \text{total players}$) with smooth cubic-ease-out physics.
- **💾 Persistent Configurations:** Leverages browser `localStorage` to retain player information so names are never lost during accidental page reloads.
- **🤔 Curated Question Banks:** Preloaded with interesting, engaging, and party-friendly Truth and Dare prompts.
- **🎨 Ultra-Modern UI:** Styled with a sleek slate-dark neon aesthetic, intuitive layouts, and mobile-responsive controls.

---

## 📂 File Architecture & Project Layout

The codebase is written strictly adhering to **Modular Software Architecture Principles**, ensuring that concerns are decoupled instead of mixing logic in a monolithic file:

```text
├── index.html            # Hero / Welcome Page (Player input setup)
├── game.html             # Main Game Arena Page (The Wheel & UI panels)
├── css/
│   ├── style.css         # Core global styles, design tokens & typography
│   ├── hero.css          # Setup page designs and dynamic input rows
│   └── game.css          # Canvas spinner viewport, panels, and layouts
└── js/
    ├── app.js            # Main entry point & application routing flow
    ├── players.js        # LocalStorage handling & custom validation mechanics
    ├── questions.js      # Array database consisting of Truth & Dare pools
    └── spinner.js        # Mathematical animation engine for wheel rotation