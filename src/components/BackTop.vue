<template>
  <div class="to-top">
    <el-backtop :bottom="100" :right="10">
      <div class="button">UP</div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }

}
</script>

<style scoped>
.button {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  text-align: center;
  line-height: 40px;
  color: gray;
  border: 1px solid gray;
  border-radius: 50%;
}
</style>
