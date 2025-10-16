class OutputAgent:
    """
    Agent responsible for formatting the final output in a structured format
    """
    def __init__(self):
        pass
    
    def format_output(self, extraction_result, mapping_result, validation_result):
        """
        Format the final output combining results from all agents
        """
        # Combine all results into a structured output
        output = {
            "ayush_term": extraction_result["primary_condition"],
            "icd_code": validation_result["confirmed_code"],
            "disease_name": validation_result["confirmed_name"],
            "confidence": mapping_result["confidence"],
            "explanation": mapping_result["reasoning"],
            "source": validation_result["source"],
            "ayush_details": {
                "system": extraction_result["ayush_system"],
                "symptoms": extraction_result["symptoms"],
                "body_system": extraction_result["body_system"]
            }
        }
        
        return output