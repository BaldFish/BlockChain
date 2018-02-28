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
        <!-- <option value="trade_hash">存证哈希</option> -->
        <option value="account_balance">账户余额</option>
      </select>
      <input class="search_ipt" type="text" placeholder="请输入查询条件" v-model="search_content" @keyup.enter.prevent="search">
      <!-- <router-link to="/search"><button class="btn" @click.prevent="search">搜索</button></router-link> -->
      <button class="btn" @click.prevent="search">搜索</button>
      <!-- <router-link to="/search" class="btn" @click.prevent="search">搜索</router-link> -->
    </div>
    <div class="home">

      <div class="container" v-if="seen">
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
                  <tr v-for="(item,index) in blocks" :class="index%2?'even':''">
                    <td>{{item.result.number}}</td>
                    <td>
                      {{item.result.hash}}
                      <!-- <a href="/#/search/" target="_blank">{{item.result.hash}}</a> -->
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
                    <th style="width:15%">存证信息</th>
                    <th style="width:20%">交易时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in transactions" :class="index%2?'even':''">
                    <td >
                      <img class="t1" src="../src/golo.jpg" alt="">
                    </td>
                    <!-- <td>{{item[0]}}</td> -->
                    <td>
                      {{item[4]}}
                      <!-- <a href="/#/search/" target="_blank">{{item[4]}}</a> -->
                    </td>
                    <td>{{item[3]}}</td>
                    <td>{{item[5]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <div class="content" v-if="!seen">
        <p>查询时间：{{time}}</p>
        <!-- <table v-if="searchType==='block_height'">
          <caption>
            <p>查询时间：{{time}}</p>
          </caption>
          <colgroup>
            <col class="col1">
            <col class="col2">
          </colgroup>
          <tr>
            <th colspan="2">区块：{{getBlockHeight.number}}</th>
          </tr>
          <tr>
            <td>交易笔数：</td>
            <td>{{getBlockHeight.transactions.length}}</td>
          </tr>
          <tr>
            <td>存证记录个数：</td>
            <td>{{getBlockHeight.transactions.length}}</td>
          </tr>
          <tr>
            <td>高度：</td>
            <td>{{getBlockHeight.number}}</td>
          </tr>
          <tr>
            <td>区块生成时间：</td>
            <td>{{getBlockHeight.timestamp}}</td>
          </tr>
          <tr>
            <td>版本：</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td>哈希值：</td>
            <td>{{getBlockHeight.hash}}</td>
          </tr>
          <tr>
            <td>上一区块：</td>
            <td>{{getBlockHeight.parentHash}}</td>
          </tr>
        </table>

        <table v-else-if="searchType==='block_hash'">
          <caption>
            <p>查询时间：{{time}}</p>
          </caption>
          <colgroup>
            <col class="col1">
            <col class="col2">
          </colgroup>
          <tr>
            <th colspan="2">区块：{{getBlockHash.number}}</th>
          </tr>
          <tr>
            <td>交易笔数：</td>
            <td>{{getBlockHash.transactions.length}}</td>
          </tr>
          <tr>
            <td>存证记录个数：</td>
            <td>{{getBlockHash.transactions.length}}</td>
          </tr>
          <tr>
            <td>高度：</td>
            <td>{{getBlockHash.number}}</td>
          </tr>
          <tr>
            <td>区块生成时间：</td>
            <td>{{getBlockHash.timestamp}}</td>
          </tr>
          <tr>
            <td>版本：</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td>哈希值：</td>
            <td>{{getBlockHash.hash}}</td>
          </tr>
          <tr>
            <td>上一区块：</td>
            <td>{{getBlockHash.parentHash}}</td>
          </tr>
        </table>

        <table v-else-if="searchType==='trade_hash'">
          <caption>
            <p>鉴证时间：{{time}}</p>
          </caption>
          <colgroup>
            <col class="col1">
            <col class="col2">
          </colgroup>
          <tr>
            <th colspan="2">区块链交易鉴证信息</th>
          </tr>
          <tr>
            <td>交易哈希：</td>
            <td>{{getTradeHash.hash}}</td>
          </tr>
          <tr>
            <td>交易时间：</td>
            <td>{{getTradeHash.timestamp}}</td>
          </tr>
          <tr>
            <td>投保时间：</td>
            <td>{{getTradeHash.timestamp}}</td>
          </tr>
          <tr>
            <td>承保公司：</td>
            <td>{{getTradeHash.timestamp}}</td>
          </tr>
          <tr>
            <td>保险类型：</td>
            <td>{{getTradeHash.hash}}</td>
          </tr>
          <tr>
            <td>保险单号：</td>
            <td>{{getTradeHash.hash}}</td>
          </tr>
          <tr>
            <td>保险期间：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>被保险人：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>证件类型：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>证件号码：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>承保险种：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>车牌号：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>车主：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>车辆型号：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>初登日期：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>车辆识别代号：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>发动机号；</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>机动车种类：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>投保渠道：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>销售机构：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
          <tr>
            <td>营业员：</td>
            <td>{{getTradeHash.parentHash}}</td>
          </tr>
        </table>

        <table v-else-if="searchType==='account_balance'">
          <caption>
            <p>查询时间：{{time}}</p>
          </caption>
          <colgroup>
            <col class="col1">
            <col class="col2">
          </colgroup>
          <tr>
            <th colspan="2">账户：{{getAccountBalance.miner}}</th>
          </tr>
          <tr>
            <td>余额：</td>
            <td>{{getAccountBalance.result}}</td>
          </tr>

        </table> -->
        <div id="pre" ref="result" v-html="d">
        </div>
      </div>
    </div>
    <!-- <keep-alive> -->
    <!-- <router-view class="main"></router-view> -->
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
    inputs: [{ name: "newOwner", type: "address" }],
    name: "setOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "partnerAttests",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "userInfo",
    outputs: [
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "typ", type: "string" }],
    name: "attestNunberByID",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "userNumber",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "recipient", type: "address" },
      { name: "value", type: "uint256" }
    ],
    name: "sendToAddr",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "balanceAt",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newAccount", type: "address" }],
    name: "setFeeAccount",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" }
    ],
    name: "sendToMultiAddr",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "partnerInfo",
    outputs: [
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "attestNunber",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "hash", type: "string" }],
    name: "acquireVerify",
    outputs: [
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "typ", type: "string" },
      { name: "desc", type: "string" },
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
    constant: true,
    inputs: [],
    name: "partnerNumber",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "partnerAttestsByAddress",
    outputs: [{ name: "", type: "uint256", value: "" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "hash", type: "string" }],
    name: "verify",
    outputs: [{ name: "", type: "bool", value: false }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "addr", type: "address" },
      { name: "id", type: "string" },
      { name: "desc", type: "string" },
      { name: "cert", type: "string" }
    ],
    name: "setPartnerInfo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "i", type: "uint256" }],
    name: "attestByIndex",
    outputs: [
      {
        name: "",
        type: "address",
        value: "0x698d090ee51828e42d823a40232dcb1f435e1879"
      },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" },
      { name: "", type: "string", value: "" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "addr", type: "address" },
      { name: "id", type: "string" },
      { name: "desc", type: "string" },
      { name: "cert", type: "string" }
    ],
    name: "setUserInfo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at(
  "0x4773E6d0fc281049E2fb47F43798D72012F8cD24"
);

const ERR_OK = 0;
export default {
  name: "app",
  data() {
    return {
      d: "",
      seen: true,
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
      blockNumbers: "1",
      partners: "",
      difftime: "",
      transactionCounts: "5",
      blocks: [],
      qblocks: [],
      transactions: []
    };
  },
  mounted() {
    var blocks = [];
    var qblocks = [];
    var transactions = [];
    // 获取区块数量
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
    //获取记帐节点数
    axios
      .post(reqURL, {
        jsonrpc: "2.0",
        method: "net_peerCount",
        params: [],
        id: 2
      })
      .then(res => {
        this.peerCount = parseInt(res.data.result, 16) + 1;
      });
    //获取交易数量
    this.transactionCounts = myContractInstance.attestNunber().c.toString();
    this.partners = myContractInstance.partnerNumber().c.toString();
    //获取最新10块交易信息
    var counts = this.transactionCounts - 1;
    for (var i = counts; i > counts - 10; i--) {
      transactions.push(myContractInstance.attestByIndex(i));
      this.transactions = transactions.sort(function(a, b) {
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
      axios
        .post(reqURL, {
          jsonrpc: "2.0",
          method: "net_peerCount",
          params: [],
          id: 2
        })
        .then(res => {
          that.peerCount = parseInt(res.data.result, 16) + 1;
        });
      //获取最新交易信息
      var newTransactionCounts = myContractInstance.attestNunber().c.toString();
      var newCounts = newTransactionCounts - that.transactionCounts;
      if (newCounts === 0) {
      } else if (newCounts > 0) {
        if (newCounts < 10) {
          for (var i = 0; i < newCounts; i++) {
            transactions.unshift(
              myContractInstance.attestByIndex(
                parseInt(that.transactionCounts) + i
              )
            );
            transactions.pop();
            that.transactions = transactions.sort(function(a, b) {
              return b[5] - a[5];
            });
          }
        } else {
          for (var i = 0; i < 10; i++) {
            transactions.unshift(
              myContractInstance.attestByIndex(
                parseInt(that.transactionCounts) + i
              )
            );
            transactions.pop();
            that.transactions = transactions.sort(function(a, b) {
              return b[5] - a[5];
            });
          }
        }
        that.transactionCounts = newTransactionCounts;
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
      console.log((dateNew - dateOld) / 1000 + "s");
    },

    clearInput() {
      this.d=""
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
    getSeachTime() {
      var time = new Date();
      time = formatDate(time, "yyyy-MM-dd hh:mm:ss");
      return time;
    },
    search() {
      this.seen = false;
      this.clearInput();
      this.time = this.$options.methods.getSeachTime();
      if (this.searchType === "block_height") {
        axios
          .post(reqURL, {
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: ["0x" + parseInt(this.search_content).toString(16), true],
            id: 1
          })
          .then(res => {
            // this.search_content = "";
            res.data.result.number = parseInt(res.data.result.number);
            res.data.result.timestamp = formatDate(
              new Date(parseInt(res.data.result.timestamp, 16) * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            
            this.getBlockHeight = res.data.result;
            this.d = this.$options.methods.syntaxHighlight(
              this.getBlockHeight
            );
            // var oPre=document.getElementById("pre")
            // oPre.appendChild(this.d)
            // console.log(oPre)
          });
      } else if (this.searchType === "block_hash") {
        axios
          .post(reqURL, {
            jsonrpc: "2.0",
            method: "eth_getBlockByHash",
            params: [this.search_content, true],
            id: 2
          })
          .then(res => {
            // this.search_content = "";
            res.data.result.number = parseInt(res.data.result.number);
            res.data.result.timestamp = formatDate(
              new Date(parseInt(res.data.result.timestamp, 16) * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.getBlockHash = res.data.result;
            this.d = this.$options.methods.syntaxHighlight(
              this.getBlockHash
            );
          });
      } else if (this.searchType === "trade_hash") {
        axios
          .post(reqURL, {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [this.search_content],
            id: 3
          })
          .then(res => {
            // this.search_content = "";
            res.data.result.blockNumber = parseInt(res.data.result.blockNumber);
            // res.data.result.timestamp = formatDate(
            //   new Date(parseInt(res.data.result.timestamp, 16) * 1000),
            //   "yyyy-MM-dd hh:mm:ss"
            // );
            this.getTradeHash = res.data.result;
            this.d = this.$options.methods.syntaxHighlight(
              this.getTradeHash
            );
          });
      } else if (this.searchType === "account_balance") {
        axios
          .post(reqURL, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [this.search_content, "latest"],
            id: 4
          })
          .then(res => {
            // this.search_content = "";
            this.getAccountBalance.result = parseInt(res.data.result);
            this.getAccountBalance.miner = this.search_content;
            this.d = this.$options.methods.syntaxHighlight(
              this.getAccountBalance
            );
          });
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
          return '<span style="word-wrap:break-word;overflow:hidden;" class="' + cls + '">' + match + "</span>";
        }
      );
    }
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

.head-wrap {
  position: fixed;
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
      background: url('./golo.jpg') no-repeat left top;
      background-position: 0%;
      padding-left: 120px;
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
}

.search_box {
  box-sizing: border-box;
  text-align: center;
  padding: 120px 20px 140px;
  width: 100%;
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
    color: blue;
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
              vertical-align middle
            }
            .t1{
              width 70px
              height 40px
              // vertical-align middle
            }
          }
        }
      }
    }
  }

  .content {
    width: 100%;
    margin: 0 auto;

    table {
      table-layout: fixed;
      width: 70%;
      margin: 0 auto;
      text-align: center;

      .col1 {
        width: 20%;
      }
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
  }
  #pre {
    padding: 5px;
    margin: 5px;
    white-space: pre-wrap;
    span{
      word-wrap:break-word; overflow:hidden;
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
}

// .main {
// flex: 1;
// }
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
