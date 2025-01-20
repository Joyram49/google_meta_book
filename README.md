# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## env variables

# Google Book API Key

GOOGLE_BOOKS_API_KEY="AIzaSyC7wcsgO2DryIwuDyOntB0fMr9JRp41c7A"

Brief Overview of Approach and Implementation
Objective
The goal of the project was to build a feature that integrates the Google Books API to fetch and display book metadata dynamically, with the ability to save the retrieved metadata to a database and display all saved books on the frontend.

Backend Implementation
Google Books API Integration:

Utilized the API to fetch metadata based on the book title provided by the user.
Implemented a tRPC endpoint that interacts with the API and retrieves relevant metadata.
Database Management with Prisma:

Designed a Prisma schema with a Book model to store details such as title, author, description, publication date, and additional metadata.
Added an endpoint to save book metadata to the database.
tRPC Routers:

Built type-safe routers for handling both fetching book metadata and saving it to the database.
Ensured API responses were fully type-checked from the backend to the frontend.
Frontend Implementation
Search Form:

Created a user-friendly form where users can input a book title to search for metadata.
Dynamically fetched metadata from the tRPC router on submission.
Display Fetched Metadata:

Rendered the retrieved metadata in a structured and visually clean layout.
Save and Display Books:

Provided a "Save" button to persist fetched book metadata in the database.
Displayed all saved books in a responsive grid, ensuring usability across devices.
Deployment
Environment Variables:

Configured sensitive credentials such as the Google Books API key, database URL, and authentication secrets using .env for secure deployment.
Hosting:

Deployed the application on Vercel, ensuring fast and scalable hosting.
Challenges and Solutions
API Rate Limiting: Managed API usage efficiently by optimizing requests and error handling.
Database Design: Structured the schema to accommodate flexibility for additional metadata fields in the future.
Type Safety: Leveraged tRPC's type-safe APIs to minimize runtime errors and improve developer experience.
This approach focused on clean code practices, type safety, and modularity to ensure scalability and ease of maintenance.
Vercel Live link: https://google-meta-book.vercel.app/
