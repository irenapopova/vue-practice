MUTATIONS CONCEP

- mutaition takes an object and in this object we can define methods

Object-Style Commit
An alternative way to commit a mutation is by directly using an object that has a type property:
```js
store.commit({
  type: 'increment',
  amount: 10
})
```
When using `object-style` commit, the entire object will be passed as the payload to mutation handlers, so the handler remains the same:

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

Mutations and actions are at the core of Vuex. They not only allow you to change your state, but also serve an organizational and structural role in Vuex as a whole.

The only problem with Vuex mutations and actions is that it can be confusing to determine when and how they should be used. This can lead to unnecessary boilerplate, using anti-patterns, and other undesired consequences.


# Mutations and actions in Vuex

In Vuex, mutations are the only means through which you can change a store’s state. They’re relatively simple and well-known to all Vuex users.

The confusion starts when you throw actions into the mix. When learning Vuex, it can take a while for the difference between actions and mutations to become clear. Often, devs might end up looking at this code:

```js
mutations: {
  setName(state, name) {
    state.name = name;
  },
},
actions: {
  setName({ commit }, name) {
    commit('setName', name);
  },
},
```

Without looking at any mutations, it should still be fairly clear what is happening:

Before the API call starts, a loading flag is set
Then, the call returns asynchronously using a promise
Then, the call will commit the response data, followed by stopLoading, which most likely unsets the loading flag
There is a design choice made in the code above that is worth noting: it uses two mutations where one could suffice. The startLoading/stopLoading mutations could be replaced by a single mutation (setLoading) with a boolean payload, and then stopLoading could instead be commit(‘setLoading’, false).

The above example requires two mutations, which means more code to maintain. This reasoning is the same as the recommendation that CSS classes not be named for the style they apply, but rather the meaning of the style  —  i.e., don’t call it redAndBold, but rather activeMenuItem.

By calling the mutation set<Property>, it means the interface abstracts nothing; any change to the implementation will probably mean changes to the interface. We’ll look at an example shortly where mutation abstraction pays off.

Keeping mutations focused only on particular tasks is a good practice. It becomes a great advantage when debugging your global state in search for bugs thanks to history tracking and Vue DevTools.

The only way to actually change state in a Vuex store is by committing a mutation. Vuex mutations are very similar to events: each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will receive the state as the first argument:

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    }
  }
})
```

You cannot directly call a mutation handler. Think of it more like event registration: "When a mutation with type increment is triggered, call this handler." To invoke a mutation handler, you need to call store.commit with its type:
```js
store.commit('increment')
```

# What are mutations in Vuex?

Vuex is the state management library for Vuejs. Vuex makes use of a central state to manage its store data. It only allows a change of its state through the use of mutations.

Another point of note is that Vuex only allows the execution of synchronous codes in its handler functions. This is because asynchronous calls in mutations can be difficult to debug.

For example, when you call two mutations containing asynchronous callbacks to change the state, it is difficult to know which one will change the state. A mutation is meant to do a single thing, update the state and nothing else.

# Sample mutation
In the below code, we can see the state and mutation object in the store. The changeStatus mutation is used to update the value of status in the state.

Hence, once the changeStatus mutation is triggered anywhere in the codebase it results in the update of the status value.
```js
const store = new Vuex.Store({
  state: {
    status: false
  },
  mutations: {
    changeStatus (state) {
      !state.status
    }
  }
})
```
# Calling mutations

To trigger a mutation, the store.commit function needs to be called.

To trigger the changeStatus mutation we created above, we simply need to input the following:

```js
store.commit('changeStatus')
```

# Commit with payload

An additional argument can also be sent to the store.commit, this argument is known as the mutation payload.

In the example below, the payload here is 1 and has been received as val in the count mutation. It is used to increment the value of count in the store state:
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
 mutations: {
    count (state, val) {
      state.count += val
    }
  }
})
```

Here the payload is 1:
```js
store.commit('count', 1)
```

The type of the payload can also be an object:

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
 mutations: {
    count (state, payload) {
      state.count += payload.count
    }
  }
})
```

The payload here is an object with value { count: 1 }:

store.commit('count', { count: 1 })

# Use in components

To have access to our mutations in our components, we simply call the this.$store.commit('mutationKey').

In the example below, when the Increment button is clicked and the count method is called, it triggers the count mutation by committing the mutation. This results in an update of the count value in the store. To see this in action, we proceeded to show the value of the count state by rendering the getCount computed value.

The getCount computed value accesses the state to get the value of count:

```html

const Counter = {
  template: `<div> 
<span>{{ getCount }}<span> 
<br/>
<button @click="count(1)"> Increment</button>
</div>`,
computed: {
    getCount () {
      return this.$store.state.count
    }
  },
  methods: {
    count (val) {
      return this.$store.commit('count', { count: val })
    }
  }
}
```
Alternatively, we can use `mapMutations`:

```js

import { mapMutations } from 'vuex'

export default {
  computed: {

 ...mapMutations([
      'count', // map `this.count()` to `this.$store.commit('count')`
    ]),
 }
}

```