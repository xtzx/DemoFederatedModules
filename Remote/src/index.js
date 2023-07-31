import Button from './btn';

export const clickFn = () => {
    console.log('remote-clickFn');
};

export const params = {remote: 'remote-params'};

window.onload = function () {
    Button();
};
