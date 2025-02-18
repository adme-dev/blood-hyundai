<template>
<div class="vehicle-check uk-flex-top uk-modal uk-padding-small uk-flex uk-open" v-show="isOpen"
     
     tabindex="-1" uk-modal>

    <div class="uk-animation-slide-bottom uk-padding uk-background-default uk-border-rounded uk-modal-dialog uk-margin-auto-vertical">
      <button
        class="uk-button uk-button-link uk-text-secondary uk-position-top-right uk-position-small uk-msrgin-small-right"
        type="button" @click="closeModalReg">Cancel <span uk-icon="icon: close"></span></button>

      <!-- Header -->
      <div class="uk-margin-small-top">
        <div class="uk-text-center">
          <h2 class="uk-h2 uk-margin">Enter Your Trade-in 
          <div><b>Vehicle Registration</b></div>
          </h2>
        </div>
      </div>
      <div class="uk-width-1-1 input-group">
        <input v-model="regoNumber" type="text" placeholder="Enter registration number" class="rego-input uk-input uk-form-large">
        <button @click="checkRegistration" :disabled="loading || !regoNumber" class="check-button">
          {{ loading ? 'Checking...' : 'Check Registration' }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="uk-alert uk-alert-danger uk-margin-top" uk-alert>
        <span uk-icon="icon: warning"></span>
        <span class="uk-margin-small-left">{{ error }}</span>
      </div>

      <!-- Results section -->
      <div v-if="result" class="uk-margin-small-top">
        <div class="uk-card uk-card-default uk-border-rounded">
          <div class="uk-card-header uk-background-default uk-flex uk-flex-middle">
            <span class="uk-margin-small-right" uk-icon="icon: car"></span>
            <h3 class="uk-card-title uk-margin-remove">Trade-in Vehicle Details</h3>
          </div>

          <div class="uk-card-body">
            <div class="uk-grid-medium uk-child-width-1-2@s" uk-grid>
              <div>
                <dl class="uk-description-list">
                  <dt class="uk-text-small uk-text-muted">Make & Model</dt>
                  <dd class="uk-text-emphasis">{{ result.year }} {{ result.make }} {{ result.model }}</dd>

                  <dt class="uk-text-small uk-text-muted">Body Type</dt>
                  <dd class="uk-text-emphasis">{{ result.body }}</dd>

                  <dt class="uk-text-small uk-text-muted">Transmission</dt>
                  <dd class="uk-text-emphasis">{{ result.transmission }}</dd>
                </dl>
              </div>

              <div>
                <dl class="uk-description-list">
                  <dt class="uk-text-small uk-text-muted">VIN</dt>
                  <dd class="uk-text-emphasis uk-font-mono">{{ result.vin }}</dd>

                  <dt class="uk-text-small uk-text-muted">Specifications</dt>
                  <dd class="uk-text-emphasis">{{ result.description }}</dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- Accept Button -->
          <div class="uk-card-footer uk-text-right">
            <a href="#" @click="acceptVehicle" class="uk-button uk-button-primary border-5">
              Confirm Trade-in Vehicle
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VehicleCheck',
  emits: ['vehicle-selected', 'is-open-changed'],
  data() {
    return {
      state: 'VIC',
      regoNumber: '',
      result: null,
      error: null,
      loading: false,
      isOpen: true
    };
  },
  watch: {
    '$parent.tradein': {
      immediate: true,
      handler(newVal) {
        if (newVal !== 'No') {
          this.isOpen = true;
          this.regoNumber = '';
          this.result = null;
          this.error = null;
          this.$emit('is-open-changed', true);
        } else {
          this.isOpen = false;
          this.$emit('is-open-changed', false);
        }
      }
    }
  },
  methods: {
    closeModalReg() {
      if (this.$parent.tradein === 'No') {
        this.isOpen = false;
        this.$emit('is-open-changed', false);
      } else {
        this.$parent.tradein = 'No';
        this.isOpen = false;
        this.$emit('is-open-changed', false);
      }
    },
    async checkRegistration() {
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const response = await fetch('/.netlify/functions/checkRegistration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            state: this.state,
            regoNumber: this.regoNumber
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch vehicle details');
        }
        this.result = await response.json();
      } catch (err) {
        this.error = err.message || 'Failed to fetch vehicle details. Please try again later.';
        console.error('API Error:', err);
      } finally {
        this.loading = false;
      }
    },
    acceptVehicle() {

      if (this.result) {
        // Store trade-in vehicle details in localStorage
        const tradeInVehicle = {
          make: this.result.make,
          model: this.result.model,
          year: this.result.year,
          rego: this.regoNumber,
          vin: this.result.vin,
          body: this.result.body,
          transmission: this.result.transmission,
          description: this.result.description,
          dateSelected: new Date().toISOString()
        };
        
        localStorage.setItem('tradeInVehicle', JSON.stringify(tradeInVehicle));
        
        // Emit vehicle details to parent
        this.$emit('vehicle-selected', {
          make: this.result.make,
          model: this.result.model,
          year: this.result.year
        });

      }

          // Set parent's tradein value and close modal
          this.isOpen = false;
          this.$emit('is-open-changed', false);

    }
  }
};
</script>

<style scoped>
.vehicle-check-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 5px 0;
}

.uk-border-rounded {
  border-radius: 20px;
}

.border-5 {
  border-radius: 5px;
}

.input-group {
  display: flex;
}

.state-select,
.rego-input {
  font-size: 16px;
  border-radius: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.state-select {
  width: 200px;
}

.rego-input {
  flex: 1;
}

.check-button {
  padding: 0 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}

.check-button:disabled {
  background-color: #0278fd;
  cursor: not-allowed;
}

.error-message {
  color: #ff0000;
  margin-bottom: 20px;
}

.results-section {
  background-color: #f5f5f5;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>