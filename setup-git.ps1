# One-time setup: installs dependencies and creates a clean, staged commit
# history for this repo. Run this from inside the ceylon-tour-range folder
# in PowerShell:
#
#   .\setup-git.ps1
#
# Then create an empty repo on GitHub (no README/license/gitignore — this
# folder already has those) and run:
#   git remote add origin <your-repo-url>
#   git branch -M main
#   git push -u origin main

$ErrorActionPreference = "Stop"

Write-Host "Installing dependencies..."
npm install

Write-Host "Initializing git..."
git init -q

Write-Host "Staging and committing in logical steps..."

git add package.json tsconfig.json next.config.ts eslint.config.mjs postcss.config.mjs .gitignore
git commit -q -m "chore: scaffold Next.js 16 project with TypeScript, Tailwind v4, ESLint"

git add src/app/globals.css src/lib/types.ts src/lib/data/trails.ts
git commit -q -m "feat: add design tokens and trail data model"

git add src/app/layout.tsx src/components/layout/
git commit -q -m "feat: add site layout shell (navbar, footer, social placeholders)"

git add src/components/ui/
git commit -q -m "feat: add shared UI primitives (Container, SectionHeading, Button, PlaceholderImage)"

git add src/app/page.tsx src/components/home/
git commit -q -m "feat: build homepage (hero, trail showcase, how it works)"

git add src/app/trails/ src/components/trails/
git commit -q -m "feat: add trail listing and trail detail pages"

git add src/app/plan/ src/components/plan/
git commit -q -m "feat: add structural trip builder skeleton"

git add src/app/trips/ src/app/about/ src/app/contact/
git commit -q -m "feat: add stub pages (my trips, about, contact)"

git add public/images README.md
git commit -q -m "docs: add README with stack, structure, and stage plan"

git add -A
git commit -q -m "chore: add remaining project files"

Write-Host ""
Write-Host "Done. Log:"
git log --oneline

Write-Host ""
Write-Host "Next: create an empty repo on GitHub, then:"
Write-Host "  git remote add origin <your-repo-url>"
Write-Host "  git branch -M main"
Write-Host "  git push -u origin main"
