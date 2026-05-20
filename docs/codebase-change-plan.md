# Codebase Change Plan — Format-Agnostic Open Design

**Date**: 2026-04-30  
**Status**: Active  
**Goal**: Make Open Design truly format-agnostic, supporting both Claude Code's `SKILL.md` and Google's `DESIGN.md` as first-class citizens.

---

## Completed Work ✓

### 1. Pi Agent Integration
- [x] Added Pi to `daemon/agents.js` with dynamic model loading from `~/.pi/agent/settings.json`
- [x] Added `handlePiEvent()` to `daemon/json-event-stream.js` for Pi's JSON output
- [x] Updated all agent lists in docs to include Pi
- [x] Build verified: typecheck ✓, build ✓

### 2. Documentation — Format-Agnostic Messaging
- [x] **README.md**: Added "format-agnostic" messaging, Google's design.md to references
- [x] **README.zh-CN.md**: Added "格式无关" messaging
- [x] **docs/spec.md**: Updated core bets table for dual-format support
- [x] **docs/references.md**: Added `google-labs-code/design.md` entry
- [x] **CONTRIBUTING.md**: Added format-agnostic section
- [x] **QUICKSTART.md**: Added format-agnostic messaging

---

## Phase 2: CLI Tools Integration (Medium Priority)

### Goal
Integrate `@google/design.md` CLI tools for linting, diffing, and exporting design tokens.

### Changes Required

#### 2.1 Install Package
```bash
cd /home/callmeamps/open-design
npm install @google/design.md
```

#### 2.2 Create `daemon/design-lint.js`
Wrapper for `@google/design.md` CLI tools:

```javascript
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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
```

#### 2.3 Update Design System Import
File: `scripts/sync-design-systems.mjs`

```javascript
// After downloading DESIGN.md, run lint
import { lintDesignMd } from '../daemon/design-lint.js';

async function importDesignSystem(system) {
  // ... existing download logic ...
  
  // Lint the DESIGN.md
  const lintResult = await lintDesignMd(designMdPath);
  
  // Save lint findings to metadata
  const metadata = {
    name: system.name,
    // ... other fields ...
    lintFindings: lintResult.findings || [],
    lintSummary: lintResult.summary || {},
  };
  
  // ... save metadata ...
}
```

#### 2.4 Surface Lint Findings in UI
Files to update:
- `src/components/DesignSystemBrowser.tsx` — Show warning/error icons based on lint results
- `src/types/design-system.ts` — Add `lintFindings` and `lintSummary` fields

### Success Criteria
- [ ] `npm install @google/design.md` completes without errors
- [ ] `lintDesignMd()` returns structured JSON for valid/invalid DESIGN.md files
- [ ] Design system imports automatically lint and store findings
- [ ] UI shows lint status icons (✓ / ⚠️ / ❌) in design system browser

---

## Phase 3: Design System Import Validation (Medium Priority)

### Goal
Validate all 71 design systems against Google's DESIGN.md spec during import.

### Changes Required

#### 3.1 Update `scripts/sync-design-systems.mjs`
- Run `design.md lint` on each imported system
- Skip systems with lint errors (or flag them)
- Generate lint report at `design-systems/lint-report.json`

#### 3.2 Add Lint Report UI
New file: `src/app/api/design-systems/lint-report/route.ts`

```typescript
export async function GET() {
  const report = JSON.parse(readFileSync('design-systems/lint-report.json', 'utf-8'));
  return Response.json(report);
}
```

New component: `src/components/LintReport.tsx`
- Table showing all design systems and their lint status
- Filter by severity (errors/warnings/info)
- Link to view specific findings

### Success Criteria
- [ ] All 71 design systems linted on import
- [ ] Lint report accessible via API
- [ ] UI shows lint status for each design system

---

## Phase 4: Dual-Format Skill Support (Low Priority, Future)

### Goal
Investigate supporting Google's emerging skill format alongside Claude Code's SKILL.md.

### Research Needed
- [ ] Check if Google Labs has a skill format specification
- [ ] Compare Google skill format vs Claude Code SKILL.md
- [ ] Determine if skills and design systems should use different formats (current approach) or unify

### Possible Changes
- `daemon/skill-loader.js` — Detect and load both formats
- `src/types/skill.ts` — Add format field (`skill-md` | `design-md`)
- Update skill picker UI to show format badge

### Success Criteria
- [ ] Research complete with recommendation
- [ ] Prototype implementation if format unification is feasible

---

## Phase 5: Testing & Validation

### 5.1 Pi Agent Testing
- [ ] Start daemon: `pnpm daemon`
- [ ] Open `http://localhost:3000`
- [ ] Go to Settings → Verify Pi appears with 55+ models from settings.json
- [ ] Select Pi → Pick a skill → Send a prompt
- [ ] Verify streaming works (text_delta events)
- [ ] Verify usage stats appear (turn_end event)

### 5.2 Format-Agnostic Validation
- [ ] Load a Claude Code-style SKILL.md skill → Verify it works
- [ ] Load a Google-style DESIGN.md design system → Verify it works
- [ ] Check that both can be used together (skill reads DESIGN.md)

### 5.3 CLI Tools Testing
- [ ] Run `npx @google/design.md lint design-systems/airbnb/DESIGN.md`
- [ ] Verify lint results appear in UI
- [ ] Test diff and export commands

---

## Timeline Estimate

| Phase | Work | Estimated Time |
|-------|------|----------------|
| Phase 2: CLI Tools | Install, wrapper, import integration, UI | 2-3 hours |
| Phase 3: Import Validation | Script update, lint report, UI | 1-2 hours |
| Phase 4: Dual-Format | Research only (no implementation yet) | 1 hour |
| Phase 5: Testing | Pi agent, format-agnostic, CLI tools | 1-2 hours |
| **Total** | | **5-8 hours** |

---

## Summary

**Completed**: Pi integration ✓, Documentation updates ✓  
**Next**: Phase 2 (CLI tools integration) — highest impact, medium effort  
**Future**: Phase 3-4 based on Phase 2 results

**Verification**: Each phase has success criteria that can be verified independently.
