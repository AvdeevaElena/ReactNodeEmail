const express = require('express');
const bodyParser = require('body-parser');
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const nodemailer = require ("nodemailer");

const PORT = process.env.PORT || 5001;

if (cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);
  
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
      );
    });
  } else {const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post ('/contact', (req, res) => {
  nodemailer.createTestAccount ((err, account) =>{
    
    let  transporter= nodemailer.createTransport ({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'kiley.kerluke97@ethereal.email', 
        pass: '74rN9eWSYRBfQVP5t1', 
      },
    });
    let mailOptions = {
      from: req.body.name, 
      to: req.body.email,   
      subject: "Hello ✔", 
      text:  req.body.message,
      html:  "<b>"+req.body.message+ "</b>"
      
    } 
    transporter.sendMail (mailOptions, (err, info) => {
      if (err) {
        return console.log (err)
      }
      console.log ("Message sent: %s", info.message)
      console.log ("Message url: %s", nodemailer.getTestMessageUrl(info))
    })
  })
  console.log(req.body);
})

app.listen(PORT, () =>console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`));  
} 


/*   
"<h3>ContactDetailis </h3>
      <ul> 
        <li>Name: ${req.body.name} </li>
        <li>Email: ${req.body.email} </li>
      </ul>
    <h3>Message </h3> "

*/