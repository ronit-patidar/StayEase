# StayEase Documentation

StayEase is a server-rendered accommodation listing application. Travelers can browse and search stays, filter listings by category, view listing details, and leave reviews. Authenticated users can create and manage their own listings.

## Technology Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- EJS with `ejs-mate` layouts
- Passport.js with `passport-local-mongoose` authentication
- Express sessions stored in MongoDB with `connect-mongo`
- Cloudinary for listing image storage
- Multer and `multer-storage-cloudinary` for uploads
- Joi for request validation
- Bootstrap, custom CSS, and Font Awesome for the interface
- OpenStreetMap Nominatim for location geocoding

## Dependencies

### Runtime dependencies

| Package | Purpose |
| --- | --- |
| `cloudinary` | Uploads and serves listing images through Cloudinary |
| `connect-flash` | Displays temporary success, warning, and error messages |
| `connect-mongo` | Stores Express sessions in MongoDB |
| `dotenv` | Loads environment variables from `.env` |
| `ejs` | Server-side HTML templates |
| `ejs-mate` | EJS layouts and reusable view blocks |
| `express` | Web server and routing framework |
| `express-session` | Session management |
| `joi` | Validates listing and review form data |
| `method-override` | Enables PUT and DELETE requests from HTML forms |
| `mongoose` | MongoDB connection, schemas, and queries |
| `multer` | Handles multipart form uploads |
| `multer-storage-cloudinary` | Connects Multer uploads to Cloudinary |
| `passport` | Authentication middleware |
| `passport-local` | Username/password authentication strategy |
| `passport-local-mongoose` | Adds authentication fields and methods to the User model |

### Development dependency

- `@shufo/prettier-plugin-blade` is included as a formatting plugin.

## Application Features

- Home page with a responsive travel-focused interface
- Browse all accommodation listings
- Search listings by title, location, or country
- Filter listings by categories such as Trending, Iconic City, Beach, Cabins, and Arctic
- An **All** category that displays every listing
- View listing details, images, prices, location, host, and reviews
- User registration, login, logout, and session-based authentication
- Create new listings with image uploads
- Edit or delete listings owned by the current user
- Add and delete reviews with ratings from 1 to 5
- Flash messages for user feedback
- Automatic geocoding of listing locations
- Responsive layouts for desktop, tablet, and mobile screens
- Optional GST display toggle on the listings page

## Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
MY_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
PORT=8080
```

`ATLASDB_URL`, `MY_SECRET`, and the Cloudinary values are required. `PORT` is optional and defaults to `8080`.

> The application reads `MY_SECRET` in `app.js`. Use that name in the environment file.

## Setup and Running

### Prerequisites

- Node.js 18 or newer
- A MongoDB database or MongoDB Atlas cluster
- A Cloudinary account
- Internet access for geocoding through Nominatim

### Install dependencies

```bash
npm install
```

### Start the application

```bash
node app.js
```

For development with automatic restarts:

```bash
npm run dev
```

Open `http://localhost:8080` unless a different `PORT` is configured.

### Seed the database

After configuring `ATLASDB_URL`, run:

```bash
node init/init.js
```

The seed process creates users, listings, and reviews, then closes the database connection.

## Routes

### General routes

| Method | Path | Description | Authentication |
| --- | --- | --- | --- |
| `GET` | `/` | Renders the home page | Public |

### Listing routes

These routes are mounted under `/listings` in `app.js`.

| Method | Path | Description | Authentication |
| --- | --- | --- | --- |
| `GET` | `/listings` | Displays listings, categories, and search results | Public |
| `POST` | `/listings` | Creates a listing and uploads its image | Logged in |
| `GET` | `/listings/new` | Displays the new listing form | Logged in |
| `GET` | `/listings/:id` | Displays one listing and its reviews | Public |
| `PUT` | `/listings/:id` | Updates a listing and optionally replaces its image | Logged in and owner |
| `DELETE` | `/listings/:id` | Deletes a listing and its associated reviews | Logged in and owner |
| `GET` | `/listings/:id/edit` | Displays the edit listing form | Logged in and owner |

#### Listing query parameters

```text
/listings?category=Beach
/listings?location=Mumbai
```

- `category` filters results by the listing category.
- `location` searches the listing title, location, and country.
- `/listings` without either parameter displays all listings.

### Review routes

These routes are mounted under `/listings/:id/reviews`.

| Method | Path | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/listings/:id/reviews` | Adds a review to a listing | Logged in |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Deletes a review | Logged in and review author |

### User routes

| Method | Path | Description | Authentication |
| --- | --- | --- | --- |
| `GET` | `/signup` | Displays the registration form | Public |
| `POST` | `/signup` | Creates a user account and logs the user in | Public |
| `GET` | `/login` | Displays the login form | Public |
| `POST` | `/login` | Authenticates a user | Public |
| `GET` | `/logout` | Logs out the current user | Logged in |

## Request Flow

1. `app.js` loads environment variables and connects to MongoDB.
2. Express configures URL-encoded form parsing, static files, sessions, flash messages, and Passport.
3. Routes delegate requests to controllers.
4. Middleware checks authentication, ownership, and Joi validation when required.
5. Controllers query or update MongoDB through Mongoose models.
6. EJS views render the response using the shared layout and partials.

## Project Structure

```text
.
├── app.js                 # Express application entry point
├── cloudConfig.js         # Cloudinary and upload configuration
├── middleware.js          # Authentication, ownership, and validation middleware
├── schema.js              # Joi validation schemas
├── controllers/           # Request handling logic
├── models/                # Mongoose models
├── routes/                # Express route definitions
├── views/                 # EJS pages, layouts, and partials
├── public/                # CSS, browser JavaScript, and assets
├── init/                  # Database seed scripts and seed data
└── utils/                 # Error handling, categories, and geocoding helpers
```

## Data Models

### Listing

Listings contain a title, description, image, price, location, country, category, owner, reviews, and GeoJSON point coordinates.

### User

Users contain an email address and authentication fields provided by `passport-local-mongoose`.

### Review

Reviews contain a comment, a rating from 1 to 5, creation date, and author reference.

## Important Notes

- Image uploads require valid Cloudinary credentials.
- Creating or editing a listing requires authentication.
- Only the listing owner can edit or delete that listing.
- Listing locations are geocoded through the Nominatim API when a listing is created or its location changes.
- The current application supports listings and reviews; booking availability, payments, and reservations are not implemented.
- The default development command is `npm run dev`, which expects `nodemon` to be available in the environment.

