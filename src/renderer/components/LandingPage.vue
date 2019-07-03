<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
    <main>
      <el-button type="primary" @click="openNewWindow">创建窗口</el-button>
      <el-button type="primary" @click="exitNewWindow">关闭窗口</el-button>
      <el-button type="primary" @click="sendSyncMessage">发送同步消息</el-button>
      <el-button type="primary" @click="sendAsyncMessage">发送异步消息</el-button>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import { ipcRenderer, remote, ipcMain } from "electron";
export default {
  name: "landing-page",
  data() {
    return {};
  },
  components: { SystemInformation },
  mounted() {
    // console.log(screen)
    // console.log(screen.getPrimaryDisplay().workAreaSize)
  },
  methods: {
    openNewWindow() {
      console.log(remote);
      ipcRenderer.send("create-new-window", {
        name: "firstWin",
        url: "/index",
        data:{}
      });
    },
    exitNewWindow() {
      ipcRenderer.send("close", "firstWin");
    },
    // 发送同步消息
    sendSyncMessage() {
      let msg = ipcRenderer.sendSync("sendSyncMsg", { name: "pony", age: 46 });
      console.log("这个是渲染进程发送的同步消息\n", msg);
    },
    // 发送异步消息
    sendAsyncMessage() {
      ipcRenderer.send("sendMsg", { name: "tony", age: 23 });
      ipcRenderer.on("sendFeedbackToRender", (e, data) => {
        console.log("event\n ", e);
        console.log("data\n ", data);
      });
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
