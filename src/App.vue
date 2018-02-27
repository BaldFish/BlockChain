<template>
  <div id="app">

    <div class="head-wrap">
      <div class="head">
        <a href="/">
          <h1 class="text">元链搜索</h1>
        </a>
        <!-- <ul>
          <li class="nav">
            <router-link to="/home">主页</router-link>
          </li>
          <li class="nav">
            <router-link to="/search">搜索</router-link>
          </li>
        </ul> -->
      </div>
    </div>

    <div class="search_box">
      <select name="" class="search_select" v-model="searchType" @change="clearInput">
        <option value="block_height">区块高度</option>
        <option value="block_hash">区块哈希</option>
        <option value="trade_hash">存证哈希</option>
        <option value="account_balance">账户余额</option>
      </select>
      <input class="search_ipt" type="text" placeholder="请输入查询条件" v-model="search_content" @keyup.enter.prevent="search">
      <!-- <router-link to="/search"><button class="btn" @click.prevent="search">搜索</button></router-link>
      <button class="btn" @click.prevent="search">搜索</button> -->
      <router-link to="/search" class="btn" @click.prevent="search">搜索</router-link>
    </div>

    <!-- <keep-alive> -->
    <router-view class="main"></router-view>
    <!-- </keep-alive> -->

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
    return {
      time: "",
      searchType: "block_height",
      search_content: "",
      getBlockHeight: {
        transactions: []
      },
      getBlockHash: {
        transactions: []
      },
      getTradeHash: {},
      getAccountBalance: {
        miner: "",
        result: ""
      },
    };
  },
  methods:{
    clearInput() {
      this.time = "";
      this.getBlockHeight = {
        transactions: []
      };
      this.getBlockHash = {
        transactions: []
      };
      this.getTradeHash = {};
      this.getAccountBalance = {
        miner: "",
        result: ""
      };
    },
  } ,
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
.search_box {
    box-sizing: border-box;
    text-align: center;
    padding: 140px 20px;
    width: 100%;
    margin: 0 auto;
    font-size: 0;
    a {
      font-size :24px
      padding: 0 10px;

    }
    .search_ipt, .search_select, .btn {
      outline: none;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 5px;
      height: 60px;
      line-height: 60px;
      background: #0dad7e;
      vertical-align: top;
      cursor: pointer;
      border: none;
      font-size: 24px;
      color: #27c556;
      margin: 0 1px;
    }

    .search_ipt {
      cursor: auto;
      padding: 0 10px;
      width: 40%;
      color: blue;
    }

    .btn:active {
      background-color: #07a178;
    }
  }
.main {
  flex: 1;
  // padding-top :80px
}

.head-wrap {
  position: fixed;
  width: 100%;
  background-color: #f7f8f8;
  border-bottom: 1px solid #e5e5e5;

  .head {
    width: 1280px;
    margin: 5px auto;
    height: 80px;
    line-height: 80px;
  }

  .text, ul, .nav {
    display: inline-block;
  }

  .text {
    background: url('./components/home/star24_on@2x.png') no-repeat left top;
    background-position: 0%;
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
        // color: #008080;
        // border-bottom: 2px solid #008080;
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
a {
  color red
}
</style>
