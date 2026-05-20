// Media generation for HTML to image conversion
import type { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { generateMediaScreenshot } from './media-screenshot-impl.js';

/**
 * Convert HTML content to an image using Puppeteer
 * @param html - HTML content to convert
 * @param options - Options for the conversion
 * @returns Buffer containing the image data
 */
export async function generateHtmlToImage(
  html: string,
  options: {
    width?: number;
    height?: number;
    type?: 'png' | 'jpeg';
    quality?: number;
    fullPage?: boolean;
  } = {}
): Promise<Buffer> {
  const {
    width = 800,
    height = 600,
    type = 'png',
    quality = 90,
    fullPage = false
  } = options;

  // Launch browser with options
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width, height });
    
    // Set content
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Take screenshot
    const screenshotOptions: any = { type };
    if (type === 'jpeg') {
      screenshotOptions.quality = quality;
    }
    
    screenshotOptions.fullPage = fullPage;
    
    const screenshot = await page.screenshot(screenshotOptions);
    await browser.close();
    
    return screenshot;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

/**
 * API endpoint for HTML to image conversion
 */
export async function htmlToImageRoute(req: Request, res: Response) {
  try {
    const { html, ...options } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }
    
    const imageBuffer = await generateHtmlToImage(html, options);
    
    res.set('Content-Type', `image/${options.type || 'png'}`);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate image',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}