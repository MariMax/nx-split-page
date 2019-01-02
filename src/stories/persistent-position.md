### Slider can save divider's position into local storage

#### Tempalte for this example looks like code below

The important thing to note here is `storageSettingsKey="localStorageKey"`
storageSettingsKey accepts any string and this string will be used as a localStorage key to save
dividers position

this how it looks like in local storage `localStorageKey: "281|236"`

Try it, move it to any position you want and refresh the page

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
<nx-split-page storageSettingsKey="localStorageKey" [mainMinSize]="100" [sideMinSize]="50">
  <div main-area class="blue">
    content for main section
  </div>
  <div side-area class="red">
    content for side pane
  </div>
</nx-split-page>

```
