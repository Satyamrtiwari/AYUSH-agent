from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

class MappingAgent:
    """
    Agent responsible for mapping AYUSH terms to ICD-11 codes using LLM reasoning
    """
    def __init__(self, llm):
        self.llm = llm
        
        # Define mapping prompt
        self.mapping_prompt = PromptTemplate(
            input_variables=["extracted_info"],
            template="""
            You are an expert medical knowledge mapper specializing in traditional medicine systems.
            
            Based on the following extracted information from an AYUSH (traditional medicine) term:
            
            {extracted_info}
            
            Please map this to the most appropriate ICD-11 code and disease name.
            
            Consider:
            1. The primary condition/disease
            2. Symptoms described
            3. Body systems affected
            4. Traditional medicine concepts and their modern equivalents
            
            Provide your response as a JSON with these fields:
            - icd_code: The most appropriate ICD-11 code
            - disease_name: The corresponding disease name in ICD-11
            - confidence: A percentage (0-100) indicating your confidence in this mapping
            - reasoning: Brief explanation of your mapping rationale
            """
        )
        
        self.chain = LLMChain(llm=self.llm, prompt=self.mapping_prompt)
    
    def process(self, extracted_info):
        """
        Process extracted information to map to ICD-11 code
        """
        # In a real implementation, this would call the LLM chain
        # For now, we'll return a mock mapping result
        
        # Example mapping for "Madhumeha" (diabetes in Ayurveda)
        if "diabetes" in extracted_info["primary_condition"].lower() or "madhumeha" in extracted_info["primary_condition"].lower():
            mapping_result = {
                "icd_code": "5A11",
                "disease_name": "Type 2 diabetes mellitus",
                "confidence": 94.5,
                "reasoning": "Madhumeha in Ayurveda closely corresponds to Type 2 Diabetes Mellitus in modern medicine, characterized by similar symptoms of polyuria, polydipsia, and hyperglycemia."
            }
        else:
            # Generic fallback mapping
            mapping_result = {
                "icd_code": "MG30.01",
                "disease_name": "Traditional medicine condition, specified type",
                "confidence": 70.0,
                "reasoning": "Generic mapping for traditional medicine term without specific modern equivalent."
            }
        
        return mapping_result