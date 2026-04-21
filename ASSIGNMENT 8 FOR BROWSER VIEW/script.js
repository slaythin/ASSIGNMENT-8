const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const ContactForm = {
    props: {
        namePlaceholder: { type: String, default: 'Your name' },
        emailPlaceholder: { type: String, default: 'you@example.com' },
        messagePlaceholder: { type: String, default: 'Tell me what you want to achieve' },
        buttonLabel: { type: String, default: 'Send enquiry' }
    },
    emits: ['open-modal'],
    data() {
        return {
            name: '',
            email: '',
            message: '',
            submittedMessage: ''
        };
    },
    computed: {
        nameError() {
            if (this.name === '') return 'Please enter your name.';
            if (!/^[A-Za-z ]+$/.test(this.name)) return 'Name must contain letters only.';
            return '';
        },
        emailError() {
            if (this.email === '') return 'Please enter your email address.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) return 'Please enter a valid email address.';
            return '';
        },
        messageError() {
            if (this.message === '') return 'Please enter your message.';
            if (this.message.trim().length < 10) return 'Message must be at least 10 characters long.';
            return '';
        },
        formIsValid() {
            return this.nameError === '' && this.emailError === '' && this.messageError === '';
        }
    },
    methods: {
        submitForm() {
            if (!this.formIsValid) {
                this.submittedMessage = 'Please correct the highlighted fields before sending your enquiry.';
                return;
            }
            this.submittedMessage = '';
            this.$emit('open-modal', {
                name: this.name.trim(),
                email: this.email.trim(),
                message: this.message.trim()
            });
            this.name = '';
            this.email = '';
            this.message = '';
        }
    },
    template: `
        <div class="contact-form-card">
            <form class="contact-form" @submit.prevent="submitForm" novalidate>
                <div class="form-row">
                    <label for="contact-name">Name</label>
                    <input id="contact-name" type="text" v-model="name" :class="{ 'input-error': nameError }" :placeholder="namePlaceholder">
                    <small class="error-text" v-if="nameError">{{ nameError }}</small>
                    <small class="error-text" v-else></small>
                </div>
                <div class="form-row">
                    <label for="contact-email">Email</label>
                    <input id="contact-email" type="email" v-model="email" :class="{ 'input-error': emailError }" :placeholder="emailPlaceholder">
                    <small class="error-text" v-if="emailError">{{ emailError }}</small>
                    <small class="error-text" v-else></small>
                </div>
                <div class="form-row">
                    <label for="contact-message">Message</label>
                    <textarea id="contact-message" rows="5" v-model="message" :class="{ 'input-error': messageError }" :placeholder="messagePlaceholder"></textarea>
                    <p class="helper-text">Let’s see if I can help with that.</p>
                    <small class="error-text" v-if="messageError">{{ messageError }}</small>
                    <small class="error-text" v-else></small>
                </div>
                <button class="submit-button" type="submit" :disabled="!formIsValid">{{ buttonLabel }}</button>
                <p class="form-message error" v-if="submittedMessage">{{ submittedMessage }}</p>
            </form>
        </div>
    `
};

const ConfirmationModal = {
    props: {
        isOpen: { type: Boolean, default: false },
        submission: {
            type: Object,
            default() {
                return { name: '', email: '', message: '' };
            }
        }
    },
    emits: ['close'],
    methods: {
        closeModal() {
            this.$emit('close');
        }
    },
    template: `
        <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
            <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <h2 id="modal-title">Thank you for reaching out</h2>
                <p class="modal-copy">Your enquiry has been captured with the details below.</p>
                <p class="modal-row"><strong>Name:</strong> {{ submission.name }}</p>
                <p class="modal-row"><strong>Email:</strong> {{ submission.email }}</p>
                <p class="modal-row"><strong>Message:</strong> {{ submission.message }}</p>
                <button class="modal-close" type="button" @click="closeModal">Close</button>
            </div>
        </div>
    `
};

const HomeView = {
    template: `
        <section class="hero">
            <div class="container hero-content">
                <h1>Creative Portfolio</h1>
                <p class="hero-text">An inclusive portfolio website that introduces my creative work and design thinking.</p>
                <router-link to="/projects" class="button-primary">Explore Projects</router-link>
            </div>
        </section>
    `
};

const ProjectsView = {
    data() {
        return {
            projects: [
                { title: 'Brand Identity Design', description: 'A branding concept focused on logo development, visual consistency, type hierarchy, and client-facing communication.' },
                { title: 'UX/UI Design', description: 'A user-centred layout that focuses on usability, intuitive navigation, and clean digital presentation.' },
                { title: 'Motion Design', description: 'A motion-based concept designed to communicate energy, movement, and visual rhythm across digital platforms.' },
                { title: 'Photography Series', description: 'A visual storytelling project using composition, contrast, and mood to create a cohesive photographic direction.' },
                { title: 'Copywriting Campaign', description: 'A strategic communication concept that supports brand voice, message clarity, and audience engagement.' },
                { title: 'Signage Application', description: 'A practical visual solution developed for legibility, impact, and real-world communication design.' }
            ]
        };
    },
    template: `
        <section class="projects-section"><div class="container"><h2>Featured Projects</h2><p class="section-intro">These featured projects reflect different areas of creative and digital work, ranging from branding and interface design to motion and communication.</p><div class="projects-grid"><article class="project-card" v-for="(project, index) in projects" :key="project.title"><div class="project-image">Project {{ index + 1 }}</div><div class="project-content"><h3>{{ project.title }}</h3><p>{{ project.description }}</p></div></article></div></div></section>
    `
};

const AboutView = {
    data() {
        return { skills: ['Graphic Design','Digital Design','UX/UI Design','Motion Design','Brand Strategy','Copywriting','Photography','Signage Application','AI Prompt Engineering','Creative Problem Solving'] };
    },
    template: `
        <div><section class="skills-section"><div class="container"><h2>Skills</h2><ul class="skills-list"><li v-for="skill in skills" :key="skill">{{ skill }}</li></ul></div></section><section class="about-section"><div class="container about-grid"><div class="about-panel"><h2>About Me</h2><p>I am a crazy creative with a million interests and wide variety of knowledge bases that are at your disposal. I look forward to ramping-up your brand experience.</p></div><aside class="about-panel accent-panel"><h3>Contact Details</h3><p><strong>Email:</strong> nathinpillay@gmail.com</p><p><strong>Phone:</strong> 063 919 8891</p></aside></div></section></div>
    `
};

const ContactView = {
    components: { ContactForm },
    emits: ['open-modal'],
    methods: {
        forwardModal(payload) { this.$emit('open-modal', payload); }
    },
    template: `
        <section class="contact-section"><div class="container"><h2>Contact</h2><p class="route-copy">The same Vue contact form from the previous assignment is still part of the project and now lives on its own routed page.</p><contact-form name-placeholder="Your name" email-placeholder="you@example.com" message-placeholder="Tell me what you want to achieve" button-label="Send enquiry" @open-modal="forwardModal"></contact-form></div></section>
    `
};

const routes = [
    { path: '/', name: 'Home', component: HomeView, meta: { title: 'Nathin | Home' } },
    { path: '/projects', name: 'Projects', component: ProjectsView, meta: { title: 'Nathin | Projects' } },
    { path: '/about', name: 'About', component: AboutView, meta: { title: 'Nathin | About' } },
    { path: '/contact', name: 'Contact', component: ContactView, meta: { title: 'Nathin | Contact' } }
];

const router = createRouter({ history: createWebHashHistory(), routes });
router.beforeEach((to, from, next) => { document.title = to.meta.title || 'Nathin | Portfolio'; next(); });

const App = {
    components: { ConfirmationModal },
    data() {
        return {
            showModal: false,
            submittedData: { name: '', email: '', message: '' },
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
        toggleMenu() { this.isMenuOpen = !this.isMenuOpen; },
        closeMenu() { this.isMenuOpen = false; },
        openConfirmationModal(payload) { this.submittedData = payload; this.showModal = true; },
        closeConfirmationModal() { this.showModal = false; }
    },
    template: `
        <div><header class="site-header" id="top"><div class="container header-inner"><router-link to="/" class="logo-link" aria-label="Go to home section" @click="closeMenu"><img src="assets/logo.png" alt="Nathin logo" class="logo"></router-link><button class="menu-toggle" :aria-expanded="String(isMenuOpen)" aria-controls="site-nav" type="button" @click="toggleMenu">Menu</button><nav class="site-nav" id="site-nav" :class="{ open: isMenuOpen }" aria-label="Main navigation"><ul class="nav-list"><li v-for="route in navRoutes" :key="route.path"><router-link :to="route.path" class="nav-link" active-class="active-link" @click="closeMenu">{{ route.name }}</router-link></li></ul></nav></div></header><main class="view-shell"><router-view @open-modal="openConfirmationModal"></router-view></main><footer class="site-footer"><div class="container"><p>Graphic designer • Digital designer • UX/UI designer • Motion designer • Business strategist • Copywriter • Photographer • Signage application • AI prompt engineer</p></div></footer><confirmation-modal :is-open="showModal" :submission="submittedData" @close="closeConfirmationModal"></confirmation-modal></div>
    `
};

createApp(App).component('contact-form', ContactForm).component('confirmation-modal', ConfirmationModal).use(router).mount('#app');
