# Security

Please report security issues privately to **hello@aimebase.com** rather than opening a public issue.

## Supply-chain policy

- Dependency lifecycle scripts are disabled (`.npmrc`: `ignore-scripts=true`).
- New package versions must be at least 3 days old before they can be installed (`minimum-release-age`).
- Installs use the committed `pnpm-lock.yaml` only (`frozen-lockfile`).
- Dependabot opens update PRs with a 7-day cooldown; every update is reviewed by a person before merging.
- This repository has no GitHub Actions workflows and stores no secrets. Credentials live only in the hosting provider's
  environment settings, never in the repo.
