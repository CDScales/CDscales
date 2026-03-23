import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_user = os.environ.get('SMTP_USER')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '').replace(' ', '')  # Remove any spaces
        self.email_from = os.environ.get('EMAIL_FROM')
        self.email_to = os.environ.get('EMAIL_TO')
        
        logger.info(f"Email service initialized with user: {self.smtp_user}")
        logger.info(f"SMTP Host: {self.smtp_host}:{self.smtp_port}")
        
    def send_booking_email(self, booking_data: Dict) -> bool:
        """Send booking notification email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'New Call Booking - {booking_data.get("name")}'
            msg['From'] = self.email_from
            msg['To'] = self.email_to
            
            # Create HTML email body
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                            🎉 New Call Booking Request
                        </h2>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #7c3aed; margin-top: 0;">Contact Information</h3>
                            <p><strong>Name:</strong> {booking_data.get('name')}</p>
                            <p><strong>Email:</strong> <a href="mailto:{booking_data.get('email')}">{booking_data.get('email')}</a></p>
                            <p><strong>Phone:</strong> <a href="tel:{booking_data.get('phone')}">{booking_data.get('phone')}</a></p>
                        </div>
                        
                        <div style="background-color: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #7c3aed; margin-top: 0;">Preferred Schedule</h3>
                            <p><strong>Date:</strong> {booking_data.get('preferredDate', 'Not specified')}</p>
                            <p><strong>Time:</strong> {booking_data.get('preferredTime', 'Not specified')}</p>
                            <p><strong>Timezone:</strong> {booking_data.get('timezone', 'Not specified')}</p>
                        </div>
                        
                        {f'''<div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #7c3aed; margin-top: 0;">Project Details</h3>
                            <p>{booking_data.get('message')}</p>
                        </div>''' if booking_data.get('message') else ''}
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
                            <p style="margin: 0;">CDScales - Web Development Agency</p>
                            <p style="margin: 5px 0;">This email was sent from your website booking form</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Send email with detailed logging
            logger.info(f"Attempting to send booking email to {self.email_to}")
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.set_debuglevel(0)
                logger.info("Starting TLS...")
                server.starttls()
                logger.info(f"Logging in as {self.smtp_user}...")
                server.login(self.smtp_user, self.smtp_password)
                logger.info("Sending message...")
                server.send_message(msg)
            
            logger.info(f"Booking email sent successfully for {booking_data.get('name')}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {str(e)}")
            logger.error("Please verify your Gmail App Password is correct")
            logger.error("Gmail App Password should be 16 characters without spaces")
            return False
        except Exception as e:
            logger.error(f"Failed to send booking email: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            return False
    
    def send_contact_email(self, contact_data: Dict) -> bool:
        """Send contact form notification email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'New Contact Form - {contact_data.get("subject")}'
            msg['From'] = self.email_from
            msg['To'] = self.email_to
            
            # Create HTML email body
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                            📧 New Contact Form Submission
                        </h2>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #7c3aed; margin-top: 0;">Contact Information</h3>
                            <p><strong>Name:</strong> {contact_data.get('name')}</p>
                            <p><strong>Email:</strong> <a href="mailto:{contact_data.get('email')}">{contact_data.get('email')}</a></p>
                            <p><strong>Subject:</strong> {contact_data.get('subject')}</p>
                        </div>
                        
                        <div style="background-color: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #7c3aed; margin-top: 0;">Message</h3>
                            <p style="white-space: pre-wrap;">{contact_data.get('message')}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
                            <p style="margin: 0;">CDScales - Web Development Agency</p>
                            <p style="margin: 5px 0;">This email was sent from your website contact form</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Send email with detailed logging
            logger.info(f"Attempting to send contact email to {self.email_to}")
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.set_debuglevel(0)
                logger.info("Starting TLS...")
                server.starttls()
                logger.info(f"Logging in as {self.smtp_user}...")
                server.login(self.smtp_user, self.smtp_password)
                logger.info("Sending message...")
                server.send_message(msg)
            
            logger.info(f"Contact email sent successfully from {contact_data.get('name')}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {str(e)}")
            logger.error("Please verify your Gmail App Password is correct")
            logger.error("Gmail App Password should be 16 characters without spaces")
            return False
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            return False

# Create singleton instance
email_service = EmailService()
