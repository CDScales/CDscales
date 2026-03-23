from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class BookingRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    preferredDate: Optional[str] = None
    preferredTime: Optional[str] = None
    timezone: Optional[str] = None
    message: Optional[str] = None

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class BookingResponse(BaseModel):
    id: str
    success: bool
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc_dict = status_obj.model_dump()
    doc_dict['timestamp'] = doc_dict['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc_dict)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/booking", response_model=BookingResponse)
async def create_booking(booking: BookingRequest):
    """Handle booking form submission and send email"""
    try:
        # Save to database
        booking_dict = booking.model_dump()
        booking_dict['id'] = str(uuid.uuid4())
        booking_dict['timestamp'] = datetime.now(timezone.utc).isoformat()
        
        await db.bookings.insert_one(booking_dict)
        
        # Send email notification
        email_sent = email_service.send_booking_email(booking_dict)
        
        if not email_sent:
            logging.warning(f"Booking saved but email failed for {booking.email}")
        
        return BookingResponse(
            id=booking_dict['id'],
            success=True,
            message="Booking received successfully! We'll contact you soon."
        )
    except Exception as e:
        logging.error(f"Booking error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process booking: {str(e)}")

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(contact: ContactRequest):
    """Handle contact form submission and send email"""
    try:
        # Save to database
        contact_dict = contact.model_dump()
        contact_dict['id'] = str(uuid.uuid4())
        contact_dict['timestamp'] = datetime.now(timezone.utc).isoformat()
        
        await db.contacts.insert_one(contact_dict)
        
        # Send email notification
        email_sent = email_service.send_contact_email(contact_dict)
        
        if not email_sent:
            logging.warning(f"Contact saved but email failed for {contact.email}")
        
        return ContactResponse(
            success=True,
            message="Message sent successfully! We'll get back to you soon."
        )
    except Exception as e:
        logging.error(f"Contact error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
