import { DesktopMacTwoTone, ContactlessTwoTone, Apple, Android } from '@ppe/icons';
import { IMenuList } from '../../../types/IMenuList';

const testItems: IMenuList[] = [
  {
    items: [
      {
        text: 'Home',
        path: '/',
        icon: DesktopMacTwoTone,
      },
    ],
  },
  {
    items: [
      {
        text: 'About',
        path: '/about',
        icon: DesktopMacTwoTone,
      },
    ],
  },
  {
    title: 'Creación de pautas',
    items: [
      {
        text: 'Otro sin submenu',
        path: '/otro',
      },
      {
        text: 'Configuración',
        icon: DesktopMacTwoTone,
        subItems: [
          {
            text: 'Modelo de equipos',
            path: '/uno',
            icon: Apple,
          },
          {
            text: 'Actividades',
            path: '/dos',
            icon: Android,
          },
        ],
      },
    ],
  },
  {
    title: 'Mantencion',
    items: [
      {
        text: 'Programacion',
        subItems: [
          {
            text: 'Retroalimentacion',
            path: '/path3',
            icon: ContactlessTwoTone,
          },
        ],
      },
    ],
  },
  {
    title: 'Documentation',
    items: [
      {
        text: 'Docs A',
        subItems: [
          {
            text: 'Docs A.1',
            path: '/docsA1',
          },
          {
            text: 'Docs A.2',
            path: '/docsA2',
          },
          {
            text: 'Docs A.3',
            path: '/docsA3',
          },
        ],
      },
      {
        text: 'Docs B',
        subItems: [
          {
            text: 'Docs B.1',
            path: '/docsB1',
          },
          {
            text: 'Docs B.2',
            path: '/docsB2',
          },
          {
            text: 'Docs B.3',
            subItems: [
              {
                text: 'Docs B.3.1',
                path: '/docsB31',
              },
              {
                text: 'Docs B.3.2',
                subItems: [
                  {
                    text: 'Docs B.3.2.1',
                    path: '/docsB321',
                  },
                  {
                    text: 'Docs B.3.2.2',
                    path: '/docsB322',
                    icon: DesktopMacTwoTone,
                    subItems: [
                      {
                        text: 'Docs B.3.2.2.1',
                        path: '/docsB3221',
                      },
                      {
                        text: 'Docs B.3.2.2.2',
                        path: '/docsB3222',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default testItems;
