Red&Yellow Assessment 8

Most of the website is the same as the previous assignment because I wanted to keep the structure, styling and overall portfolio look consistent and only update the part that needed routing.

The updated part of the project is the navigation setup. I used Vue Router to turn the single page portfolio into a routed single-page application. I created separate routed views for Home, Projects, About and Contact. The Home page keeps the hero section, the Projects page keeps the featured projects, the About page keeps the skills and about content, and the Contact page keeps the same Vue contact form from the previous assignment.

I added a router configuration file called router.js. This file defines the routes and connects each URL path to the correct view component. I also added route meta titles so that the page title changes when the route changes.

The navigation menu now uses router-link instead of normal anchor links. This allows the user to move between pages without reloading the website. The active route is highlighted so the user can clearly see which page they are on.

I kept the Vue form and modal from the previous assignment so that the project still feels like it is being built on step by step rather than redesigned from scratch. The contact page still uses the reusable contact form component and the confirmation modal component.

I tested the navigation in the browser to make sure each route loads correctly, the menu still works on smaller screens, and the routed pages keep the same styling and responsiveness as the earlier version. I also checked the console for errors while testing.

The main challenge was changing the portfolio from section-based navigation to routed pages while still keeping the code, content and styling as close as possible to the previous assignment. I wanted it to look like a continuation of the same project, not a completely different build.
