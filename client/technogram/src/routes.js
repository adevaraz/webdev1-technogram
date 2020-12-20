import Admin from './components/admin/Admin.vue';
import ListBerita from './components/admin/berita/DaftarBerita';
import AddBerita from './components/admin/berita/AddBerita';
import EditBerita from './components/admin/berita/EditBerita';
import LoginAdmin from './components/admin/log-in/LoginAdmin.vue';
import UserMain from './components/user/UserMain.vue';
import Home from './components/user/home/Home.vue';
import Category from './components/user/category/Category.vue';
import Personalization from './components/user/personalization/Personalization.vue';
import UserProfile from './components/user/profile/UserProfile.vue';
import SearchResult from './components/user/Search/SearchResult.vue';
import ReadBerita from './components/user/read-berita/ReadBerita'
import ByRecent from './components/user/Search/ByRecent.vue'
import ByMostLikes from './components/user/Search/ByMostLikes.vue'
import ListCategoryAdm from './components/admin/kategori/daftar-kategori/Category.vue';
import ListPembacaAdm from './components/admin/daftar-user/DaftarPembaca';
import AddAdmin from './components/admin/admin/AddAdmin';
import NotificationDetail from './components/user/notifications/NotificationDetail.vue'
import NotFoundAdmin from './components/error/ErrorAdmin.vue';
import NotFoundUser from './components/error/ErrorUser.vue';

import LoginPembaca from './components/user/auth/LoginUser';
import SignUpPembaca from './components/user/auth/SignUpUser';

export default [
    {
        path : '/',
        component: UserMain,
        children : [
        {
            path : '/',
            component : Home,
            name : 'home'
        },
        {
            path : '/categories',
            component : Category,
            name : 'more-categories'
        },
        {
            path : '/personalization',
            component : Personalization,
            name : 'personalization'
        },
        { 
            path : '/search-result',
            component : SearchResult,
            name : 'search-result',
            children : [
                {
                    path : '/search-result/recent',
                    component : ByRecent,
                    name : 'recent-result',
                },

                {
                    path : '/search-result/most-likes',
                    component : ByMostLikes,
                    name : 'mostlikes-result',
                },

            ]
        },
        {
            path : '/berita/:id',
            component : ReadBerita,
            name : 'read-berita'
        },
        {
            path : '/notifcation',
            component : NotificationDetail ,
            name : 'notification'
        },
        {       
            path : '/account/get-save',
            component : UserProfile,
            name : 'profile'
        },
    ]},
    
    {
        path : '/signin',
        component : LoginPembaca
    },
    {
        path : '/signup',
        component : SignUpPembaca
    },

    { 
        path : '/admin', 
        component : Admin,
        children: [
        {
            path: "/admin/berita/all",
            name: "daftar-berita",
            component: ListBerita,
        },
        {
            path: "/admin/berita/create",
            name: "add-berita",
            component: AddBerita,
        },
        {
            path: "/admin/berita/:id",
            name: "edit-berita",
            component: EditBerita,
        },
        {
            path: "/admin/berita/kategori/",
            name: "kategori",
            component: ListCategoryAdm
        },
        {
            path: "/admin/akun-pembaca",
            name: "daftar-pembaca",
            component: ListPembacaAdm
        },
        {
            path: "/admin/create",
            name: "add-admin",
            component: AddAdmin
        },
    ]},
    { 
        path : '/admin/signin',
        name : 'admin-signin',
        component : LoginAdmin
    },
    {
        path: "/admin/*",
        name: "not-found-admin",
        component: NotFoundAdmin
    },
    {
        path: "/*",
        name: "not-found-user",
        component: NotFoundUser
    }
];