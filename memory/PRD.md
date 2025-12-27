# Sri Sakthi Vinayaga Mobile Services & Institute - PRD

## Original Problem Statement
Build a website for "Sri Sakthi Vinayaga Mobile Services and Institute" with:
- Navbar (Services, About, Achievements, Course Enrollment)
- Services section with grid layout (Basic Set Repair, Smartphone Repair, Motherboard Repair, etc.)
- Achievements section to display student completions with ability to upload new students
- Course Enrollment form for student registration

## User Personas
1. **Students** - Looking for mobile repair training courses
2. **Customers** - Seeking mobile repair services
3. **Admin** - Managing achievements and enrollments

## Core Requirements (Static)
- Responsive website with modern UI
- Services display in grid format
- Course enrollment form with validation
- Admin panel for managing achievements and enrollments
- Student achievements gallery
- About section with institute information

## Architecture
- **Frontend**: React with Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Styling**: Tech Saffron (Orange-600) & Deep Circuit Blue (Blue-900) theme

## What's Been Implemented (Dec 2024)
- ✅ Homepage with Hero, Services, About, Achievements, Enrollment sections
- ✅ Glassmorphism Navbar with scroll behavior
- ✅ 6 Services displayed in Bento-style grid
- ✅ Course Enrollment form with all fields (Name, Email, Phone, Address, Qualification, Course, Message)
- ✅ Student Achievements gallery section
- ✅ Admin Panel at /admin route
- ✅ Add/Delete achievements functionality
- ✅ View and update enrollment statuses
- ✅ Backend APIs: /api/services, /api/achievements, /api/enrollments, /api/courses
- ✅ Responsive design for mobile devices

## API Endpoints
- GET /api/services - List all services
- GET /api/achievements - List student achievements
- POST /api/achievements - Add new achievement
- DELETE /api/achievements/{id} - Delete achievement
- GET /api/enrollments - List all enrollments
- POST /api/enrollments - Submit new enrollment
- PATCH /api/enrollments/{id}/status - Update enrollment status
- GET /api/courses - List available courses

## Prioritized Backlog

### P0 - Critical (Done)
- [x] Homepage with all sections
- [x] Services grid display
- [x] Enrollment form submission
- [x] Admin panel for achievements

### P1 - High Priority
- [ ] Admin authentication/login
- [ ] Image upload for student photos
- [ ] Email notifications for enrollments
- [ ] Contact form for service inquiries

### P2 - Medium Priority
- [ ] Course pricing information
- [ ] Testimonials carousel
- [ ] FAQ section
- [ ] WhatsApp integration for quick contact

## Next Tasks
1. Add admin authentication
2. Implement image upload for student achievements
3. Add email notifications for new enrollments
4. Create service inquiry/quote request feature
