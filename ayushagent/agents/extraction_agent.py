import spacy
from langchain.agents import Tool
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

class ExtractionAgent:
    """
    Agent responsible for extracting disease, symptoms, and system info from AYUSH text
    """
    def __init__(self, llm):
        self.llm = llm
        # Load spaCy model for NLP processing
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except:
            # If model not found, download a small model
            import subprocess
            subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
            self.nlp = spacy.load("en_core_web_sm")
        
        # Define extraction prompt
        self.extraction_prompt = PromptTemplate(
            input_variables=["ayush_term"],
            template="""
            Extract key medical information from the following AYUSH (traditional medicine) term:
            
            AYUSH Term: {ayush_term}
            
            Please identify and extract:
            1. Primary disease/condition
            2. Key symptoms mentioned
            3. Body system affected
            4. Any specific AYUSH system (Ayurveda, Yoga, Unani, Siddha, Homeopathy) this term belongs to
            
            Format your response as a structured JSON with these fields.
            """
        )
        
        self.chain = LLMChain(llm=self.llm, prompt=self.extraction_prompt)
    
    def process(self, ayush_term):
        """
        Process an AYUSH term to extract structured information
        """
        # First use spaCy for basic NLP analysis
        doc = self.nlp(ayush_term)
        
        # Then use LLM for deeper extraction
        result = self.chain.run(ayush_term=ayush_term)
        
        # In a real implementation, we would parse the JSON response
        # For now, we'll return a mock structured result
        extracted_info = {
            "primary_condition": ayush_term,
            "symptoms": ["high blood sugar", "frequent urination", "thirst"],
            "body_system": "endocrine",
            "ayush_system": "Ayurveda"
        }
        
        return extracted_info