# penguin-datalayer-core

<div align="center">
<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/centro_de_inovacao_dp6.png" height="100px" />

</div>
<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://www.npmjs.com/package/@dp6/penguin-datalayer-core">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@dp6/penguin-datalayer-core/latest.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/penguin-datalayer-core/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/penguin-datalayer-core&amp;utm_campaign=Badge_Coverage"><img alt="Coverage" src="https://app.codacy.com/project/badge/Coverage/ac10d2fd82a0471889b151b14e560f20"/></a>
  <a href="#badge">
    <img alt="Test" src="https://github.com/dp6/penguin-datalayer-core/actions/workflows/test.yml/badge.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/penguin-datalayer-core/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/penguin-datalayer-core&amp;utm_campaign=Badge_Grade">
    <img alt="Code Quality" src="https://app.codacy.com/project/badge/Grade/ac10d2fd82a0471889b151b14e560f20"/>
  </a>
</p>

### Available Languages

- [Read this page in English](https://github.com/DP6/penguin-datalayer-core/blob/master/README.md)
- [Leia esta página em Português](https://github.com/DP6/penguin-datalayer-core/blob/master/README_pt-BR.md)

---

The penguin-datalayer-core is the validation engine for the penguin-datalayer modules that belongs to raft-suite ecosystem created by DP6 in order to guarantee the [Data Quality](https://en.wikipedia.org/wiki/Data_quality) of the Data Engineering projects implemented on our clients, which is achieved through monitoring and automated data pipelines to guarantee credibility, consistency and availability in the planning, collection and data maintenance steps.

## 1. Requirements for usage

### 1.1 JSON Schema

The JSON Schema is a structure that allow the **validation** of JSON documents. This structure is used in the project because it allows the declaration of expected data formats in the data layer.

#### Supported Data Types

The following Data Types are currently supported within this module:

- String
- Number
- Boolean
- Object
- Array

#### Validation rules

The following validation rules are accepted:

- **Enum (Equals)**: Should be used to validate the **parity** between the schema value _versus_ the value sent to the data layer;
- **Pattern (Regex - String)**: Create regular expressions to validate the values of each key;
- **minItems (Array)**: Validates the minimum itens contained in an array;
- **Required**: Should be used when a given key is required in the data layer

#### JSON Schema Structure

The following structure is a JSON Schema example:

```json
{
  "$schema": "",
  "title": "Schema example",
  "array": {
    "$id": "#/properties/schema",
    "type": "array",
    "items": [
      {
        "type": "object",
        "properties": {
          "event": {
            "type": "string",
            "enum": ["test"]
          },
          "key1": {
            "type": "object",
            "properties": {
              "key1_sub1": {
                "type": "number",
                "enum": [10]
              },
              "key1_sub2": {
                "type": "string",
                "pattern": "teste|test|.*"
              },
              "key1_sub3": {
                "type": "string",
                "enum": ["production"]
              },
              "key1_sub4": {
                "type": "boolean",
                "enum": "desktop|mobile|msite"
              }
            },
            "required": ["key1_sub1", "key1_sub2", "key1_sub3", "key1_sub4"]
          }
        },
        "required": ["event"]
      }
    ]
  }
}
```

### 1.2 Ludwig (schema generator)

DP6 owns an automation that generates a structured validation schema.

### Api Docs

- [Index.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/index.md)
- [datalayer-validation-core.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/atalayer-validation-core.md)
- [schema-parser.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/atalayer-validation-core.md)

## How to contribute

Pull requests welcome! We would love some help to evolve this module. Feel free to search for _open issues_. If there's a new _feature_ or _bug_, please open a new _issue_, so our team can follow up.

### Prerequirements

It will only be accepted contributions that follows the below requirements:

- [Padrão de commit](https://www.conventionalcommits.org/en/v1.0.0/)

## Support:

**DP6 Koopa-troopa Team**

_e-mail: <mailto:koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />
