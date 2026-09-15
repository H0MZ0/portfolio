# Portfolio review

Reviewed all HTML, CSS, JavaScript, the README, portrait, and supplied CV on September 15, 2026. Also inspected local desktop and narrow-window Chrome screenshots. This is a source and visual review, not a full accessibility or browser compatibility audit. The live site could not be retrieved, so deployment and external link destinations remain unverified.

## Assessment

The consistent dark palette, readable typography, portrait, project sections, and direct contact links provide a useful foundation. The largest opportunity is to make the content specific, accurate, and relevant to internship applications. Your CV already contains stronger evidence than the website.

## Completed: CV download

- Added the supplied PDF unchanged as `cv.pdf`.
- Connected the existing hero button to the file with the download filename `Hamza_Kader_Software_Engineering_Intern_CV.pdf` and a descriptive accessible label.
- Verified that the PDF is byte-for-byte identical to the original and that the link targets it.
- Changes are local; publication requires the site's normal deployment.

## Priority 1: accuracy and positioning

1. **Resolve the education date discrepancy.** The website says 2022–Present for 1337; the CV says 2024–Present. Use the correct date consistently. The 2022 baccalaureate is a separate qualification.
2. **Correct Transcendence.** The website describes Pong with matchmaking and tournaments. The CV describes Trivia Trap, a multiplayer trivia application in progress, with your work on authentication, Google OAuth, and friendships in a five-person team. Describe the actual project and distinguish completed work from ongoing work.
3. **State the target role clearly.** A suggested headline is “Software Engineering Student · Seeking an Internship.” Include Ben Guerir, Morocco, and your availability if the CV's “Available immediately” remains accurate.
4. **Replace generic About copy.** Explain what you are studying, what you have built, and what role you want. Support claims about open-source contributions with links. Keep coding-year and project-count statistics only if you can substantiate them; they are not necessarily wrong, but the current page gives no evidence.
5. **Reconcile LinkedIn destinations.** The site uses `/in/hamza-kader-5a969a326/`; the CV displays `/in/hamza-kader`. Verify which is correct and make them consistent.

Suggested introduction based on the CV:

> I'm Hamza, a software engineering student at 1337 in Ben Guerir, Morocco. I build systems projects in C/C++ and backend services in Python. My recent work includes CGI and session handling for a web server, containerized infrastructure, and authentication for a team-built trivia application. I'm seeking a software engineering internship.

## Priority 2: show engineering evidence

- Feature Trivia Trap, Webserv, and Inception prominently. Inception is absent despite being a detailed project in the CV. Keep Minishell if it adds useful evidence; move “More Projects” to a simple GitHub link.
- For each featured project include the purpose, your personal contribution, stack, team size where relevant, current status, one challenge or design decision, and a clearly labeled repository link.
- Replace unmeasured “high-performance” claims with demonstrated behavior, or add reproducible benchmarks if available. Do not invent metrics.
- Example Webserv copy: “Implemented CGI execution and cookie/session handling in a team-built C++98 HTTP server.” Then explain a real implementation challenge and how you verified the solution.
- Add a screenshot or short demo for Trivia Trap, and a terminal demo or architecture diagram for systems projects. A live demo is useful only when it is functional.
- Ensure linked repositories have setup instructions, examples, your role, and relevant validation results. Their contents were not audited here.
- Align the skills list with demonstrated work: the CV includes JavaScript, SQL, FastAPI, REST APIs, OAuth, MariaDB, Docker Compose, NGINX, Make, and Valgrind. Replace broad “Expertise” labels with concrete skills or link them to projects.

## Priority 3: presentation

- Put Projects immediately after the hero or a short About section, so visitors reach evidence sooner.
- Reduce the space and visual emphasis given to the decorative code panel. Its generic statements do not explain your work. The line animation also combines block spans with preserved newlines, creating excessive vertical spacing.
- Simplify repeated animations: glowing portrait, moving background, typing, counters, and recurring section reveals compete for attention. Prefer a static headline and, if needed, subtle one-time reveals.
- Replace “Coffee Consumed” with useful information such as location, availability, or language proficiency. Simplify the coffee-themed footer.
- Prioritize email, GitHub, and LinkedIn. Keep Instagram only if its content supports your professional work.
- Improve hero button sizing: desktop labels wrap within the narrow text column. Allow wrapping between buttons or reduce padding.
- The contact section has a full-viewport minimum height for relatively little content; reduce excess space.

## Priority 4: technical polish

- **Mobile CSS ordering:** later base rules override earlier responsive values for `.avatar-ring` (220px overrides the intended 160px/130px sizes), `.timeline-content`, and `.back-to-top`. Place base rules before responsive overrides.
- **Hero spacing:** verify the introduction remains prominent below the fixed navbar at tablet and mobile widths; the portrait and code panel move ahead of the text below 968px, pushing the introduction further down the page.
- **Anchor navigation:** add `scroll-margin-top` to sections so heading targets clear the fixed navbar.
- **Motion preferences:** implement `prefers-reduced-motion` in CSS and JavaScript, including smooth scrolling, typing, counters, and reveals.
- **Reliable visibility:** avoid hiding entire sections with an IntersectionObserver threshold of 10%; sufficiently tall sections on small screens may not meet that threshold. Animate individual elements once and retain visible content as a fallback.
- **Semantics and navigation:** add a `<main>` landmark, initialize `aria-expanded="false"`, connect the menu button with `aria-controls`, support Escape to close the menu, and use `aria-current` for the active section.
- **Keyboard controls:** make the visually hidden back-to-top button unfocusable until shown. Give project links distinct names such as “View Webserv on GitHub.”
- **Mobile menu positioning:** at narrow widths the navbar is 60px high but the opened menu starts at 70px. Align these values. Verify menu behavior with JavaScript disabled.
- **Metadata:** the README says the site is hosted at `https://h0mz0.github.io/portfolio/`, but canonical and Open Graph URLs point to the domain root. Align them with the actual deployment. Social image metadata points to `/preview.png`, which is absent from this repository; add a real preview asset and correct its URL.
- **Image stability:** add intrinsic width and height attributes to the portrait and consider an optimized modern image format if it reduces transfer size without visible loss.

## Suggested order

Correct facts and positioning → improve three project descriptions and evidence → simplify the hero and page order → fix responsive/accessibility issues → validate external links and social previews → deploy.

## Validation performed

- Read every project source file and extracted the full text of the supplied one-page CV.
- Inspected local screenshots at requested desktop and narrow browser window sizes; these are not a substitute for testing on a physical phone.
- Verified the CV link, explicit download filename, PDF header, and exact file equality.
- `node --check script.js` and `git diff --check` passed.
