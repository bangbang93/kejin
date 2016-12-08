<template>
    <div>
        <div>this is template body</div>
    </div>
</template>
<style>
    body{
        background-color:#66ccff;
    }
</style>
<script>
    import 'whatwg-fetch'

    export default{
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
            }
        }
    }
</script>
