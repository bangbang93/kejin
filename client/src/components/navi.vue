<template>
    <div>
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">查看课金记录</el-menu-item>
            <el-menu-item index="2">添加课金记录</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods: {
            handleSelect(key, keyPath){
                console.log(key, keyPath);
            }
        }
    }
</script>
