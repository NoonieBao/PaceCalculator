<template>
    <div id="chart">
    </div>
</template>


<style lang="css" scoped>
#chart {
    height: 300px;
    width: 400px;
    margin: 0 auto;
}
</style>

<script>
import * as echarts from 'echarts';

export default {

    props: {
        grade: {
            type: Number, //类型
            required: false, //必要性
            default: 80
        },
    },
    data() {
        var series = [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 100,
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        width: 12,
                        color: [

                            [0.4, '#3fa2f3'],    // 40% - #3fa2f3
                            [0.6, '#5b7cfd'],    // 60% - #5b7cfd
                            [0.75, '#8951f0'],   // 75% - #8951f0
                            [0.85, '#ad3fc4'],   // 85% - #ad3fc4
                            [0.95, '#d2327d'],   // 95% - #d2327d
                            [1, '#f44336']       // 100% - #f44336
                        ]


                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential'
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return (value).toFixed(2) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: this.grade,
                        name: 'Marathon'
                    }
                ]
            }
        ]
        return {
            option: { series },
            debounceTimer: null,
        }
    },
    mounted() {
        var chartDom = document.getElementById('chart');
        var myChart = echarts.init(chartDom);
        this.$refs.chartInstance = myChart
        myChart.setOption(this.option);
    },
    watch: {
        grade(newVal, oldVal) {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(() => {
                this.updateChart();
            }, 500); // 设置延迟时间
        }
    },
    methods: {
        updateChart() {
            this.$nextTick(() => {
                console.log(this.option.series[0].data[0].value)
                this.option.series[0].data[0].value=this.grade
                this.$refs.chartInstance.clear(); // 假设你使用了 ref
                this.$refs.chartInstance.setOption(this.option);
            });
        }
    }
}
</script>




