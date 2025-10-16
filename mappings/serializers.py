from rest_framework import serializers
from .models import MappingRecord

class MappingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MappingRecord
        fields = ('id', 'ayush_term', 'icd_code', 'disease_name', 'confidence', 
                  'explanation', 'source', 'created_at')
        read_only_fields = ('id', 'created_at')

class MappingRequestSerializer(serializers.Serializer):
    ayush_term = serializers.CharField(max_length=255)