<template>
  <div class="search">

    <div class="search_box">
      <select name="" class="search_select" v-model="searchType" @change="clearInput">
        <option value="block_height">区块高度</option>
        <option value="block_hash">区块哈希</option>
        <option value="trade_hash">交易哈希</option>
        <option value="account_balance">账户余额</option>
      </select>
      <input class="search_ipt" type="text" placeholder="请输入查询条件" v-model="search_content" @keyup.enter.prevent="search">
      <button class="btn" @click.prevent="search">搜索</button>
    </div>
    <div class="content">
      <table v-if="searchType==='block_height'">
        <caption>
          <p>查询时间：{{time}}</p>
        </caption>
        <colgroup>
          <col class="col1">
          <col class="col2">
        </colgroup>
        <tr>
          <th colspan="2">区块{{getBlockHeight.number}}</th>
        </tr>
        <tr>
          <td>交易笔数</td>
          <td>{{getBlockHeight.transactions.length}}</td>
        </tr>
        <tr>
          <td>存证记录个数</td>
          <td>{{getBlockHeight.transactions.length}}</td>
        </tr>
        <tr>
          <td>高度</td>
          <td>{{getBlockHeight.number}}</td>
        </tr>
        <tr>
          <td>区块生成时间</td>
          <td>{{getBlockHeight.timestamp}}</td>
        </tr>
        <tr>
          <td>版本</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>哈希值</td>
          <td>{{getBlockHeight.hash}}</td>
        </tr>
        <tr>
          <td>上一区块</td>
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
          <th colspan="2">区块{{getBlockHash.number}}</th>
        </tr>
        <tr>
          <td>交易笔数</td>
          <td>{{getBlockHash.transactions.length}}</td>
        </tr>
        <tr>
          <td>存证记录个数</td>
          <td>{{getBlockHash.transactions.length}}</td>
        </tr>
        <tr>
          <td>高度</td>
          <td>{{getBlockHash.number}}</td>
        </tr>
        <tr>
          <td>区块生成时间</td>
          <td>{{getBlockHash.timestamp}}</td>
        </tr>
        <tr>
          <td>版本</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>哈希值</td>
          <td>{{getBlockHash.hash}}</td>
        </tr>
        <tr>
          <td>上一区块</td>
          <td>{{getBlockHash.parentHash}}</td>
        </tr>
      </table>

      <table v-else-if="searchType==='trade_hash'">
        <caption>
          <h3>区块链交易鉴证信息</h3>
          <p>鉴证时间：{{time}}</p>
        </caption>
        <colgroup>
          <col class="col1">
          <col class="col2">
        </colgroup>
        <tr>
          <td>交易哈希</td>
          <td>{{getTradeHash.hash}}</td>
        </tr>
        <tr>
          <td>交易时间</td>
          <td>{{getTradeHash.timestamp}}</td>
        </tr>
        <tr>
          <td>投保时间</td>
          <td>{{getTradeHash.timestamp}}</td>
        </tr>
        <tr>
          <td>承保公司</td>
          <td>{{getTradeHash.timestamp}}</td>
        </tr>
        <tr>
          <td>保险类型</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>保险单号</td>
          <td>{{getTradeHash.hash}}</td>
        </tr>
        <tr>
          <td>保险期间</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>被保险人</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>证件类型</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>证件号码</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>承保险种</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>车牌号</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>车主</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>车辆型号</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>初登日期</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>车辆识别代号</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>发动机号</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>机动车种类</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>投保渠道</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>销售机构</td>
          <td>{{getTradeHash.parentHash}}</td>
        </tr>
        <tr>
          <td>营业员</td>
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
          <th colspan="2">账户：{{getAccountBalance.miner}}
          </th>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{getAccountBalance.result}}</td>
        </tr>

      </table>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import formatDate from "@/common/js/formatDate.js";
import axios from "axios";
import _ from "lodash";
const reqURL = "http://blockchain.launchain.org:50000";
const ERR_OK = 0;
export default {
  name: "search",
  data() {
    return {
      time: "",
      searchType: "block_height",
      search_content: "",
      apidata: {},
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
      }
    };
  },
  created() {
    // axios
    //   .get("/api")
    //   .then(response => {
    //     var response = response.data;
    //     if (response.errno === ERR_OK) {
    //       response = response.data;
    //       response.getNewBlock.forEach(item => {
    //         item.number = parseInt(item.number, 16).toString();
    //         item.timestamp = formatDate(
    //           new Date(parseInt(item.timestamp)),
    //           "yyyy-MM-dd hh:mm:ss"
    //         );
    //       });
    //       response.cardList.forEach(item => {
    //         item.timestamp = formatDate(
    //           new Date(parseInt(item.timestamp)),
    //           "yyyy-MM-dd hh:mm:ss"
    //         );
    //       });
    //       this.apidata = response;
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  methods: {
    clearInput() {
      this.time = "";
      this.search_content = "";
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
            res.data.result.number = parseInt(res.data.result.number);
            res.data.result.timestamp = formatDate(
              new Date(parseInt(res.data.result.timestamp, 16) * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.getBlockHeight = res.data.result;
            if (!this.getBlockHeight) {
              this.getBlockHeight = {
                number: "",
                hash: "",
                parentHash: "",
                nonce: "",
                sha3Uncles: "",
                logsBloom: "",
                transactionsRoot: "",
                stateRoot: "",
                miner: "",
                difficulty: "",
                totalDifficulty: "",
                extraData: "",
                size: "",
                gasLimit: "",
                gasUsed: "",
                timestamp: "",
                transactions: "",
                uncles: ""
              };
            }
          });
      } else if (this.searchType === "block_hash") {
        // console.log(this.search_content);
        axios
          .post(reqURL, {
            jsonrpc: "2.0",
            method: "eth_getBlockByHash",
            params: [this.search_content, true],
            id: 2
          })
          .then(res => {
            res.data.result.number = parseInt(res.data.result.number);
            res.data.result.timestamp = formatDate(
              new Date(parseInt(res.data.result.timestamp, 16) * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.getBlockHash = res.data.result;
            if (!this.getBlockHash) {
              this.getBlockHash = {
                number: "",
                hash: "",
                parentHash: "",
                nonce: "",
                sha3Uncles: "",
                logsBloom: "",
                transactionsRoot: "",
                stateRoot: "",
                miner: "",
                difficulty: "",
                totalDifficulty: "",
                extraData: "",
                size: "",
                gasLimit: "",
                gasUsed: "",
                timestamp: "",
                transactions: "",
                uncles: ""
              };
            }
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
            res.data.result.blockNumber = parseInt(res.data.result.blockNumber);
            // res.data.result.timestamp = formatDate(
            //   new Date(parseInt(res.data.result.timestamp, 16) * 1000),
            //   "yyyy-MM-dd hh:mm:ss"
            // );
            this.getTradeHash = res.data.result;
            if (!this.getTradeHash) {
              this.getTradeHash = {
                hash: "",
                nonce: "",
                blockHash: "",
                blockNumber: "",
                timestamp: "",
                transactionIndex: "",
                partner: "",
                from: "",
                to: "",
                value: "",
                gas: "",
                gasPrice: "",
                input: ""
              };
            }
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
            this.getAccountBalance.result = parseInt(res.data.result);
            this.getAccountBalance.miner = this.search_content;
            if (!this.getAccountBalance) {
              this.getAccountBalance = {
                miner: "",
                result: ""
              };
            }
          });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.search_box {
  box-sizing: border-box;
  text-align: center;
  padding: 80px 20px 20px;
  width: 1280px;
  margin: 0 auto;
  font-size: 0;

  .search_ipt, .search_select, .btn {
    outline: none;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    background: #19b973;
    vertical-align: top;
    cursor: pointer;
    border: none;
    font-size: 16px;
    color: #ffffff;
    margin: 0 1px;
  }

  .search_ipt {
    cursor: auto;
    padding: 0 10px;
    width: 40%;
  }

  .btn:active {
    background-color: #07a178;
  }
}

.content {
  width: 1280px;
  margin: 0 auto;
  padding-top: 60px;

  table {
    table-layout: fixed;
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  th, td {
    border: 1px solid green;
    padding: 10px;
  }

  caption {
    text-align: left;
    margin: 20px 0;
  }

  .col2 {
    // width: 400px;
  }
}
</style>
