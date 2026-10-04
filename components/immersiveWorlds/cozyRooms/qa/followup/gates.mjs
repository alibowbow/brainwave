import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root, here, sourceDigest, gitHead, sha256 } from './common.mjs';

const output = path.resolve(process.env.COZY_OUTPUT || path.join(here, 'evidence/final-gates'));
await mkdir(output, { recursive: true });
const source = await sourceDigest();
const report = { gitHead: gitHead(), source, timestamp: new Date().toISOString(), passed: true, results: [] };
for (const [name, args] of [
  ['typecheck', ['run', 'typecheck']], ['unit-tests', ['test']],
  ['application-build', ['run', 'build']], ['bundle-budget', ['run', 'check:bundle']],
]) {
  const start = performance.now();
  const result = spawnSync('npm', args, { cwd: root, encoding: 'utf8', timeout: 180000 });
  const log = (result.stdout || '') + (result.stderr || '') + (result.error ? `\n${result.error.stack}\n` : '');
  await writeFile(path.join(output, `${name}.log`), log);
  const passed = result.status === 0;
  report.results.push({ name, command: ['npm', ...args], passed, exitCode: result.status, signal: result.signal, elapsedMs: performance.now() - start, log: `${name}.log`, logSHA256: sha256(log) });
  report.passed &&= passed;
  console.log(name, passed ? 'PASS' : 'FAIL');
}
report.sourceUnchanged = (await sourceDigest()).sha256 === source.sha256;
report.passed &&= report.sourceUnchanged;
await writeFile(path.join(output, 'gates.json'), JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
