# 🎨 Atelier - Contemporary Art Gallery Management System

A comprehensive, database-driven art gallery management system built with MySQL, Node.js, and modern web technologies. Features an elegant glassmorphism UI, role-based access control, and automated business workflows.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

### Core Functionalities
- 🎨 **Artist Management** - Add, edit, delete artist profiles with complete biographical information
- 🖼️ **Artwork Catalog** - Comprehensive artwork management with dynamic image handling
- 👥 **Customer Database** - Track customer information and purchase history
- 💰 **Sales Processing** - Record transactions with automated billing generation
- 📊 **Dashboard Analytics** - Real-time statistics and insights
- 🎪 **Exhibition Management** - Schedule and manage art exhibitions
- 📅 **Event System** - Organize gallery events, workshops, and artist talks
- 📝 **Artist Submission Portal** - Public form for artists to submit their work
- ✅ **Administrative Approval** - Review and approve/reject artwork submissions
- 🔐 **Role-Based Access Control** - Multi-tier authentication (Admin, Manager, Viewer)

### Technical Features
- 🗄️ **Stored Procedures** - Complex business logic implementation
- 🔔 **Database Triggers** - Automated workflows and data integrity
- 🔍 **Advanced Queries** - Joins, subqueries, and aggregations
- 🎨 **Glassmorphism UI** - Modern, artistic interface design
- 📱 **Responsive Design** - Works on all device sizes
- ⚡ **Real-time Updates** - Dynamic data loading without page refresh

---

## 🛠️ Tech Stack

### Backend
- **Database:** MySQL 8.0
- **Server:** Node.js 18.x (Native HTTP module)
- **Database Driver:** mysql2

### Frontend
- **Structure:** HTML5
- **Styling:** CSS3 (Custom Glassmorphism theme)
- **Interactivity:** Vanilla JavaScript
- **Fonts:** Google Fonts (Playfair Display, Montserrat)

### Development Tools
- VS Code
- MySQL Workbench
- Git & GitHub

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────┐
│           Frontend Layer (HTML/CSS/JS)       │
│  - User Interface                           │
│  - Client-side Validation                   │
│  - Dynamic Content Rendering                │
└─────────────────┬───────────────────────────┘
                  │ HTTP Requests/Responses
                  │ (JSON)
┌─────────────────▼───────────────────────────┐
│         Backend Layer (Node.js)              │
│  - RESTful API Endpoints                    │
│  - Business Logic                           │
│  - Authentication & Authorization           │
│  - Static File Serving                      │
└─────────────────┬───────────────────────────┘
                  │ SQL Queries
                  │
┌─────────────────▼───────────────────────────┐
│         Database Layer (MySQL)               │
│  - 10 Tables                                │
│  - Stored Procedures                        │
│  - Triggers                                 │
│  - Functions                                │
│  - Constraints & Relationships              │
└─────────────────────────────────────────────┘
```

---

## 📥 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MySQL Server](https://dev.mysql.com/downloads/) (v8.0 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

### Clone Repository

```bash
git clone https://github.com/yourusername/atelier-art-gallery.git
cd atelier-art-gallery
```

### Install Dependencies

```bash
cd backend
npm install mysql2
```

---

## 🗄️ Database Setup

### Step 1: Create Database

Open MySQL Workbench or MySQL command line and run:

```sql
CREATE DATABASE artgallery;
USE artgallery;
```

### Step 2: Run Database Script

Execute the complete database script located in `/database/schema.sql`:

```bash
mysql -u root -p artgallery < database/schema.sql
```

Or manually copy and paste the SQL commands from `schema.sql` into MySQL Workbench.

### Step 3: Configure Database Connection

Edit `backend/db.js` with your MySQL credentials:

```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: 'your_password',  // Your MySQL password
    database: 'artgallery'
});
```

### Step 4: Verify Installation

Run these queries to verify:

```sql
SHOW TABLES;
SELECT * FROM Users;
SELECT * FROM Artist;
```

You should see 10 tables and sample data.

---

## 🚀 Running the Application

### Start the Server

```bash
cd backend
node server.js
```

You should see:
```
✅ Connected to MySQL Database: artgallery
🚀 Server running at http://localhost:3000/
📂 Serving frontend from 'frontend' folder
🔗 API available at http://localhost:3000/api/
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000/
```

### Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Manager Account:**
- Username: `manager1`
- Password: `manager123`

**Viewer Account:**
- Username: `viewer1`
- Password: `viewer123`

---

## 📁 Project Structure

```
atelier-art-gallery/
│
├── backend/
│   ├── server.js           # Main server file with API routes
│   ├── db.js              # Database connection configuration
│   └── package.json       # Node.js dependencies
│
├── frontend/
│   ├── index.html         # Homepage
│   ├── login.html         # Authentication page
│   ├── artists.html       # Artist management
│   ├── artworks.html      # Artwork catalog
│   ├── sales.html         # Sales processing
│   ├── exhibitions.html   # Exhibition management
│   ├── events.html        # Event management
│   ├── billing.html       # Billing and invoices
│   ├── artist-submit.html # Artist submission form
│   ├── admin-submissions.html # Admin approval page
│   ├── style.css          # Glassmorphism theme
│   └── auth.js            # Authentication logic
│
├── database/
│   ├── schema.sql         # Complete database schema
│   ├── sample_data.sql    # Sample data for testing
│   └── procedures.sql     # Stored procedures & triggers
│
├── docs/
│   ├── API_Documentation.md
│   ├── Database_Design.md
│   └── User_Manual.md
│
├── screenshots/           # Application screenshots
├── README.md
└── LICENSE
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Artists
- `GET /api/artists` - Get all artists
- `POST /api/artists/add` - Add new artist
- `PUT /api/artists/update` - Update artist
- `DELETE /api/artists/delete/:id` - Delete artist

### Artworks
- `GET /api/artworks` - Get all artworks
- `GET /api/artworks/available` - Get available artworks

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers/add` - Add customer
- `PUT /api/customers/update` - Update customer
- `DELETE /api/customers/delete/:id` - Delete customer

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales/record` - Record new sale (uses stored procedure)

### Exhibitions
- `GET /api/exhibitions` - Get all exhibitions

### Events
- `GET /api/events` - Get all events

### Billing
- `GET /api/billing` - Get all bills
- `GET /api/billing/:id` - Get specific bill

### Submissions
- `GET /api/submissions` - Get all submissions
- `POST /api/submissions/add` - Submit artwork
- `POST /api/submissions/approve/:id` - Approve submission
- `POST /api/submissions/reject/:id` - Reject submission

### Analytics
- `GET /api/stats` - Dashboard statistics

---

## 👥 User Roles

### Admin
**Full Access**
- ✅ View all data
- ✅ Add, edit, delete artists, customers, artworks
- ✅ Record sales
- ✅ Approve/reject submissions
- ✅ Access all pages

### Manager
**Operational Access**
- ✅ View all data
- ✅ Add, edit artists and customers
- ✅ Record sales
- ✅ Approve/reject submissions
- ✅ Access all pages

### Viewer
**Read-Only Access**
- ✅ View all data
- ✅ Submit artworks
- ❌ Cannot edit or delete
- ❌ Cannot record sales
- ❌ Cannot access admin pages

---

## 📸 Screenshots

### Homepage - Dashboard
![Homepage](screenshots/homepage.png)
*Modern glassmorphism design with real-time statistics*

### Artwork Collection
![Artworks](screenshots/artworks.png)
*Grid layout with dynamic image loading and status badges*

### Artist Management
![Artists](screenshots/artists.png)
*Complete CRUD operations with form validation*

### Sales Processing
![Sales](screenshots/sales.png)
*Automated billing generation on sale completion*

### Artist Submission Portal
![Submission](screenshots/submission.png)
*Public form for artists to submit their work*

### Administrative Approval
![Admin](screenshots/admin.png)
*Review and approve/reject submissions with detailed view*

---

## 🗃️ Database Schema

### Tables (10)

1. **Artist** - Artist profiles and information
2. **Artwork** - Artwork catalog with images and metadata
3. **Customer** - Customer information
4. **Sales** - Transaction records
5. **Exhibition** - Exhibition schedules
6. **Exhibition_Artworks** - Junction table (M:N relationship)
7. **Events** - Gallery events
8. **Billing** - Automated billing records
9. **Artwork_Submissions** - Artist submission queue
10. **Users** - Authentication and authorization

### Key Relationships

- One Artist → Many Artworks (1:N)
- One Customer → Many Sales (1:N)
- One Artwork → One Sale (1:1)
- One Sale → One Bill (1:1, via trigger)
- Many Artworks ↔ Many Exhibitions (M:N)

### Stored Procedures

- `RecordSale()` - Process sales with business logic
- `GetArtworksByArtist()` - Retrieve artist's portfolio
- `AddCustomer()` - Add customer with validation
- `GetExhibitionArtworks()` - Get exhibition details

### Triggers

- `trg_UpdateArtworkStatus` - Auto-update on sale
- `trg_CreateBill` - Auto-generate billing
- `trg_UpdateArtistTotal` - Track artist revenue
- `trg_PreventSoldArtworkDelete` - Data integrity

### Functions

- `TotalSalesByArtist()` - Calculate artist revenue
- `IsArtworkAvailable()` - Check availability
- `ArtistArtworkValue()` - Portfolio valuation

---

## 🎯 Key Features Explained

### 1. Dynamic Image Handling

The system intelligently handles artwork images with a priority system:

1. **Database Image_URL** (if provided by artist)
2. **Predefined images** for original artworks (IDs 1-12)
3. **Category-based images** for new approved artworks
4. **Fallback image** if all else fails

```javascript
function getArtworkImage(artwork) {
    if (artwork.Image_URL) return artwork.Image_URL;
    if (originalImages[artwork.Artwork_ID]) return originalImages[artwork.Artwork_ID];
    if (categoryImages[artwork.Category]) return categoryImages[artwork.Category];
    return fallbackImage;
}
```

### 2. Automated Workflows

**Sales Process:**
1. Admin records sale
2. Trigger updates artwork status to "Sold"
3. Trigger creates billing record automatically
4. Trigger updates artist's total sales

**Submission Process:**
1. Artist submits artwork
2. Status set to "Pending"
3. Admin reviews in approval page
4. On approval:
   - Check if artist exists, create if not
   - Add artwork to main catalog
   - Update status to "Approved"

### 3. Role-Based UI

The interface automatically adapts based on user role:

```javascript
// Admin/Manager see edit buttons
if (user.role === 'Admin' || user.role === 'Manager') {
    showEditButtons();
}

// Viewer sees read-only interface
if (user.role === 'Viewer') {
    hideEditButtons();
    hideAdminPages();
}
```

---

## 🔒 Security Features

- ✅ Role-based access control
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS attack prevention
- ✅ Password validation
- ✅ Input sanitization
- ✅ Database constraints and triggers
- ✅ Session management via localStorage

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User authentication (login/logout)
- [ ] Role-based page access
- [ ] Artist CRUD operations
- [ ] Artwork filtering (Available/Sold)
- [ ] Sales recording
- [ ] Automatic billing generation
- [ ] Artist submission form
- [ ] Admin approval workflow
- [ ] Image loading for new artworks
- [ ] Dashboard statistics

### Test Data

Sample data is included in `database/sample_data.sql` for testing purposes.

---

## 🐛 Known Issues

- None currently reported

---

## 🚀 Future Enhancements

- [ ] Email notifications for submission status
- [ ] Online payment gateway integration
- [ ] Advanced analytics and reporting
- [ ] Export functionality (PDF, Excel)
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Customer wishlist feature
- [ ] QR code generation for artworks
- [ ] Integration with social media
- [ ] Advanced search with filters

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use meaningful variable names
- Comment complex logic
- Follow existing code structure
- Test thoroughly before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

**[Your Name]**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Dayananda Sagar University - Department of CSE (Data Science)
- Project Supervisor: [Professor Name]
- MySQL Documentation
- Node.js Community
- Pexels for artwork placeholder images
- Google Fonts (Playfair Display, Montserrat)

---

## 📞 Contact & Support

For issues, questions, or suggestions:

- **Email:** your.email@example.com
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/atelier-art-gallery/issues)
- **Documentation:** [Wiki](https://github.com/yourusername/atelier-art-gallery/wiki)

---

## 📊 Project Statistics

- **Lines of Code:** ~5,000+
- **Database Tables:** 10
- **API Endpoints:** 20+
- **Stored Procedures:** 4
- **Triggers:** 4
- **Functions:** 3
- **Development Time:** 3 months

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for DBMS Mini Project**

*Atelier - Where Art Meets Vision*