<template>
  <div class="container">
    <div>
      note:
    </div>
    <div class="note" v-for="(n,index) in notes" :key="index">{{index + 1}} 、{{n}}</div>
  </div>
</template>

<script lang="ts" setup>
const notes = ["sleep before 10.30"];
</script>

<style scoped lang="less">
.container {
  padding: 0 100px;
}
.note {
}
</style>
