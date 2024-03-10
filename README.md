# contributing-generator

An smart and interactive prompt to generate documentation in **CONTRIBUTING.md**, **LICENSE**, **CODE_OF_CONDUCT.md**, **package.json** and **README.md** files for your project.

It gathers as maximum information as possible from your git configuration, github profile and package.json file to generate the files.

## Get Started

```bash
$ npx contributing-generator

? What do you want to generate? (Use arrow keys)
❯ license
  contributing
  readme
  code_of_conduct
  pull_request_template
```

For example, it will detect the license if existing, the year, the organization name from github:

```bash
? What do you want to generate? license
? Choose a license: MIT
? Year: 2024
? Organization: Thibault Friedrich
? Path: (/Users/thibault/Code/productivity/contributing-generator)
```

> We suggest you to commit your changes before running the generator, as it will overwrite some files and you might want to revert some changes.

Check the templates in the [templates](./templates) folder.

```bash
pnpm install # Install dependencies

pnpm dev # Start the project
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
