<template>
  <div>
    <status :msg="childData"/>
    <br />
    <!-- <addkelas/> -->
    <daftarkelas @inputData="updateMessage"/>
  </div>
</template>

<script>
import status from "@/components/Status.vue";
// import addkelas from "@/components/Addkelas.vue";
import daftarkelas from "@/components/Daftarkelas.vue";

export default {
  components: {
    status,
    // addkelas
    daftarkelas
  },
};
</script>

