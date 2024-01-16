import { IResponse } from '@ppe/networking';
import { ISites } from '../../types/ISites';

export const sitesMock: IResponse<ISites> = {
  data: {
    sites: [
      {
        name: "asd",
        active: false,
        description: "asd",
        coordinates: {
          lng: "-70.5840468",
          lat: "-33.5775918"
        },
        primaryResponsible: {
          email: "l@gm.com",
          firstName: "asd",
          lastName: "asd",
          address: {
            description: "Puerto Montt, Chile",
            formattedAddress: "Puerto Montt, Los Lagos, Chile",
            streetNumber: "",
            route: "",
            unit: "",
            locality: "Puerto Montt",
            city: "Llanquihue",
            country: "Chile",
            coordinates: {
              lng: "-72.94113639999999",
              lat: "-41.468917"
            }
          },
          landlinePhone: "56999999999",
          mobilePhone: "56999999999",
          birthDate: "04-05-2023 0:00:00",
          baptismDate: "10-05-2023 0:00:00",
          gender: "Male",
          maritalStatus: "Married",
          languages: [
            "English"
          ],
          serviceCapacity: "Publisher",
          appointedCapacity: "None",
          team: {
            id: "2",
            name: "Nonato Coo"
          },
          id: "8"
        },
        secondaryResponsible: [
          {
            email: "l@gm.com",
            firstName: "asd",
            lastName: "asd",
            address: {
              description: "Puerto Montt, Chile",
              formattedAddress: "Puerto Montt, Los Lagos, Chile",
              streetNumber: "",
              route: "",
              unit: "",
              locality: "Puerto Montt",
              city: "Llanquihue",
              country: "Chile",
              coordinates: {
                lng: "-72.94113639999999",
                lat: "-41.468917"
              }
            },
            landlinePhone: "56999999999",
            mobilePhone: "56999999999",
            birthDate: "04-05-2023 0:00:00",
            baptismDate: "10-05-2023 0:00:00",
            gender: "Male",
            maritalStatus: "Married",
            languages: [
              "English"
            ],
            serviceCapacity: "Publisher",
            appointedCapacity: "None",
            team: {
              id: "2",
              name: "Nonato Coo"
            },
            id: "8"
          }
        ],
        storage: [],
        id: "1"
      },
      {
        name: "asdasd",
        active: true,
        description: "asdasd",
        coordinates: {
          lng: "-70.5840468",
          lat: "-33.5775918"
        },
        primaryResponsible: {
          email: "l@gm.com",
          firstName: "asd",
          lastName: "asd",
          address: {
            description: "Puerto Montt, Chile",
            formattedAddress: "Puerto Montt, Los Lagos, Chile",
            streetNumber: "",
            route: "",
            unit: "",
            locality: "Puerto Montt",
            city: "Llanquihue",
            country: "Chile",
            coordinates: {
              lng: "-72.94113639999999",
              lat: "-41.468917"
            }
          },
          landlinePhone: "56999999999",
          mobilePhone: "56999999999",
          birthDate: "04-05-2023 0:00:00",
          baptismDate: "10-05-2023 0:00:00",
          gender: "Male",
          maritalStatus: "Married",
          languages: [
            "English"
          ],
          serviceCapacity: "Publisher",
          appointedCapacity: "None",
          team: {
            id: "2",
            name: "Nonato Coo"
          },
          id: "8"
        },
        secondaryResponsible: [
          {
            email: "l@gm.com",
            firstName: "asd",
            lastName: "asd",
            address: {
              description: "Puerto Montt, Chile",
              formattedAddress: "Puerto Montt, Los Lagos, Chile",
              streetNumber: "",
              route: "",
              unit: "",
              locality: "Puerto Montt",
              city: "Llanquihue",
              country: "Chile",
              coordinates: {
                lng: "-72.94113639999999",
                lat: "-41.468917"
              }
            },
            landlinePhone: "56999999999",
            mobilePhone: "56999999999",
            birthDate: "04-05-2023 0:00:00",
            baptismDate: "10-05-2023 0:00:00",
            gender: "Male",
            maritalStatus: "Married",
            languages: [
              "English"
            ],
            serviceCapacity: "Publisher",
            appointedCapacity: "None",
            team: {
              id: "2",
              name: "Nonato Coo"
            },
            id: "8"
          }
        ],
        storage: [],
        id: "2"
      }
    ]
  },
};
