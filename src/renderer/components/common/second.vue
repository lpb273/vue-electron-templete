<template>
  <div class="wrap">
    <h1>second.vue</h1>我是第二个窗口
    <h2>{{vuexData}}</h2>
    <el-button type="primary" @click="getMessage">接收渲染进程发送的消息</el-button>
  </div>
</template>

<script>
import { ipcRenderer, remote } from "electron";
const BrowerWindow = require("electron").remote.BrowserWindow;
export default {
  components: {},
  data() {
    return {};
  },
  filters: {},
  computed: {
    vuexData() {
      return this.$store.state;
    }
  },
  watch: {},
  methods: {
    getMessage() {
      ipcRenderer.on("toRenderNews", (event, data, id) => {
        let firstWin = BrowerWindow.fromId(id);
        firstWin.webContents.send("toIndex", "来自news进程反馈的信息");
        console.log(event);
        console.log(data);
      });
    }
  },
  created() {},
  mounted() {
    ipcRenderer.on("toRenderNews", (event, data, id) => {
      let firstWin = BrowerWindow.fromId(id);
      firstWin.webContents.send("toIndex", "来自news进程反馈的信息");
      console.log(event);
      console.log(data);
    });
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang='scss' scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: blue;
}
</style>