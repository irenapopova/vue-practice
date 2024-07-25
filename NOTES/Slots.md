# Slots

Slots are a powerful tool for creating reusable components in Vue.js, though they aren’t the simplest feature to understand. Vue’s slots take component-based development to a whole new level, and while in this article you will discover a lot of great ways slots can be used, there are countless more out there. 

Slots are a mechanism for Vue components that allows you to compose your components in a way other than the strict parent-child relationship. Slots give you an outlet to place content in new places or make components more generic. The best way to understand them is to see them in action. Let’s start with a simple example:

```js
// frame.vue
<template>
  <div class="frame">
    <slot></slot>
  </div>
</template>
```

This component has a wrapper div. Let’s pretend that div is there to create a stylistic frame around its content. This component is able to be used generically to wrap a frame around any content you want. Let’s see what it looks like to use it. The frame component here refers to the component we just made above.

```js
// app.vue
<template>
  <frame><img src="an-image.jpg"></frame>
</template>
```


The content that is between the opening and closing frame tags will get inserted into the frame component where the slot is, replacing the slot tags. This is the most basic way of doing it. You can also specify default content to go into a slot simply by filling it in:

```js
// frame.vue
<template>
  <slot>This is the default content if nothing gets specified to go here</slot>
  </div>
</template>
```

So now if we use it like this instead:

```js
// app.vue
<template>
  <frame />
</template>
```


The default text of “This is the default content if nothing gets specified to go here” will show up, but if we use it as we did before, the default text will be overridden by the img tag.

# MULTIPLE/NAMED SLOTS #
You can add multiple slots to a component, but if you do, all but one of them is required to have a name. If there is one without a name, it is the default slot. Here’s how you create multiple slots:

```js
// titled-frame.vue
<template>
  <div class="frame">
    <header><h2><slot name="header">Title</slot></h2></header>
    <slot>This is the default content if nothing gets specified to go here</slot>
  </div>
</template>
```


We kept the same default slot, but this time we added a slot named header where you can enter a title. You use it like this:

```js
// app.vue
<template>
  <titled-frame>
    <template v-slot:header>
      <!-- The code below goes into the header slot -->
      My Image’s Title
    </template>
    <!-- The code below goes into the default slot -->
    <img src="an-image.jpg">
  </titled-frame>
</template>
```


Just like before, if we want to add content to the default slot, just put it directly inside the titled-frame component. To add content to a named slot, though, we needed to wrap the code in a template tag with a v-slot directive. 
You add a colon `(:)` after **v-slot** and then write the name of the slot you want the content to be passed to. 

🛑  Note that `v-slot `is new to Vue 2.6, so if you’re using an older version, you’ll need to read the docs about the deprecated slot syntax.

# SCOPED SLOTS #
One more thing you’ll need to know is that slots can **pass data/functions down to their children**. To demonstrate this, we’ll need a completely different example component with slots, one that’s even more contrived than the previous one: let’s sorta copy the example from the docs by creating a component that supplies the data about the current user to its slots:

```js
// current-user.vue
<template>
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
</template>

<script>
export default {
  data () {
    return {
      user: ...
    }
  }
}
</script>

```


This component has a property called user with details about the user. By default, the component shows the user’s last name, but note that it is using `v-bind` to bind the user data to the `slot`. With that, we can use this component to provide the user data to its descendant:

```js
// app.vue
<template>
  <current-user>
    <template v-slot:default="slotProps">{{ slotProps.user.firstName }}</template>    
  </current-user>
</template>

```


To get access to the data passed to the slot, we specify the name of the scope variable with the value of the v-slot directive.

There are a few notes to take here:

We specified the name of default, though we don’t need to for the default slot. 
Instead we could just use `v-slot="slotProps"`.

No need to use `slotProps` as the name. You can call it whatever you want.
If you’re only using a default slot, you can skip that inner template tag and put the `v-slot` directive directly onto the current-user tag.

Can use object destructuring to create direct references to the scoped slot data rather than using a single variable name. 
In other words, you can use `v-slot="{user}"` instead of `v-slot="slotProps"` and then you can use user directly instead of `slotProps.user`.
Taking those notes into account, the above example can be rewritten like this:

```js
// app.vue
<template>
  <current-user v-slot="{user}">
    {{ user.firstName }}
  </current-user>
</template>
```

 👉 A couple more things to keep in mind:

You can bind more than one value with `v-bind `directives. So in the example, I could have done more than just user.
You can pass functions to `scoped slots` too. 
Many libraries use this to provide reusable functional components.

`v-slot` has an alias of #. So instead of writing `v-slot:header="data"`, you can write `#header="data"`. 

You can also just specify `#header` instead of `v-slot:header` when you’re not using scoped slots. 
As for default slots, you’ll need to specify the name of default when you use the alias. In other words, you’ll need to write `#default="data"` instead of `#="data"`.
