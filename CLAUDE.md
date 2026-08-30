# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Minimal Express backend (learning project) written in TypeScript, run as an ESM Node module (`"type": "module"` in package.json).

## Commands

- `yarn build` — compile `src/` to `dist/` via `tsc` (rootDir `src`, outDir `dist`)
- `yarn watch` — `tsc -w`, recompiles on change
- `yarn dev` — run `dist/index.js` under nodemon (requires a prior build/watch)
- `yarn start` — run compiled `dist/index.js` directly
- `yarn test` — run the Jest suite (`ts-jest` preset, `testEnvironment: "node"`)
- Single test file: `yarn test __tests__/index.ts`
- Single test by name: `yarn test -t "<test name>"`


## Architecture

- `src/index.ts` is the entire application: it creates and exports the Express `app`, defines an in-memory `db.courses` array, and wires all `/courses` routes directly on `app`. There is no router/controller/service layering yet — everything lives in this one file.
- `Status` is a local enum of HTTP status codes used instead of numeric literals.
- The server listens only when the module runs directly; `app` is also exported so `__tests__/index.ts` can drive it with `supertest` without binding a port.
- `pages/` holds static HTML (`home.html`, `about.html`) and `assets/` holds static images; neither is currently wired up to the Express app (no `express.static` call in `src/index.ts`).
- TypeScript config (`tsconfig.json`) targets `nodenext` modules/resolution and `esnext`, with `strict`, `verbatimModuleSyntax`, and `isolatedModules` on — keep imports/exports ESM-compliant (explicit `.js` extensions in relative imports, as seen in `__tests__/index.ts`).
