import { useEffect, useRef } from 'react';
import type { Project } from '@open-design/contracts';

interface GrapesJSEditorProps {
  project: Project;
  editorType?: 'web' | 'email' | 'document';
}

export function GrapesJSEditor({ project, editorType = 'web' }: GrapesJSEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import GrapesJS Studio SDK
    const initEditor = async () => {
      if (!editorRef.current) return;
      
      // Clear any existing content
      editorRef.current.innerHTML = '';
      editorRef.current.style.height = '100vh';
      
      try {
        // Import the SDK
        const grapesjs = await import('@grapesjs/studio-sdk');
        
        // Initialize the editor with a simple configuration
        // In a real implementation, this would be more complex
        editorRef.current.innerHTML = `
          <div style="padding: 20px; color: #fff; background: #1a1a1a; height: 100%;">
            <h2>GrapesJS ${editorType} Editor</h2>
            <p>Editor would load here. Integration with full GrapesJS Studio SDK would go here.</p>
            <p>Project: ${project.name}</p>
            <p>Editor Type: ${editorType}</p>
          </div>
        `;
      } catch (error) {
        console.error('Failed to initialize GrapesJS editor:', error);
        editorRef.current.innerHTML = `
          <div style="padding: 20px; color: #fff; background: #1a1a1a; height: 100%;">
            <h2>GrapesJS Editor</h2>
            <p>Error loading editor. Please check console for details.</p>
            <p>Project: ${project.name}</p>
            <p>Editor Type: ${editorType}</p>
          </div>
        `;
      }
    };

    initEditor();

    return () => {
      // Cleanup if needed
      if (editorInstanceRef.current) {
        console.log('Cleaning up editor instance');
      }
    };
  }, [editorType, project.name]);

  return (
    <div 
      ref={editorRef} 
      style={{ height: '100vh', width: '100%' }}
    />
  );
}