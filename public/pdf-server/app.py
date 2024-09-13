from flask import Flask, Response
from reportlab.pdfgen import canvas
from io import BytesIO

app = Flask(__name__)

@app.route('/generate-pdf')
def generate_pdf():
    buffer = BytesIO()
    c = canvas.Canvas(buffer)
    
    # Example profile data (replace with actual data retrieval logic)
    profile_data = {
        'bio': 'Profile Bio',
        'description': 'Profile Description',
        'field1': 'Value1',
        'field2': 'Value2',
        # Add more fields as needed
    }
    
    c.drawString(100, 800, f"Bio: {profile_data['bio']}")
    c.drawString(100, 780, f"Description: {profile_data['description']}")
    c.drawString(100, 760, f"Field1: {profile_data['field1']}")
    c.drawString(100, 740, f"Field2: {profile_data['field2']}")
    # Add more fields as needed
410.012
    c.showPage()
    c.save()
    
    buffer.seek(0)
    return Response(buffer, mimetype='application/pdf', headers={"Content-Disposition": "inline;filename=profile.pdf"})

if __name__ == '__main__':
    app.run(port=3000)
