export default {
  personal: {
    title: "Your Details",
    fields: [
      {
        component: "DaInput",
        options: {
          name: "input_1",
          label: "First Name",
          required: true,
          class: "uk-width-1-2@m",
          icon: "user",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_2",
          label: "Last Name",
          required: true,
          class: "uk-width-1-2@m",
          icon: "user",
        },
      },
      {
        component: "DaEmail",
        options: {
          name: "input_3",
          label: "Email",
          required: true,
          class: "uk-width-1-1",
          icon: "mail",
        },
      },
      {
        component: "DaPhone",
        options: {
          name: "input_4",
          label: "Contact Number",
          required: true,
          class: "uk-width-1-1",
          icon: "phone",
        },
      },
    ],
  },
};
