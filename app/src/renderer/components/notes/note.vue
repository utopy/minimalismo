<template>
    <div>
        <div class="title">
            {{title}}
        </div>
        <div class="body" style="white-space: pre-line">
            {{body}}
        </div>
    </div>
</template>
<script>
import es from 'electron-storage'
export default{
    data(){
        return{
            title: "",
            body:""
        }
    },
    mounted(){
        es.get('notes', (err, data)=>{
            if(err){
                console.log(err)
            } else {
                for (let i = 0; i < data.notes.length; i++) {
                    if(this.$route.params.id == data.notes[i].created){
                        this.title = data.notes[i].title.toUpperCase()
                        this.body = data.notes[i].text
                    }
                }
            }
        })
    }
}
</script>
<style scoped>
    .title{
        width: 80%;
        height: 10px;
        border: 0;
        /*border-bottom: 1px solid black;*/
        padding: 20px;
        display: block;
        margin: auto;
    }

    .body{
        width: 80%;
        padding: 20px;
        display: block;
        margin: auto;
        font-size: 12px;
        text-align: justify;
        font-weight: 300;
        margin-top: 40px;
        outline: none;
        border: none;
    }
</style>