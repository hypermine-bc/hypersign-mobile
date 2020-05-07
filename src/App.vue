<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeDestroy () {
    this.$store.commit('wallet/UPDATE_ADDRESS', '')
  }
}
</script>

<style>
</style>
