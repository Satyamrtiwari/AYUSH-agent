from django.db import models
from django.conf import settings

class MappingRecord(models.Model):
    """
    Model to store AYUSH to ICD-11 mapping records
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mappings')
    ayush_term = models.CharField(max_length=255)
    icd_code = models.CharField(max_length=50)
    disease_name = models.CharField(max_length=255)
    confidence = models.FloatField()
    explanation = models.TextField()
    source = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.ayush_term} → {self.icd_code} ({self.confidence}%)"
