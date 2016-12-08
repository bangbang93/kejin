<template>
    <div>
        <el-table :data="data">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="game" label="游戏"></el-table-column>
            <el-table-column prop="price" label="总额"></el-table-column>
            <el-table-column prop="target" label="目标"></el-table-column>
            <el-table-column prop="time" label="次数"></el-table-column>
            <el-table-column prop="shipment" label="出货"></el-table-column>
            <el-table-column prop="salary" label="工资"></el-table-column>
            <el-table-column prop="gains" label="外快"></el-table-column>
            <el-table-column prop="expend" label="支出"></el-table-column>
            <el-table-column prop="surplus" label="结余"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                data: []
            }
        }
    }
</script>
