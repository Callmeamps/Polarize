# Polarize - Holistic Design Platform

> [!IMPORTANT]
> ### 🚀 Introducing Polarize: A Complete Visual Design Platform
>
> **Polarize is more than just a design tool - it's a comprehensive platform for creating, editing, and managing visual designs through both AI assistance and direct manipulation.**

<p align="center">
  <img src="docs/assets/banner.png" alt="Polarize - Holistic Design Platform" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/nexu-io/open-design/stargazers"><img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square" /></a>
</p>

---

## What is Polarize?

Polarize is a holistic design platform that combines AI-generated designs with direct manipulation tools to create a complete visual design ecosystem. Rather than just being an alternative to Claude Design, Polarize extends the platform with advanced visual design capabilities that provide both AI-assisted generation and precise manual control.

## At a glance

| | What Polarize offers |
|---|---|
| **Holistic Design Approach** | Combining AI generation with direct manipulation tools for complete creative control |
| **Visual Design API** | Programmatic HTML-to-Image conversion with the `/api/projects/:id/render/image` endpoint |
| **Built-in Design Tools** | Layer-based image editor with real-time preview and CSS filter support |
| **Professional Design Suite** | Website, email, and document builders through GrapesJS Studio SDK |
| **Seamless Integration** | All designs integrate with Polarize's project system for persistence and collaboration |

## Key Features

### HTML-to-Image API
Convert HTML content to pristine image formats with our programmatic API:
```
POST /api/projects/:id/render/image
```

### Visual Design Editor
Professional design editing with:
- Layer-based editing system
- Real-time preview and editing
- CSS filter support
- Keyboard shortcuts for efficiency

### Professional Design Suite
Professional website, email, and document building through drag-and-drop:
- Website Builder for full website design
- Email Template Builder for cross-client email designs
- Document Builder for professional document creation

## Visual Design Tools

Polarize now includes advanced visual design capabilities that provide direct user control over design creation:

### HTML-to-Image API
A programmatic API for converting HTML content to image formats using headless browser technology, accessible at:
```
POST /api/projects/:id/render/image
```

### Image Editor
A WYSIWYG Image Editor with layer-based editing system featuring:
- Support for multiple layer types (rectangle, text, image, ellipse, canvas, group)
- Real-time preview and editing
- CSS filter support (blur, drop shadows, color adjustments)
- Keyboard shortcuts for efficient editing

### GrapesJS Studio SDK
Professional website, email, and document building capabilities through drag-and-drop:
- Website Builder for full website design
- Email Template Builder for cross-client email designs
- Document Builder for professional document creation

### Seamless Project Integration
All designs integrate with Polarize's project system, providing:
- Auto-save: Changes automatically saved to project
- Version History: Access previous versions of designs
- Asset Management: Import and manage project assets
- Export Options: Multiple export formats available

## System Architecture

Polarize is built on a modern architecture that combines the best of AI generation and direct manipulation:

```
┌──────────────────────────────────────────────────────────────────┐
│  Visual Design Platform                                           │
│  Web App · Visual Editor · Project Management · Exports             │
└──────────────────────────────────┬────────────────────────────────┘
                                   │ HTTP + REST (/api/*)
                                   ▼
                       ┌──────────────────────────┐
                       │ Local Service Layer      │
                       │ · Visual Editor           │  
                       │ · Project Management       │
                       │ · Collaboration Tools      │
                       └──────────────────────────┘
```

## Installation

Polarize is designed to be easily installed and configured:

```
git clone https://github.com/polarize/polarize
cd polarize
npm install
npm start
```

Or run directly:

```
git clone https://github.com/polarize/polarize
cd polarize
npm install
npm start
```

## Key Principles

Polarize is built on the principle that great design tools should:

1. **Empower Creativity** - Provide both AI-assisted generation and precise manual control
2. **Integrate Seamlessly** - Work with existing design systems and workflows
3. **Scale Flexibly** - From individual creators to enterprise teams
4. **Evolve Continuously** - Adapt to new design challenges and trends

## Repository Activity

<p align="center">
  <img alt="Polarize" src="https://img.shields.io/badge/polarize-creative%20design%20platform-ff6b35?style=flat-square" />
</p>

All contributions to Polarize help build a more creative, collaborative design ecosystem.