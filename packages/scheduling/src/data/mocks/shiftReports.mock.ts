import { IResponse } from '@ppe/networking';
import { IShiftReports } from '../../types/IShiftReports';

export const shiftReportsMock: IResponse<IShiftReports> = {
  data: {
    shiftReports: [
      {
        shift: {
          site: {
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
          },
          day: "1Tuesday",
          startTime: "05:00:00",
          duration: "02:00:00",
          active: true,
          id: "3"
        },
        date: "2023-05-16",
        users: [
          {
            email: "lsaavedra230@gmail.com",
            firstName: "ale",
            lastName: "Saavedra",
            address: {
              description: "Avenida Presidente Salvador Allende Gossens, Iquique, Chile",
              formattedAddress: "Av. Salvador Allende Gossens, Iquique, Tarapacá, Chile",
              streetNumber: "",
              route: "Avenida Salvador Allende Gossens",
              unit: "",
              locality: "Iquique",
              city: "Iquique",
              country: "Chile",
              coordinates: {
                lng: "-70.1345536",
                lat: "-20.2396655"
              }
            },
            landlinePhone: "5623363888",
            mobilePhone: "56988888888",
            birthDate: "10-05-2023 0:00:00",
            baptismDate: "08-05-2023 0:00:00",
            gender: "Male",
            maritalStatus: "Married",
            languages: [
              "Spanish"
            ],
            serviceCapacity: "Publisher",
            appointedCapacity: "Unknown",
            team: {
              id: "1",
              name: "Proyecto PPE"
            },
            id: "3"
          },
          {
            email: "m@m.com",
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
            birthDate: "02-05-2023 0:00:00",
            baptismDate: "09-05-2023 0:00:00",
            gender: "Male",
            maritalStatus: "Married",
            languages: [
              "Mapudungun"
            ],
            serviceCapacity: "Publisher",
            appointedCapacity: "None",
            team: {
              id: "2",
              name: "Nonato Coo"
            },
            id: "7"
          },
          {
            email: "isamancilla90@gmail.com",
            firstName: "isa",
            lastName: "Saavedra",
            address: {
              description: "Avenida Presidente Salvador Allende Gossens, Iquique, Chile",
              formattedAddress: "Av. Salvador Allende Gossens, Iquique, Tarapacá, Chile",
              streetNumber: "",
              route: "Avenida Salvador Allende Gossens",
              unit: "",
              locality: "Iquique",
              city: "Iquique",
              country: "Chile",
              coordinates: {
                lng: "-70.1345536",
                lat: "-20.2396655"
              }
            },
            landlinePhone: "562336388",
            mobilePhone: "56999999999",
            birthDate: "04-05-2023 0:00:00",
            baptismDate: "09-05-2023 0:00:00",
            gender: "Female",
            maritalStatus: "Married",
            languages: [
              "English"
            ],
            serviceCapacity: "Unknown",
            appointedCapacity: "Unknown",
            team: {
              id: "2",
              name: "Nonato Coo"
            },
            id: "2"
          }
        ],
        activity: {
          books: "1",
          magazines: "0",
          brochure: "1",
          tract: "0",
          videos: "1"
        },
        notes: "null",
        id: "5"
      }
    ]
  },
};
