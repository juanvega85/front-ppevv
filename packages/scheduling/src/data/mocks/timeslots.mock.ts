import { IResponse } from '@ppe/networking';
import { ITimeSlots } from '../../types/ITimeSlots';

export const timeSlotsMock: IResponse<ITimeSlots> = {
  data: {
    timeslots: [
      // {
      //   schedule: { id: '6345a7599242c30fa1782c6f' },
      //   shift: { id: '62ae34d43e83340a92863709' },
      //   isException: false,
      //   assigned: [{ id: '62b0a4e43e83340a9286372d' }, { id: '62abdd8e89d5bc0ffc129116' }, { id: '62abfc6a89d5bc0ffc129124' }],
      //   notes: [],
      //   active: true,
      //   duration: '02:30:00',
      //   timeOfDay: '12:30:00',
      //   date: '2022-10-03',
      //   id: '6345a7599242c30fa1782c6f08DAA53AFD239400',
      // },
      {
        schedule: {
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
          periodStartDay: "2023-05-24",
          periodEndDay: "2023-06-24",
          assigned: [
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
            },
            {
              email: "maxi_n90@hotmail.com",
              firstName: "Maxi",
              lastName: "Saavedra",
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
              landlinePhone: "562336388",
              mobilePhone: "5699999999",
              birthDate: "04-05-2023 0:00:00",
              baptismDate: "08-05-2023 0:00:00",
              gender: "Male",
              maritalStatus: "Single",
              languages: [
                "Spanish"
              ],
              serviceCapacity: "Unknown",
              appointedCapacity: "Unknown",
              team: {
                id: "2",
                name: "Nonato Coo"
              },
              id: "1"
            }
          ],
          notes: [
            ""
          ],
          id: "46"
        },
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
        date: "2023-05-30",
        timeOfDay: "05:00:00",
        duration: "02:00:00",
        assigned: [
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
          },
          {
            email: "maxi_n90@hotmail.com",
            firstName: "Maxi",
            lastName: "Saavedra",
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
            landlinePhone: "562336388",
            mobilePhone: "5699999999",
            birthDate: "04-05-2023 0:00:00",
            baptismDate: "08-05-2023 0:00:00",
            gender: "Male",
            maritalStatus: "Single",
            languages: [
              "Spanish"
            ],
            serviceCapacity: "Unknown",
            appointedCapacity: "Unknown",
            team: {
              id: "2",
              name: "Nonato Coo"
            },
            id: "1"
          }
        ],
        notes: [
          ""
        ],
        isException: false,
        active: true,
        id: "1"
      },
      {
        schedule: {
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
          periodStartDay: "2023-05-10",
          periodEndDay: "2023-05-22",
          assigned: [
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
          notes: [
            ""
          ],
          id: "47"
        },
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
        timeOfDay: "05:00:00",
        duration: "02:00:00",
        assigned: [
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
        notes: [
          ""
        ],
        isException: false,
        active: true,
        id: "5"
      }
    ],  
  },
};
