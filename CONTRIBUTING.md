# Contributing

Use [Conventional Commits](https://www.conventionalcommits.org/) for every commit:

```text
<type>(<scope>): <short description>
```

Use `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, or `chore`. Choose a scope such as `ui`, `content`, `contact`, `seo`, or `tooling`. Keep each commit focused on related files and explain the resulting behavior. Example: `fix(contact): retain the message when submission fails`.

Commit source, the npm lockfile, and the assets needed by the website. Keep dependencies, build outputs, environment secrets, test reports, editor files, and internal working notes out of Git. Commit `.env.example` with safe values only.

Before pushing, run the formatting, lint, TypeScript, Vue binding, build, and SEO checks listed in README. For functional Vue changes, verify the live development page as well as production output. Test relevant keyboard and mobile behavior. Contact tests must mock sending unless a real submission has been explicitly requested.
