<template>
<div class="container">
    <input type="text" placeholder="NEW NOTE" class="title" v-model="t">
    <textarea placeholder="TEXT GOES HERE..." v-model="m"></textarea>
    <button v-on:click="saveNote">Save</button>
</div>
</template>
<script>

import es from 'electron-storage'
import vueAlert from 'vue-alert-go'
import autosize from 'autosize'
export default{
    data(){
        return{
            t: null,
            m: ""
        }
    },
    methods:{
        saveNote: function(){
            es.get("notes", (err, data)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log(data)
                    let d = data;
                    let i = {title:this.t, text:this.m, created: Date.now(), _id: this.uid}
                    d.notes.push(i)
                    es.set("notes", d, (err)=>{
                        if(err){
                            console.log(err)
                        } else {
                            vueAlert({
                                title: '',
                                msg: 'Note Saved!',
                                align: 'center', 
                                animate: 'bound',
                                yesBtnText: "Home"
                            })
                        }
                    })
                    
                }
            })
        }
    },
    mounted(){
        autosize(document.querySelectorAll('textarea'));
    }
}
</script>
<style scoped>
    .title{
        width: 80%;
        height: 10px;
        border: 0;
        border-bottom: 1px solid black;
        padding: 20px;
        display: block;
        margin: auto;
    }
    .title:focus{
        outline: none;
    }
    .container{
        width: 100vw;
    }

    textarea{
        width: 80%;
        padding: 20px;
        display: block;
        margin: auto;
        margin-top: 40px;
        outline: none;
        border: none;
    }
    
    button{
        width: 100px;
        border: none;
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 20px;
        padding: 5px;
        background: black;
        color: white;
        border-radius: 25px;
    }
    button:focus{
        outline: none;
    }

</style>