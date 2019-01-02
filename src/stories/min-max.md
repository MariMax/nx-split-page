### Min and Max sizes are ajustable

The important thing to note here is `[mainMinSize]="10" sideSize="25%" [sideMinSize]="20"`
I set minSize for main section to 10px and for side section to 20px
`sideSize` will try to ajust size of the side side to provided value, accepts string(percent value or px value 25px for example)


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
<nx-split-page [mainMinSize]="10" sideSize="25%" [sideMinSize]="20">
  <div main-area class="blue">
    content for main section
  </div>
  <div side-area class="red">
    content for side pane
  </div>
</nx-split-page>

```
