<template>
  <div class="notfount-error">
    <div class="notfount-desc">
      <h1>页面错误</h1>
      <p>无法访问当前页面</p>
      <el-button type="danger" @click="$router.push('/')">去往首页</el-button>
    </div>
    <img src="https://static.zhihu.com/heifetz/assets/liukanshan_wire.e7247fbf.svg" alt="404" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notfount-error {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 100px;
  .notfount-desc {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 200px;
    h1 {
      margin: 10px 0;
      color: #999;
    }
    p {
      margin: 0;
      margin-bottom: 26px;
    }
  }
}
</style>
