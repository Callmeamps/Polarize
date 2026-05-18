import type { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { getProject } from './db.js';
import { isLocalSameOrigin } from './origin-validation.js';

/**
 * HTML to Image conversion endpoint
 * Exposes API endpoint /api/projects/:id/render/image to convert HTML artifacts to PNG/JPG
 */
export async function htmlToImageRoute(req: Request, res: Response, { db, resolvedPortRef, isLocalSameOrigin }: any) {
  if (!isLocalSameOrigin(req, resolvedPortRef.current)) {
    return res.status(403).json({
      error:
        'cross-origin request rejected: HTML to image conversion is restricted to the local UI / CLI',
    });
  }

  try {
    const projectId = req.params.id;
    const project = getProject(db, projectId);
    if (!project) return res.status(404).json({ error: 'project not found' });

    const { html, width = 800, height = 600, type = 'png', quality = 90, fullPage = false } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Generate the image using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width, height });
      await page.setContent(html, { waitUntil: ['load', 'domcontentloaded'] });
      
      const screenshotOptions: any = { type: type as any };
      if (type === 'jpeg') {
        screenshotOptions.quality = quality;
      }
      screenshotOptions.fullPage = fullPage;
      
      const screenshot = await page.screenshot(screenshotOptions);
      await browser.close();
      
      // Return the image as a response
      res.set('Content-Type', `image/${type}`);
      res.send(screenshot);
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    const code = err?.code;
    const body: any = { error: String(err && err.message ? err.message : err) };
    if (code) body.code = code;
    res.status(status).json(body);
  }
}