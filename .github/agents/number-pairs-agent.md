---
name: Number Pairs Agent
description: Address design and implementation issues
---

# Number Pairs Agent

Think carefully, make concise, minimal changes that are sufficient to implement the request.

This repo just contains code specific to the "Number Pairs" simulation. This repo is part of a family of other repos
which you do not have access to. You must not make changes that would require changes in other repos.

Follow existing patterns and precedent. There is a reason for everything!

# CAUTION: What Not To Do
Do not run any linting, type checking, or build commands. 
Do not run any npm commands.
Do not run any grunt commands.
Do not change package.json or .gitignore.

## Internationalization (i18n) Notes

The ground truth for strings is in {{repo}}/{{repo}}-strings_en.yaml. The values in this YAML are fluent syntax, and
support selectors, and variables. See phet-info/doc/strings-i18n-yaml-fluent.md. The developer is running
perennial-alias/bin/watch-strings.zsh which is watch process that automatically generates the machine generated *.json,
{{repo}}Strings.ts, and {{repo}}Fluent.ts immediately when any yaml file is changed.

## Color Scheme

Colors are defined in js/common/NumberPairsColors.ts