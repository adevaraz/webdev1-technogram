export default [
    {
        path : '/', 
        component: () => import("./components/user/UserMain.vue"),
        children : [
        {
            path : '/',
            component : () => import("./components/user/home/Home.vue"),
            name : 'home'
        },
        {
            path : '/categories',
            component : () => import("./components/user/category/Category.vue"),
            name : 'more-categories'
        },
        {
            path : '/personalization',
            component : () => import ("./components/user/personalization/Personalization.vue"),
            name : 'personalization'
        },
        { 
            path : '/search-result',
            component : () => import("./components/user/Search/SearchResult.vue"),
            name : 'search-result',
            children : [
                {
                    path : '/search-result/recent',
                    component : () => import("./components/user/Search/ByRecent.vue"),
                    name : 'recent-result',
                },

                {
                    path : '/search-result/most-likes',
                    component : () => import("./components/user/Search/ByMostLikes.vue"),
                    name : 'mostlikes-result',
                },

            ]
        },
        {
            path : '/berita/:id',
            component : () => import("./components/user/read-berita/ReadBerita"),
            name : 'read-berita'
        },
        {
            path : '/notifcation',
            component : () => import("./components/user/notifications/NotificationDetail.vue") ,
            name : 'notification'
        },
        {       
            path : '/account/get-save',
            component : ()=> import("./components/user/profile/UserProfile.vue"),
            name : 'profile'
        },
    ]},
    
    {
        path : '/signin',
        component : () => import("./components/user/auth/LoginUser")
    },
    {
        path : '/signup',
        component : ()=> import("./components/user/auth/SignUpUser")
    },

    { 
        path : '/admin', 
        component : () => import("./components/admin/Admin.vue"),
        children: [
        {
            path: "/admin/berita/all",
            name: "daftar-berita",
            component: ()=> import("./components/admin/berita/DaftarBerita"),
        },
        {
            path: "/admin/berita/create",
            name: "add-berita",
            component: () => import("./components/admin/berita/AddBerita"),
        },
        {
            path: "/admin/berita/:id",
            name: "edit-berita",
            component: () => import("./components/admin/berita/EditBerita"),
        },
        {
            path: "/admin/berita/kategori/",
            name: "kategori",
            component: () => import("./components/admin/kategori/daftar-kategori/Category.vue")
        },
        {
            path: "/admin/akun-pembaca",
            name: "daftar-pembaca",
            component: () => import("./components/admin/daftar-user/DaftarPembaca")
        },
        {
            path: "/admin/create",
            name: "add-admin",
            component: () => import("./components/admin/admin/AddAdmin")
        },
    ]},
    { 
        path : '/admin/signin',
        name : 'admin-signin',
        component : () => import("./components/admin/log-in/LoginAdmin.vue")
    },
    {
        path: "/admin/*",
        name: "not-found-admin",
        component: () => import("./components/error/ErrorAdmin.vue")
    },
    {
        path: "/*",
        name: "not-found-user",
        component: () => import("./components/error/ErrorUser.vue")
    }
];