from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

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
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    featured: bool = False

class Achievement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    course_completed: str
    photo_url: Optional[str] = None
    completion_date: str
    testimonial: Optional[str] = None
    placed_at: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AchievementCreate(BaseModel):
    student_name: str
    course_completed: str
    photo_url: Optional[str] = None
    completion_date: str
    testimonial: Optional[str] = None
    placed_at: Optional[str] = None

class Enrollment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    address: str
    qualification: str
    course: str
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "pending"

class EnrollmentCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    address: str
    qualification: str
    course: str
    message: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Sri Sakthi Vinayaga Mobile Services API"}

# Services Routes
@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    if not services:
        # Return default services if none exist
        default_services = [
            {"id": "1", "name": "Basic Mobile Repair", "description": "Screen replacement, battery change, charging port repair and basic troubleshooting", "icon": "smartphone", "featured": False},
            {"id": "2", "name": "Smartphone Repair", "description": "Advanced smartphone repairs including software issues, camera repairs, and water damage recovery", "icon": "wrench", "featured": True},
            {"id": "3", "name": "Motherboard Repair", "description": "Chip-level repair and motherboard replacement for all mobile brands", "icon": "cpu", "featured": True},
            {"id": "4", "name": "Software Solutions", "description": "OS installation, software updates, virus removal, and data recovery services", "icon": "code", "featured": False},
            {"id": "5", "name": "Tablet Repair", "description": "Complete tablet repair services including screen, battery, and hardware issues", "icon": "tablet", "featured": False},
            {"id": "6", "name": "Accessories", "description": "Quality mobile accessories, screen guards, cases, and charging equipment", "icon": "package", "featured": False}
        ]
        return default_services
    return services

# Achievements Routes
@api_router.get("/achievements", response_model=List[Achievement])
async def get_achievements():
    achievements = await db.achievements.find({}, {"_id": 0}).to_list(100)
    return achievements

@api_router.post("/achievements", response_model=Achievement)
async def create_achievement(achievement: AchievementCreate):
    achievement_obj = Achievement(**achievement.model_dump())
    doc = achievement_obj.model_dump()
    await db.achievements.insert_one(doc)
    return achievement_obj

@api_router.delete("/achievements/{achievement_id}")
async def delete_achievement(achievement_id: str):
    result = await db.achievements.delete_one({"id": achievement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return {"message": "Achievement deleted successfully"}

# Enrollment Routes
@api_router.get("/enrollments", response_model=List[Enrollment])
async def get_enrollments():
    enrollments = await db.enrollments.find({}, {"_id": 0}).to_list(100)
    return enrollments

@api_router.post("/enrollments", response_model=Enrollment)
async def create_enrollment(enrollment: EnrollmentCreate):
    enrollment_obj = Enrollment(**enrollment.model_dump())
    doc = enrollment_obj.model_dump()
    await db.enrollments.insert_one(doc)
    return enrollment_obj

@api_router.patch("/enrollments/{enrollment_id}/status")
async def update_enrollment_status(enrollment_id: str, status: str):
    result = await db.enrollments.update_one(
        {"id": enrollment_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    return {"message": "Status updated successfully"}

# Courses (static for now)
@api_router.get("/courses")
async def get_courses():
    return [
        {"id": "1", "name": "Basic Mobile Repair Course", "duration": "2 Months", "description": "Learn fundamental mobile repair techniques"},
        {"id": "2", "name": "Advanced Smartphone Repair", "duration": "3 Months", "description": "Master advanced smartphone troubleshooting and repair"},
        {"id": "3", "name": "Chip Level / Motherboard Repair", "duration": "4 Months", "description": "Expert-level chip and motherboard repair training"},
        {"id": "4", "name": "Complete Mobile Technician Course", "duration": "6 Months", "description": "Comprehensive course covering all aspects of mobile repair"}
    ]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
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
