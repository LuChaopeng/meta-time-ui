<template>
  <div
      class="meta-tag"
      :class="eventType"
  >
    <span>{{eventDescription}}</span>
  </div>
</template>

<script>
export default {
  name: "MetaTag",
  props:{
    eventType:String,
    eventDescription:String,
    eventTimestamp:Date
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
  .meta-tag{
    width: fit-content;
    min-width: 15vw;
    max-width: 42vw;
    display: flex;
    justify-content: center;
    border: 1px solid #797979;
    border-radius: 1vw;
    padding: 0.3rem 0.5rem;
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
</style>