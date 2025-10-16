import os
import json
import openai
from django.conf import settings

class OpenAIService:
    """
    Service for interacting with OpenAI API to map AYUSH terms to modern medical terminology
    """
    
    def __init__(self):
        # For demo purposes, use a hardcoded API key if not in settings
        self.api_key = getattr(settings, '', 'sk-demo-key')
        openai.api_key = self.api_key
    
    def map_ayush_term(self, ayush_term):
        """
        Maps an AYUSH term to modern medical terminology using OpenAI
        
        Args:
            ayush_term (str): The AYUSH term to map
            
        Returns:
            dict: Mapping result with ICD code, disease name, confidence, and explanation
        """
        # For demo purposes, return mock data instead of calling the API
        # This ensures the application works without requiring a real API key
        
        # Simulate different responses based on input
        if "vata" in ayush_term.lower():
            return {
                'ayush_term': ayush_term,
                'icd_code': 'F45.8',
                'disease_name': 'Vata Imbalance / Autonomic Nervous System Dysfunction',
                'confidence': 92,
                'explanation': 'Vata dosha imbalance in Ayurveda corresponds to disorders of the nervous system in modern medicine. The symptoms of excess vata (anxiety, insomnia, dry skin, constipation) align with autonomic nervous system dysfunction.',
                'source': 'AYUSH Agent',
                'processing_steps': [
                    {'agent': 'Extraction Agent', 'output': 'Identified key terms: vata, dosha, imbalance'},
                    {'agent': 'Classification Agent', 'output': 'Category: Nervous system disorders'},
                    {'agent': 'Mapping Agent', 'output': 'Matched to ICD-10 code F45.8'}
                ]
            }
        elif "pitta" in ayush_term.lower():
            return {
                'ayush_term': ayush_term,
                'icd_code': 'K29.7',
                'disease_name': 'Pitta Imbalance / Gastritis',
                'confidence': 88,
                'explanation': 'Pitta dosha imbalance in Ayurveda relates to inflammation and digestive disorders in modern medicine. Symptoms like acid reflux, inflammation, and irritability correspond to gastritis and related inflammatory conditions.',
                'source': 'AYUSH Agent',
                'processing_steps': [
                    {'agent': 'Extraction Agent', 'output': 'Identified key terms: pitta, inflammation, heat'},
                    {'agent': 'Classification Agent', 'output': 'Category: Digestive system disorders'},
                    {'agent': 'Mapping Agent', 'output': 'Matched to ICD-10 code K29.7'}
                ]
            }
        elif "kapha" in ayush_term.lower():
            return {
                'ayush_term': ayush_term,
                'icd_code': 'J45.9',
                'disease_name': 'Kapha Imbalance / Respiratory Disorders',
                'confidence': 85,
                'explanation': 'Kapha dosha imbalance in Ayurveda corresponds to respiratory and congestive disorders in modern medicine. Symptoms like congestion, excess mucus, and lethargy align with conditions like asthma and bronchitis.',
                'source': 'AYUSH Agent',
                'processing_steps': [
                    {'agent': 'Extraction Agent', 'output': 'Identified key terms: kapha, congestion, mucus'},
                    {'agent': 'Classification Agent', 'output': 'Category: Respiratory system disorders'},
                    {'agent': 'Mapping Agent', 'output': 'Matched to ICD-10 code J45.9'}
                ]
            }
        else:
            # Generic response for other terms
            return {
                'ayush_term': ayush_term,
                'icd_code': 'R69',
                'disease_name': 'Unknown and unspecified causes of morbidity',
                'confidence': 60,
                'explanation': f'The term "{ayush_term}" has been analyzed but does not have a precise modern medical equivalent. It may refer to a traditional concept that encompasses multiple conditions or a specific state not recognized in modern medicine.',
                'source': 'AYUSH Agent',
                'processing_steps': [
                    {'agent': 'Extraction Agent', 'output': f'Analyzed term: {ayush_term}'},
                    {'agent': 'Classification Agent', 'output': 'Category: Unspecified'},
                    {'agent': 'Mapping Agent', 'output': 'Matched to general ICD-10 code R69'}
                ]
            }
            
            # Extract the response content
            content = response.choices[0].message.content
            
            # Process the response to extract structured data
            import json
            import re
            
            # Try to extract JSON from the response
            try:
                # First try direct JSON parsing
                json_data = json.loads(content)
            except json.JSONDecodeError:
                # If that fails, try to extract JSON using regex
                json_match = re.search(r'\{.*\}', content, re.DOTALL)
                if json_match:
                    try:
                        json_data = json.loads(json_match.group(0))
                    except json.JSONDecodeError:
                        # If regex extraction fails, use fallback values
                        json_data = {}
                else:
                    json_data = {}
            
            # Return structured data with fallbacks for missing fields
            return {
                'ayush_term': ayush_term,
                'icd_code': json_data.get('icd_code', 'Unknown'),
                'disease_name': json_data.get('disease_name', 'Unknown'),
                'confidence': json_data.get('confidence', 70),
                'explanation': json_data.get('explanation', content),
                'source': 'OpenAI GPT-4'
            }
            
        except Exception as e:
            # Log the error and return a fallback response
            print(f"Error calling OpenAI API: {str(e)}")
            return {
                'ayush_term': ayush_term,
                'icd_code': 'Unknown',
                'disease_name': 'Mapping failed',
                'confidence': 0,
                'explanation': f"Failed to map term due to error: {str(e)}",
                'source': 'Error'
            }