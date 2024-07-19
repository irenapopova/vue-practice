## Directives

Directives are attributes identified by the `v-` prefix.

| Directive     | Description                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `v-text`    | uses the property as the text value of the element                                                                             |
| `v-html`    | uses the property as the text value of the element, interpreting HTML                                                          |
| `v-if`      | show an element only if the conditional is true                                                                                |
| `v-else`    | shows an alternative element if the preceding `v-if` is false                                                                |
| `v-else-if` | adds an else if block for a `v-if` construct                                                                                 |
| `v-show`    | similar to `v-if`, but adds the element to the DOM even if falsy. Just sets it to `display: none`.                         |
| `v-for`     | iterates over an array or iterable object                                                                                      |
| `v-on`      | listen to DOM events                                                                                                           |
| `v-bind`    | reactively update an HTML attribute                                                                                            |
| `v-model`   | sets up a two-way binding for form inputs. used in form elements, updates the model when the user changes the form field value |
| `v-once`    | applies the property just once, and never refreshes it even if the data passed changes                                         |

`v-bind` and `v-on` have a shorthand format:

```
<a v-bind:href="url">...</a>
<a :href="url">...</a>
```

```
<a v-on:click="doSomething">...</a>
<a @click="doSomething">...</a>
```

Example of `v-if` / `v-else` / `v-else-if`:

```
<div v-if="type === 'A'">
  it's A
</div>
<div v-else-if="type === 'B'">
  it's B
</div>
<div v-else-if="type === 'C'">
  it's C
</div>
<div v-else>
  it's neither one
</div>
```

### Conditionals

You can embed a conditional in an expression using the ternary operator:

```
{{ isTrue ? 'yes' : 'no' }}
```

## Working with form elements

To make the model update when the change event occurs, and not any time the user presses a key, you can use `v-model.lazy` instead of just `v.model`.

Working with input fields, v-model.trim `` is useful because it automatically removes whitespace.

And if you accept a number instead than a string, make sure you use `v-model.number`.
