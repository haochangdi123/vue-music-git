<template>
  <div id="app">
    <header-component></header-component>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/Header';
import Tab from '@/components/tab/Tab';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    Tab
  }
};
</script>

<style lang="scss">
</style>
