## Functions

<dl>
<dt><a href="#validationResult">validationResult(status, message, dlObject, objectName, keyName)</a></dt>
<dd></dd>
<dt><a href="#checkValidEvent">checkValidEvent(schemaItem, dataLayer)</a></dt>
<dd></dd>
<dt><a href="#revalidateSchema">revalidateSchema(shadowSchema, errorMessage, dataLayer, schemaIndex, schemaArray, dlObj)</a></dt>
<dd></dd>
<dt><a href="#checkMissingProperty">checkMissingProperty(schemaItem, dataLayer)</a></dt>
<dd></dd>
<dt><a href="#checkErrorsPerSchema">checkErrorsPerSchema(schemaItem, dataLayer)</a></dt>
<dd></dd>
<dt><a href="#checkMissingEvents">checkMissingEvents(schemaItem, dataLayer)</a></dt>
<dd></dd>
<dt><a href="#validate">validate(schema, dataLayer, callback)</a></dt>
<dd><p>Valida as chaves da camada de dados com base no schema informado</p>
</dd>
<dt><a href="#trace">trace(log)</a></dt>
<dd><p>Enviado o log para o stdout, se somente se, a variável debugging = true</p>
</dd>
<dt><a href="#parseEvent">parseEvent(event)</a></dt>
<dd><p>Converte a chave para objeto de verificação</p>
</dd>
<dt><a href="#parseToDataLayer">parseToDataLayer(items)</a></dt>
<dd><p>Converte a regra de validação para a respesentação da camada de dados.</p>
</dd>
</dl>

<a name="validationResult"></a>

## validationResult(status, message, dlObject, objectName, keyName)

**Kind**: global function

| Param      | Type            |
| ---------- | --------------- |
| status     | <code>\*</code> |
| message    | <code>\*</code> |
| dlObject   | <code>\*</code> |
| objectName | <code>\*</code> |
| keyName    | <code>\*</code> |

<a name="checkValidEvent"></a>

## checkValidEvent(schemaItem, dataLayer)

**Kind**: global function

| Param      | Type            |
| ---------- | --------------- |
| schemaItem | <code>\*</code> |
| dataLayer  | <code>\*</code> |

<a name="revalidateSchema"></a>

## revalidateSchema(shadowSchema, errorMessage, dataLayer, schemaIndex, schemaArray, dlObj)

**Kind**: global function

| Param        | Type            |
| ------------ | --------------- |
| shadowSchema | <code>\*</code> |
| errorMessage | <code>\*</code> |
| dataLayer    | <code>\*</code> |
| schemaIndex  | <code>\*</code> |
| schemaArray  | <code>\*</code> |
| dlObj        | <code>\*</code> |

<a name="checkMissingProperty"></a>

## checkMissingProperty(schemaItem, dataLayer)

**Kind**: global function

| Param      | Type            |
| ---------- | --------------- |
| schemaItem | <code>\*</code> |
| dataLayer  | <code>\*</code> |

<a name="checkErrorsPerSchema"></a>

## checkErrorsPerSchema(schemaItem, dataLayer)

**Kind**: global function

| Param      | Type            |
| ---------- | --------------- |
| schemaItem | <code>\*</code> |
| dataLayer  | <code>\*</code> |

<a name="checkMissingEvents"></a>

## checkMissingEvents(schemaItem, dataLayer)

**Kind**: global function

| Param      | Type            |
| ---------- | --------------- |
| schemaItem | <code>\*</code> |
| dataLayer  | <code>\*</code> |

<a name="validate"></a>

## validate(schema, dataLayer, callback)

Valida as chaves da camada de dados com base no schema informado

**Kind**: global function

| Param     | Type                | Description                                                                                                |
| --------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| schema    | <code>object</code> | Json com as regras de validação da camada                                                                  |
| dataLayer | <code>object</code> | Json com as chaves da camada de dados                                                                      |
| callback  | <code>\*</code>     | Função que será executada após o sucesso da validação, como parâmetro um array com o status das validações |

<a name="trace"></a>

## trace(log)

Enviado o log para o stdout, se somente se, a variável debugging = true

**Kind**: global function

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| log   | <code>Object</code> | Que será apresentado no stdout |

<a name="parseEvent"></a>

## parseEvent(event)

Converte a chave para objeto de verificação

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| event | <code>Object</code> |

<a name="parseToDataLayer"></a>

## parseToDataLayer(items)

Converte a regra de validação para a respesentação da camada de dados.

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| items | <code>Object</code> |
