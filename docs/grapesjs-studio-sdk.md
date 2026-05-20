# GrapesJS Studio SDK Integration

## Overview

The GrapesJS Studio SDK integration provides a powerful visual website, email, and document builder within Polarize. This integration allows users to create professional designs using a drag-and-drop interface with real-time preview capabilities.

## Features

### Website Builder
Create responsive websites with:
- Drag-and-drop page building
- Pre-built components and templates
- Real-time preview and editing
- Responsive design support
- Custom styling and theming

### Email Template Builder
Design professional email templates with:
- Email-optimized components
- Cross-client compatibility
- Pre-built email templates
- Responsive email design tools

### Document Builder
Create documents, reports, and publications with:
- Rich text editing capabilities
- Professional document templates
- Print-ready export options
- Multi-format document support

## Integration Components

### Visual Editor
The GrapesJS Studio SDK provides a comprehensive visual editor with:

#### Canvas Interface
- WYSIWYG editing with live preview
- Component library with drag-and-drop functionality
- Style manager for CSS property editing
- Asset management for images and media

#### Component Library
- **Pre-built Components**: Tables, accordions, galleries, sliders, and more
- **Template System**: Ready-to-use templates for common design patterns
- **Plugin Architecture**: Extensible component system
- **Style Customization**: Flexible styling options

#### Asset Management
- **Image Management**: Upload and manage images
- **File Storage**: Persistent asset storage
- **Media Library**: Organized asset library
- **Version Control**: Asset version tracking

## Usage Examples

### Website Building
```javascript
// Initialize the GrapesJS editor for website building
const editor = await grapesjs.createStudioEditor({
  licenseKey: 'YOUR_LICENSE_KEY',
  root: document.getElementById('editor-container'),
  theme: 'dark',
  project: {
    type: 'web'
  },
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Save project to Polarize's file system
      console.log('Saving project:', project);
    },
    onLoad: async () => {
      // Load project from Polarize's file system
      return { project: {} };
    }
  }
});
```

### Email Template Creation
```javascript
// Create an email template using GrapesJS
const emailEditor = await grapesjs.createStudioEditor({
  licenseKey: 'YOUR_LICENSE_KEY',
  root: document.getElementById('email-editor'),
  theme: 'light',
  project: {
    type: 'email'
  },
  // Custom storage configuration for email templates
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Save email template
      console.log('Saving email template:', project);
    }
  }
});
```

### Document Design
```javascript
// Create a document using GrapesJS
const documentEditor = await grapesjs.createStudioEditor({
  licenseKey: 'YOUR_LICENSE_KEY',
  root: document.getElementById('document-editor'),
  project: {
    type: 'document'
  },
  // Custom document storage
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Save document to storage
      console.log('Saving document:', project);
    }
  }
});
```

## Configuration Options

### Editor Configuration
```javascript
const config = {
  licenseKey: 'YOUR_LICENSE_KEY',
  theme: 'dark', // or 'light'
  storage: {
    type: 'self', // or 'remote'
    autosaveChanges: 100,
    autosaveIntervalMs: 10000
  },
  assets: {
    storageType: 'self',
    onUpload: async ({ files }) => {
      // Handle file uploads
      return [];
    },
    onDelete: async ({ assets }) => {
      // Handle asset deletion
      console.log('Deleting assets:', assets);
    }
  }
};
```

### Project Types
The integration supports three main project types:

1. **Web Projects**: Full website building capabilities
2. **Email Templates**: Email-optimized design tools
3. **Documents**: Professional document creation

## Technical Implementation

### SDK Integration
The GrapesJS Studio SDK is integrated into Polarize with the following components:

#### Core Integration Points
- **Storage System**: Custom storage implementation for Polarize's file system
- **Asset Management**: Integration with Polarize's media library
- **Authentication**: License key management and validation
- **Theme Support**: Dark and light theme options

#### Plugin Architecture
The SDK supports various plugins for extended functionality:

- **Table Component**: Advanced table building
- **Lightbox Component**: Image gallery functionality
- **Gallery Component**: Photo gallery integration
- **Slider Component**: Carousel and slider components
- **Icon Library**: Extensive icon set integration
- **Accordion Component**: Expandable content sections
- **Flexbox Layout**: Modern layout management

### API Usage

#### Basic Editor Setup
```javascript
// Basic editor initialization
import { createStudioEditor } from '@grapesjs/studio-sdk';

const editor = await createStudioEditor({
  licenseKey: 'DEMO_LICENSE_KEY',
  root: document.getElementById('editor-root'),
  theme: 'dark',
  project: {
    type: 'web' // 'web', 'email', or 'document'
  },
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Custom save implementation
      console.log('Project saved:', project);
    }
  }
});
```

#### Advanced Configuration
```javascript
// Advanced editor configuration
const advancedEditor = await createStudioEditor({
  licenseKey: 'LICENSE_KEY',
  root: document.getElementById('advanced-editor'),
  theme: 'dark',
  // Custom storage with callbacks
  storage: {
    type: 'self',
    onSave: async ({ project }) => {
      // Custom save logic
      return { success: true };
    },
    onLoad: async () => {
      // Custom load logic
      return { project: {}};
    },
    autosaveChanges: 50,
    autosaveIntervalMs: 5000
  },
  // Asset handling
  assets: {
    storageType: 'self',
    onUpload: async ({ files }) => {
      // Handle file uploads
      return files.map(file => ({
        id: file.name,
        url: URL.createObjectURL(file)
      }));
    }
  }
});
```

## Best Practices

### Performance Optimization
1. **Asset Management**: Optimize media files for web delivery
2. **Component Reuse**: Use templates and reusable components
3. **Lazy Loading**: Load components only when needed
4. **Caching**: Implement proper caching strategies

### Security Considerations
1. **Content Sanitization**: Validate all user input
2. **Access Control**: Implement proper user permissions
3. **Data Protection**: Secure storage of sensitive information
4. **License Management**: Proper license key handling

### User Experience
1. **Responsive Design**: Ensure cross-device compatibility
2. **Accessibility**: Follow WCAG guidelines
3. **Performance Monitoring**: Optimize for fast loading
4. **Error Handling**: Implement comprehensive error handling

## Troubleshooting

### Common Issues

#### Editor Not Loading
- Verify license key validity
- Check network connectivity
- Ensure proper SDK initialization

#### Performance Problems
- Optimize asset sizes
- Reduce component complexity
- Implement lazy loading

#### Export Issues
- Check file format compatibility
- Verify export settings
- Ensure sufficient storage space

## Integration with Polarize

### Project Integration
The GrapesJS Studio SDK integrates with Polarize through:

1. **File System Integration**: Seamless project file management
2. **Asset Storage**: Integration with Polarize's media library
3. **Version Control**: Git-based version tracking
4. **Collaboration Features**: Real-time collaborative editing

### Customization Options
- **Theme Support**: Dark and light theme options
- **Plugin Architecture**: Extensible component system
- **Custom Components**: Ability to create custom components
- **Styling Options**: Advanced CSS customization

## Example Implementations

### Basic Website Builder
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

### Email Template Designer
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

### Document Builder
```javascript
// Document builder implementation
const documentBuilder = await createStudioEditor({
  licenseKey: 'LICENSE_KEY',
  root: document.getElementById('document-editor'),
  theme: 'dark',
  project: {
    type: 'document'
  },
  storage: {
    type: 'self',
    autosaveChanges: 100
  }
});
```

## API Reference

### Core Methods

#### createStudioEditor(options)
Initializes and returns a new GrapesJS Studio editor instance.

**Parameters:**
- `options` (Object): Configuration options

**Returns:**
- `Promise<Editor>`: Initialized editor instance

### Event System

#### onSave(project)
Called when the project is saved.

#### onLoad()
Called when loading a project.

#### onReady(editor)
Called when the editor is ready.

#### onUpdate(projectData)
Called when the project is updated.

### Storage Interface

#### Storage Configuration
```javascript
{
  type: 'self' | 'remote',
  onSave: async ({ project }) => { ... },
  onLoad: async () => { ... },
  autosaveChanges: number,
  autosaveIntervalMs: number
}
```

#### Asset Management
```javascript
{
  storageType: 'self' | 'remote',
  onUpload: async ({ files }) => { ... },
  onDelete: async ({ assets }) => { ... }
}
```

## Advanced Features

### Plugin System
The GrapesJS Studio SDK supports a comprehensive plugin architecture:

#### Available Plugins
- **Table Component**: Advanced table building
- **Lightbox Component**: Image gallery functionality
- **Gallery Component**: Photo gallery integration
- **Slider Component**: Carousel and slider components
- **Icon Library**: Extensive icon set integration
- **Accordion Component**: Expandable content sections
- **Flexbox Layout**: Modern layout management

### Custom Component Development
```javascript
// Custom component registration
const customComponent = {
  name: 'custom-component',
  extend: 'default',
  init(editor) {
    // Custom initialization
    console.log('Custom component initialized');
  }
};

// Register custom component
editor.addComponent(customComponent);
```

## Security and Performance

### Security Features
- **Content Security**: XSS protection and sanitization
- **Access Control**: Role-based permissions
- **Data Encryption**: Secure storage of sensitive data
- **Authentication**: License key validation

### Performance Optimization
- **Lazy Loading**: Component-based loading
- **Asset Optimization**: Image compression and caching
- **Memory Management**: Efficient resource handling
- **Network Optimization**: CDN and caching strategies

## Support and Documentation

### Resources
- **Official Documentation**: https://grapesjs.com/docs
- **API Reference**: Comprehensive API documentation
- **Community Support**: User forums and community help
- **Video Tutorials**: Step-by-step video guides

### Troubleshooting
Common issues and solutions:
1. **Editor Loading**: Check license key and network connectivity
2. **Asset Management**: Verify storage permissions and quotas
3. **Performance Issues**: Optimize assets and reduce complexity
4. **Export Problems**: Check format compatibility and storage space

## Conclusion

The GrapesJS Studio SDK integration provides a powerful visual design platform within Polarize, offering professional-grade website, email, and document building capabilities. With comprehensive customization options and seamless integration with Polarize's project system, it enables users to create professional designs with minimal technical knowledge while maintaining full control over the design process.