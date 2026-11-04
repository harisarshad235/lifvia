# Graph Report - lifvia  (2026-11-04)

## Corpus Check
- 25 files · ~20,965 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 5, .properties 2)

## Summary
- 130 nodes · 131 edges · 23 communities (8 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `64d5ab90`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- with
- server.mjs
- ExampleInstrumentedTest.java
- package.json
- MainActivity.java
- build-apk.yml
- state.js
- manifest.json
- auth.js
- scripts
- CLAUDE.md
- .claude/CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `with` - 8 edges
2. `steps` - 7 edges
3. `scripts` - 6 edges
4. `ExampleInstrumentedTest` - 4 edges
5. `onRequestPost()` - 4 edges
6. `server` - 4 edges
7. `MainActivity` - 3 edges
8. `getAuthenticatedUserId()` - 3 edges
9. `getBearerToken()` - 3 edges
10. `build-apk` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (23 total, 15 thin omitted)

### Community 0 - "with"
Cohesion: 0.13
Nodes (15): steps, GITHUB_TOKEN, env, name, run, uses, with, working-directory (+7 more)

### Community 1 - "server.mjs"
Cohesion: 0.16
Nodes (8): db, dbPath, __dirname, getFreshInitialState(), getUserIdFromReq(), hashPassword(), schemaSql, server

### Community 3 - "package.json"
Cohesion: 0.21
Nodes (11): dependencies, @capacitor/android@^8.0.0, @capacitor/cli@^8.0.0, @capacitor/core@^8.0.0, description, name, type, version (+3 more)

### Community 5 - "build-apk.yml"
Cohesion: 0.18
Nodes (10): runs-on, jobs, build-apk, name, on, push, workflow_dispatch, permissions (+2 more)

### Community 6 - "state.js"
Cohesion: 0.24
Nodes (4): CORS_HEADERS, getAuthenticatedUserId(), onRequestGet(), onRequestPost()

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "auth.js"
Cohesion: 0.39
Nodes (6): CORS_HEADERS, getBearerToken(), getFreshInitialState(), hashPassword(), onRequestGet(), onRequestPost()

### Community 9 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, cap:open, cap:sync, deploy, dev, start

## Knowledge Gaps
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `steps` connect `with` to `build-apk.yml`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `build-apk` connect `build-apk.yml` to `with`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._