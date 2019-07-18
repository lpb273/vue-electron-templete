<template>
  <div class="wrap">
    <h1>index.vue</h1>
    <div>我是新打开的窗口</div>
    <div>{{busVal}}</div>
    <h2>{{vuexData}}</h2>
    <el-button type="primary" @click="closeCurrent">点击关闭</el-button>
    <el-button type="primary" @click="sendMessage">给渲染进程传参</el-button>
    <el-button type="primary" @click="add">add</el-button>
  </div>
</template>

<script>
import { ipcRenderer, remote } from "electron";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      busVal: ""
    };
  },
  filters: {},
  computed: {
    vuexData() {
      return this.$store.state;
    }
  },
  watch: {},
  methods: {
    ...mapMutations(["DECREMENT_MAIN_COUNTER"]),
    ...mapActions(["someAsyncTask"]),
    add(){
      this.someAsyncTask(222);
    },
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