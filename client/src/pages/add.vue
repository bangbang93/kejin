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
                    <!--<el-form-item label="本月工资">-->
                        <!--<el-input-number v-model="form.salary"></el-input-number>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="本月外快">-->
                        <!--<el-input-number v-model="form.gains"></el-input-number>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="本月支出">-->
                        <!--<el-input-number v-model="form.expend"></el-input-number>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="本月结余">-->
                        <!--<el-input-number v-model="form.surplus"></el-input-number>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
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
              if (this.$route.params['id']){
                this.initEdit(this.$route.params['id']);
                this.isEditor = true;
                this.id = this.$route.params['id'];
              }
              this.listGame();
            return{
                games: [],
                form: this.emptyForm(),
                loading: false,
            }
        },
        methods: {
            async listGame(){
              let res = await fetch('/record/games', {credentials: 'include'});
              this.games = await res.json();
            },
            querySearch(search, cb){
                if (search){
                  search = search.toLowerCase()
                }
                let games = this.games;
                games = games.filter((game)=>
                    game.toLowerCase().indexOf(search) != -1)
                  .map((game)=>({
                    value: game
                  }));
                cb(games);
            },
            emptyForm(){
                return {
                    date: new Date(),
                    game: '',
                    price: 0,
                    target: '',
                    time: 1,
                    shipment: '',
                    salary: '',
                    gains: '',
                    expend: '',
                    surplus: '',
                };
            },
            async onSubmit(){
                this.loading = true;
                if (this.isEditor){
                  let res = await fetch(`/record/${this.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.form),
                    headers: new Headers({
                      'content-type': 'application/json'
                    }),
                    credentials: 'include',
                  });
                  if (res.status == 200){
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    this.listGame();
                  }
                } else {
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
                    this.listGame();
                  }
                }
                this.loading = false;
            },
            async initEdit(id){
              let res = await fetch(`/record/${id}`, {
                credentials: 'include',
              });
              if (res.status == 200){
                this.form = await res.json();
              }
            }
        }
    }
</script>
