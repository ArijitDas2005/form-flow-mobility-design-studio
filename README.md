# Form / Flow — AI design workflow studio

**A portfolio project for an AI Integration Specialist role in an industrial design team.** Form / Flow is a browser-based concept-to-execution workspace for an electric mobility design sprint. It connects a vehicle form study, a small rider-facing UI/UX exploration, a design brief, AI-assist prompts, team process signals and a lightweight handoff playbook in one interface.

The central design question is: **How might we help an industrial design team move from an early EV concept to a useful review with less workflow friction, while keeping designers in control?**

## Run it

Open `index.html` in a modern browser. There is no build step, package install, account or API key. The Google Fonts link is optional; the page falls back to system fonts when offline.

## Publish it on Netlify

This project is configured as a static Netlify site in `netlify.toml`. Use the included [Netlify launch guide](NETLIFY_LAUNCH.md) to deploy the folder manually or connect a Git repository for automatic updates. There is no build command; the project root is the publish directory.

## What to explore

- **Studio:** move through Discover, Explore, Refine and Deliver; inspect three original, vector scooter form studies; save a direction; add a sketch prompt; open the dashboard preview; and download the project summary as JSON.
- **Brief:** edit and save the challenge. The draft is stored in this browser using local storage.
- **Process insights:** review example sprint metrics and a workflow snapshot. All metrics are synthetic and explicitly labelled as portfolio demo data.
- **AI playbook:** follow a practical problem-first approach for evaluating and integrating AI in a creative workflow.
- **Flow Assist:** try the quick prompts or enter a question. This prototype returns local, rule-based example suggestions. It does **not** call a language model or claim measured AI outcomes.

## Design and implementation

- Plain HTML, CSS and JavaScript; no dependencies.
- Responsive layout, keyboard-operable controls, dialog dismissal with Escape, visible focus states, and status messages for key actions.
- Inline SVG illustrations keep vehicle concept visuals crisp without external image assets.
- Browser local storage is used only for the editable brief. Project examples and metrics are demo content.
- The project name and visual design are independent portfolio work inspired by the role description. This is not an official Ather Energy product, an internal tool, or evidence of research conducted with its employees.

## Suggested portfolio walkthrough

1. Start with the rider brief and explain why the problem is framed around confidence and handoff friction.
2. Compare the three vehicle directions, then connect the “Quiet confidence” direction to the glanceable dashboard sketch.
3. Demonstrate an AI-assist prompt and explain why the output is a reviewable starting point, not an automatic design decision.
4. Show how you would validate the hypothesis with designers and riders before introducing a real AI service.
5. End with the playbook and point out the synthetic nature of the sample metrics.

See [the case study](docs/CASE_STUDY.md) for the story and [the workflow notes](docs/WORKFLOW.md) for a role-requirement mapping, evaluation plan and next steps.

