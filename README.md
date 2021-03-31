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
  <a href="https://codecov.io/gh/dp6/penguin-datalayer-core">
    <img src="https://codecov.io/gh/dp6/penguin-datalayer-core/branch/master/graph/badge.svg?token=5A41M182AJ"/>
  </a>
  <a href="#badge">
    <img alt="Test" src="https://github.com/dp6/penguin-datalayer-core/actions/workflows/test.yml/badge.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/penguin-datalayer-core/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/penguin-datalayer-core&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/ac10d2fd82a0471889b151b14e560f20"/>
  </a>
</p>

O penguin-datalayer-core é o motor de validação dos modulos penguin-datalayer que pertence ao ecossitema raf-suite criado pela DP6 para garantir a qualidade dos dados ([Data Quality](https://en.wikipedia.org/wiki/Data_quality)) nos projetos de engenharia de dados implementados nos clientes, através de monitoramento e pipelines automatizadas de dados, visando garantir a credibilidade, consistência e disponibilidade nas fases de planejamento, coleta e manutenção dos dados.

## 1. Requisitos para utilização

### 1.1 JSON Schema

O JSON Schema é uma estrutura que permite a **validação** de documentos JSON. Esta estrutura é utilizada no projeto pois permite a declaração dos formatos de dados esperados dentro da camada de dados, esse estrutura utiliza o modelo da lib Ajv.

#### Tipos Suportados

Os seguintes tipos de dados são suportados:

- String
- Number
- Boolean
- Object
- Array

#### Regras de validação

As seguintes regras para validação são aceitas:

- **Enum (Equals)**: A ser utilizada quando houver a necessidade de validar a **igualdade** entre o valor informado no schema *versus* o que foi enviado para a camada de dados
- **Pattern (Regex - String)**: É possível criar expressões regulares para validar valores das chaves 
- **minItems (Array)**: Valida o número mínimo de itens contidos no array
- **Required**: Quando houver a obrigatoriedade de validar uma determinada chave


#### Estrutura do JSON Schema

A estrutura a seguir é um exemplo de um JSON Schema:

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
            "enum": ["teste"]
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
                "enum": ["producao"]
              },
              "key1_sub4": {
                "type": "boolean",
                "enum": "desktop|mobile|msite"
              },
            },
            "required": [
              "key1_sub1",
              "key1_sub2",
              "key1_sub3",
              "key1_sub4"
            ]
          }
        },"required": ["event"]
      },
    ]
  }
}

```

### 1.2 Ludwig gerador de Schemas

A DP6 possui uma automação para geração estruturada do schema de validação.

### Api Docs

- [Index.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/index.md)
- [datalayer-validation-core.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/atalayer-validation-core.md)
- [schema-parser.js](https://github.com/dp6/penguin-datalayer-core/blob/master/docs/atalayer-validation-core.md)

## Como contribuir

Pull requests são bem-vindos! Nós vamos adorar ajuda para evoluir esse modulo. Senta-se livre para navegar por open issues buscando por algo que possa fazer. Caso temha uma nova feature ou bug, por favor abra uma nova issue para ser acompanhada pelo nosso time.

### Requisitos obrigatórios

Só serão aceito as contribuições que estiverem seguindo os seguintes requisitos:

- [Padrão de commit](https://www.conventionalcommits.org/en/v1.0.0/)

## Suporte:

**DP6 Koopa-troopa Team**

_e-mail: <koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />
