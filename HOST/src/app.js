import AddBtn from './add-btn.js';

import btn from 'remote123/Button';

window.addEventListener('load', () => {
    console.log('load');
    // debugger;
    document.body.innerHTML = '<h1>host</h1>';

    AddBtn();
    btn();
    // import('remote123/Button').then((res) => {
    //     res.default();
    //     console.log('res: ', res);

    //     // debugger;
    //     // import('./add-btn').then((res) => {
    //     //     res.default();
    //     // });
    // });
});
