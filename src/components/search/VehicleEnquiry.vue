<!--VehicleEnquiry-->
<template>
  <div class="uk-position-relative">

    <div v-if="SavedListModal">
      <!-- <CompareSavesModal class="compare-saves-modal"/> -->
      <SavedListModal @is-saved-open-changed="SavedListModalOpenChange"
        class="saved-list-modal uk-padding-small uk-border-rounded uk-position-fixed uk-position-top-right" />

      <div @click.prevent="toggleSavedListModal" class="full-page-overlay"></div>
    </div>

    <div class="uk-position-fixed uk-position-top-right uk-position-small position-z-index-top"
      v-if="showModalEnquiryPopUp">

      <a @click.prevent="closeModal" v-show="!SavedListModalOpen"
        class="uk-margin-auto-left uk-padding-small uk-border-rounded overlay-primary uk-position-fixed uk-position-top-right uk-position-small uk-position-z-index uk-visible@s">
        <div class="uk-link">
          <span class="icon-enquire" uk-icon="icon: close; ratio: 1.5"></span>
        </div>
      </a>

      <a @click.prevent="toggleSavedListModal" v-show="SavedListModalOpen"
        class="uk-margin-auto-left uk-padding-small uk-border-rounded uk-overlay-primary uk-position-fixed uk-position-top-right uk-position-small uk-position-z-index">
        <div class="uk-link">
          <span class="icon-enquire" uk-icon="icon: close; ratio: 1.5"></span>
        </div>
      </a>

      <div v-if="savedVehiclesCount > 0" @click.prevent="toggleSavedListModal" v-show="!SavedListModalOpen"
        class="veh-dk-enq uk-border-rounded overlay-primary uk-position-fixed uk-position-top-right uk-position-small uk-position-z-index uk-visible@s">
        <div>
          <button class="uk-button uk-button-link uk-text-bold uk-border-rounded">
            <span uk-icon="icon: heart" :class="[
              { 'active-save-heart': savedVehiclesCount }
            ]"></span> {{ savedVehiclesCount }}
          </button>
        </div>
      </div>


    </div>


    <div v-if="showModalEnquiryPopUp" uk-modal class="modalenquire uk-flex-top uk-flex uk-modal uk-open">

      <!-- <VehicleCheck v-show="tradein !== 'No'" @vehicle-selected="handleVehicleSelected"
        @is-open-changed="handleVehicleCheckOpen" class="uk-height-viewport" /> -->


      <div class="max-width-1200 uk-margin-auto modal-search-dialog uk-border-rounded" v-show="!isVehicleCheckOpen"
        :class="[
          { 'active-save-list': SavedListModalOpen }
        ]">


        <div class="enquire-header uk-flex uk-flex-middle view-form-header uk-background-secondary uk-hidden@m">
          <div @click.prevent="closeModal" class="uk-button uk-button-secondary uk-border-pill uk-padding-remove-left uk-link-heading uk-light">
            <span class="icon-back" uk-icon="icon: arrow-left; ratio: 2"></span>
            <span>Back</span>
          </div>


      <div v-if="savedVehiclesCount > 0" @click.prevent="toggleSavedListModal"
        class="uk-margin-auto-right">
        <div>
          <button class="uk-margin-small-left uk-button uk-button-secondary uk-border-pill uk-text-bold">
            <span uk-icon="icon: heart" :class="[
              { 'active-save-heart': savedVehiclesCount }
            ]"></span> {{ savedVehiclesCount }}
          </button>
        </div>
      </div>

          <div class="uk-margin-auto-left">
            <button :class="[
              'uk-light uk-button uk-button-secondary uk-border-pill uk-light',
              { 'active-save': isSaved(item) }
            ]" @click.prevent="toggleSave(item)" @mouseover="isHovered = true" @mouseleave="isHovered = false">
              <span uk-icon="heart"></span>
              {{ isSaved(item)
                ? (isHovered ? 'Remove' : 'Saved')
                : 'Save Vehicle'
              }}
            </button>
          </div>
        </div>

        <div class="car-sales-pop-up uk-flex uk-grid-collapse uk-grid">


          <div class="uk-width-expand@l uk-background-secondary uk-border-rounded right-panel">

            <div class="padding-small uk-position-relative">
              <carSalesGalleryList v-if="item.photos.length" :itemStock="item.stockid" :key="item.stockid"></carSalesGalleryList>
            </div>

            <div class="uk-padding-small uk-padding-remove-top uk-light">

              <div class="uk-position-relative">
                <div v-if="item.Comments" class="uk-text-small">

                  <div class="uk-margin-small-bottom uk-grid">

                    <div>
                      <div class="uk-width-auto uk-h4 uk-margin-medium-top uk-text-bold">
                        Comments
                      </div>
                    </div>

                    <div class="uk-margin-auto-left">
                      <button :class="[
                        'uk-button uk-button-secondary uk-border-pill uk-margin-small-top',
                        { 'active-save': isSaved(item) }
                      ]" @click.prevent="toggleSave(item)" @mouseover="isHovered = true" @mouseleave="isHovered = false">
                        <span uk-icon="heart"></span>
                        {{ isSaved(item)
                          ? (isHovered ? 'Remove' : 'Saved')
                        : 'Save Vehicle'
                        }}
                      </button>
                    </div>

                  </div>


                  <div v-if="readMore" v-html="formattedComments"></div>
                  <div v-else v-html="formattedCommentsBrief"></div>
                  <div 
        v-if="hasMoreContent"
        class="uk-button uk-button-link uk-text-primary uk-text-small uk-text-capitalize"
        @click="toggleReadMore"
      >
        <div class="uk-button uk-button-primary uk-button-large uk-border-pill uk-margin-small-top">
          {{ readMore ? 'Read Less' : 'Read More' }}
        </div>
      </div>
                  <hr class="uk-margin-medium-top" />
                </div>
              </div>

              <div>
                <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small-top">
                  <div>About This Vehicle</div>
                  <div class="uk-text-meta">{{ item.title }}</div>
                </div>
              </div>

              <div class="single-specs uk-column-1-2@l uk-margin-medium-bottom" itemprop="description">
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Year:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.year.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Odometer:</div>
                  <div class="uk-width-expand">
                    <span v-if="item.kms">{{ item.kms }} km</span><span v-else>0 km</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Condition:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.condition.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Registration:</div>
                  <div class="uk-width-expand">
                    <span><span v-if="item.rego">Registered</span><span v-else>Unregistered</span></span>
                  </div>
                </div>
                <div v-if="item.regoexpiry" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Registration Expiry:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.regoexpiry }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Manufacture:</div>
                  <div class="uk-width-expand uk-text-capitalize">
                    <span>{{ item.make.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Model:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.model.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Badge:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.badge.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Series:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.series.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Body Type:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.body.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Exterior Colour:
                  </div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.colour.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Doors:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.doors.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Seating Capacity:
                  </div>
                  <div class="uk-width-expand">
                    <span>{{ item.seats.displayValue[0] }} Seats</span>
                  </div>
                </div>
                <div v-if="item.interiorcolour"
                  class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">
                    Interior Colour:
                  </div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.interiorcolour }}</span>
                  </div>
                </div>
                <div v-if="item.engine.displayValue[0]"
                  class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Engine:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.engine.displayValue[0] }}</span>
                  </div>
                </div>
                <div v-if="item.cylinders" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Cylinders:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.cylinders }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Fuel Type:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.fuel.displayValue[0] }}</span>
                  </div>
                </div>
                <div v-if="item.gears" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Gears:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.gears }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">Transmission:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.transmission.displayValue[0] }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">VIN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.vin }}</span>
                  </div>
                </div>
                <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                  <div class="uk-width-expand uk-text-meta">SN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.stockid }}</span>
                  </div>
                </div>
              </div>

            </div>

            <YouTubeRelated :model="item.model.value[0]" :title="item.model.displayValue[0]"
            :key="$route.params.slug" class="uk-light"/>

          </div>


          <div
            class="uk-flex-first uk-position-relative uk-width-1-3@l uk-padding-remove-top uk-background-default car-sales-from car-sales-from-pop-up uk-overflow-hidden uk-border-rounded">


            <div class="enq-limit">
              <div class="uk-grid-collapse uk-grid enq-header">



                <div class="uk-width-1-1 uk-position-relative">

                  <button :class="[
                      'uk-link uk-button uk-button-default uk-border-pill uk-position-top-right uk-position-z-index position-top-right-save uk-visible@m',
                      { 'active-save': isSaved(item) }
                    ]" @click.prevent="toggleSave(item)" @mouseover="isHovered = true" @mouseleave="isHovered = false">
                      <span uk-icon="heart"></span>
                      {{ isSaved(item)
                        ? (isHovered ? 'Remove' : 'Saved')
                      : 'Save'
                      }}
                    </button>

                  <div class="uk-width-expand uk-margin-small-bottom uk-text-left">

                  <div>
                    <div class="uk-background-default border-1">
                    <div class="uk-padding-small uk-margin-small-top uk-padding-small-bottom">
                      <h1 class="uk-h5 uk-margin-remove title-items">
                        <span class="uk-text-bold">{{ item.make.displayValue[0] }} {{ item.model.displayValue[0] }} /
                          <span class="text-red">{{ item.condition.displayValue[0] }}</span></span>
                      </h1>
                      <div class="uk-h2 uk-text-bolder uk-margin-small-top uk-margin-remove-bottom">
                        {{ item.title }}
                      </div>
                    </div>





                    

                      <div class="uk-margin-small-left uk-margin-small-bottom uk-grid-collapse uk-grid">
                        <!-- Drivetrain Row -->
                        <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-auto">
                            <svg fill=" #079bd9" class="adme-icons" width="22" enable-background="new 0 0 580 580"
                              version="1.1" viewBox="0 0 580 580" xml:space="preserve"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="m394.67 149.33h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-77.677 7.06c-5.078-10.975-16.122-18.65-28.99-18.65s-23.911 7.674-28.99 18.65l-77.677-7.06v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.333c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l77.677-7.06c1.858 4.016 4.534 7.534 7.799 10.444l7.773 115.43c-4.526 1.234-7.917 5.191-7.917 10.112v64c0 4.738 3.134 8.616 7.404 10.009l-7.245 94.184c-6.586 5.866-10.824 14.312-10.824 23.807v7.712l-74.667-6.789v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.334c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l74.667-6.79v7.712c0 17.646 14.354 32 32 32s32-14.354 32-32v-7.712l74.667 6.789v22.257c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-74.667 6.788v-7.712c0-9.497-4.24-17.945-10.831-23.811l-7.314-94.165c4.307-1.371 7.478-5.259 7.478-10.023v-64c0-4.891-3.35-8.835-7.835-10.096l7.695-115.44c3.263-2.91 5.938-6.427 7.796-10.441l77.677 7.06v22.256c1e-3 17.644 14.355 31.998 32.001 31.998zm-10.667-117.33c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-256 85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.886 0 10.667 4.782 10.667 10.667v85.333zm0 362.67c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.886 4.782-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333zm256-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-117.33 64c0 5.885-4.781 10.667-10.667 10.667s-10.667-4.781-10.667-10.667v-42.667c0-5.885 4.781-10.667 10.667-10.667s10.667 4.781 10.667 10.667v42.667zm-10.667-373.33c-5.885 0-10.667-4.781-10.667-10.667 0-5.885 4.782-10.666 10.667-10.666s10.667 4.781 10.667 10.667c0 5.885-4.782 10.666-10.667 10.666z" />
                            </svg>
                          </div>
                          <div
                            class="uk-width-expand uk-text-left uk-margin-small-left uk-margin-small-right uk-text-bold">
                            {{ item.drivetrain.displayValue[0] }}
                          </div>
                        </div>

                        <!-- Seats Row -->
                        <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-auto">
                            <svg fill="#079bd9" class="adme-icons" width="22" y="0px" viewBox="0 0 580 580"
                              style="enable-background:new 0 0 580 580;" xml:space="preserve">
                              <path id="XMLID_2089_"
                                d="M450,371.266V360c0-35.203-26.122-64.421-60-69.288V210c0-6.156-0.516-12.315-1.537-18.378l4.698-4.802c5.604-5.728,8.643-13.295,8.555-21.308c-0.087-8.014-3.29-15.513-9.018-21.116l-28.592-27.975c-5.728-5.604-13.325-8.618-21.308-8.555c-4.939,0.055-9.684,1.292-13.909,3.575c-3.642-1.808-7.379-3.407-11.192-4.796C331.293,95.638,340,78.815,340,60c0-33.084-26.916-60-60-60h-80c-33.084,0-60,26.916-60,60c0,18.819,8.709,35.644,22.309,46.652C120.164,122.072,90,162.581,90,210v80.712C56.122,295.579,30,324.797,30,360v11.266C12.767,375.717,0,391.396,0,410c0,38.599,31.402,70,70,70h340c38.598,0,70-31.401,70-70C480,391.396,467.233,375.717,450,371.266z M430,360v10H330v-10c0-27.57,22.43-50,50-50S430,332.43,430,360z M310,360v10h-96.064L370,210.492v80.22C336.122,295.579,310,324.797,310,360z M335.91,130.942l0.471-0.425c0.125-0.114,0.246-0.231,0.364-0.352c3.888-3.229,9.684-3.061,13.375,0.552l28.591,27.974c1.909,1.868,2.977,4.368,3.006,7.039c0.029,2.671-0.983,5.193-2.852,7.103L185.956,370h-83.942l45.886-46.898c0.042-0.043,0.084-0.086,0.125-0.129L335.91,130.942z M160,60c0-22.056,17.944-40,40-40h80c22.056,0,40,17.944,40,40s-17.944,40-40,40h-80C177.944,100,160,82.056,160,60z M110,210c0-49.626,40.374-90,90-90h80c11.212,0,22.3,2.093,32.652,6.115l-172.642,176.45c-8.953-6.252-19.208-10.303-30.011-11.853V210z M50,360c0-27.57,22.43-50,50-50c9.167,0,18.033,2.491,25.75,7.142l-42.892,43.838c-2.527,2.583-4.144,5.724-4.853,9.021H50V360z M410,460H70c-27.57,0-50-22.43-50-50c0-11.028,8.972-20,20-20h400c11.028,0,20,8.972,20,20C460,437.57,437.57,460,410,460z">
                              </path>
                              <g></g>
                            </svg>
                          </div>
                          <div
                            class="uk-width-expand uk-text-left uk-margin-small-left uk-margin-small-right uk-text-bold">
                            {{ item.seats.displayValue[0] }} Seats
                          </div>
                        </div>

                        <!-- Transmission Row -->
                        <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-auto">
                            <svg fill=" #079bd9" class="adme-icons" width="23" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128">
                              <path
                                d="M28.2,83.1c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8s12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67H61v16.1 c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8c7,0,12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67h29.8c1.7,0,3-1.3,3-3V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H67V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H34.2V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8s-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V83.1z M70.6,95.5 c0,3.7-3,6.8-6.6,6.8c-3.7,0-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8C67.7,88.7,70.6,91.8,70.6,95.5z M90.1,32.5c0-3.7,3-6.8,6.6-6.8 c3.7,0,6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8C93.1,39.3,90.1,36.2,90.1,32.5z M57.4,32.5c0-3.7,3-6.8,6.6-6.8c3.7,0,6.6,3,6.6,6.8 c0,3.7-3,6.8-6.6,6.8C60.3,39.3,57.4,36.2,57.4,32.5z M37.9,95.5c0,3.7-3,6.8-6.6,6.8s-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8 S37.9,91.8,37.9,95.5z M24.6,32.5c0-3.7,3-6.8,6.6-6.8s6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8S24.6,36.2,24.6,32.5z">
                              </path>
                            </svg>
                          </div>
                          <div
                            class="uk-width-expand uk-text-left uk-margin-small-left uk-margin-small-right uk-text-bold">
                            <div>
                              {{ item.transmission.displayValue[0] }}
                            </div>
                          </div>
                        </div>

                        <!-- Mileage Row -->
                        <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-auto">
                            <svg fill="#079bd9" class="adme-icons" width="22" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 50 55">
                              <path
                                d="M 24.984375 6.984375 C 24.921875 6.988281 24.863281 6.992188 24.800781 7.007813 C 20.605469 7.042969 16.675781 8.203125 13.296875 10.203125 C 13.214844 10.238281 13.136719 10.285156 13.0625 10.339844 C 9.628906 12.429688 6.789063 15.402344 4.84375 18.933594 C 4.792969 19.003906 4.75 19.078125 4.71875 19.160156 C 3.015625 22.335938 2.039063 25.957031 2.007813 29.796875 C 1.980469 29.929688 1.980469 30.0625 2.007813 30.191406 C 2.039063 34.417969 3.09375 38.128906 5.144531 41.53125 C 5.382813 41.925781 5.863281 42.105469 6.304688 41.964844 C 6.746094 41.824219 7.035156 41.398438 7 40.9375 L 7.046875 41.550781 L 10.800781 39.375 C 11.121094 39.203125 11.320313 38.871094 11.320313 38.507813 C 11.324219 38.144531 11.128906 37.808594 10.8125 37.628906 C 10.496094 37.449219 10.109375 37.457031 9.796875 37.644531 L 6.460938 39.578125 C 5.039063 36.945313 4.179688 34.183594 4.03125 31 L 8 31 C 8.359375 31.003906 8.695313 30.816406 8.878906 30.503906 C 9.058594 30.191406 9.058594 29.808594 8.878906 29.496094 C 8.695313 29.183594 8.359375 28.996094 8 29 L 4.03125 29 C 4.167969 26.101563 4.902344 23.367188 6.09375 20.894531 C 6.65625 21.199219 7.554688 21.683594 9.574219 22.78125 C 9.890625 22.960938 10.277344 22.957031 10.589844 22.769531 C 10.898438 22.582031 11.085938 22.238281 11.070313 21.878906 C 11.058594 21.515625 10.851563 21.1875 10.527344 21.019531 C 8.507813 19.925781 7.613281 19.441406 7.046875 19.136719 C 8.648438 16.5 10.789063 14.234375 13.347656 12.527344 L 15.40625 15.953125 C 15.585938 16.261719 15.921875 16.453125 16.28125 16.449219 C 16.644531 16.441406 16.972656 16.246094 17.148438 15.929688 C 17.320313 15.613281 17.308594 15.226563 17.121094 14.921875 L 15.0625 11.496094 C 17.746094 10.054688 20.777344 9.183594 24 9.03125 L 24 13 C 23.996094 13.359375 24.183594 13.695313 24.496094 13.878906 C 24.808594 14.058594 25.191406 14.058594 25.503906 13.878906 C 25.816406 13.695313 26.003906 13.359375 26 13 L 26 9.03125 C 28.898438 9.167969 31.640625 9.886719 34.113281 11.078125 L 32.21875 14.574219 C 32.039063 14.890625 32.042969 15.277344 32.230469 15.589844 C 32.417969 15.898438 32.761719 16.085938 33.121094 16.070313 C 33.484375 16.058594 33.8125 15.851563 33.980469 15.527344 L 35.871094 12.035156 C 38.507813 13.632813 40.765625 15.789063 42.472656 18.347656 L 39.046875 20.40625 C 38.738281 20.585938 38.546875 20.921875 38.550781 21.28125 C 38.558594 21.644531 38.753906 21.972656 39.070313 22.148438 C 39.386719 22.320313 39.773438 22.308594 40.078125 22.121094 L 43.503906 20.0625 C 44.945313 22.746094 45.816406 25.777344 45.96875 29 L 42 29 C 41.640625 28.996094 41.304688 29.183594 41.121094 29.496094 C 40.941406 29.808594 40.941406 30.191406 41.121094 30.503906 C 41.304688 30.816406 41.640625 31.003906 42 31 L 45.96875 31 C 45.820313 34.183594 44.960938 36.945313 43.542969 39.578125 L 40.203125 37.644531 C 39.890625 37.457031 39.503906 37.449219 39.1875 37.628906 C 38.871094 37.808594 38.675781 38.144531 38.679688 38.507813 C 38.679688 38.871094 38.878906 39.203125 39.199219 39.375 L 42.953125 41.550781 L 43 40.9375 C 42.964844 41.398438 43.253906 41.824219 43.695313 41.964844 C 44.136719 42.105469 44.617188 41.925781 44.855469 41.53125 C 46.90625 38.132813 47.960938 34.421875 47.996094 30.203125 C 48.019531 30.070313 48.019531 29.933594 47.996094 29.804688 C 47.957031 25.601563 46.792969 21.664063 44.785156 18.285156 C 44.757813 18.210938 44.71875 18.144531 44.671875 18.078125 C 44.667969 18.078125 44.667969 18.078125 44.667969 18.078125 C 44.667969 18.074219 44.664063 18.074219 44.660156 18.070313 C 42.574219 14.640625 39.609375 11.804688 36.085938 9.859375 C 36 9.792969 35.90625 9.746094 35.808594 9.710938 C 32.636719 8.015625 29.027344 7.039063 25.191406 7.007813 C 25.125 6.992188 25.054688 6.984375 24.984375 6.984375 Z M 36.558594 22.179688 C 36.367188 22.175781 36.179688 22.226563 36.015625 22.328125 L 26.90625 27.710938 C 26.386719 27.273438 25.726563 27 25 27 C 23.355469 27 22 28.355469 22 30 C 22 31.644531 23.355469 33 25 33 C 26.644531 33 28 31.644531 28 30 C 28 29.804688 27.976563 29.609375 27.941406 29.421875 L 37.03125 24.046875 C 37.421875 23.824219 37.613281 23.367188 37.503906 22.933594 C 37.394531 22.5 37.007813 22.191406 36.558594 22.179688 Z M 25 29 C 25.316406 29 25.582031 29.144531 25.761719 29.363281 C 25.800781 29.46875 25.859375 29.5625 25.933594 29.648438 C 25.972656 29.757813 26 29.875 26 30 C 26 30.5625 25.5625 31 25 31 C 24.4375 31 24 30.5625 24 30 C 24 29.4375 24.4375 29 25 29 Z M 19 38 C 18.640625 37.996094 18.304688 38.183594 18.121094 38.496094 C 17.941406 38.808594 17.941406 39.191406 18.121094 39.503906 C 18.304688 39.816406 18.640625 40.003906 19 40 L 31 40 C 31.359375 40.003906 31.695313 39.816406 31.878906 39.503906 C 32.058594 39.191406 32.058594 38.808594 31.878906 38.496094 C 31.695313 38.183594 31.359375 37.996094 31 38 Z">
                              </path>
                            </svg>
                          </div>
                          <div
                            class="uk-width-expand uk-text-left uk-margin-small-left uk-margin-small-right uk-text-bold">
                            <span v-if="item.kms">{{ item.kms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                              km</span>
                            <span v-else>0 km</span>
                          </div>
                        </div>
                      </div>
                    </div>

                      <div v-if="item.price"
                        class="uk-grid-small uk-grid-match uk-child-width-expand uk-text-center uk-grid">
                        <div>
                          <div class="uk-card uk-card-default uk-card-body border-1">
                            <div class="uk-flex uk-flex-middle uk-flex-center uk-grid">
                              <h4 class="uk-width-1-1 uk-margin-remove uk-text-bold uk-h2 uk-margin-remove">${{
                                item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                              </h4>
                              <div class="uk-text-small">DRIVE AWAY</div>
                            </div>
                          </div>
                        </div>
                        <div v-if="item.condition.displayValue[0] === 'Used'">
                          <div class="uk-card uk-card-default uk-card-body border-1 repayments-card uk-light">
                            <div class="uk-flex uk-flex-middle uk-flex-center uk-grid">
                              <div class="uk-height-1-1">
                                <span class="uk-h2 uk-margin-remove"><b>${{ formatPrice(item.perweek) }}</b></span>
                                <span>p/w</span> <sup class="uk-text-muted perweek-icon" uk-icon="warning"></sup>
                                <div class="uk-text-small estimated">Est. repayments</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>
                  </div>

                </div>




                <div class="call-buble uk-grid">
                  <div class="uk-width-expand uk-margin-small-left uk-padding-small uk-text-left">
                    <div class="uk-h4 uk-margin-remove uk-text-light">Call us</div>
                    <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                      class="uk-h4 uk-text-bold">{{ dealerInfo.salesNumber }}</a>
                    <div class="uk-text-meta">Stock No: {{ item.stockid }}</div>
                  </div>
                  <div class="uk-margin-auto-vertical uk-light">
                    <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                      class="uk-margin-medium-right call-us-icon" uk-icon="icon: receiver; ratio: 1.8"></a>
                  </div>
                </div>

              </div>
            </div>


            <sliding-tabs v-model="activeTab" :tabs="tabs" />
            <ul class="uk-list tab-content uk-background-default uk-position-relative">
              <li v-show="activeTab === 0" class="uk-padding-small enqform">
                <div class="uk-text-primary uk-padding-small">
                  <h3 class="uk-h3">Get in touch with us today - we'd love to help you discover if this <b>{{ item.make.displayValue[0] }} {{ item.model.displayValue[0] }}</b> is the perfect fit for you!
                 </h3>
                  <div class="uk-width-1-1 uk-h4 uk-margin-remove uk-text-left uk-text-bold">Start Your Journey Here:</div>
                </div>
                <form class="adme-form uk-padding-small uk-padding-remove-top">
                  <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left"
                    v-show="isSending">
                    <div class="uk-position-center uk-text-center">
                      <div uk-spinner="ratio: 2"></div>
                      <p>Sending...</p>
                    </div>
                  </div>
                  <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1 mdl-label">
                      <span class="uk-form-icon" uk-icon="icon: user"></span>
                      <input v-model="username" id="username" name="username" type="text" class="uk-input uk-form-large"
                        data-vv-as="Name" placeholder="First and last name" :class="{ 'errors': errors.name }"
                        @input="persist" />
                      <label class="uk-form-label">First and Last name</label>
                      <div class="uk-text-small uk-text-danger" v-if="errors.name">
                        {{ errors.name }}
                      </div>
                    </div>
                  </div>

                  <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1 mdl-label">
                      <div :class="{ control: true }">
                        <span class="uk-form-icon" uk-icon="icon: mail"></span>
                        <input class="uk-input uk-form-large" name="email" type="text" v-model="email" @input="persist"
                          placeholder="Email address" :class="{ 'errors': errors.email }" />
                        <label class="uk-form-label">Email Address</label>
                        <div class="uk-text-small uk-text-danger" v-if="errors.email">
                          {{ errors.email }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="uk-margin-small mdl-label">
                    <div class="uk-inline uk-width-1-1 mdl-label">
                      <label class="uk-form-label">Phone Number</label>
                      <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                      <input id="input_3" class="uk-input uk-form-large" type="tel" v-model="phone" @input="persist"
                        placeholder="Phone Number" />
                      <label class="uk-form-label">Phone Number</label>
                    </div>
                  </div>

                  <div class="uk-width-1-1 uk-margin-small">
                    <textarea id="input_4" class="uk-textarea uk-form-large" type="text" rows="3" v-model="message"
                      placeholder="Message"></textarea>
                  </div>


                  <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I would like a test drive.</label>

                    <el-switch v-model="testdrive" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#1a78e4" active-value="Yes would like to book a test drive." inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>
                  </div>


                  <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I have a vehicle to trade in.</label>

                    <el-switch v-model="tradein" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#1a78e4" active-value="Yes I have a vehicle to trade in" inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>

                    <div v-if="selectedTradeInVehicle">
                      <p>{{ selectedTradeInVehicle.year }} {{ selectedTradeInVehicle.make }} {{
                        selectedTradeInVehicle.model }}</p>
                    </div>
                  </div>


                  <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I'm interested in finance.</label>

                    <el-switch v-model="finance" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#1a78e4" active-value="Yes I'm interested in finance." inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>
                  </div>


                  <div class="uk-grid-collapse uk-padding-small uk-margin-small sw-w uk-flex uk-flex-center uk-grid">
                    <div class="uk-text-center uk-width-1-1">
                      <h4 class="uk-text-bold uk-margin-remove">Reserve this Vehicle for $500?</h4>
                    </div>
                    <div class="uk-margin-small-bottom">
                      <el-switch v-model="reserve" active-text="Yes Reserve" inactive-text="No" active-color="#13ce66"
                        inactive-color="#1a78e4" active-value="Yes I would like to reserve this vehicle"
                        inactive-value="No" class="uk-width-1-1 uk-margin-small-top">
                      </el-switch>
                    </div>
                  </div>


                  <div class="uk-margin uk-text-center">
                    <button
                      class="uk-button uk-button-secondary uk-text-large uk-padding-small uk-button-large uk-text-bold uk-width-1-1 uk-border-rounded"
                      type="button" @click="validateAndSubmit">
                      Send Enquiry
                    </button>
                  </div>
                  <div class="uk-text-xsmall uk-text-muted uk-text-center">
                    <sup>*</sup>We do not disclose any information collected on the website to any organisation not
                    related to this
                    company.
                  </div>
                </form>

                <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left"
                  v-show="isSent">
                  <div class="uk-position-center uk-text-center form-confirmation">
                    <strong>Hi {{ username }}</strong>
                    <div v-html="confirmationMessage"></div>
                    <button class="uk-button uk-button-primary uk-button-large uk-border-pill uk-margin-small-top"
                      @click="close()">
                      OK
                    </button>
                  </div>
                </div>
              </li>

              <li v-show="activeTab === 1" v-if="item.price > 0">
                <calculator :retail="item.price"></calculator>
              </li>

              <li v-show="activeTab === 2">
                <div class="uk-grid-collapse uk-padding-small uk-child-width-1-1" uk-grid>
                  <div>
                    <div class="uk-margin-small-left">
                      <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove">
                        {{ dealerInfo.name }}
                      </div>
                      <div class="uk-width-1-1 uk-text-light">{{ dealerInfo.showroom_address }}</div>
                    </div>
                    <div class="map-container-page uk-margin-small-top">
                      <iframe v-if="dealerInfo.map_embed" class="uk-height-large googlemap border-radius-10"
                        :src="dealerInfo.map_embed" width="600" height="450" frameborder="0" style="border: 0"
                        allowfullscreen="" aria-hidden="false" tabindex="0" loading="lazy"></iframe>
                    </div>
                  </div>
                  <div class="uk-margin-medium-top">
                    <trading-hours :tradingHours="dealerInfo.tradingHours" />
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from 'vuex';
import axios from "axios";
import { Switch } from "element-ui";
import { persistorMixin } from "@/mixins/persistMixin";
const Calculator = () => import('@/components/search/Calculator')
const TradingHours = () => import('@/components/page-elements/TradingHours')
const carSalesGalleryList = () => import('@/components/search/CarSales/GalleryListPopUp')
const VehicleCheck = () => import('@/components/search/VehicleCheck')
const SavedListModal = () => import('@/components/search/CarSales/SavedListModal')
const CompareSavesModal = () => import('@/components/search/CarSales/CompareSavesModal')
const YouTubeRelated = () => import('@/components/search/CarSales/YouTubeRelated')
import SlidingTabs from '@/components/SlidingTabs.vue'

Vue.use(Switch);

export default {
  name: "form-element",
  mixins: [persistorMixin(["username", "email", "phone", "message"])],
  props: ["stockid"],

  components: {
    Calculator,
    TradingHours,
    carSalesGalleryList,
    VehicleCheck,
    SlidingTabs,
    SavedListModal,
    YouTubeRelated,
    CompareSavesModal
  },

  data() {
    return {
      errors: { name: "", email: "" },
      loading: true,
      invalid: false,
      username: "",
      email: "",
      phone: "",
      finance: "",
      tradein: "",
      testdrive: "",
      reserve: "",
      message: "",
      isSending: false,
      isSent: false,
      confirmationMessage: "",
      readMore: false,
      activeTab: 0,
      tabs: ['Enquire', 'Calculator', 'Location'],
      pendingStockId: null,
      _backRoute: document.referrer || null,
      selectedTradeInVehicle: null,
      isVehicleCheckOpen: false,
      SavedListModal: false,
      SavedListModalOpen: false,
      isHovered: false
    };
  },

  computed: {
    ...mapState(['savedVehicles']),

    showModalEnquiryPopUp() {
      return this.$store.state.vehicleEnquiryPopUp.show;
    },

    formattedComments() {
      return this.item.Comments.replace(/\n/g, '<br>');
    },

    formattedCommentsBrief() {
      if (!this.hasMoreContent) {
        return this.formattedComments;
      }
      return this.formattedComments.substring(0, 770) + '...';
    },

    hasMoreContent() {
      return this.item.Comments.length > 770;
    },



    dealerInfo() {
      const { name, lmct, showroom_address, map_embed, map_directions } = this.$store.state.site;
      const salesNumber = this.$store.state.site.departments.sales.phone;
      const tradingHours = this.$store.state.site.departments.sales.trading;

      let result = {
        name,
        lmct,
        showroom_address,
        map_embed,
        map_directions,
        salesNumber,
        tradingHours,
      };



      return result;
    },

    item() {
      return this.$store.state.vehicleEnquiryPopUp.item;
    },

    savedVehiclesCount() {
      return this.$store.state.savedVehicles.length || 0;
    },
  },

  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(to, from) {
        const newStockId = to.query.stock;
        const oldStockId = from?.query?.stock;

        if (newStockId) {
          const item = this.$store.getters.vehicleById(newStockId);
          if (item && !this.showModalEnquiryPopUp) {
            this.$store.dispatch("vehicleEnquiryPopUp", {
              show: true,
              item
            });
          }
        } else if (oldStockId && this.showModalEnquiryPopUp) {
          this.$store.dispatch("vehicleEnquiryPopUp", {
            show: false,
            item: null
          });
        }
      }
    }
  },

  created() {
    this.initializeFromQuery();
    window.addEventListener('popstate', this.handlePopState);
  },

  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopState);
  },

  methods: {
    ...mapActions(['toggleSavedVehicle']),

    handleVehicleCheckOpen(isOpen) {
      //console.log('Vehicle check modal state:', isOpen); // For debugging
      this.isVehicleCheckOpen = isOpen;
    },


    toggleSavedListModal() {
      this.SavedListModal = !this.SavedListModal;
      this.SavedListModalOpen = !this.SavedListModalOpen;

      // Toggle body scroll
      if (this.SavedListModal) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    },

    SavedListModalOpenChange(isOpen) {
      this.SavedListModalOpen = isOpen;
      this.SavedListModal = isOpen;

      // Handle body scroll on close
      if (!isOpen) {
        document.body.classList.remove('modal-open');
      }
    },

    handleVehicleSelected(vehicle) {
      this.selectedTradeInVehicle = vehicle;
      // You can also update the message with the trade-in vehicle details
      this.message = `${this.message}\n\nTrade-in Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    },

    handlePopState(event) {
      const stockParam = window.location.search
        .substring(1)
        .split('&')
        .find(param => param.startsWith('stock='));

      const stockId = stockParam ? stockParam.split('=')[1] : null;

      if (stockId) {
        const item = this.$store.getters.vehicleById(stockId);
        if (item && !this.showModalEnquiryPopUp) {
          this.$store.dispatch("vehicleEnquiryPopUp", { show: true, item });
        }
      } else if (this.showModalEnquiryPopUp) {
        this.$store.dispatch("vehicleEnquiryPopUp", { show: false, item: null });
      }
    },

    initializeFromQuery() {
      const stockId = this.$route.query.stock;

      if (stockId) {
        this.pendingStockId = stockId;
        const item = this.$store.state.vehicleEnquiryPopUp.item;

        if (item && item.stockid === stockId) {
          this.showEnquiryModal(item);
        } else {
          const item = this.$store.getters.vehicleById(stockId);
          if (item) {
            this.$store.dispatch("vehicleEnquiryPopUp", { show: true, item });
          }
        }
      }
    },

    handleBack() {
      const hasStockParam = !!this.$route.query.stock;

      if (hasStockParam) {
        this.closeModal();
      } else if (this._backRoute && !this._backRoute.includes('car-sales')) {
        this.$router.go(-1);
      }
    },

    showEnquiryModal(item) {
      if (!item) return;
      this.$store.dispatch("vehicleEnquiryPopUp", { show: true, item });
    },

    closeModal() {
      this.$store.dispatch("vehicleEnquiryPopUp", { show: false, item: null });
    },

    formatPrice(price) {
      return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    toggleSave(item) {
      this.toggleSavedVehicle(item);
    },

    isSaved(item) {
      return this.savedVehicles.includes(item.stockid);
    },

    toggleReadMore() {
      this.readMore = !this.readMore;
    },

    emailIsValid(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validateAndSubmit() {
      if (!this.username) {
        this.invalid = true;
        this.errors.name = "Name is required";
      } else {
        this.invalid = false;
      }

      if (!this.emailIsValid(this.email)) {
        this.invalid = true;
        this.errors.email = "Valid email is required";
      } else {
        this.invalid = false;
      }

      if (!this.invalid) {

        // Get campaign parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const campaign = urlParams.get('adme_campaign') || '';

        this.isSending = !this.isSending;
        axios
          .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
            payload: {
              input_1: this.username,
              input_2: this.phone,
              input_3: this.email,
              input_4: this.message,
              input_5: this.item.stockid,
              input_6: this.finance,
              input_7: this.tradein,
              input_8: this.item.condition.displayValue[0],
              input_9: this.item.make.displayValue[0],
              input_10: this.item.model.displayValue[0],
              input_11: this.item.badge.displayValue[0] || '',
              input_12: this.item.stockid + '/' + this.item.slug,
              input_16: JSON.stringify(this.item),
              input_18: this.reserve,
              input_19: 'Stock Enquiry New Pop Up',
              input_20: campaign
            },
            formid: this.$store.state.site.forms.carsales,
          })
          .then((response) => {
            if (response.data.is_valid) {
              this.confirmationMessage = response.data.confirmation_message;
              this.isSending = false;
              this.isSent = true;

              window.dataLayer.push({
                event: "FormSub Stock",
                formName: "stock enquire",
                formStatus: "submitted",
                username: this.username,
                phone: this.phone,
                email: this.email,
                message: this.message,
                finance: this.finance,
                tradeIn: this.tradein,
                testDrive: this.testdrive,
                stockId: this.stockid,
              });
            } else {
              this.isSending = false;
              this.isSent = false;
            }
          })
          .catch(console.log);

        this.email = "";
        this.phone = "";
        this.message = "";
      }
    },

    close() {
      this.username = "";
      this.email = "";
      this.phone = "";
      this.message = "";
      this.isSent = false;
      this.closeModal();
    }
  }
};
</script>

<style>
.active-save-heart svg path {
stroke: #e80729!important;
fill: #e80729!important;
}

.full-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Semi-transparent black */
  backdrop-filter: blur(5px);
  z-index: 9999;
  /* High z-index to appear above content */
  overflow-y: auto;
  /* Allow scrolling if content is taller than viewport */
}

.uk-lightbox.uk-open{
  z-index: 9999999999 !important;
}

/* Update your existing modal styles to work with overlay */
.saved-list-modal {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 99999;
  /* Higher than overlay */
  max-height: 100vh;
  /* Subtract top spacing */
  overflow-y: auto;
  /* Allow scrolling within modal */
}

.position-top-right-save{
  margin: 20px 10px 0;
}

.active-save-heart svg path {
stroke: #e80729!important;
fill: #e80729!important;
}

.compare-saves-modal {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 99999;
  /* Higher than overlay */
  max-height: calc(100vh - 10px);
  /* Subtract top spacing */
  overflow-y: auto;
}

/* Optional: Prevent body scrolling when modal is open */
body.modal-open {
  overflow: hidden;
}

.uk-lightbox {
  z-index: 9999 !important;
}

.overlay-primary svg path {
  stroke: #000 !important;
  stroke-width: 2
}

.active-save-heart svg path {
  stroke: #e80729 !important;
  fill: #e80729 !important
}
</style>

<style scoped>
.uk-modal.uk-open {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background: rgb(0 0 0 / 40%);
}

.overlay-primary {
  background: rgb(243, 246, 250);
}

.enq-limit{
  padding: 0 0 10px;
  border-radius: 20px;
}

.position-z-index-top {
  z-index: 999999;
}

.veh-dk-enq {
  top: 70px;
  right: 0px;
  padding: 16px;
}

.saved-list-modal {
  padding-top: 80px;
    top: 0;
    right: 0;
}


.saved-overlay {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background: rgb(0 0 0 / 40%);
}

.active-save-list {
  z-index: -1;
}

.tab-content {
  margin: 10px 0;
  border-radius: 20px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);
}

.adme-icons {
  margin: 2px 0;
}

.border-top-1 {
  border-top: 1px solid #e1e4e8;
}

.call-us-icon {
  padding: 10px;
  border-radius: 50px;
  background-color: #0bd415;
  webkit-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}

.call-us-icon:hover {
  background-color: #03aa0b;
}

.icon-enquire {
  width: 30px;
  height: 30px;
}

.icon-back {
  width: 40px;
  height: 40px;
}

.call-us-icon svg {
  width: 36px;
  height: 36px;
}

.controlpanel[data-v-fb38c376] {
  left: 0;
}

.controlpanel-hide {
  transform: translateX(-150px);
}

.v-slideshow:after {
  content: "";
  bottom: -5px;
}

.call-buble {
  width: 100%;
  margin: auto;
  border-radius: 15px;
  border: 2px solid #0dd4163d;
  background: #fff;
}

.enq-header {
  margin-top: 0;
}

.form-tab {
  padding-top: 25px;
}

.car-sales-from {
  padding: 10px;
  background: rgba(255, 255, 255, 0.77);
}

.modal-enquire .form-tab.uk-tab>.uk-active>a {
  color: #088ae5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-enquire .form-tab.uk-tab>.uk-active>a .uk-text-center {
  color: #088ae5;
}

.modal-enquire .form-tab::before {
  border-bottom: 2px solid #088ae5;
}

.modal-enquire .form-tab.uk-tab a {
  font-weight: 900;
  font-size: 16px;
}

.modal-enquire .form-tab.uk-tab>.uk-active>a {
  font-weight: 900;
  color: #000;
  border: 2px solid #088ae5;
  border-bottom: 0;
  background-color: #fff;
}

.car-sales-from input.errors {
  border: 2px solid rgb(255, 73, 73);
}

.car-sales-from .uk-input,
.car-sales-from .uk-textarea {
  background: rgba(255, 255, 255, 0.11);
  border: 2px solid #e3e3e3;
  border-radius: 10px;
}

.border-1 {
  margin-top: 10px;
  padding: 25px 5px;
  border: none;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
}

.car-sales-pop-up {
  border-radius: 20px;
}

.border-pill{
  right: -10px;
position: relative;
padding: 2px 20px;
border-radius: 12px;
}

.max-width-1200 {
  width: 100%;
  max-width: 1600px;
}

.sw-w {
  padding: 15px 10px 10px 15px;
  border-radius: 10px;
  background: #f4f6fa;
}

.text-red{
  color:#1a78e4;
}

.border-1.repayments-card{
background-color: #1a78e4;
}

.repayments-card b {
color: #fff;
}

@media (max-width: 960px) {
  .modalenquire {
    padding: 0px;
  }
}

@media (min-width: 1500px) {
  .car-sales-from-pop-up {
    max-width: 450px;
  }
}

@media (min-width: 1200px) {
  .car-sales-from-pop-up {
    min-width: 450px;
  }

  .right-panel {
    border-radius: 20px;
    overflow: hidden;
  }
}

@media (min-width: 960px) {
  .car-sales-from-pop-up {
    margin-right: 20px;
    border-radius: 20px;
  }

  .car-sales-gal-pop-up {
    margin: 20px 0 0 20px;
  }
}
</style>
