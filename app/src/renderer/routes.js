export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/new-note',
    name: 'new-note',
    component: require('components/notes')
  },
  {
    path: '/note/:id',
    name: 'note',
    component: require("components/notes/note")
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: require("components/notes/edit")
  },
  {
    path: '/info',
    name: 'info',
    component: require("components/info")
  },
  {
    path: '*',
    redirect: '/'
  }
]
