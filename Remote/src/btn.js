import _ from 'lodash';
import * as antd from 'antd';
console.log('antd: ', antd);
// import _ from 'lodash-es';
// console.log('_: ', _);

export default function Button(
    content = '远程组件按钮',
    onClick = () => {
        console.log('远程');
    },
) {
    const btn = document.createElement('button');
    btn.innerText = content;

    btn.addEventListener('click', onClick);

    document.body.appendChild(btn);
}
