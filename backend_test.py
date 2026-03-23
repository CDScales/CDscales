import requests
import sys
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CDScalesAPITester:
    def __init__(self, base_url="https://results-driven-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print(f"   Response: {response.text}")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text
                })
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.failed_tests.append({'name': name, 'error': 'Timeout'})
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({'name': name, 'error': str(e)})
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test("Root API", "GET", "api/", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating a status check
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data=test_data
        )
        
        # Test getting status checks
        self.run_test("Get Status Checks", "GET", "api/status", 200)
        
        return success

    def test_booking_endpoint(self):
        """Test booking form submission"""
        booking_data = {
            "name": "John Test Doe",
            "email": "test@example.com",
            "phone": "+1234567890",
            "preferredDate": "2024-12-25",
            "preferredTime": "14:30",
            "timezone": "America/New_York",
            "message": "This is a test booking message for API testing."
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "api/booking",
            200,
            data=booking_data
        )
        
        if success and response:
            # Check response structure
            if 'success' in response and 'message' in response and 'id' in response:
                print("✅ Booking response has correct structure")
                if response.get('success') == True:
                    print("✅ Booking marked as successful")
                else:
                    print("❌ Booking not marked as successful")
                    return False
            else:
                print("❌ Booking response missing required fields")
                return False
        
        return success

    def test_booking_validation(self):
        """Test booking form validation"""
        # Test with missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "phone": ""  # Empty phone
        }
        
        success, response = self.run_test(
            "Booking Validation (Invalid Data)",
            "POST",
            "api/booking",
            422,  # Validation error
            data=invalid_data
        )
        
        return success

    def test_contact_endpoint(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Jane Test Smith",
            "email": "testcontact@example.com",
            "subject": "Test Contact Subject",
            "message": "This is a test contact message for API testing purposes."
        }
        
        success, response = self.run_test(
            "Create Contact",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        
        if success and response:
            # Check response structure
            if 'success' in response and 'message' in response:
                print("✅ Contact response has correct structure")
                if response.get('success') == True:
                    print("✅ Contact marked as successful")
                else:
                    print("❌ Contact not marked as successful")
                    return False
            else:
                print("❌ Contact response missing required fields")
                return False
        
        return success

    def test_contact_validation(self):
        """Test contact form validation"""
        # Test with missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        
        success, response = self.run_test(
            "Contact Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,  # Validation error
            data=invalid_data
        )
        
        return success

    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{self.base_url}/api/booking", timeout=10)
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            print(f"🔍 CORS Headers: {cors_headers}")
            return True
        except Exception as e:
            print(f"❌ CORS test failed: {str(e)}")
            return False

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*50}")
        print(f"📊 TEST SUMMARY")
        print(f"{'='*50}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
                print(f"  - {test['name']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    print("🚀 Starting CDScales API Testing...")
    print("=" * 50)
    
    tester = CDScalesAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_status_endpoints,
        tester.test_booking_endpoint,
        tester.test_booking_validation,
        tester.test_contact_endpoint,
        tester.test_contact_validation,
        tester.test_cors_headers
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {str(e)}")
            tester.failed_tests.append({'name': test.__name__, 'error': f'Test crashed: {str(e)}'})
    
    # Print final summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())