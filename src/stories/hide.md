### Side pane could be hidden

The important thing to note here is `[hideSidebar]="true"` you actually can toggle it in KNOBS section
this option tells splitter to show/hide side pane, it still will be rendered, just hidden, this is why plitter is longer than text

#### Tempalte for this example looks like code below

```
<style>
  .red {
    background-color: #D13A32;
    color: white;
    padding: 1em;
    border-left: 1px solid gray;
  }
  .blue {
    background-color: #0460a9;
    color: white;
    padding: 1em;
    border-right: 1px solid gray;
  }
</style>
<nx-split-page [hideSidebar]="true" [mainMinSize]="10" [sideMinSize]="20">
  <div main-area class="blue">
    content for main section
  </div>
  <div side-area class="red">
    content for side pane
  </div>
</nx-split-page>

```
