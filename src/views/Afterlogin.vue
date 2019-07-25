<template>
  <div>
    <status />
    <br />
    <!-- <addkelas/> -->
    <jadwal />
  </div>
</template>

<script>
import status from "@/components/Status.vue";
// import addkelas from "@/components/Addkelas.vue";
import jadwal from "@/components/Jadwal.vue";

export default {
  components: {
    status,
    // addkelas
    jadwal
  }
};
</script>

