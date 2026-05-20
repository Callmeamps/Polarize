import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

export async function lintDesignMd(filePath) {
  try {
    const { stdout } = await execFileP('npx', ['@google/design.md', 'lint', filePath, '--format', 'json']);
    return JSON.parse(stdout);
  } catch (err) {
    return { findings: [{ severity: 'error', message: err.message }], summary: { errors: 1, warnings: 0, info: 0 } };
  }
}

export async function diffDesignMd(beforePath, afterPath) {
  try {
    const { stdout } = await execFileP('npx', ['@google/design.md', 'diff', beforePath, afterPath, '--format', 'json']);
    return JSON.parse(stdout);
  } catch (err) {
    return { error: err.message };
  }
}

export async function exportDesignMd(filePath, format) {
  // format: 'tailwind' | 'dtcg'
  try {
    const { stdout } = await execFileP('npx', ['@google/design.md', 'export', '--format', format, filePath]);
    return stdout;
  } catch (err) {
    throw new Error(`Export failed: ${err.message}`);
  }
}
