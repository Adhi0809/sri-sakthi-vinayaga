import requests
import sys
import json
from datetime import datetime

class APITester:
    def __init__(self, base_url="https://repair-academy-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = requests.patch(url, headers=headers, params=params)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text
                })

            return success, response.json() if response.text and response.status_code < 400 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_get_services(self):
        """Test get services endpoint"""
        success, response = self.run_test("Get Services", "GET", "services", 200)
        if success and isinstance(response, list) and len(response) >= 6:
            print(f"   Found {len(response)} services")
            return True
        elif success:
            print(f"   Warning: Expected 6 services, found {len(response) if isinstance(response, list) else 'invalid response'}")
        return success

    def test_get_courses(self):
        """Test get courses endpoint"""
        success, response = self.run_test("Get Courses", "GET", "courses", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} courses")
            return True
        return success

    def test_get_achievements(self):
        """Test get achievements endpoint"""
        return self.run_test("Get Achievements", "GET", "achievements", 200)

    def test_get_enrollments(self):
        """Test get enrollments endpoint"""
        return self.run_test("Get Enrollments", "GET", "enrollments", 200)

    def test_create_enrollment(self):
        """Test create enrollment endpoint"""
        enrollment_data = {
            "full_name": f"Test Student {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+91 9876543210",
            "address": "Test Address, Test City",
            "qualification": "Graduate",
            "course": "Basic Mobile Repair Course",
            "message": "Test enrollment message"
        }
        
        success, response = self.run_test(
            "Create Enrollment",
            "POST",
            "enrollments",
            200,
            data=enrollment_data
        )
        
        if success and 'id' in response:
            print(f"   Created enrollment with ID: {response['id']}")
            return response['id']
        return None

    def test_create_achievement(self):
        """Test create achievement endpoint"""
        achievement_data = {
            "student_name": f"Test Graduate {datetime.now().strftime('%H%M%S')}",
            "course_completed": "Basic Mobile Repair Course",
            "completion_date": "March 2024",
            "testimonial": "Great course! Learned a lot.",
            "placed_at": "Tech Solutions Pvt Ltd"
        }
        
        success, response = self.run_test(
            "Create Achievement",
            "POST",
            "achievements",
            200,
            data=achievement_data
        )
        
        if success and 'id' in response:
            print(f"   Created achievement with ID: {response['id']}")
            return response['id']
        return None

    def test_update_enrollment_status(self, enrollment_id):
        """Test update enrollment status endpoint"""
        if not enrollment_id:
            print("❌ Skipping status update test - no enrollment ID")
            return False
            
        return self.run_test(
            "Update Enrollment Status",
            "PATCH",
            f"enrollments/{enrollment_id}/status",
            200,
            params={"status": "approved"}
        )

    def test_delete_achievement(self, achievement_id):
        """Test delete achievement endpoint"""
        if not achievement_id:
            print("❌ Skipping delete test - no achievement ID")
            return False
            
        return self.run_test(
            "Delete Achievement",
            "DELETE",
            f"achievements/{achievement_id}",
            200
        )

def main():
    print("🚀 Starting Sri Sakthi Vinayaga Mobile Services API Tests")
    print("=" * 60)
    
    tester = APITester()
    
    # Test basic endpoints
    tester.test_root_endpoint()
    tester.test_get_services()
    tester.test_get_courses()
    tester.test_get_achievements()
    tester.test_get_enrollments()
    
    # Test CRUD operations
    enrollment_id = tester.test_create_enrollment()
    achievement_id = tester.test_create_achievement()
    
    # Test update and delete
    tester.test_update_enrollment_status(enrollment_id)
    tester.test_delete_achievement(achievement_id)
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            print(f"   - {test['test']}: {test.get('error', f'Status {test.get(\"actual\")} (expected {test.get(\"expected\")})')}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())