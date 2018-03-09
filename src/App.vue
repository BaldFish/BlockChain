<template>
  <div id="app">

    <div class="head-wrap">
      <div class="head">
        <a @click="myhome" href="/">
          <h1 class="text">元链搜索(测试版)</h1>
        </a>
      </div>
    </div>
    <div style="height:70px"></div>
    <div class="search_box" v-if="search_seen">
      <select name="" class="search_select" v-model="searchType">
        <option value="block_height">区块高度</option>
        <option value="block_hash">区块哈希</option>
        <option value="trade_hash">交易哈希</option>
        <option value="save_hash">存证哈希</option>
        <option value="account_balance">账户余额</option>
      </select>
      <input class="search_ipt" type="text" placeholder="请输入查询条件" v-model="search_content" @keyup.enter.prevent="search">
      <button class="btn" @click.prevent="search">搜索</button>
    </div>
    <div class="home" v-if="home_seen">

      <div class="container">
        <div class="container_box">

          <div class="count_box">
            <ul class="count">
              <li>
                <p>当前区块高度：</p>
                <span>{{blockNumbers}}</span>
              </li>
              <li>
                <p>最新出块时间：</p>
                <span>{{difftime}}</span>
              </li>
              <li>
                <p>合作方数量：</p>
                <span>{{partners}}</span>
              </li>
              <li>
                <p>交易数量：</p>
                <span>{{transactionCounts}}</span>
              </li>
              <li>
                <p>存证数量：</p>
                <span>{{saveCounts}}</span>
              </li>
            </ul>
          </div>

          <div class="block_box">
            <div class="clearfix block">
              <h2 class="fl">最新区块</h2>
              <span class="fr"></span>
            </div>
            <div class="con_tb">
              <table class='tb'>
                <thead>
                  <tr>
                    <th style="width:15%">区块高度</th>
                    <th style="width:50%">区块ID</th>
                    <th style="width:15%">交易笔数</th>
                    <th style="width:20%">出块时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in blocks" :class="index%2?'even':''" :key="item.result.number">
                    <td>{{item.result.number}}</td>
                    <td @click="clickNumber($event)" style="cursor:pointer">
                      {{item.result.hash}}
                    </td>
                    <td>{{item.result.transactions.length}}</td>
                    <td>{{item.result.timestamp}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="block_box">
            <div class="clearfix block">
              <h2 class="fl">最新存证</h2>
              <span class="fr"></span>
            </div>
            <div class="con_tb">
              <table class='tb'>
                <thead>
                  <tr>
                    <th style="width:15%">所属应用</th>
                    <th style="width:50%">存证哈希</th>
                    <th style="width:15%">存证类型</th>
                    <th style="width:20%">交易时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in saves" :class="index%2?'even':''">
                    <td>
                      <img class="t1" src="../src/golo.jpg" alt="">
                    </td>
                    <td @click="clickSave($event)" style="cursor:pointer">
                      {{item[3]}}
                    </td>
                    <td>{{item[1]}}</td>
                    <td>{{item[4]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
    <div class="content" v-if="search_infoseen">
      <p>查询时间：{{time}}</p>
      <div class="pre" ref="result" v-html="search_data">
      </div>
    </div>
    <div class="click" v-if="click_block">
      <div class="tradeHash">
        <span>&gt;</span>
        <span>区块哈希：</span>
        <span class="targetParam">{{click_numberinfo.hash}}</span>
      </div>
      <div class="tradeMesg-box">

        <div class="tradeMesg-title">区块信息</div>
        <div class="pre" ref="block" v-html="click_numberinfojp">
        </div>
      </div>
    </div>

    <div class="click" v-if="click_save">
      <div class="tradeHash">
        <span>&gt;</span>
        <span>存证哈希：</span>
        <span class="targetParam">{{click_msg}}</span>
      </div>
      <div class="tradeMesg-box">

        <div class="tradeMesg-title">存证信息</div>

        <div class="business-infoboxBg">
          <div class="business-infobox">
            <div class="ascription-titlebox">
              <span class="ascription-title">所属应用信息</span>
              <img src="./golo.jpg" class="ascription-img">
              <div class="ascription-name">轱辘车联</div>
            </div>
          </div>
        </div>

        <div class="pictureLayer">
          <div class="tradeMesg-row clear-fix">
            <div class="certified-row">
              <span class="tradeMesg-name">存证发起方：</span>
              <span class="tradeMesg-content source_address">{{click_saveinfo[0]}}</span>
            </div>
          </div>
          <div class="tradeMesg-row clear-fix">
            <div class="certified-row">
              <span class="tradeMesg-name">存证类型：</span>
              <span class="tradeMesg-content source_address">{{click_saveinfo[1]}}</span>
            </div>
          </div>
          <div class="tradeMesg-row clear-fix">
            <div class="certified-row">
              <span class="tradeMesg-name">存证内容：</span>
              <span class="tradeMesg-content source_address">{{click_saveinfo[2]}}</span>
            </div>
          </div>
          <div class="tradeMesg-row clear-fix">
            <div class="certified-row">
              <span class="tradeMesg-name">存证哈希：</span>
              <span class="tradeMesg-content source_address">{{click_saveinfo[3]}}</span>
            </div>
          </div>
          <div class="tradeMesg-row clear-fix">
            <div class="certified-row">
              <span class="tradeMesg-name">存证时间：</span>
              <span class="tradeMesg-content source_address">{{click_saveinfo[4]}}</span>
            </div>
          </div>
        </div>

      </div>

    </div>

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
import formatDate from "@/common/js/formatDate.js";
import axios from "axios";
import _ from "lodash";
const reqURL = "http://blockchain.launchain.org:50000";
//实例化web3对象
var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(reqURL));
//定义abi及调用合约
var abi = [
  {
    constant: false,
    inputs: [
      { name: "typ", type: "string" },
      { name: "cont", type: "string" },
      { name: "hash", type: "string" },
      { name: "dtime", type: "string" }
    ],
    name: "attest",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "setOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "addr", type: "address" },
      { name: "name", type: "string" },
      { name: "desc", type: "string" }
    ],
    name: "setPartnerInfo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "balanceAt",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "attestsNunber",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "partnerInfo",
    outputs: [{ name: "", type: "string" }, { name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "hash", type: "string" }],
    name: "acquireVerify",
    outputs: [
      { name: "", type: "address" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "partnerNumber",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "partnerAttestsNunber",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "hash", type: "string" }],
    name: "verify",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "partnerList",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "addr", type: "address" },
      { name: "typ", type: "string" }
    ],
    name: "partnerAttestNunberByType",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "i", type: "uint256" }],
    name: "attestByIndex",
    outputs: [
      { name: "", type: "address" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "PartnerName", type: "string" },
      { indexed: false, name: "AttestHash", type: "string" }
    ],
    name: "Attestation",
    type: "event"
  }
];
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at(
  "0x5a8AB986b3F1A834063Fa278EcBeEa098FAd03Cb"
);

const ERR_OK = 0;
export default {
  name: "app",
  data() {
    return {
      click_msg: "",
      search_seen: true,
      home_seen: true,
      search_infoseen: false,
      click_block: false,
      click_save: false,
      click_numberinfo: "",
      click_numberinfojp:"",
      click_saveinfo: "",
      search_data: "",
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
      getSaveHash: {},
      getAccountBalance: {
        miner: "",
        result: ""
      },
      blockNumbers: "",
      partners: "",
      difftime: "",
      transactionCounts: "",
      saveCounts: "",
      blocks: [],
      transactions: [],
      saves: []
    };
  },
  mounted() {
    var blocks = [];
    var transactions = [];
    var saves = [];
    // 获取区块数量
    this.blockNumbers=web3.eth.blockNumber
    //获取最新10个区块
    axios
      .post(reqURL, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
      .then(res => {
        this.blockNumbers = parseInt(res.data.result, 16);
        // 获取最新10个区块
        for (var i = this.blockNumbers; i > this.blockNumbers - 10; i--) {
          axios
            .post(reqURL, {
              jsonrpc: "2.0",
              method: "eth_getBlockByNumber",
              params: ["0x" + i.toString(16), true],
              id: i
            })
            .then(res => {
              res.data.result.number = parseInt(res.data.result.number, 16);
              res.data.result.timestamp = formatDate(
                new Date(parseInt(res.data.result.timestamp, 16) * 1000),
                "yyyy-MM-dd hh:mm:ss"
              );
              blocks.push(res.data);
              this.blocks = blocks.sort(function(a, b) {
                return b.id - a.id;
              });
            });
        }
      });
    //获取合作方数量
    this.partners = myContractInstance.partnerNumber().c.toString();
    //获取记帐节点数
    // axios
    //   .post(reqURL, {
    //     jsonrpc: "2.0",
    //     method: "net_peerCount",
    //     params: [],
    //     id: 2
    //   })
    //   .then(res => {
    //     this.peerCount = parseInt(res.data.result, 16) + 1;
    //   });
    //获取存证数量
    this.saveCounts = myContractInstance.attestsNunber().c.toString();

    //获取最新10个存证信息
    var counts = this.saveCounts - 1;
    for (var i = counts; i > counts - 10; i--) {
      saves.push(myContractInstance.attestByIndex(i));
      this.saves = saves.sort(function(a, b) {
        return b[5] - a[5];
      });
    }
    // 每隔15秒重新获取数据并更新DOM
    var that = this;
    setInterval(function() {
      //获取最新区块数和区块信息
      axios
        .post(reqURL, {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1
        })
        .then(res => {
          that.blockNumbers = parseInt(res.data.result, 16);
          //获取最新区块信息
          axios
            .post(reqURL, {
              jsonrpc: "2.0",
              method: "eth_getBlockByNumber",
              params: ["0x" + that.blockNumbers.toString(16), true],
              id: that.blockNumbers
            })
            .then(res => {
              res.data.result.number = parseInt(res.data.result.number, 16);
              res.data.result.timestamp = formatDate(
                new Date(parseInt(res.data.result.timestamp, 16) * 1000),
                "yyyy-MM-dd hh:mm:ss"
              );
              blocks.unshift(res.data);
              blocks.pop();
              that.blocks = blocks;
            });
        });
      //获取最新记帐节点数
      // axios
      //   .post(reqURL, {
      //     jsonrpc: "2.0",
      //     method: "net_peerCount",
      //     params: [],
      //     id: 2
      //   })
      //   .then(res => {
      //     that.peerCount = parseInt(res.data.result, 16) + 1;
      //   });
      //获取最新存证信息
      var newSaveCounts = myContractInstance.attestsNunber().c.toString();
      var newCounts = newSaveCounts - that.saveCounts;
      if (newCounts === 0) {
      } else if (newCounts > 0) {
        if (newCounts < 10) {
          for (var i = 0; i < newCounts; i++) {
            saves.unshift(
              myContractInstance.attestByIndex(parseInt(that.saveCounts) + i)
            );
            saves.pop();
            that.saves = saves.sort(function(a, b) {
              return b[5] - a[5];
            });
          }
        } else {
          for (var i = 0; i < 10; i++) {
            saves.unshift(
              myContractInstance.attestByIndex(parseInt(that.saveCounts) + i)
            );
            saves.pop();
            that.saves = saves.sort(function(a, b) {
              return b[5] - a[5];
            });
          }
        }
        that.saveCounts = newSaveCounts;
      }
    }, 15000);
    //获取某一地址交易数量
    // web3.eth.getTransactionCount(
    //       "0x8c6050ca48ed30f3223d450eef3c8e9548ee230c"
    //     )
  },
  watch: {
    blocks: function() {
      if (this.blocks.length > 1) {
        //方法2，可以直接在watch下写监听到变量发生变化后要运行的代码
        // var dateNew=new Date(this.blocks[0].result.timestamp)
        // var dateOld=new Date(this.blocks[1].result.timestamp)
        // this.difftime=(dateNew-dateOld)/1000+"s"
        this.getdifftime();
      }
    }
  },
  methods: {
    getdifftime: function() {
      var dateNew = new Date(this.blocks[0].result.timestamp);
      var dateOld = new Date(this.blocks[1].result.timestamp);
      this.difftime = (dateNew - dateOld) / 1000 + "s";
    },

    clearInput() {
      this.search_data = "";
      this.time = "";
      this.getBlockHeight = {
        transactions: []
      };
      this.getBlockHash = {
        transactions: []
      };
      this.getTradeHash = {};
      this.getSaveHash = {};
      this.getAccountBalance = {
        miner: "",
        result: ""
      };
    },
    getSeachTime() {
      var time = new Date();
      time = formatDate(time, "yyyy-MM-dd hh:mm:ss");
      return time;
    },
    search() {
      this.home_seen = false;
      this.click_block = false;
      this.click_save = false;
      this.search_seen = true;
      this.search_infoseen = true;
      this.clearInput();
      this.time = this.$options.methods.getSeachTime();
      
      if (this.searchType === "block_height") {
        //按区块高度查询区块信息
        this.getBlockHeight = web3.eth.getBlock(this.search_content);
        this.search_data = this.$options.methods.syntaxHighlight(
              this.getBlockHeight
            );
        // axios
        //   .post(reqURL, {
        //     jsonrpc: "2.0",
        //     method: "eth_getBlockByNumber",
        //     params: ["0x" + parseInt(this.search_content).toString(16), true],
        //     id: 1
        //   })
        //   .then(res => {
        //     console.log(res.data.result)
        //     res.data.result.number = parseInt(res.data.result.number);
        //     res.data.result.timestamp = formatDate(
        //       new Date(parseInt(res.data.result.timestamp, 16) * 1000),
        //       "yyyy-MM-dd hh:mm:ss"
        //     );
        //     this.getBlockHeight = res.data.result;
        //     this.search_data = this.$options.methods.syntaxHighlight(
        //       this.getBlockHeight
        //     );
        //   });
      } else if (this.searchType === "block_hash") {
        //按区块哈希查询区块信息
        this.getBlockHash = web3.eth.getBlock(this.search_content);
        this.search_data = this.$options.methods.syntaxHighlight(
          this.getBlockHash
        );
        // axios
        //   .post(reqURL, {
        //     jsonrpc: "2.0",
        //     method: "eth_getBlockByHash",
        //     params: [this.search_content, true],
        //     id: 2
        //   })
        //   .then(res => {
        //     res.data.result.number = parseInt(res.data.result.number);
        //     res.data.result.timestamp = formatDate(
        //       new Date(parseInt(res.data.result.timestamp, 16) * 1000),
        //       "yyyy-MM-dd hh:mm:ss"
        //     );
        //     this.getBlockHash = res.data.result;
        //     this.search_data = this.$options.methods.syntaxHighlight(
        //       this.getBlockHash
        //     );
        //   });
      } else if (this.searchType === "trade_hash") {
        //按交易哈希查询交易信息
        this.getTradeHash = web3.eth.getTransaction(this.search_content)
        this.search_data = this.$options.methods.syntaxHighlight(
          this.getTradeHash
        );
        // this.search_data=this.$compile(this.search_data)
      } else if (this.searchType === "save_hash") {
        //按存证哈希查询存证信息
        this.getSaveHash = myContractInstance.acquireVerify(
          this.search_content
        );
        this.search_data = this.$options.methods.syntaxHighlight(
          this.getSaveHash
        );
      } else if (this.searchType === "account_balance") {
        //按账户地址查询余额
        this.getAccountBalance=web3.eth.getBalance(this.search_content)
        this.getAccountBalance=String((this.getAccountBalance))
        this.search_data = this.$options.methods.syntaxHighlight(
          this.getAccountBalance
        );
      }
    },
    syntaxHighlight: function(json) {
      if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
          var cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return (
            '<span style="word-wrap:break-word;overflow:hidden;" class="' +
            cls +
            '">' +
            match +
            "</span>"
          );
        }
      );
    },
    myhome: function() {
      this.search_infoseen = false;
      this.click_block = false;
      this.click_save = false;
      this.search_seen = true;
      this.home_seen = true;
    },
    clickNumber: function(event) {
      this.click_msg = event.target.innerText;
      var that = this;
      this.search_infoseen = false;
      this.search_seen = false;
      this.home_seen = false;
      this.click_save = false;
      this.click_block = true;
      this.click_numberinfo = _.find(that.blocks, function(o) {
        if (o.result.hash === that.click_msg) {
          return o;
        }
      }).result;
      this.click_numberinfojp =this.$options.methods.syntaxHighlight(this.click_numberinfo)
    },
    clickSave: function(event) {
      this.click_msg = event.target.innerText;
      var that = this;
      this.search_infoseen = false;
      this.search_seen = false;
      this.home_seen = false;
      this.click_block = false;
      this.click_save = true;
      this.click_saveinfo = _.find(that.saves, function(o) {
        return o[3] === that.click_msg;
      });
    }
  },
  components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.head-wrap {
  position: fixed;
  z-index:999;
  width: 100%;
  background-color: #f7f8f8;
  border-bottom: 1px solid #e5e5e5;

  .head {
    width: 1280px;
    margin: 5px auto;
    height: 60px;
    line-height: 60px;

    .text, ul, .nav {
      display: inline-block;
    }

    .text {
      font-size: 20px;
      padding: 0 15px;
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
}

.search_box {
  box-sizing: border-box;
  text-align: center;
  padding: 20px 20px 170px;
  min-width: 1280px;
  margin: 0 auto;
  font-size: 0;

  a {
    font-size: 24px;
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
    color: #ffffff;
    margin: 0 1px;
  }

  .search_ipt {
    cursor: auto;
    padding: 0 10px;
    width: 40%;
    color: #e2cf7a;
  }

  .btn:active {
    background-color: #07a178;
  }
}

.home {
  flex: 1;
  box-sizing: border-box;
  margin: 0 auto;
  width: 1280px;

  .container {
    width: 100%;

    .container_box {
      .count_box {
        width: 100%;
        height: 60px;
        line-height: 60px;
        margin-bottom: 20px;
        background-color: #07a178;

        .count {
          display: flex;

          li {
            display: inline-block;
            flex: 1;
            text-align: center;
            color: #fafdfc;

            p {
              display: inline-block;
            }

            span {
              color: #e2cf7a;
              padding: 5px;
            }
          }
        }
      }

      .block_box {
        .block {
          border-bottom: 1px solid #bfc0c1;
          padding-top: 20px;
          margin-bottom: 10px;

          h2 {
            display: inline-block;
            color: #22b398;
            font-size: 24px;
            line-height: 100%;
            padding-bottom: 18px;
            border-bottom: 3px solid #b5b5b5;
          }

          span {
            color: #0080ff;
            padding: 10px 20px;
            cursor: pointer;
          }
        }

        .con_tb {
          table {
            text-align: center;
            width: 100%;
            border-spacing: 0;
            table-layout: fixed;
            color: #707070;

            thead {
              background-color: #eeeeee;
              font-size: 16px;
              line-height: 40px;
            }

            tbody {
              .even {
                background-color: #eeeeee;
              }
            }

            td {
              padding: 15px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              vertical-align: middle;
            }

            .t1 {
              width: 70px;
              height: 40px;
            }
          }
        }
      }
    }
  }
}

.content {
  flex: 1;
  box-sizing: border-box;
  margin: 0 auto;
  width: 1280px;
  padding: 20px 20px 140px;

  /*table {
    table-layout: fixed;
    width: 70%;
    margin: 0 auto;
    text-align: center;

    .col1 {
      width: 20%;
    }

    tr {
      background-color: #eee;
    }

    th, td {
      border: 1px solid green;
      padding: 10px 20px;
    }

    caption {
      text-align: left;
      margin: 20px 0;

      p {
        height: 20px;
        line-height: 20px;
      }
    }
  }*/

}

.click {
  flex: 1;
  box-sizing: border-box;
  margin: 0 auto;
  width: 1280px;
  padding: 20px;
  background: #fff;

  .tradeHash {
    color: #22b398;
    font-size: 18px;
    width: 1280px;
    height:30px;
    line-height:30px
    text-overflow : ellipsis; 
    white-space : nowrap; 
    overflow : hidden;
  }

  .tradeMesg-box {
    background: #fff;
    padding: 20px;
    position: relative;

    .tradeMesg-title {
      background: #d1d1d1;
      color: #535353;
      padding: 10px;
      margin-bottom: 5px;
      font-size: 16px;
    }

    .business-infoboxBg {
      position: absolute;
      background: #fff;
      right: 20px;
      top: 20px;
      z-index: 1;

      .business-infobox {
        width: 204px;
        height: 163px;
        border: 2px solid #33bea5;
        margin: 0 15px 15px;

        .ascription-titlebox {
          width: 140px;
          margin: 0 auto;
          background: url('./business.png') no-repeat;
          text-align: center;

          .ascription-title {
            display: block;
            font-size: 16px;
            color: #fff;
            padding-top: 11px;
            padding-bottom: 9px;
          }
        }
      }
    }

    .pictureLayer {
      .tradeMesg-row {
        border-bottom: 2px solid #f0f0f0;
        padding-top: 20px;
        padding-bottom: 24px;
        white-space: pre-wrap;
        span {
          word-wrap: break-word;
          overflow: hidden;
        }
        
      }
    }
  }
}
.pre {
    padding: 10px;
    margin-top:20px;
    white-space: pre-wrap;
    min-height:200px;
    line-height:1.2;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    span {
      word-wrap: break-word;
      overflow: hidden;
    }

    .string {
      color: green;
    }

    .number {
      color: darkorange;
    }

    .boolean {
      color: blue;
    }

    .null {
      color: magenta;
    }

    .key {
      color: red;
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
