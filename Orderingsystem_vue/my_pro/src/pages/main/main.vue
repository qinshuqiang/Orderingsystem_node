<template>
  <div class="main">
    <div class="main-title">老铁们开始点餐吧~！</div>
    <div class="pro" v-for="(e, idx) in arr" :key="idx">
      <div class="pro-name">
        {{ e.name }}
      </div>
      <div class="pro-list">
        <div class="pro-item" v-for="(item, i) in e.list" :key="i">
          <div>{{ item.name }}</div>
          <div @click="countClick(false, idx, i)">-</div>
          <div>{{ item.value }}</div>
          <div @click="countClick(true, idx, i)">+</div>
          <div>{{ item.money }}</div>
        </div>
      </div>
      <div class="pro-list2" v-if="idx == 2">
        <div class="pro-list2-name">双拼备注</div>
        <div class="pro-list2-name">
          <input type="text" v-model="beizhu" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">总价：{{ sum }}</div>
      <div class="bottom-right" @click="submit">提交哦</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      beizhu: "",
      sum: 0,
      arr: [
        {
          name: "主食",
          list: [
            {
              name: "卤肉饭",
              money: 14,
              value: 0,
              type: 0,
              id: 0,
            },
            {
              name: "排骨饭",
              money: 14,
              value: 0,
              type: 0,
              id: 1,
            },
            {
              name: "冬菇滑鸡饭",
              money: 14,
              value: 0,
              type: 0,
              id: 2,
            },
            {
              name: "咸鱼花肉饭",
              money: 12,
              value: 0,
              type: 0,
              id: 3,
            },
            {
              name: "榨菜蒸花肉饭",
              money: 12,
              value: 0,
              type: 0,
              id: 4,
            },
            {
              name: "咸蛋肉饼饭",
              money: 12,
              value: 0,
              type: 0,
              id: 5,
            },
            {
              name: "梅菜肉饼饭",
              money: 12,
              value: 0,
              type: 0,
              id: 6,
            },
            {
              name: "冬菇肉饼饭",
              money: 12,
              value: 0,
              type: 0,
              id: 7,
            },
            {
              name: "皇上皇腊肠饭",
              money: 12,
              value: 0,
              type: 0,
              id: 8,
            },
            {
              name: "榨菜蒸鱼饭",
              money: 13,
              value: 0,
              type: 0,
              id: 9,
            },
          ],
        },
        {
          name: "加料",
          list: [
            {
              name: "花旗参炖竹丝鸡",
              money: 14,
              value: 0,
              type: 0,
              id: 10,
            },
            {
              name: "五指毛桃炖老鸡",
              money: 12,
              value: 0,
              type: 0,
              id: 11,
            },
            {
              name: "沙参玉竹炖乳鸽",
              money: 12,
              value: 0,
              type: 0,
              id: 12,
            },
            {
              name: "虫草花炖鸡脚",
              money: 10,
              value: 0,
              type: 0,
              id: 13,
            },
            {
              name: "海底椰炖瘦肉",
              money: 10,
              value: 0,
              type: 0,
              id: 14,
            },
            {
              name: "加肉",
              money: 8,

              value: 0,
              type: 0,
              id: 15,
            },
            {
              name: "白饭",
              money: 5,

              value: 0,
              type: 0,
              id: 16,
            },
            {
              name: "油菜",
              money: 3,

              value: 0,
              type: 0,
              id: 17,
            },
            {
              name: "咸鸭蛋",
              money: 3,

              value: 0,
              type: 0,
              id: 18,
            },
            {
              name: "煎蛋",
              money: 2,

              value: 0,
              type: 0,
              id: 19,
            },
          ],
        },
        {
          name: "双拼",
          list: [
            {
              name: "主食任意双排",
              money: 20,
              value: 0,
              type: 1,
              id: 19,
            },
          ],
        },
      ],
    };
  },
  created() {
    this.get(
      `order/getOrder?username=${localStorage.getItem("username")}`
    ).then((res) => {
      console.log(res.data);
      let { arr } = this;
      if (res.data.status == 0 && res.data.data.length > 0) {
        arr.forEach((ele, index) =>
          ele.list.forEach((e, i) => {
            res.data.data.forEach((resE) => {
              if (resE.name == e.name) {
                arr[index].list[i].value = resE.value;
              }
            });
          })
        );

        let sum = 0;
        arr.forEach((item) =>
          item.list.forEach((e) => (sum += e.value * e.money))
        );
        this.arr = arr;
        this.sum = sum;
      }
    });
  },
  methods: {
    countClick(e, idx, i) {
      let { arr } = this;
      if (e) arr[idx].list[i].value += 1;
      else arr[idx].list[i].value - 1 >= 0 && (arr[idx].list[i].value -= 1);
      let sum = 0;
      arr.forEach((item) =>
        item.list.forEach((e) => (sum += e.value * e.money))
      );
      this.arr = arr;
      this.sum = sum;
    },
    submit() {
      let { arr, sum, beizhu } = this;
      if (sum == 0) return alert("貌似没选商品吧");
      let orderInfo = [];
      arr.forEach((item, i) => {
        if (i == 2) {
          item.list.forEach((e) => {
            if (e.value) {
              let obj = e;
              obj.beizhu = beizhu;
              orderInfo.push(e);
            }
          });
        } else {
          item.list.forEach((e) => e.value && orderInfo.push(e));
        }
      });
      this.post("order/postOrder", {
        username: localStorage.getItem("username"),
        orderInfo,
      }).then((res) => {
        if (res.data.status == 0) alert("添加成功");
        else alert(res.data.errMsg);
      });
    },
  },
};
</script>
<style scoped>
.pro-list2-name input {
  width: 70%;
}
.bottom div {
  text-align: center;
  width: 500px;
}
.bottom {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
.main-title {
  font-size: 5vw;
  font-weight: 600;
}
.pro-name {
  margin-top: 80px;
}
.pro-list {
  display: flex;
  flex-wrap: wrap;
}
.pro-item {
  width: 50%;
  display: flex;
  justify-content: center;
}
.pro-item div {
  padding: 0 5px;
  cursor: pointer;
}
.pro-item div:first-child {
  text-align: left;
  padding-right: 20px;
  width: 200px;
  cursor: default;
}
.pro-item div:last-child {
  text-align: left;
  padding-left: 20px;
  width: 50px;
  cursor: default;
}
</style>
