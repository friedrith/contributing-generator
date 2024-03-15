# contributing-generator

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/friedrith/contributing-generator/release.yml)
![NPM Version](https://img.shields.io/npm/v/contributing-generator)

A smart and interactive prompt to generate documentation in **CONTRIBUTING.md**, **LICENSE**, **CODE_OF_CONDUCT.md**, **package.json** and **README.md** files for your project.

`contributing-generator` gathers as maximum information as possible from your git configuration, package.json and github profile to generate the files.

<div align="center">
  <img src='https://github.com/friedrith/contributing-generator/assets/4005226/34170dc3-285b-4dc4-b5ff-b7a134f24c0f' height="300">
</div>

## Get Started

```bash
$ npx contributing-generator


? What do you want to generate? (Use arrow keys)
❯ license
  contributing
  readme
  code_of_conduct
  pull_request_template
  package
  security
```

Check the templates of these files in the [templates](./templates) folder.

> We suggest you to commit your changes before running the generator, as it will overwrite some files and you might want to revert some changes.

## Why contributing-generator?

`contributing-generator` is a tool to help you generate a lot of useful markdown files for your project. And it is smart to avoid you to type the same information multiple times.

For example, it will detect the license if existing, the year, the organization name from your github:

```bash
? What do you want to generate? license
? Choose a license: MIT
? Year: 2024
? Organization: John Smith
? Path: (/Users/john/code/contributing-generator)
```

> Contributing works perfectly for github but it still needs to be tested for other git providers.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.

```bash
pnpm install # Install dependencies

pnpm dev # Start the project
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
