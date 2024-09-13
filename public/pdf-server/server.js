// server.js
const express = require('express');
const PDFDocument = require('pdfkit');
const app = express();

app.get('/generate-pdf', (req, res) => {
  const doc = new PDFDocument();

  // Example profile data (replace with actual data retrieval logic)
  const profileData = {
    bio: 'Profile Bio',
    description: 'Profile Description',
    field1: 'Value1',
    field2: 'Value2',
    // Add more fields as needed
  };

  res.setHeader('Content-disposition', 'attachment; filename=profile.pdf');
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(12).text(`Bio: ${profileData.bio}`);
  doc.text(`Description: ${profileData.description}`);
  doc.text(`Field1: ${profileData.field1}`);
  doc.text(`Field2: ${profileData.field2}`);
  // Add more fields as needed

  doc.end();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
