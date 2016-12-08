<template>
    <div>
        <navi></navi>
        <router-view></router-view>
    </div>
</template>
<style>
</style>
<script>
import 'whatwg-fetch'
import Navi from './components/navi.vue'

    export default{
        components: {
            navi: Navi
        },
        data(){
            this.checkLogin();
            return{
                msg:'hello vue',
                user: {},
            }
        },
        methods: {
            async checkLogin(){
                let res = await fetch('/user/profile');
                if (res.status != 200){
                    window.location = '/user/login';
                } else {
                    this.user = await res.json();
                }
            },
            handleSelect(key, keyPath){
                console.log(key, keyPath);
            }
        }
    }
</script>
