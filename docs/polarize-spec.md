# Polarize - Holistic Design Platform

Status: Current · 2026-05-19
Scope: Product definition and vision

---

## 1. Product Vision

> **A holistic design platform that combines AI-generated designs with direct manipulation tools to create a complete visual design ecosystem.**

Polarize is more than just a design tool - it's a comprehensive platform for creating, editing, and managing visual designs through both AI assistance and direct manipulation. Our platform integrates seamlessly with existing workflows while providing powerful creative capabilities.

## 2. Core Philosophy

Polarize is built on the principle that great design tools should:

1. **Empower Creativity** - Provide both AI-assisted generation and precise manual control
2. **Integrate Seamlessly** - Work with existing design systems and workflows
3. **Scale Flexibly** - From individual creators to enterprise teams
4. **Evolve Continuously** - Adapt to new design challenges and trends

## 3. Key Features

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

### GrapesJS Studio SDK Integration
Professional website, email, and document building through drag-and-drop:
- Website Builder for full website design
- Email Template Builder for cross-client email designs
- Document Builder for professional document creation

### Seamless Project Integration
All designs integrate with Polarize's project system:
- Auto-save: Changes automatically saved to project
- Version History: Access previous versions of designs
- Asset Management: Import and manage project assets
- Export Options: Multiple export formats available

## 4. Target Users

- **Designers** seeking powerful creative tools with AI assistance
- **Developers** building design systems and visual components
- **Content Creators** producing marketing materials and visual assets
- **Teams** collaborating on design projects

## 5. User Scenarios

### S1 - "Design what I imagine"
User opens Polarize, describes a visual concept, and the AI generates a base design that can be refined through direct manipulation.

### S2 - "Build with precision"
User creates detailed designs using the visual editor, with full control over every element.

### S3 - "Collaborate in real-time"
Team members work together on design projects, with version control and collaboration features.

### S4 - "Scale my workflow"
User leverages the platform's capabilities to produce consistent, professional designs at scale.

## 6. Technical Architecture

Polarize is built on a modern architecture that combines the best of AI generation and direct manipulation:

```
┌──────────────────────────────────────────────────────────────────┐
│                        Web App (Next.js)                        │
│  Visual Editor · AI Assistant · Project Management · Exports    │
└────────────┬─────────────────────────────────┬───────────────────┘
             │ HTTP + REST (/api/*)            │ HTTPS (BYOK direct)
┌────────────▼──────────────────┐     ┌────────▼─────────────────┐
│   Local Service Layer         │     │   Cloud Services          │
│   · Visual Editor             │     │   · AI Generation         │
│   · Project Management        │     │   · Asset Storage         │
│   · Collaboration Tools      │     │   · Analytics              │
└─────────────────────────────────────┴───────────────────────────┘
```

## 7. Success Criteria

- One designer can create a project, generate designs, and export professional results in under 5 minutes.
- Teams can collaborate on design projects with real-time updates and version control.
- Users can seamlessly switch between AI-assisted creation and direct manipulation.
- All designs integrate with existing workflows and design systems.

## 8. Roadmap

- [x] Visual design editor with layer-based editing
- [x] HTML-to-Image conversion API
- [x] GrapesJS Studio SDK integration
- [x] Project management and version control
- [ ] Real-time collaboration features
- [ ] Advanced export capabilities
- [ ] Team workflow enhancements

## 9. Installation

Polarize is designed to be easily installed and configured:

```
npm install polarize-design
```

Or run directly with our web interface:

```
git clone https://github.com/polarize/polarize
cd polarize
npm install
npm start
```

## 10. Contributing

We welcome contributions from the design and development community. Polarize is built for extensibility and customization:

- **Add features** - Extend the visual editor with new capabilities
- **Create templates** - Build design templates for the community
- **Improve documentation** - Help make Polarize more accessible

See our CONTRIBUTING.md for details on how to get involved.

## 11. License

Polarize is released under the Apache-2.0 license. See LICENSE for complete details.

All contributions to Polarize help build a more creative, collaborative design ecosystem.