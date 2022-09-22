/**
 * 全局样式
 * 该APP组件时所有不同页面通用的顶级组件
 * 例如可以使用该组件在页面之间导航时保持状态
 * TIP：添加pages/_app.js文件时，需要重启
 * 只能在pages/_app.js文件中导入全局样式
 */
import "../styles/global.css";

export default function APP({Component, pageProps}) {
    return <Component {...pageProps}/>;
}
