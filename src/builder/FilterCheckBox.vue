<template>
  <div class="filter-variant-inner">
      <h4>{{option.displayName}}</h4>

    <div v-if="option.displayName === 'Models'" class="checkbox-models-wrap uk-child-width-1-2 uk-grid-collapse uk-grid uk-flex uk-flex-bottom">

        <div class="checkbox-models"
          v-for="variant in option.data"
          :key="variant.value">

          <el-checkbox
              @change="onCurrentChange()"
              v-model="value"
              :label="variant.value"
              :disabled="counters[variant.value] === 0"
              >
              <div v-if="variant.thumb"><img class="checkbox-img uk-width-1-1 uk-display-block" :src="''+variant.thumb+''"></div>
              <div class="uk-text-uppercase">{{variant.displayValue}}</div>
              <span class="uk-hidden">({{counters[variant.value]}})</span>
          </el-checkbox>

      </div>

    </div>


          <div v-else class="checkbox-variant"
            v-for="variant in option.data"
            :key="variant.value">
            <el-checkbox
                v-model="value"
                :label="variant.value"
                :disabled="counters[variant.value] === 0"
                >
                {{variant.displayValue}}
                <span>({{counters[variant.value]}})</span>
            </el-checkbox>
        </div>



  </div>
</template>
<script>
import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';
import matchvariants from '@/offers/utils/matchvariants';

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: 'Multiple',
          name: 'multiple',
          type: 'multiple',
        };
      },
    },
  },
  methods: {
    onCurrentChange() {
      window.scrollTo(0,0);
      // const { name } = 'body';
      // const { value } = 0;
      // this.$store.dispatch('deselect', { name, value });
     }
    },
  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.preselect[name] || [];
      },
      set(value) {
        const { name } = this.option;
        if (value.length) {
          this.$store.dispatch('select', { name, value });
        } else {
          this.$store.dispatch('deselect', { name });
        }
        this.$emit('updateRouter', true);
      },
    },

    counters() {
      const { selected, variants, filters } = this.$store.state;
      const { option } = this;
      const { data, name } = option;
      const counters = {};

      each(data, (variant) => {
        const fakeSelected = cloneDeep(selected);
        fakeSelected[name] = [variant.value];

        const fakeMatched = matchvariants(variants, fakeSelected, filters);
        counters[variant.value] = fakeMatched.length;
      });

      return counters;
    },
  },
}
</script>
<style>
.checkbox-models-wrap {
width: 118%;
margin-left: -20px;
}
.checkbox-models .el-checkbox__input{
  display: none;
}
.checkbox-models .el-checkbox__label {
text-align: center;
line-height: 19px;
font-size: 11px;
padding-left: 0;
padding-bottom: 5px;
}
.checkbox-models .checkbox-img {
  position: relative;
  z-index: -1;
}
.checkbox-models .el-checkbox img{
  margin-bottom: 5px;
  -webkit-transform: scale(1.2, 1.2);
  transform: scale(1.2, 1.2);
}
@media (min-width: 960px){
  .checkbox-models .el-checkbox img{
    opacity: 0.7;
  }
  .checkbox-models .el-checkbox.is-checked .checkbox-img, .checkbox-models .el-checkbox:hover img{
    opacity: 1
  }
}
</style>
