**Methods vs Computed  vs Watch**

1. ## Methods

   - use with event binding or data binding
   - data binding: the method is executed for every re-render cycle of the component
   - use for events or data that really needs to be re-evaluated all the time
2. ## Computed

   - use with data binding
   - Computed properties are only re-evaluated if one of the "used values" changed
   - use for DATA that depends on other data
3. ## Watchers

   - NOT used directly in template
   - allows you to run any code in reaction to some changed data (for ex. send http requests etc.)
   - usse for any non-data update you want to make
4. 
5. 
6. 

## What are Vue.js methods

A Vue method is a function associated with the Vue instance.

Methods are defined inside the `methods` property:

```js
new Vue({
  methods: {
    handleClick: function() {
      alert('test')
    }
  }
})
```

or in the case of Single File Components:

```js
<script>
export default {
  methods: {
    handleClick: function() {
      alert('test')
    }
  }
}
</script>
```

Methods are especially useful when you need to perform an action and you attach a `v-on` directive on an element to handle  **events** . Like this one, which calls `handleClick` when the element is clicked:

```html
<template>
  <a @click="handleClick">Click me!</a>
</template>
```

Pass parameters to Vue.js methods
Methods can accept parameters.

In this case, you just pass the parameter in the template, and you

```html
<template>
  <a @click="handleClick('something')">Click me!</a>
</template>
new Vue({
  methods: {
    handleClick: function(text) {
      alert(text)
    }
  }
})
```
or in the case of Single File Components:
```js
<script>
export default {
  methods: {
    handleClick: function(text) {
      alert(text)
    }
  }
}
</script>
```

How to access data from a method
You can access any of the data properties of the Vue component by using this.propertyName:

<template>
  <a @click="handleClick()">Click me!</a>
</template>

```js
<script>
export default {
  data() {
    return {
      name: 'Irena'
    }
  },
  methods: {
    handleClick: function() {
      console.log(this.name)
    }
  }
}
</script>
```
We don’t have to use `this.data.name`, just `this.name`. Vue does provide a transparent binding for us. Using `this.data.nam`e` will raise an error.

