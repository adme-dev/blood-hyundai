<template>
  <div>
    <div v-if="wizardInProgress" v-show="asyncState !== 'pending'">
      <keep-alive>
        <component
            ref="currentStep"
            :is="currentStep"
            @update="processStep"
            @updateAsyncState="updateAsyncState"
            :wizard-data="form"
            :selectedModel = "selectedModel"
        ></component>
      </keep-alive>
      <div class="progress-bar">
        <div :style="`width: ${progress}%;`"></div>
      </div>

      <!-- Actions -->
      <div class="buttons">
        <button
            @click="goBack"
            v-if="currentStepNumber > 1"
            class="btn-outlined"
        >Back
        </button>
        <button
            @click="nextButtonAction"
            :disabled="!canGoNext"
            class="btn"
        >{{ isLastStep ? 'Complete Order' : 'Next'  }}</button>
      </div>

      <pre><code>{{form}}</code></pre>
    </div>
    <div v-else>
      <h1 class="title">THank you!</h1>
      <h2 class="subtitle">
      Great see ya there
      </h2>
    </div>
    <div class="loading-wrapper" v-if="asyncState === 'pending'">
      <div class="loader">
        <img src="/spinner.svg" alt="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  </div>

</template>

<script>
import {postFormToDB} from "./api";
import FormPlanPicker from './FormPlanPicker'
import FormVariantPicker from './FormVariantPicker'
import FormVariantColourPicker from './FormVariantColourPicker'
import FormUserDetails from './FormUserDetails'
import FormAddress from './FormAddress'
import FormReviewOrder from './FormReviewOrder'
export default {
  name: 'FormWizard',
  components: {
    FormPlanPicker,
    FormVariantPicker,
    FormVariantColourPicker,
    FormUserDetails,
    FormAddress,
    FormReviewOrder
  },
  data () {
    return {
      canGoNext: false,
      currentStepNumber: 1,
      asyncState: null,
      steps: [
        'FormPlanPicker',
        'FormVariantPicker',
        'FormVariantColourPicker',
        'FormUserDetails',
        'FormAddress',
        'FormReviewOrder'
      ],
      form: {
        plan: null,
        email: null,
        name: null,
        password: null,
        address: null,
        recipient: null,
        chocolate: false,
        otherTreat: false
      }
    }
  },
  computed: {
    isLastStep() {
      return this.currentStepNumber === this.length
    },
    wizardInProgress() {
      return this.currentStepNumber <= this.length
    },
    currentStep(){
      return this.steps[this.currentStepNumber - 1]
    },
    length(){
      return this.steps.length
    },
    progress () {
      return this.currentStepNumber/this.length * 100
    },
    selectedModel(){
      return this.form?.plan?.node?.title;
    }
  },



  methods: {

    updateAsyncState(state) {
      this.asyncState = state
    },
    nextButtonAction(){
      if(this.isLastStep) {
        this.submitOrder()
      } else {
        this.goNext()
      }
    },
    processStep(step){
      Object.assign(this.form,step.data)
      this.canGoNext = step.valid
    },
    goBack () {
      this.currentStepNumber--
      this.canGoNext = true
    },
    goNext () {
      this.currentStepNumber++
      // this.canGoNext = false
      this.$nextTick(() => {
        this.canGoNext = !this.$refs.currentStep.invalid
        // this.$refs.currentStep.submit()
      })

    }
  }
}
</script>
<style>
.progress-bar {
  width: 100%;
  border-radius: 9999px;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 12px;
  background: #c6c6c6
}

.progress-bar>div {
  border-radius: 9999px;
  position: absolute;
  height: 100%;
  background-color: #09848d;
  -webkit-transition: all .3s ease;
  transition: all .3s ease
}



.buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end
}

.buttons a:not(:last-of-type), .buttons button:not(:last-of-type) {
  margin-left: .75rem;
  margin-right: .75rem
}

.btn {
  display: inline-block;
  color: #fff;
  background-color: #09848d;
  padding: .75rem 1.5rem;
  text-decoration: none;
  border-radius: .25rem;
  text-transform: uppercase;
  font-weight: 500;
  font-size: .875rem;
  border-width: 2px;
  border-color: #09848d;
  letter-spacing: .2;
  -webkit-transition: all .3s ease;
  transition: all .3s ease
}

.btn:hover {
  background: rgba(37, 142, 149, .96);
  border-color: rgba(37, 142, 149, .96)
}

.btn:disabled {
  background-color: #127077;
  border-color: #127077;
  color: #9fc1c3
}

.btn-outlined {
  display: inline-block;
  color: #09848d;
  padding: .75rem 1.5rem;
  text-decoration: none;
  border-radius: .25rem;
  text-transform: uppercase;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  border-width: 2px;
  border-color: #09848d;
  letter-spacing: .2;
  -webkit-transition: all .3s ease;
  transition: all .3s ease
}

.btn-outlined:hover {
  color: #fff;
  background: rgba(37, 142, 149, .96);
  border-color: rgba(37, 142, 149, .96)
}

.plans {
  padding: 0 40px;
  margin-bottom: 40px
}

.plans .plan {
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  -webkit-transition: all .3s ease;
  transition: all .3s ease
}

.plans .plan, .plans .plan>.weight {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.plans .plan>.weight {
  width: 20%;
  font-size: 1.875rem;
  font-weight: 500;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #7dacaf;
  color: #136268;
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
  height: 100px
}

.plans .plan>.description {
  width: 60%;
  padding: 1rem
}

.plans .plan>.description .title {
  color: #3d4852;
  display: block;
  font-weight: 700;
  margin-bottom: .25rem
}

.plans .plan>.description .description {
  font-size: .875rem;
  font-weight: 500;
  color: #8795a1;
  line-height: 1.5
}

.plans .plan>.price {
  width: 20%;
  color: #09848d;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-top: 1.5rem;
  font-family: Crimson Text, serif;
  font-weight: 600
}

.plans .plan>.price .dollar-sign {
  font-size: 24px;
  font-weight: 700
}

.plans .plan>.price .number {
  font-size: 72px;
  line-height: .5
}

.plans .active-plan, .plans .plan:hover {
  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08)
}

.plans .active-plan:after, .plans .plan:hover:after {
  border-width: 2px;
  border-color: #7dacaf;
  border-radius: .25rem;
  content: "";
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0
}

form.form {
  padding: .8rem 4rem
}

.form-group, form.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap
}

.form-group {
  width: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: .5rem 2rem;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end
}

.form-group .form-label {
  width: 20%;
  text-align: right;
  margin-right: 2rem;
  font-weight: 500;
  color: #5c6162
}

.form-group .form-control {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border-radius: .25rem;
  padding: .5rem .75rem;
  color: #5c6162;
  font-weight: 500;
  background-color: #f4f7f7
}

.form-group .form-control::-webkit-input-placeholder {
  font-weight: 400
}

.form-group .form-control:-ms-input-placeholder, .form-group .form-control::-ms-input-placeholder {
  font-weight: 400
}

.form-group .form-control::placeholder {
  font-weight: 400
}

.form-group .form-control:focus {
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  outline: none
}

.summary {
  background-color: #fff;
  border-radius: .5rem;
  padding: 1.5rem;
  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);
  margin-bottom: 2rem
}

.summary h3 {
  font-size: 1.125rem;
  color: #5c6162;
  margin-bottom: .5rem
}

.summary .description, .summary h3 {
  font-weight: 500;
  letter-spacing: .05em
}

.summary .description {
  color: #8795a1;
  font-size: .875rem;
  width: 66.66667%;
  line-height: 1.5
}

.summary hr {
  margin-top: 1rem;
  margin-bottom: 1rem
}

.summary .options {
  margin-top: 1rem;
  margin-bottom: 2rem
}

.summary .options .option {
  margin-top: .5rem;
  letter-spacing: .05em;
  color: #5c6162;
  font-weight: 500;
  font-size: .875rem
}

.summary .options .option input {
  margin-left: 1rem;
  margin-right: .5rem
}

.summary .address {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.error {
  width: 100%;
  margin-top: .25rem;
  color: #e3342f;
  text-align: right;
  font-weight: 500;
  font-size: .875rem;
  color: tomato
}

.loading-wrapper {
  margin-top: 4rem
}

.loading-wrapper, .loading-wrapper .loader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.loading-wrapper .loader {
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: .5rem;
  margin-left: auto;
  margin-right: auto;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-width: 2px;
  border-color: #09848d;
  border-radius: .5rem;
  font-size: 1.25rem;
  color: #5c6162
}

.loading-wrapper .loader p {
  margin-right: 1rem
}

.info {
  margin-top: .25rem;
  color: #5c6162;
  text-align: right;
  font-weight: 500;
  font-size: .875rem;
}

</style>
