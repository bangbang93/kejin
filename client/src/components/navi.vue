<template>
    <div>
        <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="1" :route="{name: 'list'}">查看课金记录</el-menu-item>
            <el-menu-item index="2" :route="{name: 'add'}">添加课金记录</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default{
        data(){
            let data = {};
            data.active = '1';
            return data;
        },
        methods: {
            handleSelect(key, keyPath){
                console.log(key, keyPath);
            }
        }
    }
</script>
