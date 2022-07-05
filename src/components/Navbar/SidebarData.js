import React from 'react'
import { HardDrive } from '../../icons/hard_drive'
import { Bell } from '../../icons/bell'
import { Map } from '../../icons/map'

export const SidebarData = [
  {
    title: 'Equipments',
    path: '/equipments',
    icon: <HardDrive />,
    className: 'nav-text'
  },
  {
    title: 'Map',
    path: '/map',
    icon: <Map />,
    className: 'nav-text'
  },
  {
    title: 'Alarms',
    path: '/alarms',
    icon: <Bell />,
    className: 'nav-text'
  }
]
