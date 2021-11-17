<template>
    <label :for="id" class="time-card-option">
      <div class="content" :class="id">{{content}}</div>
      <div class="radio">
        <input type="radio" :id="id" :name="name" :value="id" @input="$emit('update:id', $event.target.value)">
      </div>
    </label>
</template>

<script>
export default {
  name: "TimeCardOption",
  props:{
    id:String,
    content:String,
    name:String
  },
  emits: ['update:id'],
}
</script>

<style scoped>
.time-card-option{
  width: 31vw;
  height: 9vw;
  display: flex;
  border: 0.3vw solid #797979;
  border-radius: 1vw;
  background: #efefef;
  margin-bottom: 3vw;
}
.content{
  flex-basis: 24vw;
}
.radio{
  flex: 1 1 auto;
}
.sleep{
  background-color: #F7B836;
}
.workout{
  background-color: #2ED274;
}
.note{
  background-color: #5AD0DA;
}
.content,.radio{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>