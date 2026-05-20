# HTML-to-Image API

## Overview

The HTML-to-Image API allows you to convert HTML content into image formats (PNG/JPG) using a headless browser engine. This feature is integrated into the Polarize platform and provides a simple way to generate images from HTML content.

## API Endpoint

```
POST /api/projects/:id/render/image
```

## Request

The API accepts a POST request with the following parameters:

### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `html` | string | HTML content to convert to image | Yes |
| `width` | number | Width of the output image in pixels | No (default: 800) |
| `height` | number | Height of the output image in pixels | No (default: 600) |
| `type` | string | Image type: 'png' or 'jpeg' | No (default: 'png') |
| `quality` | number | JPEG quality (0-100) | No (default: 90) |
| `fullPage` | boolean | Capture full page or just viewport | No (default: false) |

### Example Request

```json
{
  "html": "<div style='background: red; width: 200px; height: 200px;'></div>",
  "width": 800,
  "height": 600,
  "type": "png"
}
```

## Response

The API returns a binary image file in the requested format.

## Usage Examples

### Basic HTML to Image Conversion

```javascript
// Convert simple HTML to PNG
const response = await fetch('/api/projects/12345/render/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: '<div style="background: blue; color: white; padding: 20px;">Hello World</div>',
    width: 800,
    height: 600,
    type: 'png'
  })
});

const imageBlob = await response.blob();
```

### Converting a Web Page to Image

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

## Integration with Skills

The HTML-to-Image API is integrated with the following skills:

1. **html-to-image** - Basic HTML to image conversion
2. **screenshot** - Web page screenshot generation
3. **full-page-screenshot** - Full page screenshot generation

## Security

The API is protected by CORS and can only be accessed from the same origin as the Polarize application.

## Error Handling

The API returns the following HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing HTML content)
- `403` - Forbidden (cross-origin request)
- `500` - Internal Server Error (Puppeteer error)

## Performance Considerations

- Image generation is performed using Puppeteer in headless mode
- Large HTML content may take longer to process
- Recommended maximum image dimensions: 4096x4096 pixels
- For best performance, keep HTML content under 1MB

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per hour per IP address
- 10MB maximum HTML content per request

## Best Practices

1. **Optimize HTML Content**: Keep HTML as simple as possible for faster rendering
2. **Image Size**: Use appropriate dimensions for your use case
3. **Caching**: Consider caching generated images to avoid repeated requests
4. **Error Handling**: Always check for API errors in your implementation

## Example Implementation

```javascript
// Client-side implementation example
async function convertHtmlToImage(html, options = {}) {
  const defaultOptions = {
    width: 800,
    height: 600,
    type: 'png',
    quality: 90
  };
  
  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(`/api/projects/${projectId}/render/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        html: html,
        ...config
      })
    });
    
    if (response.ok) {
      return await response.blob();
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to convert HTML to image:', error);
    }
  }
}
```