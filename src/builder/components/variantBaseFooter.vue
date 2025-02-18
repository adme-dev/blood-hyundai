<template>
<div class="variant-footer">

   <div class="uk-width-1-1 variant-price-footer uk-background-muted" style="width:100vw">
       <div class="uk-container uk-margin-auto variant-price-footer">
           <div class="uk-text-left uk-width-1-1 uk-flex uk-flex-middle uk-grid">

           <div class="uk-width-small">
             <img :data-src="footerVehicelImage || variant.colours[0].images" class="uk-width-1-1" loading="lazy" data-uk-img />
           </div>

           <div class="uk-width-auto">
               <div>
                 <div class="uk-text-light">PAINT</div>
                 <div>
                    {{ selectedColourName || variant.colours[0].colour_name }}
                  </div>
               </div>
           </div>
           <div class="uk-width-auto">
               <div>
                 <div class="uk-text-light">TRANSMISSION</div>
                 <div>{{ variant.transmission.displayValue[0] }}</div>
               </div>
           </div>

           <div class="uk-width-auto">
               <div>
                 <div class="uk-text-light">DRIVETRAIN</div>
                 <div>{{ variant.drivetrain.displayValue[0] }}</div>
               </div>
           </div>

           <div class="uk-width-auto">
               <div>
                 <div class="uk-text-light">ENGINE</div>
                 <div>{{ variant.engine.displayValue[0] }}</div>
               </div>
           </div>

           <div class="uk-width-auto uk-margin-auto-left">
             <router-link
               :to="'/variant/' + variant.slug + ''"
               class="
                 uk-button
                 uk-button-primary
               "
               >Enquire / Accessories</router-link
             >
           </div>
           </div>
       </div>
    </div>


  </div>
</template>
<script>
export default {
  props: ['variant', 'footerVehicelImage','selectedColourName'],
}
</script>
<style>
.variant-price-footer {
  font-size: 12px;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  background: #fff;
  z-index: 2;
}
</style>
