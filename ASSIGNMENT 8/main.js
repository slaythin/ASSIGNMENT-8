import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { router } from './router.js';
import { ContactForm, ConfirmationModal } from './script.js';

const App = {
    components: {
        ContactForm,
        ConfirmationModal
    },
    data() {
        return {
            showModal: false,
            submittedData: {
                name: '',
                email: '',
                message: ''
            },
            isMenuOpen: false,
            navRoutes: [
                { path: '/', name: 'Home' },
                { path: '/projects', name: 'Projects' },
                { path: '/about', name: 'About' },
                { path: '/contact', name: 'Contact' }
            ]
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
            this.isMenuOpen = false;
        },
        openConfirmationModal(payload) {
            this.submittedData = payload;
            this.showModal = true;
        },
        closeConfirmationModal() {
            this.showModal = false;
        }
    },
    template: `
        <div>
            <header class="site-header" id="top">
                <div class="container header-inner">
                    <router-link to="/" class="logo-link" aria-label="Go to home section" @click="closeMenu">
                        <img src="assets/logo.png" alt="Nathin logo" class="logo">
                    </router-link>

                    <button
                        class="menu-toggle"
                        :aria-expanded="String(isMenuOpen)"
                        aria-controls="site-nav"
                        type="button"
                        @click="toggleMenu"
                    >
                        Menu
                    </button>

                    <nav class="site-nav" id="site-nav" :class="{ open: isMenuOpen }" aria-label="Main navigation">
                        <ul class="nav-list">
                            <li v-for="route in navRoutes" :key="route.path">
                                <router-link
                                    :to="route.path"
                                    class="nav-link"
                                    active-class="active-link"
                                    @click="closeMenu"
                                >
                                    {{ route.name }}
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main class="view-shell">
                <router-view @open-modal="openConfirmationModal"></router-view>
            </main>

            <footer class="site-footer">
                <div class="container">
                    <p>
                        Graphic designer • Digital designer • UX/UI designer • Motion designer • Business strategist •
                        Copywriter • Photographer • Signage application • AI prompt engineer
                    </p>
                </div>
            </footer>

            <confirmation-modal
                :is-open="showModal"
                :submission="submittedData"
                @close="closeConfirmationModal"
            ></confirmation-modal>
        </div>
    `
};

const app = createApp(App);
app.component('contact-form', ContactForm);
app.component('confirmation-modal', ConfirmationModal);
app.use(router);
app.mount('#app');
