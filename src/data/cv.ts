export const profile = {
  name: 'Bedirhan Aydın',
  role: 'Freelance Full-Stack Developer',
  location: 'İstanbul, Türkiye',
  email: 'bedirhhanaydin@gmail.com',
  github: 'https://github.com/bedirhanayydin',
  linkedin: 'https://linkedin.com/in/bedirhan-aydın-56530b1a2',
  tagline:
    'From the database to the App Store — I design, build and ship complete products: mobile apps, websites, backends, admin panels and everything in between.',
  about: [
    'I am a software developer with years of experience building scalable, high-performance products across retail, public sector, healthcare and corporate projects — mobile apps for iOS, Android and Huawei, web apps, and the backends that power them.',
    'As a freelancer I work directly with you, without layers in between. Whatever the project needs — app, website, API, admin panel or integration — I turn your idea into clean, maintainable code, ship it, and stay around for the next version.',
  ],
}

export const services = [
  {
    title: 'Mobile apps',
    body: 'Cross-platform apps with Flutter, or native with SwiftUI and Java — for iOS, Android and Huawei, ready for the stores.',
    points: ['Flutter', 'SwiftUI', 'Java', 'Firebase', 'Supabase'],
  },
  {
    title: 'Websites & web apps',
    body: 'Fast, responsive websites and web apps — from landing pages and e-commerce to dashboards and admin panels.',
    points: ['React', 'Next.js', 'Tailwind CSS', 'Firebase', 'Supabase'],
  },
  {
    title: 'Backend & APIs',
    body: 'Secure, scalable backends and REST APIs with .NET and C# on PostgreSQL or MySQL, plus auth and third-party integrations.',
    points: ['.NET', 'C#', 'PostgreSQL', 'MySQL', 'REST APIs'],
  },
  {
    title: 'End-to-end products',
    body: 'Mobile, web and backend delivered as one product — every piece designed to fit together from day one.',
    points: ['Architecture', 'Integrations', 'Maps & GIS', 'Multi-language'],
  },
  {
    title: 'Care & new versions',
    body: 'Bug fixes, new features and releases after launch, plus rescue work on existing codebases.',
    points: ['Maintenance', 'Refactoring', 'Docker', 'Azure DevOps'],
  },
]

export const process = [
  { step: 'Discover', body: 'We talk through the goal, users and must-haves, and agree on scope and timeline.' },
  { step: 'Design', body: 'Screens and flows are shaped together — or I build from your existing UX/UI designs.' },
  { step: 'Build', body: 'Short iterations across app, web and backend, with regular builds you can try yourself.' },
  { step: 'Launch & support', body: 'Stores, servers and domains handled for you, followed by updates as your product grows.' },
]

export type Experience = {
  company: string
  role: string
  period: string
  current?: boolean
  summary: string
  points: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    company: 'Beymen Group',
    role: 'Mobile Application Developer',
    period: '03/2024 — Present',
    current: true,
    summary:
      'Building internal and customer-facing Flutter apps for one of Türkiye’s leading luxury retailers.',
    points: [
      'Develop apps for in-store handheld terminals such as PAX and Zebra, optimized for enterprise and retail hardware.',
      'Build internal corporate applications working directly with the CTO and directors.',
      'Translate UX/UI designs into Flutter, using REST APIs, Clean Architecture and MVVM.',
      'Ship releases to the App Store, Google Play and Huawei AppGallery; push, analytics and deployment via OneSignal and Firebase.',
      'Mentor interns with technical guidance and development support.',
    ],
    tags: ['Flutter', 'PAX', 'Zebra', 'OneSignal', 'Firebase', 'TFS'],
  },
  {
    company: 'Netix Bilişim Teknolojileri',
    role: 'Mobile Application Developer',
    period: '08/2022 — 03/2024',
    summary:
      'Mobile and web applications for HR, municipality, ministry and health-sector clients.',
    points: [
      'Owned creation, development and bug-fix stages of mobile and web apps across public-sector and healthcare projects.',
      'Integrated GIS systems (ArcGIS, OpenGIS, OpenLayers, GeoServer) into Flutter.',
      'Structured multi-module projects with isolated layers managed through melos.',
      'Implemented multi-language support, Firebase messaging and analytics, and shipped to iOS and Android.',
    ],
    tags: ['Flutter', 'React', 'GIS', 'melos', 'BLoC', 'MobX'],
  },
  {
    company: 'Qetra',
    role: 'Mobile Application Developer',
    period: '02/2022 — 06/2022',
    summary: 'First professional Flutter role, turning UX/UI designs into production screens.',
    points: [
      'Developed Flutter applications from UX/UI designs.',
      'Worked with Git-based team workflows.',
    ],
    tags: ['Flutter', 'Git'],
  },
  {
    company: 'Freelance',
    role: 'Software Developer',
    period: '01/2020 — 01/2022',
    summary: 'Automation solutions and mobile apps for independent clients.',
    points: ['Built automation tools and mobile apps using Flutter, Java, C# and React.'],
    tags: ['Flutter', 'Java', 'C#', 'React'],
  },
]

export type Project = {
  name: string
  client: string
  description: string
  highlight: string
  stack: string[]
  appStore?: string
  playStore?: string
}

export const projects: Project[] = [
  {
    name: 'Heal In Türkiye',
    client: 'Ministry of Trade · Service Exporters’ Association',
    description:
      'Helps patients travelling for health tourism find and get treated at institutions approved by the Ministry of Health.',
    highlight: 'Built a custom marker-clustering layer on top of Google Maps.',
    stack: ['MVVM', 'MobX', 'Retrofit', 'Hive', 'get_it', 'Google Maps', 'Firebase'],
    appStore: 'https://apps.apple.com/us/app/heal-in-t%C3%BCrkiye/id1659023801',
    playStore: 'https://play.google.com/store/apps/details?id=tr.org.hib.healinturkiye',
  },
  {
    name: 'Cemetery Information System',
    client: 'Diyarbakır Metropolitan Municipality',
    description:
      'Draws turn-by-turn routes to a grave inside a very large cemetery. Rebuilt the native app in Flutter on a GeoServer GIS backend.',
    highlight: 'Custom EPSG:4326 layers and on-map routing with Clean Architecture.',
    stack: ['melos', 'flutter_map', 'BLoC', 'auto_route', 'injectable', 'freezed', 'GeoServer'],
    appStore: 'https://apps.apple.com/tr/app/dbb-mezarl%C4%B1k-bilgi-sistemi/id1609209900',
    playStore: 'https://play.google.com/store/apps/details?id=tr.com.netix.mebisdiyarbakir',
  },
  {
    name: 'PerformX',
    client: 'Netix',
    description:
      'Tracks office staff check-ins, leave (annual, sick and more) and generates attendance reports — on mobile and web.',
    highlight: 'App, domain and data split into melos modules with unit tests; I worked on both Flutter and React.',
    stack: ['Clean Architecture', 'melos', 'BLoC', 'auto_route', 'freezed', 'React', 'Unit tests'],
    appStore: 'https://apps.apple.com/tr/app/performx/id6450419393',
    playStore: 'https://play.google.com/store/apps/details?id=tr.com.netix.performx',
  },
  {
    name: 'Onsider',
    client: 'Netix',
    description:
      'Tracks working hours of field personnel and produces reports, designed to keep working through flaky connectivity.',
    highlight: 'Facade, strategy, factory and singleton patterns behind an online/offline sync layer.',
    stack: ['MVVM', 'MobX', 'Retrofit', 'Hive', 'get_it', 'Google Maps', 'Firebase'],
  },
]


export const education = {
  degree: 'B.Sc. Computer Engineering',
}
