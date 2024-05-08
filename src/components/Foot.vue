<template>
    <footer>
        <div id="foot_container">
            <div id="foot_texts">
                <span>Site made with ❤️ by Zeon</span>
                <span>
                    <a :title="gitInfo.LASTCOMMITDATETIME" target="_blank"
                        :href="`https://github.com/NoonieBao/PaceCalculator/commit/${gitInfo.COMMIT_HASH}`">
                        <img :src="`https://img.shields.io/badge/${gitInfo.VERSION}-F05032?style=flat&logo=git&logoColor=white`" :alt="gitInfo.VERSION">
                    </a>
                </span>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    beforeCreate() {
        const q = null

    },
    data() {
        const gitInfo = {
            COMMIT_HASH: process.env.COMMIT_HASH,
            BRANCH: process.env.BRANCH,
            VERSION: process.env.VERSION,
            LASTCOMMITDATETIME: process.env.LASTCOMMITDATETIME,
        }
        return {
            gitInfo,
        }
    },
    mounted() {  // 切记  一定要在组件里加
        this.$nextTick(() => {
            const body = document.querySelector("body");
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
}
</script>
<style scoped lang="less">
@refer_img: 25px;

footer> {
    background-color: var(--ftBgColor);
    display: block;
    margin: auto 0 0; //重要。margin-top: auto;：将上边距设置为自动。这意味着浏览器将尽可能地在垂直方向上平均分配剩余空间，将元素置于垂直居中位置。

    >#foot_container {
        display: flex;
        flex-direction: column;
        align-items: center;

        >#foot_texts {
            width: 100%;
            margin-top: 10px;
            padding: 0 22px 20px;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;

            >span {
                font-size: 12px;
                color: var(--ftTxtColor);
                padding: 5px;
            }
        }
    }
}

@media screen and (min-width: (1080px)) {

    #foot_texts {
        max-width: 1080px;
    }
}

@media screen and (max-width:(1080px)) and (min-width:720px) {

    #foot_texts {
        max-width: 720px;
    }
}

@media screen and (max-width:(720px)) {

    #foot_texts {
        max-width: 560px;
        flex-direction: column;
    }
}
</style>