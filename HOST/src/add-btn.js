// import _ from 'lodash';
import * as antd from 'antd';
console.log('antd: ', antd);

export default function AddBtn() {
    const btn = document.createElement('button');
    btn.innerText = 'Click me';

    btn.addEventListener('click', () => {
        console.log('click');
    });

    document.body.appendChild(btn);
}
