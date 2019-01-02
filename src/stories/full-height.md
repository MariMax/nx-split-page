### Scroll content inside

if you want it to take the whole screen vertically, it's possible to do with css `height: 100vh;`
just add class to the `nx-split-page` component or to it's wrapper
and allow content to scroll by adding `overflow-y: auto;` to the sections

#### Tempalte for this example looks like code below

```
<style>
  .root {
    height: 100vh;
  }
  .red {
    background-color: #D13A32;
    color: white;
    padding: 1em;
    border-left: 1px solid gray;
    overflow-y: auto;
  }
  .blue {
    background-color: #0460a9;
    color: white;
    padding: 1em;
    border-right: 1px solid gray;
    overflow-y: auto;
  }
</style>
<nx-split-page [mainMinSize]="10" [sideMinSize]="20" class="root">
  <div main-area class="blue">
    long content for main section
  </div>
  <div side-area class="red">
    long content for side pane
  </div>
</nx-split-page>

```
