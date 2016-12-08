<template>
    <div class="container">
        <el-row>
            <el-col :span="10" :offset="4">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="游戏">
                        <el-autocomplete
                                class="inline-input"
                                v-model="form.game"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择游戏，没有可直接输入"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="金额">
                        <el-input-number v-model="form.price"></el-input-number>
                    </el-form-item>
                    <el-form-item label="目标">
                        <el-input v-model="form.target"></el-input>
                    </el-form-item>
                    <el-form-item label="次数">
                        <el-input-number v-model="form.time"></el-input-number>
                    </el-form-item>
                    <el-form-item label="出货情况">
                        <el-input v-model="form.shipment"></el-input>
                    </el-form-item>
                    <el-form-item label="本月工资">
                        <el-input-number v-model="form.salary"></el-input-number>
                    </el-form-item>
                    <el-form-item label="本月外快">
                        <el-input-number v-model="form.gains"></el-input-number>
                    </el-form-item>
                    <el-form-item label="本月支出">
                        <el-input-number v-model="form.expend"></el-input-number>
                    </el-form-item>
                    <el-form-item label="本月结余">
                        <el-input-number v-model="form.surplus"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .container {
        margin-top: 40px;
    }
</style>
<script>
    export default{
        data(){
            fetch('/record/games', {credentials: 'include'})
                .then((res)=>{
                    return res.json();
                })
                .then((body)=>{
                    this.games = body;
                });
            return{
                games: [],
                form: this.emptyForm(),
                loading: false,
            }
        },
        methods: {
            querySearch(search, cb){
                let games = this.games;
                games = games.map((game)=>({
                    value: game
                }));
                cb(games);
            },
            emptyForm(){
                return {
                    date: '',
                    game: '',
                    price: '',
                    target: '',
                    time: '',
                    shipment: '',
                    salary: '',
                    gains: '',
                    expend: '',
                    surplus: '',
                };
            },
            async onSubmit(){
                this.loading = true;
                let res = await fetch('/record', {
                    method: 'POST',
                    body: JSON.stringify(this.form),
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    credentials: 'include',
                });
                if (res.status == 201){
                    this.$message({
                      message: '创建成功',
                      type: 'success'
                    });
                    this.form = this.emptyForm();
                }
                this.loading = false;
            }
        }
    }
</script>
