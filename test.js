const http = require('http');

// Test 1: GET /
console.log('\n=== Test 1: GET / ===');
http.get('http://localhost:3000/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', JSON.parse(data));
    });
});

// Test 2: GET /users
setTimeout(() => {
    console.log('\n=== Test 2: GET /users ===');
    http.get('http://localhost:3000/users', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
        });
    });
}, 500);

// Test 3: POST /users
setTimeout(() => {
    console.log('\n=== Test 3: POST /users ===');
    const userData = JSON.stringify({ name: 'John Doe', email: 'john@example.com' });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': userData.length
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
        });
    });
    req.write(userData);
    req.end();
}, 1000);

// Test 4: POST /login (invalid credentials)
setTimeout(() => {
    console.log('\n=== Test 4: POST /login (Invalid) ===');
    const loginData = JSON.stringify({ email: 'wrong@example.com', password: 'wrong' });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': loginData.length
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
        });
    });
    req.write(loginData);
    req.end();
}, 1500);

// Test 5: POST /login (valid credentials)
setTimeout(() => {
    console.log('\n=== Test 5: POST /login (Valid) ===');
    const loginData = JSON.stringify({ email: 'admin@gmail.com', password: '1234' });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': loginData.length
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
        });
    });
    req.write(loginData);
    req.end();
}, 2000);

// Test 6: GET /users (after creation)
setTimeout(() => {
    console.log('\n=== Test 6: GET /users (After Creation) ===');
    http.get('http://localhost:3000/users', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
            process.exit(0);
        });
    });
}, 2500);
