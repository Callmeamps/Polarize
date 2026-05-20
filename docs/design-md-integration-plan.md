# Design.md Integration Plan

## Goal

Make Open Design **format-agnostic** — support both Claude Code's `SKILL.md` convention and Google's `DESIGN.md` specification as first-class citizens. The project's main goal is to be an open-source design alternative that works with any design system format.

## Current State

- **Skills**: Follow Claude Code's `SKILL.md` convention with extended `od:` frontmatter
- **Design Systems**: 71 systems imported from `awesome-design-md` (which follows Google's DESIGN.md format)
- **Documentation**: Mentions Claude Design as reference point, less emphasis on Google's DESIGN.md spec

## Integration Plan

### 1. Documentation Updates (High Priority)

**Files to update:**
- `README.md` — Add Google's design.md as referenced project, emphasize agnostic design goal
- `README.zh-CN.md` — Same updates in Chinese
- `docs/spec.md` — Clarify format-agnostic architecture
- `docs/references.md` — Add Google Labs design.md as referenced project
- `CONTRIBUTING.md` — Update skill section to mention both formats
- `QUICKSTART.md` — Reflect agnostic design goal

**Key messaging:**
> "Open Design is format-agnostic. It supports Claude Code's SKILL.md convention for skills and Google's DESIGN.md specification for design systems. Drop any compatible skill or design system into the project — the daemon detects and uses it."

### 2. Add Google's CLI Tools (Medium Priority)

Install and integrate `@google/design.md` for:
- **Linting**: Validate DESIGN.md files against the spec
- **Diff**: Compare design system versions
- **Export**: Convert tokens to Tailwind/DTCG formats

```bash
npm install @google/design.md
```

Add to daemon:
- `daemon/design-lint.js` — Wrapper for `@google/design.md lint`
- Validate design systems on import
- Surface lint findings in the UI

### 3. Update Design System Import (Medium Priority)

Update `scripts/sync-design-systems.mjs`:
- Use Google's `design.md lint` to validate imported systems
- Add lint findings to design system metadata
- Show warnings in the design system browser

### 4. Dual-Format Skill Support (Low Priority)

Investigate supporting both:
- Claude Code `SKILL.md` (current)
- Google's emerging skill format (if any)

Currently, skills and design systems use different conventions — this is intentional:
- Skills = behavioral instructions (SKILL.md)
- Design Systems = visual identity (DESIGN.md)

### 5. Update References Section

Add to README.md References table:
| [`google-labs-code/design.md`](https://github.com/google-labs-code/design.md) | The DESIGN.md format specification. YAML frontmatter + markdown prose for design systems. Google Stitch uses this format. Our 71 design systems follow this spec. |

## Success Criteria

1. [x] README clearly states "format-agnostic" as a core goal
2. [x] Google's design.md listed as a referenced project
3. [x] All documentation updated to reflect dual-format support
4. [ ] `@google/design.md` CLI tools integrated (optional, nice-to-have)
5. [ ] Design system imports validated against Google's spec

## Completed Updates

1. **README.md** — Added "format-agnostic" messaging, Google's design.md to references
2. **README.zh-CN.md** — Added "格式无关" messaging
3. **docs/spec.md** — Updated core bets table to show dual-format support
4. **docs/references.md** — Added google-labs-code/design.md entry
5. **CONTRIBUTING.md** — Added format-agnostic messaging
6. **QUICKSTART.md** — Added format-agnostic messaging
7. **daemon/agents.js** — Pi agent reads models from ~/.pi/agent/settings.json
8. **daemon/json-event-stream.js** — Added Pi event handler

## Timeline

- **Phase 1** (1-2 hours): Documentation updates
- **Phase 2** (2-3 hours): CLI tools integration
- **Phase 3** (1 hour): Design system import validation
- **Phase 4** (future): Dual-format skill support if needed
