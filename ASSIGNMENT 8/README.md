Red&Yellow Assessment 8

The updated part of the project is the navigation setup. I used Vue Router to turn the single page portfolio into a routed single page application and created separate routed views for Home, Projects, About and Contact. The Home page keeps the main top section, the Projects page keeps the featured projects, the About page keeps the skills and about content, and the Contact page keeps the same Vue contact form from the previous assignment.

I added a router configuration file called router.js. This file defines the routes and connects each URL path to the correct view component. I also added route meta titles so that the page title changes when the route changes.

The navigation menu now uses router-link instead of normal anchor links. This allows the user to move between pages without reloading the website. The active route is highlighted so the user can clearly see which page they are on.

I tested the navigation in the browser to make sure each route loads correctly, the menu still works on smaller screens, and the routed pages keep the same styling and responsiveness as the earlier version. I also checked the console for errors while testing.

One of the challenges was changing the portfolio from section-based navigation to routed pages while still keeping the code, content and styling as close as possible to the previous style. But the main and most irritating challenge is that it would not view on the browser so I build a second version in the repository that says "ASSIGNMENT 8 FOR BROWSER" for an easy view. Personally I think that version feels more comfortable but the first folder labelled "ASSIGNMENT 8" is the one that answers the brief more accurately. I hope that's ok.
