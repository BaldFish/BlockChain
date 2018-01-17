<template>
  <div class="home">
    <div class="container">
      <div class="container_box">

        <div class="count_box">
          <ul class="count">
            <li>
              当前区块高度
              <span>{{number}}</span>
            </li>
            <li>
              记帐节点数
              <span>{{peerCount}}</span>
            </li>
            <li>
              交易数量
              <span>{{10}}</span>
            </li>
          </ul>
        </div>

        <div class="block_box">
          <div class="clearfix block">
            <h2 class="fl">最新区块</h2>
            <span class="fr">查看全部</span>
          </div>
          <div class="con_tb">
            <table class='tb' width='100%'>
              <thead>
                <tr>
                  <th>区块高度</th>
                  <th>出块节点名称</th>
                  <th>交易笔数</th>
                  <th>出块时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in blocks">
                  <td>{{item.result.number}}</td>
                  <td>{{item.result.miner}}</td>
                  <td>{{item.result.transactions.length}}</td>
                  <td>{{item.result.timestamp}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="block_box">
          <div class="clearfix block">
            <h2 class="fl">最新交易</h2>
            <span class="fr">查看全部</span>
          </div>
          <div class="con_tb">
            <table class='tb' width='100%'>
              <thead>
                <tr>
                  <th>所属应用</th>
                  <th>交易哈希</th>
                  <th>存证信息</th>
                  <th>交易时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in apidata.cardList">
                  <td>{{item.partner}}</td>
                  <td>{{item.hash}}</td>
                  <td>{{item.transactionIndex}}</td>
                  <td>{{item.timestamp}}</td>
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

const ERR_OK = 0;
export default {
  name: "home",

  data() {
    return {
      number: "",
      peerCount: "",
      blocks: [],
      qblocks: [],
      transactions: [],
      apidata: {},
      getNewBlock: [],
      cardList: []
    };
  },
  mounted() {
    axios
      .get("/api")
      .then(response => {
        var response = response.data;
        if (response.errno === ERR_OK) {
          response = response.data;
          response.getNewBlock.forEach(item => {
            item.number = parseInt(item.number, 16).toString();
            item.timestamp = formatDate(
              new Date(Number(item.timestamp)),
              "yyyy-MM-dd hh:mm:ss"
            );
          });
          response.cardList.forEach(item => {
            item.timestamp = formatDate(
              new Date(Number(item.timestamp)),
              "yyyy-MM-dd hh:mm:ss"
            );
          });
          this.apidata = response;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    var blocks = [];
    var qblocks = [];
    var transactions = [];
    // 获取区块数量
    axios
      .post("http://47.92.5.236:8545", {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
      .then(res => {
        this.number = parseInt(res.data.result, 16);
        // 获取最新10个区块
        for (var i = this.number; i > this.number - 10; i--) {
          axios
            .post("http://47.92.5.236:8545", {
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
        return res;
      });
    //获取交易数量及最新10条交易
    // .then(res => {
    //   for (var i = this.number; i > this.number - 100; i--) {
    //     axios
    //       .post("http://47.92.5.236:8545", {
    //         jsonrpc: "2.0",
    //         method: "eth_getBlockByNumber",
    //         params: ["0x" + i.toString(16), true],
    //         id: i
    //       })
    //       .then(res => {
    //         res.data.result.number = parseInt(res.data.result.number, 16);
    //         res.data.result.timestamp = formatDate(
    //           new Date(parseInt(res.data.result.timestamp, 16) * 1000),
    //           "yyyy-MM-dd hh:mm:ss"
    //         );
    //         qblocks.push(res.data);
    //         this.qblocks = qblocks;
    //       });
    //   }
    // });
    axios
      .post("http://47.92.5.236:8545", {
        jsonrpc: "2.0",
        method: "net_peerCount",
        params: [],
        id: 2
      })
      .then(res => {
        this.peerCount = parseInt(res.data.result, 16);
      });
    // 每隔15秒重新获取数据并更新DOM
    var that = this;
    setInterval(function() {
      axios
        .post("http://47.92.5.236:8545", {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1
        })
        .then(res => {
          that.number = parseInt(res.data.result, 16);

          axios
            .post("http://47.92.5.236:8545", {
              jsonrpc: "2.0",
              method: "eth_getBlockByNumber",
              params: ["0x" + that.number.toString(16), true],
              id: that.number
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
      axios
        .post("http://47.92.5.236:8545", {
          jsonrpc: "2.0",
          method: "net_peerCount",
          params: [],
          id: 2
        })
        .then(res => {
          that.peerCount = parseInt(res.data.result, 16);
        });
    }, 15000);
  },
  methods: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home {
  box-sizing: border-box;
  width: 1366px;
  margin: 0 auto;

  .container {
    padding: 20px;

    .container_box {
      .count_box {
        width: 100%;
        padding: 20px;

        .count {
          display: flex;

          li {
            display: inline-block;
            flex: 1;

            span {
              color: #0080ff;
              padding: 5px;
            }
          }
        }
      }

      .block_box {
        border: 1px solid #bfc0c1;

        .block {
          border-bottom: 1px solid #bfc0c1;

          h2 {
            padding: 10px 20px;
          }

          span {
            color: #0080ff;
            padding: 10px 20px;
            cursor: pointer;
          }
        }

        .con_tb {
          padding: 10px 20px;

          thead {
            background: #8882aa;
          }

          tr {
            border-bottom: 1px solid #bfc0c1;
          }

          th, td {
            padding: 10px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
