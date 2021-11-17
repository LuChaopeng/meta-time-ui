<template>
  <div class="main-page">
    <time-card></time-card>
    <meta-tag event-type="workout" event-description="跑步2.6km" :event-timestamp="date"></meta-tag>
  </div>
</template>

<script>
import MetaTag from "@/components/MetaTag";
import TimeCard from "@/components/TimeCard";

export default {
  name: "Main",
  data(){
    return{
      date:new Date('November 17,2021'),
      eventList:[]
    }
  },
  components:{
    TimeCard,
    MetaTag
  },

}
</script>

<style scoped>

</style>