<template>
  <div class="home">
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
                    <a href="/#/search/" target="_blank">{{item.result.hash}}</a>
                    <!-- <router-link to="/search" target="_blank">{{item.result.hash}}</router-link> -->
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
                  <td>{{item[0]}}</td>
                  <td>
                    <a href="/#/search/" target="_blank">{{item[4]}}</a>
                    <!-- <router-link to="/search" target="_blank">{{item[4]}}</router-link> -->
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
  </div>
</template>


<script type="text/ecmascript-6">
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
  name: "home",

  data() {
    return {
      blockNumbers: "1",
      partners: "",
      difftime: "",
      transactionCounts: "5",
      blocks: [],
      qblocks: [],
      transactions: []
      // apidata: {},
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
      if(this.blocks.length>1){
        //方法2，可以直接在watch下写监听到变量发生变化后要运行的代码
        // var dateNew=new Date(this.blocks[0].result.timestamp)
        // var dateOld=new Date(this.blocks[1].result.timestamp)
        // this.difftime=(dateNew-dateOld)/1000+"s"     
        this.getdifftime()
      }
      
    }
  },
  methods: {
    getdifftime:function () {
      var dateNew=new Date(this.blocks[0].result.timestamp)
      var dateOld=new Date(this.blocks[1].result.timestamp)
      this.difftime=(dateNew-dateOld)/1000+"s"
      console.log((dateNew-dateOld)/1000+"s")
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
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
        // border: 1px solid #bfc0c1;
        .block {
          border-bottom: 1px solid #bfc0c1;
          padding-top: 20px;
          margin-bottom: 10px;

          h2 {
            // padding: 10px 20px;
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
          // padding: 10px 20px;
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
            }
          }
        }
      }
    }
  }
}
</style>
