# Polarize Visual Design Tools Documentation

This document provides an overview of the visual design tools implemented in Polarize.

## Table of Contents
1. [HTML-to-Image API](#html-to-image-api)
2. [Image Editor](#image-editor)
3. [GrapesJS Studio SDK](#grapesjs-studio-sdk)
4. [Integration with Project System](#integration-with-project-system)
5. [Technical Architecture](#technical-architecture)
6. [Best Practices](#best-practices)

## HTML-to-Image API

The HTML-to-Image API provides programmatic conversion of HTML content to image formats using a headless browser engine.

### Key Features
- Convert HTML content to PNG/JPG formats
- Customizable image dimensions and quality settings
- Integration with headless browser technology (Puppeteer)
- CORS-protected API access

### API Endpoint
```
POST /api/projects/:id/render/image
```

### Usage
The API accepts a POST request with the following parameters:

| Parameter | Type | Description | Required |
|----------|------|-------------|----------|
| `html` | string | HTML content to convert to image | Yes |
| `width` | number | Width of the output image in pixels | No (default: 800) |
| `height` | number | Height of the output image in pixels | No (default: 600) |
| `type` | string | Image type: 'png' or 'jpeg' | No (default: 'png') |
| `quality` | number | JPEG quality (0-100) | No (default: 90) |
| `fullPage` | boolean | Capture full page or just viewport | No (default: false) |

### Implementation Details
The HTML-to-Image API is implemented using Puppeteer, a Node.js library that provides a high-level API to control Chrome or Chromium. The implementation includes:

1. A dedicated route in the daemon (`/api/projects/:id/render/image`)
2. HTML content rendering using headless browser technology
3. Image format conversion (PNG/JPEG)
4. Quality settings for JPEG output
5. Dimension controls for output images

## Image Editor

The Image Editor provides a WYSIWYG interface for creating and editing visual content with layer-based editing capabilities.

### Key Features
- Layer-based editing system
- Support for multiple layer types (rectangle, text, image, ellipse, canvas, group)
- Real-time preview and editing
- CSS filter support (blur, drop shadows, color adjustments)
- Keyboard shortcuts for efficient editing

### Layer Types
The editor supports the following layer types:
- **Rectangle Layers**: Basic shape layers for backgrounds and UI elements
- **Text Layers**: Rich text editing with font selection and styling
- **Image Layers**: Import and manipulate images
- **Ellipse Layers**: Circular and oval shape elements
- **Canvas Layers**: Full canvas editing capabilities
- **Group Layers**: Organize multiple layers into groups

### Editing Tools
- **Selection Tool**: Select and manipulate existing elements
- **Shape Tools**: Rectangle, ellipse, and custom shape creation
- **Text Tool**: Rich text editing with font customization
- **Image Tool**: Import and manipulate images
- **Canvas Tool**: Full canvas editing capabilities

### Styling and Effects
- **CSS Filters**: Apply visual effects like blur, drop shadows, and color adjustments
- **Opacity Control**: Adjust layer transparency
- **Layer Styling**: Customize colors, borders, and visual properties
- **Typography Controls**: Font selection, sizing, and alignment options

## GrapesJS Studio SDK

The GrapesJS Studio SDK integration provides professional website, email, and document building capabilities through a drag-and-drop interface.

### Supported Project Types
1. **Website Builder**: Full website design capabilities
2. **Email Template Builder**: Email-optimized design tools
3. **Document Builder**: Professional document creation

### Key Features
- Drag-and-drop page building
- Pre-built components and templates
- Real-time preview and editing
- Responsive design support
- Cross-client email compatibility

### Implementation Details
The GrapesJS Studio SDK is implemented as a set of skills in the Polarize framework:

1. **Website Builder**: Professional website design capabilities
2. **Email Template Builder**: Email-optimized design tools
3. **Document Builder**: Professional document creation

Each editor type is implemented as a separate skill that can be accessed through the Polarize interface.

## Integration with Project System

All visual design tools are seamlessly integrated with Polarize's project system, providing:

### Project Integration
- **Auto-save**: Changes automatically saved to project
- **Version History**: Access previous versions of designs
- **Asset Management**: Import and manage project assets
- **Export Options**: Multiple export formats available

### File Management
All designs are seamlessly integrated with Polarize's project system:
- **Storage Integration**: Seamless file system integration
- **Asset Storage**: Media library integration
- **Version Control**: Git-based project tracking
- **Collaboration**: Real-time editing support

## Technical Architecture

### System Components
The visual design tools are built on a robust technical architecture:

#### Core Services
- **HTML-to-Image API**: Headless browser integration
- **Image Editor**: Canvas-based editing system
- **GrapesJS Studio**: Visual design platform

#### Storage Integration
- **Project File System**: Seamless integration with Polarize projects
- **Asset Storage**: Media library integration
- **Version Control**: Git-based tracking
- **Collaboration**: Real-time editing support

## Best Practices

### Performance Optimization
1. **Asset Management**: Optimize media files for web delivery
2. **Component Reuse**: Use templates and reusable elements
3. **Lazy Loading**: Load components on demand
4. **Caching**: Implement proper caching strategies

### Security Considerations
1. **Content Security**: XSS protection and sanitization
2. **Access Control**: Implement proper user permissions
3. **Data Protection**: Secure storage of sensitive information
4. **Authentication**: Proper license key handling

## Conclusion

Polarize's visual design tools provide a comprehensive platform for creating professional graphics and designs. With the HTML-to-Image API, Image Editor, and GrapesJS Studio SDK integration, users have access to powerful design capabilities that integrate seamlessly with the Polarize project system.

The tools are designed for performance, security, and ease of use, providing both novice and experienced designers with the capabilities they need to create professional visual content.