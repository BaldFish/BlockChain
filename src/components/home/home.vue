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
              <span>{{5}}</span>
            </li>
            <li>
              存证TX条目数量
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
                  <th>出块时间</th>
                  <th>出块节点名称</th>
                  <th>存证TX条目数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in apidata.getNewBlock">
                  <td>{{item.number}}</td>
                  <td>{{item.timestamp}}</td>
                  <td>{{item.miner}}</td>
                  <td>{{item.transactions.length}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="block_box">
          <div class="clearfix block">
            <h2 class="fl">最新存证</h2>
            <span class="fr">查看全部</span>
          </div>
          <div class="con_tb">
            <table class='tb' width='100%'>
              <thead>
                <tr>
                  <th>存证TX哈希</th>
                  <th>存证信息</th>
                  <th>所属合作方名称</th>
                  <th>上链时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in apidata.cardList">
                  <td>{{item.hash}}</td>
                  <td>{{item.transactionIndex}}</td>
                  <td>{{item.partner}}</td>
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
// axios.interceptors.request.use(config => {
//   config.headers = {
//     "content-type": "application/json"
//   };
// });
const ERR_OK = 0;
export default {
  name: "home",

  data() {
    return {
      number: "",
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
          console.log(this.apidata);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .post("http://192.168.100.2:8545", {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
      .then(res => {
        this.number = parseInt(res.data.result, 16);
      });
    var that = this;
    // _.debounce(
    //   function() {
    //     axios
    //       .post("http://192.168.100.2:8545", {
    //         jsonrpc: "2.0",
    //         method: "eth_blockNumber",
    //         params: [],
    //         id: 1
    //       })
    //       .then(res => {
    //         that.number = parseInt(res.data.result, 16);
    //         console.log(that);
    //       });
    //   },
    //   1000,
    //   { maxWait: 1000 }
    // );
    setInterval(function() {
      axios
        .post("http://192.168.100.2:8545", {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1
        })
        .then(res => {
          that.number = parseInt(res.data.result, 16);
          console.log(res);
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