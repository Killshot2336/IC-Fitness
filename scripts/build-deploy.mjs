#!/usr/bin/env node
/**
 * Production build for Vercel/static hosts.
 * 1. Builds React tier-demo bundle into assets/
 * 2. Copies index.html + assets into dist/
 */
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

execSync('vite build', { cwd: root, stdio: 'inherit' });

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(resolve(root, 'index.html'), resolve(dist, 'index.html'));
cpSync(resolve(root, 'assets'), resolve(dist, 'assets'), { recursive: true });

console.log('Deploy build complete → dist/');
