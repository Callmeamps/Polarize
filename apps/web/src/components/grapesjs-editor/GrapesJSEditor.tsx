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
      
      try {
        // Import the SDK
        const grapesjs = await import('@grapesjs/studio-sdk');
        
        // Initialize the editor
        const editor = await grapesjs.createStudioEditor({
          // We'll use a demo license key for now
          licenseKey: 'DEMO_LOCALHOST_KEY',
          
          // Root element on which to mount the editor
          root: editorRef.current,
          
          // Default editor theme
          theme: 'dark',
          
          // Project configuration
          project: {
            type: editorType
          },
          
          // Storage configuration
          storage: {
            type: 'self',
            onSave: async ({ project }: { project: any }) => {
              // In a real implementation, this would save to Polarize's file system
              console.log('Saving project:', project);
            },
            onLoad: async () => {
              // In a real implementation, this would load from Polarize's file system
              console.log('Loading project');
              return { project: {} };
            },
            autosaveChanges: 100,
            autosaveIntervalMs: 10000
          },
          
          // Assets configuration
          assets: {
            storageType: 'self',
            onUpload: async ({ files }: { files: File[] }) => {
              // In a real implementation, this would upload to Polarize's asset system
              console.log('Uploading files:', files);
              return [];
            },
            onDelete: async ({ assets }: { assets: any[] }) => {
              // In a real implementation, this would delete assets from Polarize's system
              console.log('Deleting assets:', assets);
            }
          },
          
          // Callback triggered once the editor is ready
          onReady: ({ editor }: { editor: any }) => {
            console.log('Editor is ready:', editor);
          },
          
          // Callback triggered on each update in the editor project
          onUpdate: (projectData: any) => {
            console.log('Project updated:', projectData);
          }
        });
        
        editorInstanceRef.current = editor;
      } catch (error) {
        console.error('Failed to initialize GrapesJS editor:', error);
      }
    };

    initEditor();

    return () => {
      // Cleanup if needed
      if (editorInstanceRef.current) {
        console.log('Cleaning up editor instance');
      }
    };
  }, [editorType]);

  return (
    <div 
      ref={editorRef} 
      style={{ height: '100vh', width: '100%' }}
    />
  );
}