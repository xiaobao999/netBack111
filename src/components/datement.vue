<template>
  <div class="datement">
    <div class="datement_top">
      <div>图谱详细概览</div>
      <div>
        <div>
          <div>总条目</div>
          <span>500</span>
        </div>
        <div>
          <div>概念节点</div>
          <span>1200</span>
        </div>
      </div>
    </div>
    <div class="datement_main">
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          boundaryGap: false,
          type: "category",
          data: [
            1800,
            1810,
            1820,
            1830,
            1840,
            1850,
            1860,
            1870,
            1880,
            1890,
            1900,
            1910,
            1920,
            1930,
            1940,
            1950,
            1960,
            1970,
            1980,
            1990,
            2000,
            2010
          ]
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "value"
        },
        series: [
          {
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              123,
              442,
              321,
              90,
              149,
              210,
              122,
              133,
              334,
              198,
              123,
              125,
              220,
              123,
              125,
              220
            ],
            areaStyle: {},
            type: "line",
            smooth: true,
            color: ["#0e6f90"],
            symbolSize: 2
          }
        ]
      });
    }
  }
};
</script>
<style scoped lang="less">
.datement{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.datement_top {
  flex: 1;
  display: flex;
  justify-content: space-between;
  > :nth-child(2) {
    display: flex;
  }
}
.datement_main{
    flex: 4;
    height: 100%;
}
</style>