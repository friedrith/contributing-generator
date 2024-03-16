# contributing-generator

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/friedrith/contributing-generator/release.yml)
![NPM Version](https://img.shields.io/npm/v/contributing-generator)

A smart and interactive prompt to generate documentation in **CONTRIBUTING.md**, **LICENSE**, **CODE_OF_CONDUCT.md**, **package.json**, **SECURITY.md** and **README.md** files for your project.

`contributing-generator` gathers as maximum information as possible from your git configuration, package.json and github profile to generate the files.

<div align="center">
  <img src='https://github.com/friedrith/contributing-generator/assets/4005226/ca24bc9a-d8a4-4f78-bb78-478729138ff4' alt="demo of contributing-generator" height="300">
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

## Why using contributing-generator?

In comparison of other tools, it is smart and interactive. It will detect the license if existing, the year, the organization name from your github or gitlab and a lot of other information.

```bash
? What do you want to generate? license
? Choose a license: MIT # <-- coming from your package.json
? Year: 2024
? Organization: John Smith # <-- coming from your github profile
? Path: (/Users/john/code/contributing-generator)
```

> `contributing-generator` was tested with github, gitlab and bitbucket.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.

```bash
pnpm install # Install dependencies

pnpm dev # Start the project
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
