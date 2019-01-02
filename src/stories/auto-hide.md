### Side pane could be hidden automatically

If you will make main part wide enough and screen won't be able to fit both sections, side pane will be automatically hidden

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
<nx-split-page [mainMinSize]="10000" [sideMinSize]="280">
  <div main-area class="blue">
    content for main section
  </div>
  <div side-area class="red">
    content for side pane
  </div>
</nx-split-page>

```
