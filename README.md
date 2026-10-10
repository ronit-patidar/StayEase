# Stayease

> Cabins, castles, and everything in between.

Stayease is a full-stack accommodation booking platform where travelers can discover unique stays and hosts can list their own space. It is built with Node.js, Express, MongoDB, and server-rendered EJS views.

**Live demo:** _add your deployed link here_

## Features

- Browse and explore stay listings
- Sign up, log in, and log out with secure authentication (Passport.js)
- Hosts can create, edit, and delete their own listings
- Image uploads for listings, stored on Cloudinary
- Personalized home page for logged-in users
- Responsive design that works on mobile, tablet, and desktop
- Touch-friendly interactive cards

## Tech Stack

| Area | Technology |
| --- | --- |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Views | EJS, ejs-mate layouts |
| Authentication | Passport.js |
| Image storage | Cloudinary |
| Styling | Bootstrap, custom CSS, Font Awesome |

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB database (local or MongoDB Atlas)
- A Cloudinary account

### Installation

```bash
git clone https://github.com/ronit-patidar/StayEase.git
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Adjust the variable names to match the ones used in your code.

### Run the app

```bash
node app.js
```

Open `http://localhost:8080` in your browser (or the port set in your app).

## Project Structure

```
.
├── app.js
├── models/        # Mongoose schemas (listings, users)
├── routes/        # Express routes
├── views/         # EJS templates and layouts
├── public/
│   ├── css/       # Stylesheets (home.css and others)
│   ├── js/        # Client-side scripts (home.js and others)
│   └── images/    # Static images
└── .env           # Environment variables (not committed)
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/listings` | Browse all listings |
| `/listings/new` | Create a new listing (hosts) |
| `/signup` | Create an account |
| `/login` | Log in |

## Screenshots

_Add screenshots of the home page and listings page here._

## Future Improvements

- Booking calendar and availability
- Search and filters by location and price
- Payment integration

## Author

**Ronit Patidar**
GitHub: [@ronit-patidar](https://github.com/ronit-patidar)

## License

This project is for learning and portfolio purposes.