<template>
  <div id="app">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
// Seperate the TypeScript file from SFC in order to trigger tslint in VSCode.
import App from "./app-script";
export default App;
</script>

<style>
</style>
