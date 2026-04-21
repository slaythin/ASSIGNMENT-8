export const ContactForm = {
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

export const ConfirmationModal = {
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
