<template>
  <el-container>
  <el-header style="padding: 0;">
      <el-menu
        :default-active="activeIndex"
        class="menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="1" :route="{ name: 'top' }" class="title-logo">SBG Graphs</el-menu-item>
        <el-menu-item index="2" :route="{ name: 'hit' }">HITS</el-menu-item>
        <el-menu-item index="3" :route="{ name: 'ball' }">BALLS</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
        activeIndex: ''
    }
  },
  mounted() {
    this.activeIndex = this.$route.name;
  }
}
</script>

<style>
body{
  background-color: #F4F5F7;
  color: #333;
}
h2 {
    color: #333;
    font-size: 24px;
    line-height: 1.6em;
    padding: 0 0 2px 12px;
    border-left: 4px solid #545c64;
    border-bottom: 1px solid #545c64;
}
.title-logo{
  font-size: 150% !important;
}
.menu{
  font-family: 'Odibee Sans', cursive;
}
.el-menu-item a{
  text-decoration: none !important;
}

</style>
