export default function lazyLoadComponent({ componentFactory, loading, loadingData }) {
  let resolveComponent;

  const loadComponent = () => {
    const promise = new Promise((resolve) => {
      resolveComponent = resolve;
    });

    if (!("IntersectionObserver" in window)) {
      componentFactory().then(resolveComponent);
      return promise;
    }

    return {
      mounted() {
        const observer = new IntersectionObserver(([entry], observer) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            componentFactory().then(resolveComponent);
          }
        });

        observer.observe(this.$el);
      },
      promise,
    };
  };

  return () => {
    const componentData = loadComponent();

    return {
      component: componentData.promise,
      loading: {
        mounted() {
          if (componentData.mounted) {
            componentData.mounted.call(this);
          }
        },
        render(createElement) {
          return createElement(loading, loadingData);
        },
      },
    };
  };
}
