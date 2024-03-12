# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

## Found an Issue?

Thank you for reporting any issues you find. We do our best to test and make this project as solid as possible, but any reported issue is a real help.

Please follow these guidelines when reporting issues:

- Create a new issue in the [issue tracker](https://github.com/friedrith/contributing-generator/issues/new/choose).
- Follow the provided template and fill out all fields
- Be awesome and consider contributing a [pull request](#want-to-contribute)

## Want to contribute?

You consider contributing changes to this project – we dig that!
Please consider these guidelines when filing a pull request:

- Make sure you read the [Code of Conduct](CODE_OF_CONDUCT.md)
- Fork the repository
- Create a new branch
- Make your changes
  - Follow the [Coding Rules](#coding-rules)
  - Follow the [Commit Rules](#commit-rules)
  - Follow [Test guidelines](#tests)
- Create a pull request
  - Make sure you rebased the current master branch
  - Squash your commits
  - Provide a short title with a maximum of 100 characters
  - Provide a more detailed description containing
    _ What you want to achieve
    _ What you changed
    _ What you added
    _ What you removed
- For significant changes, post also an issue before to know if your idea has a chance to be accepted

## Coding Rules

To keep the code base of commitlint neat and tidy the following rules apply to every change

- `prettier` is king
- `eslint` is awesome
- Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra)
- Be awesome

> use commands `pnpm lint` and `pnpm format` to be sure your code
> respect coding rules.

> You can also use `npx prettier --write .` to fix prettier errors

## Commit Rules

To help everyone with understanding the commit history of commitlint the following commit rules are enforced.

- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)
- present tense
- maximum of 100 characters
- for bugs, includes the github tag of the issue in the description.
- message format of `$type($scope): $message`
- use authorized types: build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test

> Using the right type is really important since it is used to increase the version number automatically.

## Test

If you add a feature or fix a bug, you need to provide a unit test verifying your
improvement.You can launch tests using `pnpm test`.

Please follow [AAA pattern](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80)
when writing tests.

## Versioning

This project use [standard-version](https://github.com/conventional-changelog/standard-version) to handle versioning
automatically.

**May the force be with you !!**
