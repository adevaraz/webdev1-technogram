import Admin from './components/admin/Admin.vue';
import ListBerita from './components/admin/berita/DaftarBerita';
import AddBerita from './components/admin/berita/AddBerita';
import EditBerita from './components/admin/berita/EditBerita';
import LoginAdmin from './components/admin/log-in/LoginAdmin.vue';
import UserMain from './components/user/UserMain.vue';
import Home from './components/user/home/Home.vue';
import Category from './components/user/category/Category.vue';
import SearchResult from './components/user/Search/SearchResult.vue';
import ReadBerita from './components/user/read-berita/ReadBerita'
import ListCategoryAdm from './components/admin/kategori/daftar-kategori/Category.vue';
import ListPembacaAdm from './components/admin/daftar-user/DaftarPembaca';
import AddAdmin from './components/admin/admin/AddAdmin';

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
            path : '/search',
            component : SearchResult,
            name : 'search-result'
        },
        {
            path : '/berita/:id',
            component : ReadBerita,
            name : 'read-berita'
        }
    ]},
    {
        path : '/signin',
        component : Admin // kuduna user
    },
    {
        path : '/signup',
        component : Admin // kuduna user
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
        }
    ]},
    { 
        path : '/admin/signin',
        name : 'admin-signin',
        component : LoginAdmin
    }
];