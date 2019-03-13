
export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./views/error_page/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['./views/error_page/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['./views/error_page/500.vue'], resolve); }
};

// export const otherRouter = {
//     path: '/',
//     name: 'otherRouter',
//     redirect: '/home',
//     component: Main,
//     children: [
//         { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } },
//         { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['./views/own-space/own-space.vue'], resolve); } },
//         { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['./views/message/message.vue'], resolve); } }
//     ]
// };

// 微应用首页
export const home = {
    path: '/',
    name: 'home',
    component: resolve => { require(['./views/home.vue'], resolve); }
};

// 客户资料单据界面
export const customerVoucher = {
    path: '/customerVoucher',
    name: 'customerVoucher',
    component: resolve => { require(['./views/customer/voucher/main.vue'], resolve); },
};
// 客户资料查询界面
export const customerDetails = {
    path: '/customerDetails',
    name: 'customerDetails',
    component: resolve => { require(['./views/customer/details/main.vue'], resolve); },
};

// 商品资料单据界面
export const skuVoucher = {
    path: '/skuVoucher',
    name: 'skuVoucher',
    component: resolve => { require(['./views/sku/voucher/main.vue'], resolve); },
};

// 商品资料单据界面
export const itemVoucher = {
    path: '/itemVoucher',
    name: 'itemVoucher',
    component: resolve => { require(['./views/item/voucher/main.vue'], resolve); },
};

// 商品报价单据界面
export const quoteVoucher = {
    path: '/quoteVoucher',
    name: 'quoteVoucher',
    component: resolve => { require(['./views/quote/voucher/main.vue'], resolve); },
};
// 测试许可证申请
export const licenceVoucher = {
    path: '/licenceVoucher',
    name: 'licenceVoucher',
    component: resolve => { require(['./views/licence/voucher/main.vue'], resolve); },
};


export const routers = [
    home,
    customerVoucher,
    customerDetails,
    skuVoucher,
    itemVoucher,
    quoteVoucher,
    licenceVoucher,
    page500,
    page401,
    // page404
];
