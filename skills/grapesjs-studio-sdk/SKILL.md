---
name: grapesjs-studio-sdk
description: |
  Full-featured visual website, email, and document builder powered by GrapesJS Studio SDK. Drag-and-drop page builder with components, templates, and export to HTML/CSS.
triggers:
  - "build a website"
  - "create a landing page"
  - "design a webpage"
  - "visual website editor"
  - "drag and drop website"
  - "web page builder"
  - "edit website visually"
  - "grapesjs"
od:
  mode: design-system
  category: web-artifacts
  upstream: "https://github.com/grapesjs/studio-sdk"
---

# grapesjs-studio-sdk

> Visual website, email, and document builder

## What it does

GrapesJS Studio SDK is a powerful visual editor that enables users to build websites, email templates, and documents through a drag-and-drop interface. It provides:

- **Visual Editor** - WYSIWYG editing with live preview
- **Component Library** - Pre-built blocks (tables, accordions, galleries, sliders, etc.)
- **Style Manager** - CSS property editing via UI
- **Asset Manager** - Image/file management
- **Export** - Generate clean HTML/CSS output
- **Themes** - Light/dark mode support
- **Project Types** - Web, Email, and Document templates

## Source

- GitHub: https://github.com/grapesjs/studio-sdk
- Documentation: https://app.grapesjs.com/docs-sdk/
- Demo: https://app.grapesjs.com

## How to use

This skill invokes the GrapesJS Studio SDK to create visual web experiences. The editor runs in the browser and provides:

1. **Canvas** - Visual drag-and-drop editing area
2. **Blocks Panel** - Pre-built components to add
3. **Style Manager** - Edit CSS properties
4. **Layers** - Manage element hierarchy
5. **Traits** - Edit element attributes

### Basic Usage

To create a website:
1. Open a project in Polarize
2. Ask the agent to use the grapesjs-studio-sdk skill
3. The editor will initialize with a blank page or template
4. Add blocks from the panel, style them, and export

### Configuration Options

The SDK supports customization:
- Custom theme colors
- Plugin system for extended components
- Custom asset/storage handlers
- Autosave settings

### Available Plugins

- `tableComponent` - Table blocks
- `fsLightboxComponent` - Image lightbox
- `lightGalleryComponent` - Gallery
- `swiperComponent` - Carousel/slider
- `iconifyComponent` - Icon library
- `accordionComponent` - Accordion blocks
- `flexComponent` - Flexbox layouts
- `prosemirror` - Rich text editing
- `canvasGridMode` - Grid editing mode

## Integration Notes

To integrate with Polarize:
- Use `storage.onSave` to persist project data to Polarize's file system
- Use `assets.onUpload` to upload images to Polarize's asset system
- The editor can run in an iframe within Polarize's preview system