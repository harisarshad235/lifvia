# Graph Report - lifvia  (2026-11-04)

## Corpus Check
- 28 files · ~28,966 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 5, .properties 2)

## Summary
- 221 nodes · 344 edges · 22 communities (8 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f9bbded7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- with
- server.mjs
- ExampleInstrumentedTest.java
- package.json
- MainActivity.java
- app.inline.js
- showToast
- manifest.json
- auth.js
- steps
- CLAUDE.md
- .claude/CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `showToast()` - 25 edges
2. `formatPKR()` - 19 edges
3. `saveState()` - 16 edges
4. `renderAll()` - 15 edges
5. `renderSimulator()` - 8 edges
6. `with` - 8 edges
7. `deleteUserAccount()` - 7 edges
8. `closeModal()` - 7 edges
9. `steps` - 7 edges
10. `getFreshState()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `toggleTheme()` --calls--> `showToast()`  [EXTRACTED]
  ui-src/app.inline.js → ui-src/app.inline.js  _Bridges community 5 → community 6_

## Import Cycles
- None detected.

## Communities (22 total, 14 thin omitted)

### Community 0 - "with"
Cohesion: 0.08
Nodes (25): runs-on, steps, GITHUB_TOKEN, jobs, build-apk, name, on, push (+17 more)

### Community 1 - "server.mjs"
Cohesion: 0.16
Nodes (8): db, dbPath, __dirname, getFreshInitialState(), getUserIdFromReq(), hashPassword(), schemaSql, server

### Community 3 - "package.json"
Cohesion: 0.13
Nodes (17): dependencies, @capacitor/android@^8.0.0, @capacitor/cli@^8.0.0, @capacitor/core@^8.0.0, description, name, scripts, cap:open (+9 more)

### Community 5 - "app.inline.js"
Cohesion: 0.13
Nodes (37): applySimPreset(), applyTheme(), avatarMarkup(), checkInitialSession(), coverOverspending(), enterAuthenticatedApp(), escapeHTML(), formatPKR() (+29 more)

### Community 6 - "showToast"
Cohesion: 0.11
Nodes (32): authAction(), changePassword(), clearAllMyData(), closeModal(), deleteAccount(), deleteTransaction(), deleteUserAccount(), exportBackupJSON() (+24 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "auth.js"
Cohesion: 0.15
Nodes (10): CORS_HEADERS, getBearerToken(), getFreshInitialState(), hashPassword(), onRequestGet(), onRequestPost(), CORS_HEADERS, getAuthenticatedUserId() (+2 more)

### Community 9 - "steps"
Cohesion: 0.11
Nodes (18): if, runs-on, steps, jobs, graphify, name, on, pull_request (+10 more)

## Knowledge Gaps
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._
- **Should `app.inline.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12944523470839261 - nodes in this community are weakly interconnected._
- **Should `showToast` be split into smaller, more focused modules?**
  _Cohesion score 0.10887096774193548 - nodes in this community are weakly interconnected._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._