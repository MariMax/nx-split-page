### Allows to change storage key

component it will save a position to storage and on key change will try to ajust to new conditions

try it yourself, just open knobs and change storgae keys

#### Tempalte for this example looks like code below

```
<style>
.long-content {
  background-color: #D13A32;
  min-height: 500px;
  width: 100%;
}
.short-content {
  background-color: #0460a9;
  height: 100px;
  width: 100%;
}
</style>
<nx-split-page [storageSettingsKey]="variableKey" [mainMinSize]="100" [sideMinSize]="50">
  <div main-area class="long-content">
  </div>
  <div side-area class="short-content">
  </div>
</nx-split-page>

```
