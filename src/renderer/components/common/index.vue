<template>
  <div class="wrap">
    <h1>index.vue</h1>
    <div>我是新打开的窗口</div>
    <div>{{busVal}}</div>
    <el-button type="primary" @click="closeCurrent">点击关闭</el-button>
    <el-button type="primary" @click="sendMessage">给渲染进程传参</el-button>
  </div>
</template>

<script>
import { ipcRenderer, remote } from "electron";
export default {
  components: {},
  data() {
    return {
      busVal: ""
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    sendMessage() {
      ipcRenderer.send("create-new-window", {
        name: "secondWin",
        url: "/second",
        data: {
          name: "secondWin",
          age: "99"
        }
      });
    },
    closeCurrent() {
      remote.getCurrentWindow().close();
    }
  },
  created() {},
  mounted() {
    ipcRenderer.on("toIndex", (e, data) => {
      console.log("===", data);
    });
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.$Bus.$off("msg");
  },
  destroyed() {},
  activated() {}
};
</script>
<style lang='css' scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: red;
}
</style>