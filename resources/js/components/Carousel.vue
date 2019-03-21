<template>
    <div class="carousel">
        <slot></slot>
    </div>
</template>
<script>
    import Flickty from 'flickity'
    import 'flickity/dist/flickity.min.css'
    export default {
        props: {
            wrapAround: {default: true},
            autoPlay: {default: true},
            cellAlign: {default: "left"},
            contain: {default: true}
        },
        mounted() {
            new Flickty(this.$el, {
                wrapAround: this.wraparound,
                autoPlay: this.autoplay,
                cellAlign: 'left',
                contain: true
            })
        }
    }
</script>
