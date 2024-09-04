<script>
import AppMain from './components/AppMain.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

export default {
    data() {
        return {

        };
    },
    components: {
        AppMain,
        NotFoundPage
    },
    methods: {

    }
}
</script>

<template>
    
    <AppMain></AppMain>

</template>
<style lang="scss">
@use "assets/scss/main.scss" as *;
@import "assets/scss/partials/reset";
</style>
