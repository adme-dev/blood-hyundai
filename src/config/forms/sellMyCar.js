const grades = [
  {
    label: "Excellent",
    value: "excellent",
  },
  {
    label: "Average",
    value: "average",
  },
  {
    label: "Poor",
    value: "poor",
  },
];
const choices = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];
const switchOptions = {
  active: "Yes",
  inactive: "No",
};

const switchChoices = {
  active: {
    label: "Yes",
    color: "#409EFF",
  },
  inActive: {
    label: "No",
    color: "#000",
  },
};
export default {
  personal: {
    title: "Your Details",
    fields: [
      {
        component: "DaInput",
        options: {
          name: "input_2",
          label: "First Name",
          required: true,
          class: "uk-width-1-2@m",
          icon: "user",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_3",
          label: "Last Name",
          required: true,
          class: "uk-width-1-2@m",
          icon: "user",
        },
      },
      {
        component: "DaEmail",
        options: {
          name: "input_4",
          label: "Email",
          required: true,
          class: "uk-width-1-1",
          icon: "mail",
        },
      },
      {
        component: "DaPhone",
        options: {
          name: "input_5",
          label: "Phone",
          required: true,
          class: "uk-width-1-1",
          icon: "phone",
        },
      },
    ],
  },
  vechicleDetails: {
    title: "Vehicle Details",
    fields: [
      {
        component: "DaInput",
        options: {
          name: "input_6",
          label: "Year",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_7",
          label: "Vehicle Make",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_8",
          label: "Vehicle Model",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_9",
          label: "Vehicle Grade",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_10",
          label: "VIN Number",
          required: false,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_11",
          label: "Vehicle Registration",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaInput",
        options: {
          name: "input_12",
          label: "Odometer",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
        },
      },
      {
        component: "DaSelect",
        options: {
          name: "input_16",
          label: "Vehicle Condition",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
          options: grades,
        },
      },
      {
        component: "DaSelect",
        options: {
          name: "input_17",
          label: "Tyre Condition",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
          options: grades,
        },
      },
      {
        component: "DaSelect",
        options: {
          name: "input_18",
          label: "Full Service History",
          required: true,
          class: "uk-width-1-2@m",
          icon: "file-edit",
          options: choices,
        },
      },
      {
        component: "DaSelect",
        options: {
          name: "input_19",
          label: "One Owner",
          required: true,
          class: "uk-width-1-1",
          icon: "file-edit",
          options: choices,
        },
      },
    ],
  },
  vehiclePhotos: {
    title: "Vehicle Photos",
    description:
      "Please upload at least one image to assist with your valuation. The more images uploaded the greater the likelihood that a more accurate valuation will be able to be provided in the best possible timeframe. If possible please include a photo of the odometer whilst the engine has been switched to the on position. Total images limited to a maximum of 6 thank you.",
    fields: [
      {
        component: "DaImageUpload",
        options: {
          name: "input_35",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: true,
          icon: "trash",
        },
      },
      {
        component: "DaImageUpload",
        options: {
          name: "input_36",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: false,
          icon: "trash",
        },
      },
      {
        component: "DaImageUpload",
        options: {
          name: "input_37",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: false,
          icon: "trash",
        },
      },
      {
        component: "DaImageUpload",
        options: {
          name: "input_38",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: false,
          icon: "trash",
        },
      },
      {
        component: "DaImageUpload",
        options: {
          name: "input_39",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: false,
          icon: "trash",
        },
      },
      {
        component: "DaImageUpload",
        options: {
          name: "input_40",
          label: "Drop your Photo here",
          class: "uk-width-1-2@m",
          required: false,
          icon: "trash",
        },
      },
    ],
  },
  vehicleAdditionalInfo: {
    title: "Additional Information",
    fields: [
      {
        component: "DaChoice",
        options: {
          name: "choice_input_26",
          label: "Previous Hail Damage",
          class: "uk-width-1-1",
          required: true, // need to check validattion based on inner component
          controls: {
            switch: {
              options: {
                name: "input_26",
                choices: switchChoices,
                class: "uk-width-1-1",
                required: false,
              },
            },
            text_area: {
              component: "DaTextArea",
              options: {
                name: "input_28",
                label: "If yes, please provide more detail",
                validation_message: "If yes, please provide more detail",
                class: "uk-width-1-1",
                icon: "commenting",
                required: false,
                visible: false,
              },
            },
          },
        },
      },
      {
        component: "DaChoice",
        options: {
          name: "choice_input_29",
          label: "Is there finance owing on the vehicle?",
          class: "uk-width-1-1",
          required: true, // need to check validattion based on inner component
          controls: {
            switch: {
              options: {
                name: "input_29",
                choices: switchChoices,
                class: "uk-width-1-1",
                required: false,
              },
            },
            text_area: {
              component: "DaTextArea",
              options: {
                name: "input_30",
                label: "If yes, please provide more detail",
                class: "uk-width-1-1",
                icon: "commenting",
                validation_message: "If yes, please provide more detail",
                required: false,
                visible: false,
              },
            },
          },
        },
      },
      {
        component: "DaChoice",
        options: {
          name: "choice_input_31",
          label: "Any known faults or malfunction lights on?",
          class: "uk-width-1-1",
          required: true, // need to check validattion based on inner component
          controls: {
            switch: {
              options: {
                name: "input_31",
                choices: switchChoices,
                class: "uk-width-1-1",
                required: false,
              },
            },
            text_area: {
              component: "DaTextArea",
              options: {
                name: "input_32",
                label: "If yes, please provide more detail",
                class: "uk-width-1-1",
                icon: "commenting",
                validation_message: "If yes, please provide more detail",
                required: false,
                visible: false,
              },
            },
          },
        },
      },
      {
        component: "DaTextArea",
        options: {
          name: "input_33",
          label: "Do you have any additional accessories fitted?",
          class: "uk-width-1-1",
          required: false,
        },
      },
      {
        component: "DaTextArea",
        options: {
          name: "input_34",
          label: "Anything else you would like to note/Additional Comments",
          class: "uk-width-1-1",
          icon: "commenting",
          required: false,
        },
      },
    ],
  },
};
