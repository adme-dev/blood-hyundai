import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};

    // Handle hash scrolling
    if (to.hash) {
      position.selector = to.hash;
      return position;
    }

    // Check for different scroll behaviors in meta
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      // If scrollToTop is true, scroll to top instantly
      if (typeof to.meta.scrollToTop === 'object') {
        // Custom scroll behavior
        return {
          x: 0,
          y: 0,
          behavior: to.meta.scrollToTop.behavior || 'auto',
          offset: to.meta.scrollToTop.offset || 0
        };
      }
      // Default scroll to top
      return {
        x: 0,
        y: 0
      };
    }

    // Return false to prevent scrolling
    return false;
  }
};

const routes = [{
    component: () => import( /* webpackChunkName: "home" */ "@/views/Home"),
    path: "/",
    name: "home",
    meta: {
      title: "Home",
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "home" */ "@/views/TabContactForms"),
    path: "/contact",
    name: "contact",
    meta: {
      title: "Contact",
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "carsales" */ "@/components/search/template.vue"),
    path: "/car-sales/",
    name: "car-sales",
    meta: {
      title: "Search for Vehicles"
    },
  },
  {
    component: () => import( /* webpackChunkName: "builder" */ "@/builder/template"),

    path: "/build/:slug",
    name: "build",
    meta: {
      title: "Build for Vehicles",
      scrollToTop: true
    },
  },
  {
    path: "/vehicle-for-sale/:id/:slug",
    name: "vehicle-for-sale",
    props: true,
    component: () => import( /* webpackChunkName: "vehi573457leforsale" */ "@/components/search/CarSales/Single.vue"),
    meta: {
      scrollToTop: true
    },
  },
  {
    path: "/compare-vehicles-for-sale",
    name: "compare-saves",
    component: () => import( /* webpackChunkName: "comparesaves" */ "@/components/search/CarSales/CompareSaves.vue"),
    meta: {
      scrollToTop: true
    },
  },
  {
    path: "/vehicle-enquire/:condition-:year-:make-:model-:stockid",
    name: "vehicle-enquire",
    props: true,
    component: () => import( /* webpackChunkName: "vehicleenquire" */ "@/components/search/Form"),
    meta: {
      scrollToTop: true
    },
  },
  {
    component: () => import( /* webpackChunkName: "buildandprice" */ "@/views/vehicles"),
    name: "build-and-price",
    path: "/build-and-price/",
    meta: {
      scrollToTop: true
    },
  },
  {
    path: '/cars-for-sale/:condition?/:make?/:model?',
    name: 'taxonomies',
    component: () => import( /* webpackChunkName: "taxonomy" */ "@/views/taxonomy"),
    meta: {
      title: "Search for Vehicles",
      scrollToTop: true
    },
    props: true // This passes route params as props to the component
  },
  {
    path: "/site-map",
    name: "site-map",
    component: () => import( /* webpackChunkName: "sitemap" */ "@/views/SiteMap.vue"),
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "testdrive" */ "@/views/test-drive"),
    name: "test-drive",
    path: "/test-drive/",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "vehiclemodels" */ "@/components/models/models"),
    name: "vehicles",
    path: "/vehicles/",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "vehicle" */ "@/views/Vehicle"),
    name: "vehicle",
    path: "/vehicle/:slug/",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    component: () => import( /* webpackChunkName: "offers" */ "@/views/Offers"),
    name: "special-offers",
    path: "/special-offers",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      },
      title: "Special Offers"
    },
  },
  {
    component: () => import( /* webpackChunkName: "offer-enquire" */ "@/views/OfferEnquire"),
    name: "special-offer",
    path: "/special-offer/:id/:name",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      },
      title: "Special Offer"
    },
  },
  {
    component: () => import( /* webpackChunkName: "variant" */ "@/views/VariantEnquire"),
    name: "variant-enquire",
    path: "/variant/:slug/",
    meta: {
      scrollToTop: true
    },
  },
  {
    component: () => import( /* webpackChunkName: "offer-enquire" */ "@/views/VariantPricing"),
    name: "variant-pricing",
    path: "/variant/:model/pricing",
    meta: {
      scrollToTop: true
    },
  },
  {
    component: () => import( /* webpackChunkName: "securevehicle" */ "@/views/SecureVehicle"),
    name: "secure-vehicle",
    path: "/secure-vehicle/:id",
  },
  {
    component: () => import( /* webpackChunkName: "vehicle" */ "@/views/CarEnquire"),
    name: "car-enquire",
    path: "/car-enquire/:slug/",
    meta: {
      scrollToTop: true
    },
  },
  {
    component: () => import( /* webpackChunkName: "sellmycar" */ "@/views/SellMyCar"),
    name: "sell-my-car",
    path: "/sell-my-car",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },

  {
    component: () => import( /* webpackChunkName: "page" */ "@/views/OpenPay"),
    name: "open-pay",
    path: "/open-pay/",
    meta: {
      scrollToTop: true
    },
  },
  {
    component: () => import( /* webpackChunkName: "paymentsuccess" */ "@/views/PaymentSuccess"),
    name: "payment-success",
    path: "/payment-success",
    meta: {
      scrollToTop: true
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import( /* webpackChunkName: "error" */ "@/layouts/error"),
    meta: {
      scrollToTop: true,
      title: "404"
    }
  },
  {
    component: () => import( /* webpackChunkName: "page" */ "@/views/Page"),
    name: "page",
    path: "/:slug/",
    meta: {
      scrollToTop: {
        behavior: 'smooth',
        offset: 100 // Scroll with 100px offset
      }
    },
  },
  {
    path: "*",
    redirect: {
      name: 'notFound'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
  //linkActiveClass: "uk-active",
});

export default router;