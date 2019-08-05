<template>
    <div>
        <profile/>
        <status/>
    </div>
</template>

<script>
import profile from '@/components/Profile.vue';
import status from "@/components/Status.vue";

export default {
    components:{
        profile,
        status
    }
}
</script>
