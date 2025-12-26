// server.js - Complete Art Gallery Backend Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const db = require('./db');

const PORT = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // API Routes
    if (pathname.startsWith('/api/')) {
        handleApiRequest(pathname, query, req, res);
    } 
    // Serve static files (HTML, CSS, JS)
    else {
        serveStaticFile(pathname, res);
    }
});

// Handle API requests
function handleApiRequest(pathname, query, req, res) {
    res.setHeader('Content-Type', 'application/json');

    // ==================== AUTHENTICATION APIs ====================
    
    // Login
    if (pathname === '/api/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'SELECT User_ID, Username, Email, Role FROM Users WHERE Username=? AND Password=?';
            db.query(sql, [data.username, data.password], (err, results) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                if (results.length === 0) {
                    res.writeHead(401);
                    res.end(JSON.stringify({ error: 'Invalid username or password' }));
                    return;
                }
                res.writeHead(200);
                res.end(JSON.stringify({ 
                    message: 'Login successful', 
                    user: results[0] 
                }));
            });
        });
    }
    
    // Register
    else if (pathname === '/api/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'INSERT INTO Users (Username, Password, Email, Role) VALUES (?, ?, ?, ?)';
            db.query(sql, [data.username, data.password, data.email, data.role || 'Viewer'], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'User registered successfully' }));
            });
        });
    }
    
    // ==================== ARTIST APIs ====================
    
    // GET all artists
    else if (pathname === '/api/artists' && req.method === 'GET') {
        db.query('SELECT * FROM Artist', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ADD new artist
    else if (pathname === '/api/artists/add' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'INSERT INTO Artist (Name, Country, Biography, Birth_Year, Email, Phone) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(sql, [data.name, data.country, data.biography, data.birth_year, data.email, data.phone], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Artist added successfully', id: result.insertId }));
            });
        });
    }
    
    // UPDATE artist
    else if (pathname === '/api/artists/update' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'UPDATE Artist SET Name=?, Country=?, Biography=?, Birth_Year=?, Email=?, Phone=? WHERE Artist_ID=?';
            db.query(sql, [data.name, data.country, data.biography, data.birth_year, data.email, data.phone, data.artist_id], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Artist updated successfully' }));
            });
        });
    }
    
    // DELETE artist
    else if (pathname.startsWith('/api/artists/delete/') && req.method === 'DELETE') {
        const artistId = pathname.split('/')[4];
        db.query('DELETE FROM Artist WHERE Artist_ID = ?', [artistId], (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Artist deleted successfully' }));
        });
    }
    
    // ==================== ARTWORK APIs ====================
    
    // GET all artworks
    else if (pathname === '/api/artworks' && req.method === 'GET') {
        const sql = `
            SELECT a.*, ar.Name as Artist_Name 
            FROM Artwork a 
            LEFT JOIN Artist ar ON a.Artist_ID = ar.Artist_ID
        `;
        db.query(sql, (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // GET available artworks
    else if (pathname === '/api/artworks/available' && req.method === 'GET') {
        const sql = `
            SELECT a.*, ar.Name as Artist_Name 
            FROM Artwork a 
            LEFT JOIN Artist ar ON a.Artist_ID = ar.Artist_ID
            WHERE a.Status = 'Available'
        `;
        db.query(sql, (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ==================== CUSTOMER APIs ====================
    
    // GET all customers
    else if (pathname === '/api/customers' && req.method === 'GET') {
        db.query('SELECT * FROM Customer', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ADD new customer
    else if (pathname === '/api/customers/add' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'INSERT INTO Customer (Name, Phone, Email, Address) VALUES (?, ?, ?, ?)';
            db.query(sql, [data.name, data.phone, data.email, data.address], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Customer added successfully', id: result.insertId }));
            });
        });
    }
    
    // UPDATE customer
    else if (pathname === '/api/customers/update' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'UPDATE Customer SET Name=?, Phone=?, Email=?, Address=? WHERE Customer_ID=?';
            db.query(sql, [data.name, data.phone, data.email, data.address, data.customer_id], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Customer updated successfully' }));
            });
        });
    }
    
    // DELETE customer
    else if (pathname.startsWith('/api/customers/delete/') && req.method === 'DELETE') {
        const customerId = pathname.split('/')[4];
        db.query('DELETE FROM Customer WHERE Customer_ID = ?', [customerId], (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Customer deleted successfully' }));
        });
    }
    
    // ==================== SALES APIs ====================
    
    // GET all sales
    else if (pathname === '/api/sales' && req.method === 'GET') {
        const sql = `
            SELECT s.*, a.Title as Artwork_Title, c.Name as Customer_Name 
            FROM Sales s
            LEFT JOIN Artwork a ON s.Artwork_ID = a.Artwork_ID
            LEFT JOIN Customer c ON s.Customer_ID = c.Customer_ID
        `;
        db.query(sql, (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // Record a sale (using stored procedure)
    else if (pathname === '/api/sales/record' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'CALL RecordSale(?, ?, ?, ?)';
            db.query(sql, [data.artwork_id, data.customer_id, data.sale_date, data.sale_amount], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Sale recorded successfully' }));
            });
        });
    }
    
    // ==================== EXHIBITION APIs ====================
    
    // GET all exhibitions
    else if (pathname === '/api/exhibitions' && req.method === 'GET') {
        db.query('SELECT * FROM Exhibition', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ==================== EVENTS APIs ====================
    
    // GET all events
    else if (pathname === '/api/events' && req.method === 'GET') {
        db.query('SELECT * FROM Events', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ==================== BILLING APIs ====================
    
    // GET all billing records
    else if (pathname === '/api/billing' && req.method === 'GET') {
        const sql = `
            SELECT b.Bill_ID, b.Sale_ID, b.Customer_ID, b.Bill_Date, b.Amount,
                   c.Name as Customer_Name, c.Email as Customer_Email,
                   a.Title as Artwork_Title, a.Status
            FROM BILLING b
            INNER JOIN CUSTOMER c ON b.Customer_ID = c.Customer_ID
            INNER JOIN SALES s ON b.Sale_ID = s.Sale_ID
            INNER JOIN ARTWORK a ON s.Artwork_ID = a.Artwork_ID
            WHERE a.Status = 'Sold'
            ORDER BY b.Bill_Date DESC
        `;
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Billing query error:', err);
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            console.log('Billing records found:', results.length);
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // GET single bill by ID
    else if (pathname.startsWith('/api/billing/') && req.method === 'GET') {
        const billId = pathname.split('/')[3];
        const sql = `
            SELECT b.Bill_ID, b.Sale_ID, b.Customer_ID, b.Bill_Date, b.Amount,
                   c.Name as Customer_Name, c.Email as Customer_Email, 
                   c.Phone as Customer_Phone, c.Address as Customer_Address,
                   a.Title as Artwork_Title, a.Price as Artwork_Price,
                   ar.Name as Artist_Name,
                   s.Sale_Date
            FROM BILLING b
            LEFT JOIN CUSTOMER c ON b.Customer_ID = c.Customer_ID
            LEFT JOIN SALES s ON b.Sale_ID = s.Sale_ID
            LEFT JOIN ARTWORK a ON s.Artwork_ID = a.Artwork_ID
            LEFT JOIN ARTIST ar ON a.Artist_ID = ar.Artist_ID
            WHERE b.Bill_ID = ?
        `;
        db.query(sql, [billId], (err, results) => {
            if (err) {
                console.error('Error fetching bill:', err);
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            if (results.length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Bill not found' }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results[0]));
        });
    }
    
    // ==================== SUBMISSION APIs ====================
    
    // GET all submissions
    else if (pathname === '/api/submissions' && req.method === 'GET') {
        db.query('SELECT * FROM Artwork_Submissions ORDER BY Submitted_Date DESC', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    }
    
    // ADD new submission
    else if (pathname === '/api/submissions/add' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'INSERT INTO Artwork_Submissions (Artist_Name, Title, Category, Price, Year_Created, Description, Image_URL, Email, Phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [data.artist_name, data.title, data.category, data.price, data.year_created, data.description, data.image_url, data.email, data.phone], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Submission received successfully', id: result.insertId }));
            });
        });
    }
    
    // APPROVE submission
    else if (pathname.startsWith('/api/submissions/approve/') && req.method === 'POST') {
        const submissionId = pathname.split('/')[4];
        
        // Get submission details
        db.query('SELECT * FROM Artwork_Submissions WHERE Submission_ID = ?', [submissionId], (err, results) => {
            if (err || results.length === 0) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Submission not found' }));
                return;
            }
            
            const submission = results[0];
            
            // First, check if artist exists by name, if not create one
            db.query('SELECT Artist_ID FROM Artist WHERE Name = ?', [submission.Artist_Name], (err, artistResults) => {
                let artistId;
                
                const addArtwork = (artistId) => {
                    // Add artwork to main Artwork table
                    const artworkSql = 'INSERT INTO Artwork (Title, Artist_ID, Category, Price, Year_Created, Status, Image_URL, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                    db.query(artworkSql, [submission.Title, artistId, submission.Category, submission.Price, submission.Year_Created, 'Available', submission.Image_URL, submission.Description], (err, result) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: err.message }));
                            return;
                        }
                        
                        // Update submission status
                        db.query('UPDATE Artwork_Submissions SET Status = ?, Review_Date = NOW() WHERE Submission_ID = ?', ['Approved', submissionId], (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end(JSON.stringify({ error: err.message }));
                                return;
                            }
                            res.writeHead(200);
                            res.end(JSON.stringify({ message: 'Submission approved and added to gallery' }));
                        });
                    });
                };
                
                if (artistResults.length > 0) {
                    // Artist exists
                    addArtwork(artistResults[0].Artist_ID);
                } else {
                    // Create new artist
                    const newArtistSql = 'INSERT INTO Artist (Name, Email, Phone, Biography, Birth_Year, Country) VALUES (?, ?, ?, ?, ?, ?)';
                    db.query(newArtistSql, [submission.Artist_Name, submission.Email, submission.Phone, 'Submitted artist', 1990, 'Unknown'], (err, artistResult) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: err.message }));
                            return;
                        }
                        addArtwork(artistResult.insertId);
                    });
                }
            });
        });
    }
    
    // REJECT submission
    else if (pathname.startsWith('/api/submissions/reject/') && req.method === 'POST') {
        const submissionId = pathname.split('/')[4];
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const sql = 'UPDATE Artwork_Submissions SET Status = ?, Review_Notes = ?, Review_Date = NOW() WHERE Submission_ID = ?';
            db.query(sql, ['Rejected', data.notes || 'Rejected by admin', submissionId], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Submission rejected' }));
            });
        });
    }
    
    // ==================== DASHBOARD STATS API ====================
    
    // Dashboard stats
    else if (pathname === '/api/stats' && req.method === 'GET') {
        const stats = {};
        
        // Get total artists
        db.query('SELECT COUNT(*) as total FROM Artist', (err, result) => {
            if (err) return;
            stats.totalArtists = result[0].total;
            
            // Get total artworks
            db.query('SELECT COUNT(*) as total FROM Artwork', (err, result) => {
                if (err) return;
                stats.totalArtworks = result[0].total;
                
                // Get total sales
                db.query('SELECT COUNT(*) as total, SUM(Sale_Amount) as revenue FROM Sales', (err, result) => {
                    if (err) return;
                    stats.totalSales = result[0].total;
                    stats.totalRevenue = result[0].revenue || 0;
                    
                    // Get available artworks
                    db.query('SELECT COUNT(*) as total FROM Artwork WHERE Status = "Available"', (err, result) => {
                        if (err) return;
                        stats.availableArtworks = result[0].total;
                        
                        res.writeHead(200);
                        res.end(JSON.stringify(stats));
                    });
                });
            });
        });
    }
    
    // ==================== DEFAULT API ENDPOINT ====================
    
    // Default API endpoint (root)
    else if (pathname === '/api/' || pathname === '/api') {
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: 'Art Gallery API',
            version: '1.0',
            endpoints: [
                '/api/login',
                '/api/register',
                '/api/artists',
                '/api/artworks',
                '/api/customers',
                '/api/sales',
                '/api/exhibitions',
                '/api/events',
                '/api/billing',
                '/api/stats'
            ]
        }));
    }
    
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ 
            error: 'API endpoint not found',
            requested: pathname,
            available_endpoints: [
                '/api/login',
                '/api/register',
                '/api/artists',
                '/api/artworks',
                '/api/customers',
                '/api/sales',
                '/api/exhibitions',
                '/api/events',
                '/api/billing',
                '/api/stats'
            ]
        }));
    }
}

// Serve static files (HTML, CSS, JS)
function serveStaticFile(pathname, res) {
    // Default to index.html
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    const filePath = path.join(__dirname, '../frontend', pathname);
    const extname = path.extname(filePath);

    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    const contentType = contentTypes[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 - File Not Found');
            } else {
                res.writeHead(500);
                res.end('500 - Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
    console.log(`📂 Serving frontend from 'frontend' folder`);
    console.log(`🔗 API available at http://localhost:${PORT}/api/`);
});