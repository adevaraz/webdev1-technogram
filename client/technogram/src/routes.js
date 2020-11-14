import Admin from './components/admin/Admin.vue';
import LoginAdmin from './components/admin/log-in/LoginAdmin.vue';
import UserMain from './components/user/UserMain.vue';
import Home from './components/user/home/Home.vue';
import Category from './components/user/category/Category.vue';
import SearchResult from './components/user/Search/SearchResult.vue'
export default [
    {path : '/' , component : UserMain , children : [
        {path : '/' , component : Home , name : 'home'},
        {path : '/categories' , component : Category ,name : 'more-categories'},
        {path : '/search' , component : SearchResult , name : 'search-result'}
    ]},
    {path : '/signin' , component : Admin},
    {path : '/signup' , component : Admin},
    {path : '/admin' , component : Admin},
    {path : '/admin/signin' , component : LoginAdmin}

];