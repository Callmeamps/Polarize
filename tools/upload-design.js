// Upload a custom DESIGN.md file
import fs from 'node:fs';
import path from 'node:path';

export async function handleDesignSystemUpload(req, res) {
  const DESIGN_SYSTEMS_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'design-systems');
  try {
    if (!req.file) return res.status(400).json({ error: 'DESIGN.md file required' });
    const originalName = req.file.originalname || 'custom-design.md';
    if (!/\.md$/i.test(originalName)) {
      fs.promises.unlink(req.file.path).catch(() => {});
      return res.status(400).json({ error: 'expected a .md file' });
    }
    const raw = await fs.promises.readFile(req.file.path, 'utf8');
    if (!/^#\s+/.test(raw)) {
      fs.promises.unlink(req.file.path).catch(() => {});
      return res.status(400).json({ error: 'file must be a valid DESIGN.md with a # heading' });
    }
    const titleMatch = /^#\s+(.+?)$/m.exec(raw);
    const baseSlug = (req.body.slug || titleMatch?.[1] || path.basename(originalName, '.md')).toString().replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const slug = baseSlug.replace(/^-+|-+$/g, '');
    if (!slug) return res.status(400).json({ error: 'could not generate a valid slug' });
    const targetDir = path.join(DESIGN_SYSTEMS_DIR, slug);
    await fs.promises.mkdir(targetDir, { recursive: true });
    await fs.promises.rename(req.file.path, path.join(targetDir, 'DESIGN.md'));
    res.json({ id: slug, title: titleMatch?.[1] || slug, message: 'design system added' });
  } catch (err) {
    if (req.file?.path) fs.promises.unlink(req.file.path).catch(() => {});
    res.status(500).json({ error: String(err) });
  }
}
