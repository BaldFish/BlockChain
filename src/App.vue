<template>
  <div id="app">

    <div class="head-wrap">
      <div class="head">
        <h1 class="text">元链浏览器</h1>
        <ul>
          <li class="nav">
            <router-link to="/home">首页</router-link>
          </li>
          <li class="nav">
            <router-link to="/search">筛查</router-link>
          </li>
        </ul>
      </div>
    </div>

    <keep-alive>
      <router-view class="main"></router-view>
    </keep-alive>

    <div class="footer">
      <p>©2018 元征区块链技术研究院.京ICP备88888888号-8</p>
      <p>版本
        <span>1.0.0</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "@/common/stylus/index.styl";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

.head-wrap {
  // height: 60px;
  position: fixed;
  width: 100%;
  background-color: #f7f8f8;
  border-bottom: 1px solid #e5e5e5;

  .head {
    width: 1280px;
    margin: 5px auto;
  }

  .text, ul, .nav {
    display: inline-block;
  }

  .text {
    background: url('./components/home/star24_on@2x.png') no-repeat left top;
    padding-left: 40px;
    margin-right: 60px;
    font-size: 20px;
  }

  .nav {
    height: 50px;

    & > a {
      display: inline-block;
      padding: 15px;

      &.router-link-active, &:hover {
        color: #008080;
        border-bottom: 2px solid #008080;
      }
    }
  }
}

.footer {
  background-color: #3a3a3a;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-top: 20px;

  p {
    width: 1280px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
  }
}
</style>
