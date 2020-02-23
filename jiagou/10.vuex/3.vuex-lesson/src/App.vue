<template>
  <div id="app">
    珠峰的年龄{{$store.state.age}} <br>
    我的年龄 {{$store.getters.myAge}}

  {{$store.state.a.age}}
  {{$store.state.b.c.age}}
{{$store.state.b.age}}

{{$store.state.d.age}}
<button @click="syncChange()">点我更改</button>
 <button @click="asyncChange()">异步更改</button>
  <!-- 
  <button @click="asyncChange()">异步更改</button> -->
  </div>
</template>

<script>

export default {
  name:'app',
  mounted(){
      console.log(this.$store.state)
  },
  methods:{
    syncChange(){
      this.$store.commit('syncChange',10)
    },
    asyncChange(){
      this.$store.dispatch('asyncChange',5)
    }
  }
}
</script>

<style>

</style>
