import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ValidationAgent:
    """
    Agent responsible for validating ICD-11 codes using the WHO API
    """
    def __init__(self):
        # In a real implementation, we would use the actual WHO ICD-11 API key
        self.api_key = os.getenv("ICD_API_KEY", "mock_api_key")
        self.base_url = "https://id.who.int/icd/entity"
    
    def validate(self, icd_code, disease_name):
        """
        Validate an ICD-11 code against the WHO API
        """
        # In a real implementation, this would make an actual API call
        # For now, we'll simulate the validation process
        
        # Mock validation result
        validation_result = {
            "is_valid": True,
            "confirmed_code": icd_code,
            "confirmed_name": disease_name,
            "source": "ICD-11 WHO API"
        }
        
        return validation_result
    
    def search_icd(self, query):
        """
        Search the ICD-11 API for a term
        """
        # In a real implementation, this would search the WHO API
        # For now, we'll return mock search results
        
        search_results = [
            {"code": "5A11", "title": "Type 2 diabetes mellitus"},
            {"code": "5A10", "title": "Type 1 diabetes mellitus"},
            {"code": "5A22", "title": "Malnutrition-related diabetes mellitus"}
        ]
        
        return search_results