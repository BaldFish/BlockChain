<template>
  <div class="click">
    <div class="tradeHash">
      <span>&gt;</span>
      <span>交易ID：</span>
      <span class="targetParam"></span>
    </div>
    <div class="pictureLayer-box clear-fix">
      <div class="tradeMesg-title">交易信息</div>
      <div class="business-infoboxBg">
        <div class="business-infobox">
          <div class="ascription-titlebox">
            <span class="ascription-title">所属应用信息</span>
            <img src="logo/62fb7101ca1e869e36f4a5144a2aa332.png" class="ascription-img">
            <div class="ascription-name">上海倾信互联网金融信息服务有限公司</div>
          </div>
        </div>
      </div>
      <div class="pictureLayer">
        <div class="tradeMesg-row clear-fix">
          <div class="certified-row">
            <span class="tradeMesg-name">交易发起方：</span>
            <span class="tradeMesg-content source_address">bubiV8hv54SaP1S45ro6kaDTBTy6FvpMM8kTn5Bs</span>
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

export default {
  name: "click",
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
