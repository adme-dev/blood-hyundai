<template>

<div v-if="filteredItems">

  <div
    class="uk-container uk-container-xsmall uk-text-center uk-margin-large-top"
  >
    <div class="uk-text-meta space33">{{ totalCount }} HYUNDAI'S IN STOCK</div>
  </div>

  <ul class="model--Category uk-tab uk-margin-small uk-flex uk-flex-center uk-margin-medium-top">
    <li v-for="(modelCategory, index) in groupedModels" :key="index">
      <label class="uk-button uk-padding-remove-left uk-padding-remove-right ext-blue uk-text-bold">
        <input
          class="uk-checkbox"
          type="checkbox"
          :value="modelCategory.model.displayValue[0]"
          v-model="checkedModelCat"
        />
        <span v-html="modelCategory.model.displayValue[0]"></span>
      </label>
    </li>
  </ul>



<div uk-slider>

 <div class="uk-container uk-container-expand">

  <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@l related-slider" :class="[itemsCount < 6 ? 'uk-flex uk-flex-center@m ' : '']">
   <li v-for="(itemName, index) in filteredItems"
       :key="index"
       >

  <div class="uk-card uk-card-default scroll-card uk-box-shadow-hover-medium">

    <router-link
      :to="{
        name: 'vehicle-for-sale',
        params: {
          id: itemName.id,
          slug: itemName.slug,
        },
      }"
      class="uk-link-reset"
    >
      <div>
        <div class="uk-text-left uk-padding-small">
          <div
            v-if="itemName.price"
            class="uk-width-1-1 uk-flex uk-flex-middle uk-text-left"
            itemprop="offers"
            itemscope=""
            itemtype="http://schema.org/Offer"
          >
            <div
              class="uk-badge uk-position-top-right uk-position-small uk-background-muted"
            ></div>
            <div class="uk-width-expand uk-margin-small-left uk-margin-small-bottom">
              <div class="uk-margin-small-top uk-text-secondary uk-text-light">
                DRIVEAWAY
              </div>
              <div>
                <span class="uk-h3 uk-text-bold uk-margin-remove"
                  >${{ itemName.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}<sup>*</sup></span
                >
              </div>
              <div class="uk-h5 uk-margin-remove uk-text-secondary uk-text-capitalize">
                {{ itemName.condition.displayValue[0] }}
                {{ itemName.year.displayValue[0] }} {{ itemName.make.value[0] }}
                {{ itemName.model.value[0] }}
              </div>
              <div class="uk-text-secondary uk-text-uppercase uk-text-light">
                {{ itemName.badge.displayValue[0] }} {{ itemName.series.value[0] }}
              </div>
            </div>
            <meta itemprop="priceCurrency" content="AUD" />
            <meta itemprop="price" :content="itemName.price" />
            <link itemprop="availability" href="http://schema.org/InStock" />
          </div>
          <div v-else>
            <div class="uk-width-1-1 uk-flex uk-flex-middle uk-text-left">
              <div
                class="uk-badge uk-position-top-right uk-position-small uk-background-muted"
              ></div>
              <div class="uk-width-expand uk-margin-small-left uk-margin-small-bottom">
                <div class="uk-margin-small-top uk-text-light">Price On Application</div>
                <div><span class="uk-h3 uk-text-bold uk-margin-remove">P.O.A</span></div>
                <div class="uk-h5 uk-margin-remove uk-text-secondary uk-text-capitalize">
                  {{ itemName.condition.displayValue[0] }}
                  {{ itemName.year.displayValue[0] }} {{ itemName.make.value[0] }}
                  {{ itemName.model.value[0] }}
                </div>
                <div class="uk-text-secondary uk-text-uppercase uk-text-light">
                  {{ itemName.badge.displayValue[0] }} {{ itemName.series.value[0] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


     <div class="uk-card-media-top uk-position-relative">
       <div
         v-if="itemName.photos.length"
         class="uk-inline uk-width-1-1 img-height-medium uk-background-cover"
         :data-src="itemName.thumb"
         data-uk-img
       ></div>
       <div
         v-else
         class="uk-inline uk-width-1-1 img-height-medium uk-background-cover"
         data-src="/comingsoon.jpg"
         data-uk-img
       ></div>
     </div>


     <div class="uk-card-body uk-padding-small">
       <div
         class="uk-grid-divider uk-grid-small uk-child-width-1-2 uk-child-width-1-2@xl body-specs uk-text-center"
         uk-grid
       >
         <div>
           <div>
             <svg
               class="cs-icons"
               width="30"
               enable-background="new 0 0 512 512"
               version="1.1"
               viewBox="0 0 512 512"
               xml:space="preserve"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="m394.67 149.33h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-77.677 7.06c-5.078-10.975-16.122-18.65-28.99-18.65s-23.911 7.674-28.99 18.65l-77.677-7.06v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.333c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l77.677-7.06c1.858 4.016 4.534 7.534 7.799 10.444l7.773 115.43c-4.526 1.234-7.917 5.191-7.917 10.112v64c0 4.738 3.134 8.616 7.404 10.009l-7.245 94.184c-6.586 5.866-10.824 14.312-10.824 23.807v7.712l-74.667-6.789v-22.257c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v85.334c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-22.256l74.667-6.79v7.712c0 17.646 14.354 32 32 32s32-14.354 32-32v-7.712l74.667 6.789v22.257c0 17.646 14.354 32 32 32h21.333c17.646 0 32-14.354 32-32v-85.333c0-17.646-14.354-32-32-32h-21.333c-17.646 0-32 14.354-32 32v22.257l-74.667 6.788v-7.712c0-9.497-4.24-17.945-10.831-23.811l-7.314-94.165c4.307-1.371 7.478-5.259 7.478-10.023v-64c0-4.891-3.35-8.835-7.835-10.096l7.695-115.44c3.263-2.91 5.938-6.427 7.796-10.441l77.677 7.06v22.256c1e-3 17.644 14.355 31.998 32.001 31.998zm-10.667-117.33c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-256 85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.886 0 10.667 4.782 10.667 10.667v85.333zm0 362.67c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333c0-5.886 4.782-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333zm256-85.333c0-5.885 4.781-10.667 10.667-10.667h21.333c5.885 0 10.667 4.781 10.667 10.667v85.333c0 5.885-4.781 10.667-10.667 10.667h-21.333c-5.885 0-10.667-4.781-10.667-10.667v-85.333zm-117.33 64c0 5.885-4.781 10.667-10.667 10.667s-10.667-4.781-10.667-10.667v-42.667c0-5.885 4.781-10.667 10.667-10.667s10.667 4.781 10.667 10.667v42.667zm-10.667-373.33c-5.885 0-10.667-4.781-10.667-10.667 0-5.885 4.782-10.666 10.667-10.666s10.667 4.781 10.667 10.667c0 5.885-4.782 10.666-10.667 10.666z"
               />
             </svg>
           </div>
           <div class="rel-text-bold">{{ itemName.drivetrain.displayValue[0] }}</div>
           <div class="v-text-meta">Drive Train</div>
         </div>

         <div>
           <div>
             <svg
               class="cs-icons"
               width="30"
               version="1.1"
               id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 480 480"
               style="enable-background:new 0 0 480 480;"
               xml:space="preserve"
             >
               <path
                 id="XMLID_2089_"
                 d="M450,371.266V360c0-35.203-26.122-64.421-60-69.288V210c0-6.156-0.516-12.315-1.537-18.378l4.698-4.802c5.604-5.728,8.643-13.295,8.555-21.308c-0.087-8.014-3.29-15.513-9.018-21.116l-28.592-27.975c-5.728-5.604-13.325-8.618-21.308-8.555c-4.939,0.055-9.684,1.292-13.909,3.575c-3.642-1.808-7.379-3.407-11.192-4.796C331.293,95.638,340,78.815,340,60c0-33.084-26.916-60-60-60h-80c-33.084,0-60,26.916-60,60c0,18.819,8.709,35.644,22.309,46.652C120.164,122.072,90,162.581,90,210v80.712C56.122,295.579,30,324.797,30,360v11.266C12.767,375.717,0,391.396,0,410c0,38.599,31.402,70,70,70h340c38.598,0,70-31.401,70-70C480,391.396,467.233,375.717,450,371.266z M430,360v10H330v-10c0-27.57,22.43-50,50-50S430,332.43,430,360z M310,360v10h-96.064L370,210.492v80.22C336.122,295.579,310,324.797,310,360z M335.91,130.942l0.471-0.425c0.125-0.114,0.246-0.231,0.364-0.352c3.888-3.229,9.684-3.061,13.375,0.552l28.591,27.974c1.909,1.868,2.977,4.368,3.006,7.039c0.029,2.671-0.983,5.193-2.852,7.103L185.956,370h-83.942l45.886-46.898c0.042-0.043,0.084-0.086,0.125-0.129L335.91,130.942z M160,60c0-22.056,17.944-40,40-40h80c22.056,0,40,17.944,40,40s-17.944,40-40,40h-80C177.944,100,160,82.056,160,60z M110,210c0-49.626,40.374-90,90-90h80c11.212,0,22.3,2.093,32.652,6.115l-172.642,176.45c-8.953-6.252-19.208-10.303-30.011-11.853V210z M50,360c0-27.57,22.43-50,50-50c9.167,0,18.033,2.491,25.75,7.142l-42.892,43.838c-2.527,2.583-4.144,5.724-4.853,9.021H50V360z M410,460H70c-27.57,0-50-22.43-50-50c0-11.028,8.972-20,20-20h400c11.028,0,20,8.972,20,20C460,437.57,437.57,460,410,460z"
               ></path>
               <g></g>
             </svg>
           </div>
           <div class="rel-text-bold">{{ itemName.seats.displayValue[0] }}</div>
           <div class="v-text-meta">Seating Capacity</div>
         </div>

         <div>
           <div>
             <svg
               class="cs-icons"
               width="30"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 128 128"
             >
               <path
                 d="M28.2,83.1c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8s12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67H61v16.1 c-5.5,1.4-9.6,6.4-9.6,12.4c0,7.1,5.7,12.8,12.6,12.8c7,0,12.6-5.7,12.6-12.8c0-6-4.1-11-9.6-12.4V67h29.8c1.7,0,3-1.3,3-3V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H67V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8c-7,0-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V61H34.2V44.9 c5.5-1.4,9.6-6.4,9.6-12.4c0-7.1-5.7-12.8-12.6-12.8s-12.6,5.7-12.6,12.8c0,6,4.1,11,9.6,12.4V83.1z M70.6,95.5 c0,3.7-3,6.8-6.6,6.8c-3.7,0-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8C67.7,88.7,70.6,91.8,70.6,95.5z M90.1,32.5c0-3.7,3-6.8,6.6-6.8 c3.7,0,6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8C93.1,39.3,90.1,36.2,90.1,32.5z M57.4,32.5c0-3.7,3-6.8,6.6-6.8c3.7,0,6.6,3,6.6,6.8 c0,3.7-3,6.8-6.6,6.8C60.3,39.3,57.4,36.2,57.4,32.5z M37.9,95.5c0,3.7-3,6.8-6.6,6.8s-6.6-3-6.6-6.8c0-3.7,3-6.8,6.6-6.8 S37.9,91.8,37.9,95.5z M24.6,32.5c0-3.7,3-6.8,6.6-6.8s6.6,3,6.6,6.8c0,3.7-3,6.8-6.6,6.8S24.6,36.2,24.6,32.5z"
               ></path>
             </svg>
           </div>
           <div
             v-if="
               (itemName.transmission.displayValue[0] === 'Constantly Variable Transmission')
             "
             :uk-tooltip="`${itemName.transmission.displayValue[0]}`"
             class="rel-text-bold"
           >
             CVT
           </div>
           <div v-else class="rel-text-bold">
             {{ itemName.transmission.displayValue[0] }}
           </div>
           <div class="v-text-meta">Transmission</div>
         </div>

         <div>
           <div>
             <svg
               class="cs-icons"
               width="30"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 50 50"
             >
               <path
                 d="M 24.984375 6.984375 C 24.921875 6.988281 24.863281 6.992188 24.800781 7.007813 C 20.605469 7.042969 16.675781 8.203125 13.296875 10.203125 C 13.214844 10.238281 13.136719 10.285156 13.0625 10.339844 C 9.628906 12.429688 6.789063 15.402344 4.84375 18.933594 C 4.792969 19.003906 4.75 19.078125 4.71875 19.160156 C 3.015625 22.335938 2.039063 25.957031 2.007813 29.796875 C 1.980469 29.929688 1.980469 30.0625 2.007813 30.191406 C 2.039063 34.417969 3.09375 38.128906 5.144531 41.53125 C 5.382813 41.925781 5.863281 42.105469 6.304688 41.964844 C 6.746094 41.824219 7.035156 41.398438 7 40.9375 L 7.046875 41.550781 L 10.800781 39.375 C 11.121094 39.203125 11.320313 38.871094 11.320313 38.507813 C 11.324219 38.144531 11.128906 37.808594 10.8125 37.628906 C 10.496094 37.449219 10.109375 37.457031 9.796875 37.644531 L 6.460938 39.578125 C 5.039063 36.945313 4.179688 34.183594 4.03125 31 L 8 31 C 8.359375 31.003906 8.695313 30.816406 8.878906 30.503906 C 9.058594 30.191406 9.058594 29.808594 8.878906 29.496094 C 8.695313 29.183594 8.359375 28.996094 8 29 L 4.03125 29 C 4.167969 26.101563 4.902344 23.367188 6.09375 20.894531 C 6.65625 21.199219 7.554688 21.683594 9.574219 22.78125 C 9.890625 22.960938 10.277344 22.957031 10.589844 22.769531 C 10.898438 22.582031 11.085938 22.238281 11.070313 21.878906 C 11.058594 21.515625 10.851563 21.1875 10.527344 21.019531 C 8.507813 19.925781 7.613281 19.441406 7.046875 19.136719 C 8.648438 16.5 10.789063 14.234375 13.347656 12.527344 L 15.40625 15.953125 C 15.585938 16.261719 15.921875 16.453125 16.28125 16.449219 C 16.644531 16.441406 16.972656 16.246094 17.148438 15.929688 C 17.320313 15.613281 17.308594 15.226563 17.121094 14.921875 L 15.0625 11.496094 C 17.746094 10.054688 20.777344 9.183594 24 9.03125 L 24 13 C 23.996094 13.359375 24.183594 13.695313 24.496094 13.878906 C 24.808594 14.058594 25.191406 14.058594 25.503906 13.878906 C 25.816406 13.695313 26.003906 13.359375 26 13 L 26 9.03125 C 28.898438 9.167969 31.640625 9.886719 34.113281 11.078125 L 32.21875 14.574219 C 32.039063 14.890625 32.042969 15.277344 32.230469 15.589844 C 32.417969 15.898438 32.761719 16.085938 33.121094 16.070313 C 33.484375 16.058594 33.8125 15.851563 33.980469 15.527344 L 35.871094 12.035156 C 38.507813 13.632813 40.765625 15.789063 42.472656 18.347656 L 39.046875 20.40625 C 38.738281 20.585938 38.546875 20.921875 38.550781 21.28125 C 38.558594 21.644531 38.753906 21.972656 39.070313 22.148438 C 39.386719 22.320313 39.773438 22.308594 40.078125 22.121094 L 43.503906 20.0625 C 44.945313 22.746094 45.816406 25.777344 45.96875 29 L 42 29 C 41.640625 28.996094 41.304688 29.183594 41.121094 29.496094 C 40.941406 29.808594 40.941406 30.191406 41.121094 30.503906 C 41.304688 30.816406 41.640625 31.003906 42 31 L 45.96875 31 C 45.820313 34.183594 44.960938 36.945313 43.542969 39.578125 L 40.203125 37.644531 C 39.890625 37.457031 39.503906 37.449219 39.1875 37.628906 C 38.871094 37.808594 38.675781 38.144531 38.679688 38.507813 C 38.679688 38.871094 38.878906 39.203125 39.199219 39.375 L 42.953125 41.550781 L 43 40.9375 C 42.964844 41.398438 43.253906 41.824219 43.695313 41.964844 C 44.136719 42.105469 44.617188 41.925781 44.855469 41.53125 C 46.90625 38.132813 47.960938 34.421875 47.996094 30.203125 C 48.019531 30.070313 48.019531 29.933594 47.996094 29.804688 C 47.957031 25.601563 46.792969 21.664063 44.785156 18.285156 C 44.757813 18.210938 44.71875 18.144531 44.671875 18.078125 C 44.667969 18.078125 44.667969 18.078125 44.667969 18.078125 C 44.667969 18.074219 44.664063 18.074219 44.660156 18.070313 C 42.574219 14.640625 39.609375 11.804688 36.085938 9.859375 C 36 9.792969 35.90625 9.746094 35.808594 9.710938 C 32.636719 8.015625 29.027344 7.039063 25.191406 7.007813 C 25.125 6.992188 25.054688 6.984375 24.984375 6.984375 Z M 36.558594 22.179688 C 36.367188 22.175781 36.179688 22.226563 36.015625 22.328125 L 26.90625 27.710938 C 26.386719 27.273438 25.726563 27 25 27 C 23.355469 27 22 28.355469 22 30 C 22 31.644531 23.355469 33 25 33 C 26.644531 33 28 31.644531 28 30 C 28 29.804688 27.976563 29.609375 27.941406 29.421875 L 37.03125 24.046875 C 37.421875 23.824219 37.613281 23.367188 37.503906 22.933594 C 37.394531 22.5 37.007813 22.191406 36.558594 22.179688 Z M 25 29 C 25.316406 29 25.582031 29.144531 25.761719 29.363281 C 25.800781 29.46875 25.859375 29.5625 25.933594 29.648438 C 25.972656 29.757813 26 29.875 26 30 C 26 30.5625 25.5625 31 25 31 C 24.4375 31 24 30.5625 24 30 C 24 29.4375 24.4375 29 25 29 Z M 19 38 C 18.640625 37.996094 18.304688 38.183594 18.121094 38.496094 C 17.941406 38.808594 17.941406 39.191406 18.121094 39.503906 C 18.304688 39.816406 18.640625 40.003906 19 40 L 31 40 C 31.359375 40.003906 31.695313 39.816406 31.878906 39.503906 C 32.058594 39.191406 32.058594 38.808594 31.878906 38.496094 C 31.695313 38.183594 31.359375 37.996094 31 38 Z"
               ></path>
             </svg>
           </div>
           <div class="rel-text-bold">{{ itemName.kms }} km</div>
           <div class="v-text-meta">Odometer</div>
         </div>
       </div>
     </div>
       </router-link>
     </div>

  </li>

  </ul>
  </div>

  <div class="uk-width-1-1 uk-text-center">
    <div v-if="itemsCount < 2" class="uk-text-meta space33">SHOWING {{ itemsCount }} HYUNDAI</div>
    <div v-else class="uk-text-meta space33">SHOWING {{ itemsCount }} HYUNDAI'S</div>
  </div>

  <div class="uk-padding uk-flex uk-flex-center">
  <a class="tm-slidenav" href="#" uk-slider-item="previous" uk-slidenav-previous></a>
  <a class="tm-slidenav" href="#" uk-slider-item="next" uk-slidenav-next></a>
  </div>
  </div>


</div>

</template>
<script>
export default {
  data() {
    return {
      checkedModelCat: [],
    };
  },
  computed: {
    vehicles() {
      const vehicleMake = 'Hyundai';
      return this.$store.state.vehicles.filter((vehicles) => vehicleMake.includes(vehicles.make.displayValue[0]));
    },
    filteredItems: function() {
      if (this.checkedModelCat.length) {
        return this.vehicles.filter((vehicles) =>
          this.checkedModelCat.includes(vehicles.model.displayValue[0])
        );
      } else {
        return this.vehicles;
      }
    },
    totalCount() {
      return this.vehicles.length;
    },
    itemsCount() {
      return this.filteredItems.length;
    },
    // vehiclecat: function() {
    //   if (this.vehicles.length > 0) return [...new Set(this.vehicles.map((i) => i.model.displayValue[0]))];
    // },
    groupedModels() {
    const result =  _.uniqBy(this.vehicles, function (e) {
     return e.model.displayValue[0];
     });
    return _.sortBy(result, ({model}) => model.displayValue[0].toLowerCase());
   },
  },
  filters: {
    currency(price) {
      return "$" + price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
}
</script>

<style scoped>
.uk-slider-container{
padding: 4px;
}
.uk-padding-small {
    padding: 10px;
}
.scroll-card .uk-position-bottom {
margin-bottom: 10px;
}
.related-slider li {
  min-width: 300px;
  max-width: 300px;
}
.cs-icons{
padding: 5px;
fill: #798493;
}
.rel-text-bold{
color: #333;
font-size: 10px;
font-weight: 900;
}
.scroll-card {
  color: #37404C;
  margin: 10px;
  border-radius: 10px;
overflow: hidden;
box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.05);
transition: opacity 0.3s;
-webkit-transition: opacity 0.3s;
}
.scroll-card:hover {
  opacity: 0.7;
box-shadow: 0 2px 8px rgba(0,0,0,.08)!important;
}
.scroll-card .uk-badge {
box-shadow: -2.986572265625px 3.008930206298828px 7px #00000014 inset, inset 10px 10px 10px #aeaec020;
}
.nav-buttons{
  padding: 5px 15px;
}
.scroll-card a.uk-link-reset {
color: #dbdbdb!important;
}

@media (max-width: 1400px){
  .scroll-card-wrap li {
  min-width: 300px;
  }
}
</style>
