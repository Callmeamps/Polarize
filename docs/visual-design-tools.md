# Visual Design Tools

Polarize includes advanced visual design tools that enable users to create professional graphics and designs directly within the application.

## HTML-to-Image API

The HTML-to-Image API allows conversion of HTML content into image formats using a headless browser engine. This API is integrated into the Polarize platform and provides programmatic access to image generation capabilities.

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
|-----------|------|-------------|----------|
| `html` | string | HTML content to convert to image | Yes |
| `width` | number | Width of the output image in pixels | No (default: 800) |
| `height` | number | Height of the output image in pixels | No (default: 600) |
| `type` | string | Image type: 'png' or 'jpeg' | No (default: 'png') |
| `quality` | number | JPEG quality (0-100) | No (default: 90) |
| `fullPage` | boolean | Capture full page or just viewport | No (default: false) |

## Image Editor

The Image Editor provides a WYSIWYG interface for creating and editing visual content with layer-based editing capabilities.

### Key Features
- Layer-based editing system
- Support for multiple layer types (rectangle, text, image, ellipse, canvas, group)
- Real-time preview and editing
- CSS filter support (blur, drop shadows, color adjustments)
- Keyboard shortcuts for efficient editing

### Editing Tools
- **Selection Tool**: Select and manipulate elements
- **Shape Tools**: Rectangle, ellipse, and custom shape creation
- **Text Tool**: Rich text editing with font customization
- **Image Tool**: Import and manipulate images
- **Canvas Tool**: Full canvas editing capabilities

## GrapesJS Studio SDK Integration

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

## Integration with Polarize

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

## Technical Architecture

### System Components
The visual design tools are built on a robust technical architecture:

#### 1. Core Services
- **HTML-to-Image API**: Headless browser integration
- **Image Editor**: Canvas-based editing system
- **GrapesJS Studio**: Visual design platform

#### 2. Storage Integration
- **Project File System**: Seamless integration with Polarize projects
- **Asset Storage**: Media library integration
- **Version Control**: Git-based tracking
- **Collaboration**: Real-time editing support

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