const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

if (request.method === 'POST' && url === '/submit-registration') {
  let body = '';

  // Collect data from the request body
  request.on('data', chunk => {
    body += chunk.toString(); // Convert Buffer to string
  });

  request.on('end', () => {
    const formData = new URLSearchParams(body); // Parse the form data
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const dob = formData.get('dob');
    const acceptTerms = formData.get('acceptTerms') ? 'Yes' : 'No';

    // Log the registration data
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Date of Birth: ${dob}, Accepted Terms: ${acceptTerms}`);

    // Respond back to the user
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`<h1>Registration Successful!</h1><p>Name: ${name}</p><p>Email: ${email}</p>`);
    response.end();
  });
  
  return; // Exit the switch case after handling POST request
}

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration.html":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
