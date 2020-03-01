<template>
    <div>
        foo <button @click="show()">点击</button>
    </div>
</template>


<script>
export default {
    methods:{
        show(){
            alert(1);
        }
    }
}
</script>