# Visual Design Tools Guide

This guide provides comprehensive information about using the visual design tools available in Polarize.

## Overview

Polarize provides a comprehensive suite of visual design tools that enable users to create professional graphics and designs. These tools include:

1. **HTML-to-Image API** - Programmatic conversion of HTML to image formats
2. **Image Editor** - WYSIWYG visual design editor with layer-based editing
3. **GrapesJS Studio SDK** - Professional website, email, and document builder

## HTML-to-Image API

The HTML-to-Image API allows you to convert HTML content into image formats (PNG/JPG) using a headless browser engine.

### API Endpoint
```
POST /api/projects/:id/render/image
```

### Request Parameters
The API accepts a POST request with the following parameters:

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `html` | string | HTML content to convert to image | Yes |
| `width` | number | Width of the output image in pixels | No (default: 800) |
| `height` | number | Height of the output image in pixels | No (default: 600) |
| `type` | string | Image type: 'png' or 'jpeg' | No (default: 'png') |
| `quality` | number | JPEG quality (0-100) | No (default: 90) |
| `fullPage` | boolean | Capture full page or just viewport | No (default: false) |

### Usage Examples

#### Basic HTML to Image Conversion
```javascript
// Convert simple HTML to PNG
const response = await fetch('/api/projects/12345/render/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: '<div style="background: red; width: 200px; height: 200px;">Hello World</div>',
    width: 800,
    height: 600,
    type: 'png'
  })
});
```

#### Converting a Web Page to Image
```javascript
// Convert a complete HTML page to image
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { 
      width: 800px; 
      height: 600px; 
      background: linear-gradient(45deg, #f0f0f0, #ccc);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
  </div>
</body>
</html>
`;

const response = await fetch('/api/projects/12345/render/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: htmlContent,
    width: 1024,
    height: 768,
    type: 'png'
  })
});
```

## Image Editor

The Image Editor provides a comprehensive WYSIWYG interface for creating and editing visual content.

### Features

#### Canvas-Based Editing
- Layer-based editing system with support for multiple layer types
- Real-time preview and editing
- Support for text, shapes, images, and effects
- Zoom and pan functionality for detailed editing

#### Layer Types
The editor supports the following layer types:
- **Rectangle Layers**: Basic shape layers for backgrounds and UI elements
- **Text Layers**: Rich text editing with font selection and styling
- **Image Layers**: Import and manipulate images within the editor
- **Ellipse Layers**: Circular and oval shape elements
- **Canvas Layers**: Full canvas editing capabilities
- **Group Layers**: Organize multiple layers into groups

#### Editing Tools
- **Selection Tool**: Select and manipulate existing elements
- **Rectangle Tool**: Create rectangular shapes
- **Ellipse Tool**: Create circular shapes
- **Text Tool**: Add and edit text elements
- **Image Tool**: Import and position images
- **Canvas Tool**: Edit the main canvas properties

#### Styling and Effects
- **CSS Filters**: Apply visual effects like blur, drop shadows, and color adjustments
- **Opacity Control**: Adjust layer transparency
- **Layer Styling**: Customize colors, borders, and visual properties
- **Typography Controls**: Font selection, sizing, and alignment options

### User Interface

#### Toolbar
The toolbar provides quick access to essential editing functions:
- Tool selection (select, rectangle, ellipse, text, image, canvas)
- Undo/Redo functionality
- Zoom controls
- Layer management

#### Canvas Area
The main editing area where visual elements are created and manipulated:
- Real-time preview of designs
- Grid-based layout for precise positioning
- Zoom and pan capabilities
- Layer selection and manipulation

#### Properties Panel
The properties panel allows detailed editing of selected elements:
- Position and size controls
- Color and style pickers
- Layer visibility and locking
- Opacity adjustment
- Text content editing

#### Layers Panel
Manage all layers in the current project:
- Layer hierarchy and organization
- Visibility toggles
- Layer deletion and duplication
- Layer ordering controls

## GrapesJS Studio SDK

The GrapesJS Studio SDK integration provides professional website, email, and document building capabilities.

### Key Features
- Drag-and-drop page building
- Pre-built components and templates
- Real-time preview and editing
- Responsive design support
- Cross-client email compatibility

### Getting Started

#### Website Building
```javascript
// Basic website builder implementation
import { createStudioEditor } from '@grapesjs/studio-sdk';

const websiteEditor = await createStudioEditor({
  licenseKey: 'LICENSE_KEY',
  root: document.getElementById('website-editor'),
  theme: 'dark',
  project: {
    type: 'web'
  },
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Save to Polarize's file system
      console.log('Website project saved:', project);
    }
  }
});
```

#### Email Template Creation
```javascript
// Email template designer
const emailEditor = await createStudioEditor({
  licenseKey: 'LICENSE_KEY',
  root: document.getElementById('email-editor'),
  theme: 'light',
  project: {
    type: 'email'
  },
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Save email template
      console.log('Email template saved:', project);
    }
  }
});
```

#### Document Design
```javascript
// Document builder implementation
const documentBuilder = await createStudioEditor({
  licenseKey: 'LICENSE_KEY',
  root: document.getElementById('document-editor'),
  project: {
    type: 'document'
  },
  storage: {
    type: 'self',
    autosaveChanges: 100
  }
});
```

## Integration with Projects

### Project Integration
All visual design tools are seamlessly integrated with Polarize's project system:

#### File System Integration
- **Storage Integration**: Seamless file system integration
- **Asset Storage**: Media library integration
- **Version Control**: Git-based project tracking
- **Collaboration**: Real-time editing support

### Best Practices

#### Performance Optimization
1. **Optimize Asset Sizes**: Compress images and media files
2. **Component Reuse**: Use templates and reusable elements
3. **Lazy Loading**: Load components on demand
4. **Caching**: Implement proper caching strategies

#### Security Considerations
1. **Content Security**: XSS protection and sanitization
2. **Access Control**: Implement proper user permissions
3. **Data Protection**: Secure storage of sensitive information
4. **Authentication**: Proper license key handling

## Technical Implementation

### System Components

#### Core Services
- **HTML-to-Image API**: Headless browser integration
- **Image Editor**: Canvas-based editing system
- **GrapesJS Studio**: Visual design platform

#### Storage Integration
- **Project File System**: Seamless integration with Polarize projects
- **Asset Storage**: Media library integration
- **Version Control**: Git-based tracking
- **Collaboration**: Real-time editing support

### API Usage

#### HTML-to-Image Service
```
POST /api/projects/:id/render/image
Content-Type: application/json
{
  "html": "<div>Content</div>",
  "width": 800,
  "height": 600,
  "type": "png"
}
```

#### Response
Binary image file in requested format

### Error Handling

#### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `403` - Forbidden
- `500` - Internal Server Error

## Security Model

### Access Control
- **User Permissions**: Role-based access control
- **Project Sharing**: Secure collaboration
- **Version History**: Audit trail maintenance
- **Data Protection**: Encrypted storage

### Authentication
- **License Management**: Proper key validation
- **Content Security**: XSS protection
- **Access Control**: Permission systems
- **Data Encryption**: Secure storage

## Performance Optimization

### Asset Management
1. **Image Optimization**: Compression and caching
2. **Memory Management**: Efficient resource handling
3. **Network Optimization**: CDN and caching strategies
4. **Lazy Loading**: Component-based loading

### Best Practices
1. **Asset Optimization**: Compress media files
2. **Component Reuse**: Templates and reusable elements
3. **Lazy Loading**: Load components on demand
4. **Caching**: Implement proper strategies

## Troubleshooting

### Common Issues

#### Editor Not Loading
- Check license key validity
- Verify network connectivity
- Ensure proper SDK initialization

#### Performance Problems
- Optimize asset sizes
- Reduce component complexity
- Implement lazy loading

#### Export Issues
- Check file format compatibility
- Verify export settings
- Ensure sufficient storage space

## Conclusion

Polarize's visual design tools provide a comprehensive platform for creating professional graphics and designs. With the HTML-to-Image API, Image Editor, and GrapesJS Studio SDK integration, users have access to powerful design capabilities that integrate seamlessly with the Polarize project system.

The tools are designed for performance, security, and ease of use, providing both novice and experienced designers with the capabilities they need to create professional visual content.