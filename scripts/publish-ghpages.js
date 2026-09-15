const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '..');
const buildDir = path.join(repoRoot, 'build');

function resolveGitExecutable() {
  const staticCandidates = [
  process.env.GIT_EXEC_PATH && path.join(process.env.GIT_EXEC_PATH, '..', 'bin', 'git.exe'),
  process.env['ProgramFiles'] && path.join(process.env['ProgramFiles'], 'Git', 'cmd', 'git.exe'),
  process.env['ProgramFiles'] && path.join(process.env['ProgramFiles'], 'Git', 'bin', 'git.exe'),
  process.env['ProgramFiles(x86)'] && path.join(process.env['ProgramFiles(x86)'], 'Git', 'cmd', 'git.exe'),
  ].find((candidate) => candidate && fs.existsSync(candidate));

  if (staticCandidates) return staticCandidates;

  const whereExecutable = path.join(process.env.windir || 'C:\\Windows', 'System32', 'where.exe');
  if (fs.existsSync(whereExecutable)) {
    try {
      const output = execFileSync(whereExecutable, ['git'], {
        cwd: repoRoot,
        encoding: 'utf8',
      });
      const firstMatch = output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find((line) => line.toLowerCase().endsWith('git.exe') && fs.existsSync(line));
      if (firstMatch) return firstMatch;
    } catch {
      // Fall through to the final error below.
    }
  }

  return null;
}

const gitExecutable = resolveGitExecutable();

if (!fs.existsSync(buildDir)) {
  throw new Error('build/ does not exist. Run the build before deploying.');
}

if (!gitExecutable) {
  throw new Error('git executable could not be located in a standard installation path.');
}

const tempRoot = path.join(os.tmpdir(), 'salim-saay-gh-pages');

function runGit(args, cwd) {
  execFileSync(gitExecutable, args, {
    cwd,
    stdio: 'inherit',
  });
}

function removeTarget(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

removeTarget(tempRoot);
const remoteUrl = execFileSync(gitExecutable, ['config', '--get', 'remote.origin.url'], {
  cwd: repoRoot,
  encoding: 'utf8',
}).trim();

try {
  fs.mkdirSync(tempRoot, { recursive: true });
  runGit(['init'], tempRoot);
  runGit(['checkout', '-b', 'gh-pages'], tempRoot);
  runGit(['remote', 'add', 'origin', remoteUrl], tempRoot);

  copyDirectory(buildDir, tempRoot);
  fs.writeFileSync(path.join(tempRoot, '.nojekyll'), '');

  runGit(['add', '-A'], tempRoot);
  runGit(['commit', '-m', `Deploy site: ${new Date().toISOString()}`], tempRoot);
  runGit(['push', 'origin', 'gh-pages', '--force'], tempRoot);
} finally {
  removeTarget(tempRoot);
}