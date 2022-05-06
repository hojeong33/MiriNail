FROM python:3.7

WORKDIR /app
COPY . .
 
RUN pip install -r requirements.txt
 
EXPOSE 8000
 
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]