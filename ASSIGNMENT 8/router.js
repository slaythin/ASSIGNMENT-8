import { createRouter, createWebHashHistory } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js';

const HomeView = {
    template: `
        <section class="hero">
            <div class="container hero-content">
                <h1>Creative Portfolio</h1>
                <p class="hero-text">
                    An inclusive portfolio website that introduces my creative work and
                    design thinking.
                </p>
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
        <section class="projects-section">
            <div class="container">
                <h2>Featured Projects</h2>
                <p class="section-intro">
                    These featured projects reflect different areas of creative and digital work,
                    ranging from branding and interface design to motion and communication.
                </p>

                <div class="projects-grid">
                    <article class="project-card" v-for="(project, index) in projects" :key="project.title">
                        <div class="project-image">Project {{ index + 1 }}</div>
                        <div class="project-content">
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.description }}</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `
};

const AboutView = {
    data() {
        return {
            skills: ['Graphic Design', 'Digital Design', 'UX/UI Design', 'Motion Design', 'Brand Strategy', 'Copywriting', 'Photography', 'Signage Application', 'AI Prompt Engineering', 'Creative Problem Solving']
        };
    },
    template: `
        <div>
            <section class="skills-section">
                <div class="container">
                    <h2>Skills</h2>
                    <ul class="skills-list">
                        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
                    </ul>
                </div>
            </section>

            <section class="about-section">
                <div class="container about-grid">
                    <div class="about-panel">
                        <h2>About Me</h2>
                        <p>
                            I am a crazy creative with a million interests and wide variety of knowledge bases that are at your disposal.
                            I look forward to ramping-up your brand experience.
                        </p>
                    </div>

                    <aside class="about-panel accent-panel">
                        <h3>Contact Details</h3>
                        <p><strong>Email:</strong> nathinpillay@gmail.com</p>
                        <p><strong>Phone:</strong> 063 919 8891</p>
                    </aside>
                </div>
            </section>
        </div>
    `
};

const ContactView = {
    emits: ['open-modal'],
    methods: {
        forwardModal(payload) {
            this.$emit('open-modal', payload);
        }
    },
    template: `
        <section class="contact-section">
            <div class="container">
                <h2>Contact</h2>
                <p class="route-copy">
                    The same Vue contact form from the previous assignment is still part of the project and now lives on its own routed page.
                </p>
                <contact-form
                    name-placeholder="Your name"
                    email-placeholder="you@example.com"
                    message-placeholder="Tell me what you want to achieve"
                    button-label="Send enquiry"
                    @open-modal="forwardModal"
                ></contact-form>
            </div>
        </section>
    `
};

const routes = [
    { path: '/', name: 'Home', component: HomeView, meta: { title: 'Nathin | Home' } },
    { path: '/projects', name: 'Projects', component: ProjectsView, meta: { title: 'Nathin | Projects' } },
    { path: '/about', name: 'About', component: AboutView, meta: { title: 'Nathin | About' } },
    { path: '/contact', name: 'Contact', component: ContactView, meta: { title: 'Nathin | Contact' } }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Nathin | Portfolio';
    next();
});
