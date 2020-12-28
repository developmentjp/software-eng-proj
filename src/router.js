import { createWebHistory, createRouter } from 'vue-router'

import AirQuality from './pages/AirQuality'
import SearchTerms from './pages/SearchTerms'
import GlobalEvents from './pages/GlobalEvents'
import Relax from './pages/Relax'
import Contact from './pages/Contact'

const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: '/air-quality',
	},
	{
		path: '/air-quality',
		name: 'AirQuality',
		component: AirQuality,
	},
	{
		path: '/search-terms',
		name: 'SearchTerms',
		component: SearchTerms,
	},
	{
		path: '/global-events',
		name: 'GlobalEvents',
		component: GlobalEvents,
	},
	{
		path: '/relax',
		name: 'Relax',
		component: Relax,
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
