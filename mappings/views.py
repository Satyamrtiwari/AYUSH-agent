from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import MappingRecord
from .serializers import MappingRecordSerializer, MappingRequestSerializer
from agents.services import OpenAIService

class MapAyushView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = MappingRequestSerializer(data=request.data)
        if serializer.is_valid():
            # Get the AYUSH term from the request
            ayush_term = serializer.validated_data['ayush_term']
            
            try:
                # Use OpenAI service to map the term
                openai_service = OpenAIService()
                mapping_result = openai_service.map_ayush_term(ayush_term)
                
                # Prepare data for saving to database
                mapping_data = {
                    'ayush_term': ayush_term,
                    'icd_code': mapping_result['icd_code'],
                    'disease_name': mapping_result['disease_name'],
                    'confidence': mapping_result['confidence'],
                    'explanation': mapping_result['explanation'],
                    'source': mapping_result['source'],
                    'user': request.user.id
                }
                
                # Save the mapping record
                mapping_serializer = MappingRecordSerializer(data=mapping_data)
                if mapping_serializer.is_valid():
                    mapping_record = mapping_serializer.save(user=request.user)
                    return Response(mapping_serializer.data, status=status.HTTP_201_CREATED)
                return Response(mapping_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            except Exception as e:
                return Response(
                    {'error': f'Failed to process mapping: {str(e)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MappingHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        mappings = MappingRecord.objects.filter(user=request.user)
        serializer = MappingRecordSerializer(mappings, many=True)
        return Response(serializer.data)
