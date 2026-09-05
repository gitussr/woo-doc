#!/usr/bin/env bash
# Build the static export and publish it to the gh-pages branch, which
# GitHub Pages is configured to serve from (classic branch deploy, not
# Actions — see CLAUDE.md). Re-run this any time main should go live.
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

remote_url="$(git remote get-url origin)"
# Accepts both git@github.com:owner/repo.git and https://github.com/owner/repo.git
slug="$(echo "$remote_url" | sed -E 's#^git@github\.com:##; s#^https://github\.com/##; s#\.git$##')"
owner="${slug%%/*}"
repo="${slug##*/}"

branch="gh-pages"
worktree_dir="$repo_root/.git/gh-pages-worktree"

echo "==> Building static export (GITHUB_PAGES=true)"
rm -rf out
GITHUB_PAGES=true npm run build
touch out/.nojekyll

if ! git show-ref --verify --quiet "refs/heads/$branch"; then
  if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
    git fetch origin "$branch:$branch"
  fi
fi

if [ -d "$worktree_dir" ]; then
  echo "==> Reusing existing gh-pages worktree"
  git -C "$worktree_dir" fetch origin "$branch" --quiet || true
  git -C "$worktree_dir" checkout "$branch" --quiet
  git -C "$worktree_dir" reset --hard "origin/$branch" --quiet 2>/dev/null || true
elif git show-ref --verify --quiet "refs/heads/$branch"; then
  echo "==> Adding worktree for existing gh-pages branch"
  git worktree add "$worktree_dir" "$branch"
else
  echo "==> Creating orphan gh-pages branch"
  git worktree add --orphan -b "$branch" "$worktree_dir"
fi

echo "==> Syncing build output into the worktree"
git -C "$worktree_dir" rm -rf --quiet . 2>/dev/null || true
find "$worktree_dir" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r out/. "$worktree_dir/"
git -C "$worktree_dir" add -A

source_commit="$(git rev-parse --short HEAD)"
if git -C "$worktree_dir" diff --cached --quiet; then
  echo "==> Nothing changed since the last deploy — skipping commit/push"
else
  git -C "$worktree_dir" commit -q -m "Deploy: static export from main @ ${source_commit}"
  git -C "$worktree_dir" push origin "$branch"
  echo "==> Pushed gh-pages @ $(git -C "$worktree_dir" rev-parse --short HEAD)"
fi

if command -v gh >/dev/null 2>&1; then
  echo "==> Triggering a Pages build"
  gh api -X POST "repos/$owner/$repo/pages/builds" >/dev/null 2>&1 || true
fi

echo "==> Live at https://${owner}.github.io/${repo}/"
