# l7v-core

> Dependency-free logic primitives. The foundation everything else imports.

```bash
npm install l7v-core
```

```js
import { ok, err }   from 'l7v-core/result'
import { parseJSON }  from 'l7v-core/parse'
import { required }   from 'l7v-core/validate'
import { pick }       from 'l7v-core/transform'
import { slugify }    from 'l7v-core/string'

const result = parseJSON('{"port": 3000}')
if (!result.ok) return result.error
const { port } = result.value
```

## Why

Every project needs the same 20 utilities. They're usually copied from Stack Overflow or pulled from lodash for 3 functions. This package is that foundation: explicit, zero-dep, tree-shakeable.

## Structure

```
core/
├── result.js      # ok/err type — no throwing
├── parse.js       # Safe parsers (JSON, number, date, boolean)
├── validate.js    # Input validation primitives
├── transform.js   # Data transformation utilities
└── string.js      # String utilities
```

## API

### result

```js
import { ok, err, isOk, isErr, unwrap, map, chain } from 'l7v-core/result'

const r = ok(42)           // { ok: true, value: 42 }
const e = err('not found') // { ok: false, error: 'not found' }

map(r, x => x * 2)         // ok(84)
chain(r, x => x > 0 ? ok(x) : err('negative'))
```

### parse

```js
import { parseJSON, parseNumber, parseDate, parseBoolean } from 'l7v-core/parse'

parseJSON('{"a":1}')   // ok({ a: 1 })
parseJSON('bad json')  // err('parseJSON: ...')
parseNumber('42')      // ok(42)
parseNumber('nope')    // err('parseNumber: ...')
```

### validate

```js
import { required, minLength, isEmail, inRange } from 'l7v-core/validate'

required('', 'email')         // err('email is required')
minLength('hi', 5, 'name')    // err('name must be at least 5 characters')
isEmail('a@b.com')            // ok('a@b.com')
inRange(5, 1, 10, 'score')    // ok(5)
```

### transform

```js
import { pick, omit, groupBy, unique, chunk, deepMerge } from 'l7v-core/transform'

pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])   // { a: 1, c: 3 }
groupBy([1,2,3,4], x => x % 2 === 0 ? 'even' : 'odd')
chunk([1,2,3,4,5], 2)                     // [[1,2],[3,4],[5]]
```

### string

```js
import { slugify, truncate, capitalize, camelToKebab } from 'l7v-core/string'

slugify('Hello World!')     // 'hello-world'
truncate('Long text', 8)    // 'Long ...'
camelToKebab('myModuleName') // 'my-module-name'
```

## Philosophy

Simple by design. Composable by nature.

→ [l7v principles](https://github.com/l7v-dev)
