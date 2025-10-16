from langchain.llms import OpenAI
import os
from dotenv import load_dotenv

from .extraction_agent import ExtractionAgent
from .mapping_agent import MappingAgent
from .validation_agent import ValidationAgent
from .output_agent import OutputAgent

# Load environment variables
load_dotenv()

class AgentManager:
    """
    Manager class to coordinate all agents in the mapping workflow
    """
    def __init__(self):
        # Initialize LLM
        api_key = os.getenv("OPENAI_API_KEY", "mock_api_key")
        self.llm = OpenAI(api_key=api_key)
        
        # Initialize agents
        self.extraction_agent = ExtractionAgent(self.llm)
        self.mapping_agent = MappingAgent(self.llm)
        self.validation_agent = ValidationAgent()
        self.output_agent = OutputAgent()
    
    def process_ayush_term(self, ayush_term):
        """
        Process an AYUSH term through the entire agent workflow
        """
        # Step 1: Extract information using the Extraction Agent
        extraction_result = self.extraction_agent.process(ayush_term)
        
        # Step 2: Map to ICD-11 using the Mapping Agent
        mapping_result = self.mapping_agent.process(extraction_result)
        
        # Step 3: Validate the mapping using the Validation Agent
        validation_result = self.validation_agent.validate(
            mapping_result["icd_code"], 
            mapping_result["disease_name"]
        )
        
        # Step 4: Format the final output using the Output Agent
        final_output = self.output_agent.format_output(
            extraction_result,
            mapping_result,
            validation_result
        )
        
        return final_output