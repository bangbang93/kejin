<template>
    <div class="container">
        <el-table :data="data">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="game" label="游戏"></el-table-column>
            <el-table-column prop="price" label="总额"></el-table-column>
            <el-table-column prop="target" label="目标"></el-table-column>
            <el-table-column prop="time" label="次数"></el-table-column>
            <el-table-column prop="shipment" label="出货"></el-table-column>
            <!--<el-table-column prop="salary" label="工资"></el-table-column>-->
            <!--<el-table-column prop="gains" label="外快"></el-table-column>-->
            <!--<el-table-column prop="expend" label="支出"></el-table-column>-->
            <!--<el-table-column prop="surplus" label="结余"></el-table-column>-->
            <el-table-column
                    inline-template
                    label="操作">
                <div>
                    <el-button
                            size="small"
                            @click="handleEdit($index, row)">
                        编辑
                    </el-button>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            this.initData();
            return{
                data: []
            }
        },
        methods: {
            async initData(){
                let res = await fetch('/record', {credentials: 'include'});
                let data = await res.json();
                data.forEach((row)=>{
                    row.date = new Date(row.date).toLocaleDateString();
                });
                this.data = data;
            },
            async handleEdit(index, row){
                this.$router.push({name: 'edit', params: {id: row._id}});
            }
        }
    }
</script>
